console.log("Reggie extension is running on this page.");

//#region 
// document.onreadystatechange = () => {
//     console.log("ready state change");
//     console.log(`readystate is: ${document.readyState}`);

// }

// window.onload = () => {
//     console.log("Onload event fired!");
// }

// for (i = 0; i < 10; i++) {
//     console.log(`Hello ${i}`);
// }

// console.log(window.location.hash);
//#endregion

function main() {
    if (window.location.hash.startsWith("#/planDetails")) {
        console.log("We have navigated to the plan page!");
        window.alert("We are on the view plan page!");
    }
}

if (window.location.hash.startsWith("#/planDetails")) {
    console.log("We are on the plan page!");
    // window.alert();
}
// window.addEventListener("click", ()=>{
//     main();
//     console.log(`Current fragment is ${window.location.hash}`);
// });
var previousHash = window.location.hash;
window.addEventListener("hashchange", function () {
    console.log("The fragment has changed!");
    console.log(`current fragment is: ${window.location.hash}`);
    main();
});

// Use MutationObserver to watch for the grad plan semesters to show up.
function mutationCallback(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.matches('.semester-container.with-credits')) {
                    console.log('semester loaded!');
                    // Perform actions on the new post
                }
            });
        }
    }
}

// const targetNode = document.querySelector('.posts-container');
const targetNode = document.querySelector('div.lcontainer');
const config = { childList: true, subtree: true };
const observer = new MutationObserver(mutationCallback);
observer.observe(targetNode, config);