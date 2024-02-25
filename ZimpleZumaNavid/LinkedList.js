"use strict";

class Node {
  constructor(prev, next, nodeData) {
    this.nodeData = nodeData;
    this.prev = prev;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  dumpList() {
    let currentNode = this.head;
    while (currentNode != null) {
      console.log(`
            node: ${currentNode.nodeData}
            -----------
            prev: ${currentNode.prev ? currentNode.prev.nodeData : "undefined"}
            next: ${currentNode.next ? currentNode.next.nodeData : "undefined"}
            `);
      // find next node
      currentNode = currentNode.next;
    }
  }

  dump() {
    let node = this.head;
    let output = "";
    while (node != null) {
      output += '"' + node.nodeData + '"';
      output += " -> ";

      node = node.next;
    }
    output += "null";
    console.log(output);
  }

  addLast(nodeData) {
    const newNode = new Node(null, null, nodeData);

    if (!this.head) {
      // If the list is empty, set both head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, find the current last node and update its next pointer
      this.tail.next = newNode;
      // Update the previous pointer of the new node to point to the current tail
      newNode.prev = this.tail;
      // Update the tail pointer to the new node
      this.tail = newNode;
    }

    // Increase the size of the list
    this.size++;
  }

  addFirst(nodeData) {
    const newNode = new Node(null, this.head, nodeData); // Set prev to null and next to the current head

    if (!this.head) {
      // If the list is empty, set both head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, set the prev pointer of the current head to the new node
      this.head.prev = newNode;
      // Update the head pointer to the new node
      this.head = newNode;
    }
    // Increase the size of the list
    this.size++;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  get(index) {
    if (index < 0 || index >= this.size) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.nodeData;
  }

  indexOf(nodeData) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.nodeData === nodeData) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  insertAfter(index, nodeData) {
    if (index < 0 || index >= this.size) return;
    const newNode = new Node(null, null, nodeData);
    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    newNode.next = current.next;
    newNode.prev = current;
    current.next = newNode;

    if (current === this.tail) {
      this.tail = newNode;
    } else {
      newNode.next.prev = newNode;
    }

    this.size++;
  }

  insertBefore(index, nodeData) {
    if (index <= 0) {
      this.addFirst(nodeData);
    } else if (index >= this.size) {
      this.addLast(nodeData);
    } else {
      const newNode = new Node(nodeData);
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
      this.size++;
    }
  }

  first() {
    return this.head ? this.head.nodeData : null;
  }

  last() {
    return this.tail ? this.tail.nodeData : null;
  }

  removeAtIndex(index) {
    if (index < 0 || index >= this.size) return null;
    let current = this.head;
    let previous = null;

    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;
    }

    if (current === this.head) {
      // If removing the head node
      this.head = current.next;
      if (!this.head) {
        // If the list had only one node, also update the tail
        this.tail = null;
      } else {
        // Update the previous pointer of the new head to null
        this.head.prev = null;
      }
    } else if (current === this.tail) {
      // If removing the tail node
      previous.next = null;
      this.tail = previous;
    } else {
      // If removing a node in between
      previous.next = current.next;
      current.next.prev = previous; // Update the previous pointer of the next node
    }

    this.size--;
    return current.nodeData;
  }

  removeFirst() {
    if (!this.head) return null; // If the list is empty, return null
    const nodeData = this.head.nodeData; // Save the data of the current head node

    // Update the head pointer to the next node
    this.head = this.head.next;
    if (this.head) {
      // If the new head exists, set its prev pointer to null
      this.head.prev = null;
    } else {
      // If the new head doesn't exist, set the tail to null
      this.tail = null;
    }
    // Decrease the size of the list
    this.size--;
    return nodeData; // Return the data of the removed node
  }

  removeLast() {
    if (!this.head) return null;

    let current = this.head;
    let previous = null;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    const nodeData = current.nodeData;
    if (current === this.head) {
      this.head = current.next;
      if (!this.head) {
        // If the list had only one node, also update the tail
        this.tail = null;
      } else {
        // Update the previous pointer of the new head to null
        this.head.prev = null;
      }
    } else if (current === this.tail) {
      // If removing the tail node
      previous.next = null;
      this.tail = previous;
    } else {
      // If removing a node in between
      previous.next = current.next;
      current.next.prev = previous; // Update the previous pointer of the next node
    }
    this.size--;
    return nodeData;
  }

  getNodeByData(data) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.nodeData === data) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null; // Node with specified data not found
  }

  swapNodes(nodeAData, nodeBData) {
    // Retrieve nodeA and nodeB references using getNodeByData method
    const nodeA = this.getNodeByData(nodeAData);
    const nodeB = this.getNodeByData(nodeBData);

    // Check if nodeA and nodeB are found
    if (!nodeA || !nodeB) {
      console.log("One or both nodes not found in the linked list.");
      return;
    }

    if (nodeA === nodeB) return;

    // Search for nodeA (keep track of prevNodeA and currNodeA)
    let prevNodeA = null;
    let currNodeA = this.head;
    while (currNodeA !== null && currNodeA !== nodeA) {
      prevNodeA = currNodeA;
      currNodeA = currNodeA.next;
    }

    // Search for nodeB (keep track of prevNodeB and currNodeB)
    let prevNodeB = null;
    let currNodeB = this.head;
    while (currNodeB !== null && currNodeB !== nodeB) {
      prevNodeB = currNodeB;
      currNodeB = currNodeB.next;
    }

    // If either nodeA or nodeB is not present, nothing to do
    if (currNodeA === null || currNodeB === null) return;

    // If nodeA is not head of linked list
    if (prevNodeA !== null) prevNodeA.next = currNodeB;
    // make nodeB the new head
    else this.head = currNodeB;

    // If nodeB is not head of linked list
    if (prevNodeB !== null) prevNodeB.next = currNodeA;
    // make nodeA the new head
    else this.head = currNodeA;

    // Swap next pointers
    let temp = currNodeA.next;
    currNodeA.next = currNodeB.next;
    currNodeB.next = temp;

    // Update prev pointers if nodes are adjacent
    if (currNodeA.next !== null) currNodeA.next.prev = currNodeA;
    if (currNodeB.next !== null) currNodeB.next.prev = currNodeB;

    // Update prev pointers of nodeA and nodeB
    temp = currNodeA.prev;
    currNodeA.prev = currNodeB.prev;
    currNodeB.prev = temp;

    // Update tail pointer if necessary
    if (this.tail === currNodeA) this.tail = currNodeB;
    else if (this.tail === currNodeB) this.tail = currNodeA;
  }
}

/* const ll = new LinkedList();
ll.addLast("1");
ll.addLast("2");
ll.addLast("3");
ll.addLast("4");
ll.addLast("5");

console.log("Original linked list: ");
ll.dumpList();
 */