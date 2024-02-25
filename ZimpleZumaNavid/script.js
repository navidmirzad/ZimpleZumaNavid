"use strict";

const linkedlist = new LinkedList();

function randomBall() {
  const listOfBalls = ["🔴", "🔵", "🟡", "🟢"];
  return listOfBalls[Math.floor(Math.random() * listOfBalls.length)];
}

function addRandomBallToEndOfList() {
  const randomBallToLast = randomBall();
  linkedlist.addLast(randomBallToLast);
  linkedlist.dump();
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

// doesn't work > need to figure out how to save a random ball in a button > then insert it into the given index position
function insertBallAfterIndex(index, nodeData) {
  ll.insertAfter(index, nodeData);
}

// create function that removes the colored balls if there is 3 or more in a row (does so by checking before and after current node)
function ThreeOrMoreBalls() {
  return;
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
