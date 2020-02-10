/*


 Color Thief v2.0
 by Lokesh Dhakar - http://www.lokeshdhakar.com

 License
 -------
 Creative Commons Attribution 2.5 License:
 http://creativecommons.org/licenses/by/2.5/

 Thanks
 ------
 Nick Rabinowitz - For creating quantize.js.
 John Schulz - For clean up and optimization. @JFSIII
 Nathan Spady - For adding drag and drop support to the demo page.


 Block below copied from Protovis: http://mbostock.github.com/protovis/
 Copyright 2010 Stanford Visualization Group
 Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php


 Copyright (C) 2001 Leptonica.  All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above
    copyright notice, this list of conditions and the following
    disclaimer in the documentation and/or other materials
    provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL ANY
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


 Basic Javascript port of the MMCQ (modified median cut quantization)
 algorithm from the Leptonica library (http://www.leptonica.com/).
 Returns a color map you can use to map original pixels to the reduced
 palette. Still a work in progress.

 @author Nick Rabinowitz
 @example

// array of pixels as [R,G,B] arrays
var myPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]
                // etc
                ];
var maxColors = 4;

var cmap = MMCQ.quantize(myPixels, maxColors);
var newPalette = cmap.palette();
var newPixels = myPixels.map(function(p) {
    return cmap.map(p);
});


 quantize.js Copyright 2008 Nick Rabinowitz.
 Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*/
