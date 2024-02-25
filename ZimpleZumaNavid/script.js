"use strict";

const linkedlist = new LinkedList();

function randomBall() {
  const listOfBalls = ["🔴", "🔵", "🟡", "🟢"];
  return listOfBalls[Math.floor(Math.random() * listOfBalls.length)];
}

function addRandomBallToEndOfList() {
  const randomBallToLast = randomBall();
  linkedlist.addLast(randomBallToLast);
}

function createRandomList() {
  linkedlist.clear(); // Clear the list before generating a new one
  while (linkedlist.size < 8) {
    const ball = randomBall();
    linkedlist.addLast(ball);
  }
  linkedlist.dump(); // Display the generated list
}

function printList() {
  linkedlist.dump();
}

const button = document.getElementById("addRandomBallButton");
button.addEventListener("click", addRandomBallToEndOfList);

const createRandomListButton = document.getElementById(
  "generateRandomBallList"
);
createRandomListButton.addEventListener("click", createRandomList);

const printListButton = document.getElementById("dumpList");
printListButton.addEventListener("click", printList);

// Display the initial empty list
linkedlist.dumpList();
