function showHello(divName: string, name: string) {
    const elt: any = document.getElementById(divName);
    elt.innerText = "Hello TypeScript";
}

setTimeout(() => {
    showHello("greeting", "TypeScript");
}, 500);
