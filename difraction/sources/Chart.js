let delta = -3;
let isPortableDevice = true;
let xCoord = [];
let Intens = [];




function update() {
    let lambda = Number(Lambda.value)*Math.pow(10, -9),
        n = Number(N.value),
        I0 = Number(I.value),
        aWidth = Number(A.value)*Math.pow(10, -6),
        bWidth = Number(B.value)*Math.pow(10, -6),
        d = Number(aWidth)+Number(bWidth),
        l = Number(L.value)/10,
        count = -496, multiplyer = -count;
    let ctx = Grad.getContext("2d");
    if (delta < 0) {
        for (let x = -displayWidth/2; x <= displayWidth/2; x+=displayWidth/991) {
            if (Idifr(sinfi(x))  > delta) delta =  Idifr(sinfi(x));
        }
    }
    I0 = I0/delta;
    /**
     * @return {number}
     */
    function Idifr(sinfi) {
        let u = Math.PI*(aWidth)*(sinfi)/lambda;

        return I0*Math.pow(sin(u)/u, 2);
    }
    /**
     * @return {number}
     */
    function Iinter(sinfi) {
        let delta = Math.PI*(d)*(sinfi)/lambda;
        return Math.pow(sin(n*delta)/sin(delta), 2);
    }
    /**
     * @return {number}
     */
    function Ifi(sinfi) {
        return Idifr(sinfi)*Iinter(sinfi);
    }
    function sinfi(x) {
        return x/Math.sqrt((Math.pow(x, 2) + Math.pow(l, 2)))
    }

    let Imax = Ifi(1.1054525350662203e-14);

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0,0,1000,500);
    base_image = new Image();
    base_image.src = 'sources/company_logo.png';
    base_image.style = 'opacity: 0.3;'
    ctx.lineWidth = 1;


    for (let x = -displayWidth/2; x <= displayWidth/2; x+=displayWidth/(2*991)) {
        ctx.strokeStyle = ''+wavelengthToColor(Lambda.value, Ifi(sinfi(x))/Imax);
        ctx.beginPath();
        ctx.moveTo(count+multiplyer, 0);
        ctx.lineTo((count+=0.5)+multiplyer, 500);
        ctx.stroke();
    }
    ctx.globalAlpha = 0.05
    ctx.drawImage(base_image, 330, 100);
    ctx.globalAlpha = 1
}

N.onmousemove = function() {
    isPortableDevice = false;
    if(N.value==='50'){
        console.log('ANANAS')
        document.getElementById("labelN").innerHTML = '<a href="http://kot.spb.ru/">Количество щелей: ' + N.value +'</a>';
    }else{
        document.getElementById("labelN").innerText = "Количество щелей: " + N.value;
    }
    update();
};

Lambda.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelLambda").innerText = "длина волны: " + Lambda.value + "нм";
    delta = -3;
    update();
};

A.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelA").innerText = "Ширина щели: " + A.value + "мкм";
    delta = -3;
    update();
};

B.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelB").innerText = "Расстояние между краями соседних щелей: " + B.value + "мкм";
    delta = -3;
    update();
};

I.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelI").innerText = "Интенсивность в центре: " + I.value;
    delta = -3;
    update();
};

L.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelL").innerText = `Расстояние от решетки до экрана: ${L.value/10}м`;
    update();
};

N.onchange = function() {
    if (!isPortableDevice) return;
    document.getElementById("labelN").innerText = "Количество щелей: " + N.value;
    update();
};

Lambda.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelLambda").innerText = "длина волны: " + Lambda.value + "нм";
    delta = -3;
    update();
};

A.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelA").innerText = "Ширина щели: " + A.value + "мкм";
    delta = -3;
    update();
};

B.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelB").innerText = "Расстояние между краями соседних щелей: " + B.value + "мкм";
    delta = -3;
    update();
};

I.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelI").innerText = "Интенсивность в центре: " + I.value;
    delta = -3;
    update();
};

L.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelL").innerText = `Расстояние от решетки до экрана: ${L.value/10}м`;
    update();
};

window.onload = function () {
    update();
};