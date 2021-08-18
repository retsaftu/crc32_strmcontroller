function crc32(str) {
    String.prototype.splice = function(idx, str) {
        return this.slice(0, idx) + str + this.slice(idx);
    };

    if((str.length/2)%4!=0){
        for(let i=0;i<(str.length/2)%4;i++){
            str = str.splice(str.length, "ff");
        }
    }
    const strLowerCase = str.toLowerCase();
    const strLength = str.length;
    const poly = Number('0x04C11DB7');
    // const poly = 0x04C11DB7;
    let crc = -1;
    let reordered = [];

    for(let i=0;i<strLength/4;i++){
        for(let j=0;j<4;j++){
            reordered[4*i+3-j]=parseInt(strLowerCase.slice(2*j+8*i, 2*j+2+8*i),16);
        }
    }
    for(let i=0;i<strLength/8;i++){
        for (let j = 0; j < 4; j++)
        {
            crc = crc ^ (reordered[4*i+j] << 24);
            for (let bit = 0; bit < 8; bit++)
            {
                if (crc & (1 << 31)){
                    crc = (crc<<1) ^ poly;
                }            
                else{
                    crc = (crc << 1);
    
                }
            }
        }
    } 
   if(crc<0){
        console.log("original crc: ", crc);
        console.log("Two's complement: ",(~-crc+1>>>0).toString(2));
        console.log("Right Hex: ",(~-crc+1>>>0).toString(16));
        return (~-crc+1>>>0).toString(16);
    }
    console.log("original crc: ", crc);
    return crc.toString(16);
}
crc32("102400140101ffffffffffffffffffffffff800000");
module.exports.crc32 = crc32;
  