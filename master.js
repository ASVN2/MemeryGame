document.querySelector(".control-buttons span").addEventListener("click", () => {
  const pName = document.querySelector("input");
  if (pName.value == null || pName.value == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = pName.value;
  }

  document.querySelector(".control-buttons").classList.add("remove");
  // remove the background input name
  setTimeout(() => {
    document.querySelector(".control-buttons").remove();
  }, 500);
});

const duration = 500;

// Selct blocks
const blocksCounter = document.querySelector(".memory-game-blocks");
// Create  array from blocks
const blocks = Array.from(blocksCounter.children);
// Create Range Of Keys
const oderRange = [...Array(blocks.length).keys()];
// add order to element
shuffle(oderRange);

blocks.forEach((block, index) => {
  // flib the card

  block.style.order = oderRange[index];
  // flib on  the click
  block.addEventListener("click", function () {
    flibBlock(block);
  });
});

function shuffle(array) {
  //setting

  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get random number
    random = Math.floor(Math.random() * current);

    // Decrease length by one
    current--;

    // save current in stash
    temp = array[current];

    // current element = random element
    array[current] = array[random];

    //random element = get emement from stash
    array[random] = temp;
  }
}

function flibBlock(selectedBlock) {
  selectedBlock.classList.add("flib");
  // document.getElementById("switch").play();

  // collect all flipped cardss
  let allFlippedBlocks = blocks.filter((flibBlock) => flibBlock.classList.contains("flib"));

  // if there's 2 sected flib card

  if (allFlippedBlocks.length === 2) {
    // stop clicking funtion

    stopClicking();
    // check matching function
    matchingBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  // add class no cliking on main container
  blocksCounter.classList.add("no-clicking");

  setTimeout(() => {
    // remove class no cliking
    blocksCounter.classList.remove("no-clicking");
  }, duration);
}

// match the blocks
function matchingBlock(one, two) {
  let triesElent = document.querySelector(".tries span");
  let rightElent = document.querySelector(".right span");
  if (one.dataset.game === two.dataset.game) {
    rightElent.innerHTML = parseInt(rightElent.innerHTML) + 1;
    one.classList.remove("flib");
    two.classList.remove("flib");
    one.classList.add("match");
    two.classList.add("match");
    setTimeout(() => {
      document.getElementById("success").play();
    }, duration - 200);
  } else {
    triesElent.innerHTML = parseInt(triesElent.innerHTML) + 1;
    setTimeout(() => {
      // remove class flib
      one.classList.remove("flib");
      two.classList.remove("flib");
      document.getElementById("wrong").play();
    }, duration);
  }
}
