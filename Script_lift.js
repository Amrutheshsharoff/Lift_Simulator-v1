var container = document.getElementById("container");
let floorsEnter = false;
const map = new Map();
let arr;
let queue = [];
let canGo = true;
let working = 0;
let totalLifts;
var left;
let prev = -1;

document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        clicked();
    }
});

const clicked = () => {
    floors = 3;
    lifts = 1;





    totalLifts = lifts;


    createLifts(lifts);
    createFloors(floors);

    return;
}

const createFloors = (floors) => {
    var container = document.getElementById("container");
    for (let i = 0; i < floors; i++) {
        var div = document.createElement('div');
        div.classList.add('floor');
        div.innerHTML = `<div class="t" id="${floors-i}" onclick="buttonClicked(event)">${floors-i} Floor</div>`;

        container.appendChild(div);
    }
    container.style.borderBottom = 'solid 5px black';
}

const createLifts = (lifts) => {
    var container = document.getElementById("container");
    left = 100;
    arr = [];

    for (let i = 1; i <= lifts; i++) {
        var lift = document.createElement('div');

        lift.classList.add('lift');
        let liftId = `${i}-lift`;
        lift.setAttribute('id', liftId);
        left += 100;
        lift.style.left = `${left}px`;
        map.set(liftId, 1);
        arr.push(true);
        lift.innerHTML = `
            <div class="doors ${liftId}"></div>
            <div class="doors ${liftId}"></div>
        `;
        container.appendChild(lift);
    }


}

const buttonClicked = (e) => {
    let clickedFloor = Number(e.target.id);
    console.log(clickedFloor);


    if (prev != clickedFloor) {
        queue.push(clickedFloor);
    }

    prev = clickedFloor;
    console.log(queue);

    if ((queue.length == 1 && canGo) || (totalLifts != working)) {
        canGo = false;
        execution(queue.shift());
    }
}

const execution = (clickedFloor) => {

    console.log(queue);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == true) {
            arr[i] = false;
            working++;
            let liftId = `${i+1}-lift`;
            liftCurrFloor = map.get(liftId);
            let diff = liftCurrFloor - clickedFloor;
            let time = Math.abs(diff) * 2000;
            var target = (clickedFloor - 1) * -200;
            map.set(liftId, clickedFloor);

            moveLift(target, i + 1, time);
            break;
        }

    }
    console.log(arr);
}

const moveLift = (targetPos, currLiftNumber, time) => {
    let currLiftId = `${currLiftNumber}-lift`;
    var lift = document.getElementById(currLiftId);
    var doors = document.getElementsByClassName(currLiftId);

    //Moving to Called Floor (up/down)
    lift.style.transition = `transform ${time/1000}s linear`;
    lift.style.transform = `translateY(${targetPos}px)`;

    //Opening Doors
    setTimeout(() => {
        doors[0].style.transform = 'translateX(-100%)';
        doors[1].style.transform = 'translateX(100%)';
    }, time + 1000);


    // Closing Doors
    setTimeout(() => {
        doors[0].style.transform = 'none';
        doors[1].style.transform = 'none';
    }, time + 4000);

    setTimeout(() => {
        arr[currLiftNumber - 1] = true;
        canGo = true;
        working--;

        console.log(queue);
        if (queue.length) {
            execution(queue.shift());
        }
    }, time + 8000);
}