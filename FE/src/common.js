export function decodeData(data){
    const byteCharacters = atob(data);
    const byteArrays = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i);
    }
    let decoder = new TextDecoder("utf-8");
    return decoder.decode(byteArrays);
}