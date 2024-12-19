function help(params) {
    console.warn('ct(арг) - console.table(aрг)');
    console.warn('cl(арг) - console.log(aрг)');
    console.warn('ipp() - console.table(multiDimensionalArray) - c айпи и портами');
    console.warn('nip() - console.table(modifiedArray) - без айпи и портов');
    
}

function ct(arg) {
    console.table(arg);
}
function cl(arg) {
    console.log(arg);
}
function ipp() {
    console.table(multiDimensionalArray);
}
function nip() {
    console.table(modifiedArray);
}