var CanvasImage=function(image){this.canvas=document.createElement("canvas");this.context=this.canvas.getContext("2d");document.body.appendChild(this.canvas);this.width=this.canvas.width=image.width;this.height=this.canvas.height=image.height;this.context.drawImage(image,0,0,this.width,this.height)};CanvasImage.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)};CanvasImage.prototype.update=function(imageData){this.context.putImageData(imageData,0,0)};
CanvasImage.prototype.getPixelCount=function(){return this.width*this.height};CanvasImage.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};CanvasImage.prototype.removeCanvas=function(){this.canvas.parentNode.removeChild(this.canvas)};var ColorThief=function(){};ColorThief.prototype.getColor=function(sourceImage,quality){var palette=this.getPalette(sourceImage,5,quality);var dominantColor=palette[0];return dominantColor};
ColorThief.prototype.getPalette=function(sourceImage,colorCount,quality){if(typeof colorCount==="undefined")colorCount=10;if(typeof quality==="undefined")quality=10;var image=new CanvasImage(sourceImage);var imageData=image.getImageData();var pixels=imageData.data;var pixelCount=image.getPixelCount();var pixelArray=[];for(var i=0,offset,r,g,b,a;i<pixelCount;i=i+quality){offset=i*4;r=pixels[offset+0];g=pixels[offset+1];b=pixels[offset+2];a=pixels[offset+3];if(a>=125)if(!(r>250&&g>250&&b>250))pixelArray.push([r,
g,b])}var cmap=MMCQ.quantize(pixelArray,colorCount);var palette=cmap.palette();image.removeCanvas();return palette};if(!pv)var pv={map:function(array,f){var o={};return f?array.map(function(d,i){o.index=i;return f.call(o,d)}):array.slice()},naturalOrder:function(a,b){return a<b?-1:a>b?1:0},sum:function(array,f){var o={};return array.reduce(f?function(p,d,i){o.index=i;return p+f.call(o,d)}:function(p,d){return p+d},0)},max:function(array,f){return Math.max.apply(null,f?pv.map(array,f):array)}};
var MMCQ=function(){var sigbits=5,rshift=8-sigbits,maxIterations=1E3,fractByPopulations=.75;function getColorIndex(r,g,b){return(r<<2*sigbits)+(g<<sigbits)+b}function PQueue(comparator){var contents=[],sorted=false;function sort(){contents.sort(comparator);sorted=true}return{push:function(o){contents.push(o);sorted=false},peek:function(index){if(!sorted)sort();if(index===undefined)index=contents.length-1;return contents[index]},pop:function(){if(!sorted)sort();return contents.pop()},size:function(){return contents.length},
map:function(f){return contents.map(f)},debug:function(){if(!sorted)sort();return contents}}}function VBox(r1,r2,g1,g2,b1,b2,histo){var vbox=this;vbox.r1=r1;vbox.r2=r2;vbox.g1=g1;vbox.g2=g2;vbox.b1=b1;vbox.b2=b2;vbox.histo=histo}VBox.prototype={volume:function(force){var vbox=this;if(!vbox._volume||force)vbox._volume=(vbox.r2-vbox.r1+1)*(vbox.g2-vbox.g1+1)*(vbox.b2-vbox.b1+1);return vbox._volume},count:function(force){var vbox=this,histo=vbox.histo;if(!vbox._count_set||force){var npix=0,i,j,k;for(i=
vbox.r1;i<=vbox.r2;i++)for(j=vbox.g1;j<=vbox.g2;j++)for(k=vbox.b1;k<=vbox.b2;k++){index=getColorIndex(i,j,k);npix+=histo[index]||0}vbox._count=npix;vbox._count_set=true}return vbox._count},copy:function(){var vbox=this;return new VBox(vbox.r1,vbox.r2,vbox.g1,vbox.g2,vbox.b1,vbox.b2,vbox.histo)},avg:function(force){var vbox=this,histo=vbox.histo;if(!vbox._avg||force){var ntot=0,mult=1<<8-sigbits,rsum=0,gsum=0,bsum=0,hval,i,j,k,histoindex;for(i=vbox.r1;i<=vbox.r2;i++)for(j=vbox.g1;j<=vbox.g2;j++)for(k=
vbox.b1;k<=vbox.b2;k++){histoindex=getColorIndex(i,j,k);hval=histo[histoindex]||0;ntot+=hval;rsum+=hval*(i+.5)*mult;gsum+=hval*(j+.5)*mult;bsum+=hval*(k+.5)*mult}if(ntot)vbox._avg=[~~(rsum/ntot),~~(gsum/ntot),~~(bsum/ntot)];else vbox._avg=[~~(mult*(vbox.r1+vbox.r2+1)/2),~~(mult*(vbox.g1+vbox.g2+1)/2),~~(mult*(vbox.b1+vbox.b2+1)/2)]}return vbox._avg},contains:function(pixel){var vbox=this,rval=pixel[0]>>rshift;gval=pixel[1]>>rshift;bval=pixel[2]>>rshift;return rval>=vbox.r1&&rval<=vbox.r2&&gval>=vbox.g1&&
gval<=vbox.g2&&bval>=vbox.b1&&bval<=vbox.b2}};function CMap(){this.vboxes=new PQueue(function(a,b){return pv.naturalOrder(a.vbox.count()*a.vbox.volume(),b.vbox.count()*b.vbox.volume())})}CMap.prototype={push:function(vbox){this.vboxes.push({vbox:vbox,color:vbox.avg()})},palette:function(){return this.vboxes.map(function(vb){return vb.color})},size:function(){return this.vboxes.size()},map:function(color){var vboxes=this.vboxes;for(var i=0;i<vboxes.size();i++)if(vboxes.peek(i).vbox.contains(color))return vboxes.peek(i).color;
return this.nearest(color)},nearest:function(color){var vboxes=this.vboxes,d1,d2,pColor;for(var i=0;i<vboxes.size();i++){d2=Math.sqrt(Math.pow(color[0]-vboxes.peek(i).color[0],2)+Math.pow(color[1]-vboxes.peek(i).color[1],2)+Math.pow(color[2]-vboxes.peek(i).color[2],2));if(d2<d1||d1===undefined){d1=d2;pColor=vboxes.peek(i).color}}return pColor},forcebw:function(){var vboxes=this.vboxes;vboxes.sort(function(a,b){return pv.naturalOrder(pv.sum(a.color),pv.sum(b.color))});var lowest=vboxes[0].color;if(lowest[0]<
5&&lowest[1]<5&&lowest[2]<5)vboxes[0].color=[0,0,0];var idx=vboxes.length-1,highest=vboxes[idx].color;if(highest[0]>251&&highest[1]>251&&highest[2]>251)vboxes[idx].color=[255,255,255]}};function getHisto(pixels){var histosize=1<<3*sigbits,histo=new Array(histosize),index,rval,gval,bval;pixels.forEach(function(pixel){rval=pixel[0]>>rshift;gval=pixel[1]>>rshift;bval=pixel[2]>>rshift;index=getColorIndex(rval,gval,bval);histo[index]=(histo[index]||0)+1});return histo}function vboxFromPixels(pixels,histo){var rmin=
1E6,rmax=0,gmin=1E6,gmax=0,bmin=1E6,bmax=0,rval,gval,bval;pixels.forEach(function(pixel){rval=pixel[0]>>rshift;gval=pixel[1]>>rshift;bval=pixel[2]>>rshift;if(rval<rmin)rmin=rval;else if(rval>rmax)rmax=rval;if(gval<gmin)gmin=gval;else if(gval>gmax)gmax=gval;if(bval<bmin)bmin=bval;else if(bval>bmax)bmax=bval});return new VBox(rmin,rmax,gmin,gmax,bmin,bmax,histo)}function medianCutApply(histo,vbox){if(!vbox.count())return;var rw=vbox.r2-vbox.r1+1,gw=vbox.g2-vbox.g1+1,bw=vbox.b2-vbox.b1+1,maxw=pv.max([rw,
gw,bw]);if(vbox.count()==1)return[vbox.copy()];var total=0,partialsum=[],lookaheadsum=[],i,j,k,sum,index;if(maxw==rw)for(i=vbox.r1;i<=vbox.r2;i++){sum=0;for(j=vbox.g1;j<=vbox.g2;j++)for(k=vbox.b1;k<=vbox.b2;k++){index=getColorIndex(i,j,k);sum+=histo[index]||0}total+=sum;partialsum[i]=total}else if(maxw==gw)for(i=vbox.g1;i<=vbox.g2;i++){sum=0;for(j=vbox.r1;j<=vbox.r2;j++)for(k=vbox.b1;k<=vbox.b2;k++){index=getColorIndex(j,i,k);sum+=histo[index]||0}total+=sum;partialsum[i]=total}else for(i=vbox.b1;i<=
vbox.b2;i++){sum=0;for(j=vbox.r1;j<=vbox.r2;j++)for(k=vbox.g1;k<=vbox.g2;k++){index=getColorIndex(j,k,i);sum+=histo[index]||0}total+=sum;partialsum[i]=total}partialsum.forEach(function(d,i){lookaheadsum[i]=total-d});function doCut(color){var dim1=color+"1",dim2=color+"2",left,right,vbox1,vbox2,d2,count2=0;for(i=vbox[dim1];i<=vbox[dim2];i++)if(partialsum[i]>total/2){vbox1=vbox.copy();vbox2=vbox.copy();left=i-vbox[dim1];right=vbox[dim2]-i;if(left<=right)d2=Math.min(vbox[dim2]-1,~~(i+right/2));else d2=
Math.max(vbox[dim1],~~(i-1-left/2));while(!partialsum[d2])d2++;count2=lookaheadsum[d2];while(!count2&&partialsum[d2-1])count2=lookaheadsum[--d2];vbox1[dim2]=d2;vbox2[dim1]=vbox1[dim2]+1;return[vbox1,vbox2]}}return maxw==rw?doCut("r"):maxw==gw?doCut("g"):doCut("b")}function quantize(pixels,maxcolors){if(!pixels.length||maxcolors<2||maxcolors>256)return false;var histo=getHisto(pixels),histosize=1<<3*sigbits;var nColors=0;histo.forEach(function(){nColors++});if(nColors<=maxcolors);var vbox=vboxFromPixels(pixels,
histo),pq=new PQueue(function(a,b){return pv.naturalOrder(a.count(),b.count())});pq.push(vbox);function iter(lh,target){var ncolors=1,niters=0,vbox;while(niters<maxIterations){vbox=lh.pop();if(!vbox.count()){lh.push(vbox);niters++;continue}var vboxes=medianCutApply(histo,vbox),vbox1=vboxes[0],vbox2=vboxes[1];if(!vbox1)return;lh.push(vbox1);if(vbox2){lh.push(vbox2);ncolors++}if(ncolors>=target)return;if(niters++>maxIterations)return}}iter(pq,fractByPopulations*maxcolors);var pq2=new PQueue(function(a,
b){return pv.naturalOrder(a.count()*a.volume(),b.count()*b.volume())});while(pq.size())pq2.push(pq.pop());iter(pq2,maxcolors-pq2.size());var cmap=new CMap;while(pq2.size())cmap.push(pq2.pop());return cmap}return{quantize:quantize}}();
