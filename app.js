class Node {  
    constructor(data = null, left = null, right = null){
        this. data = data;
        this.left = left;
        this.right = right;
    }

    print(){
        console.log(this.data + " " + this.left+ " " + this.right);
    }
}

class Tree {

    constructor(arr) {
        this.root = buildTree(arr);
    }

    insert(value){
        let startNode = this.root;
        let prevNode = null;
        do{
            if(startNode.data > value){
                prevNode = startNode;
                startNode = startNode.left;
            }
            else if(startNode.data < value)
            {
                prevNode = startNode;
                startNode = startNode.right;
            }
        }while(startNode != null)

        let insertNode = new Node(value);
        if(prevNode.data > value){prevNode.left = insertNode;}
        else if(prevNode.data < value){prevNode.right = insertNode;}
    }

    delete(value){
        let tempNode = this.root;
        let prevNode = null;
        let isValue = value;
        while(isValue != tempNode.data){
            if(isValue < tempNode.data){
                prevNode = tempNode;
                tempNode = tempNode.left;
            }
            else{
                prevNode = tempNode;
                tempNode = tempNode.right;
            }
        }
        if(tempNode.left == null && tempNode.right == null)
        {
            if(prevNode.left.data == tempNode.data)
            {
                prevNode.left = null;
            }
            else
            {
                prevNode.right = null;
            }
        }
        else if(tempNode.right == null)
        {
            if(prevNode.left == tempNode)
            {
                prevNode.left = tempNode.left;
            }
            else
            {
                prevNode.right = tempNode.left;
            }
        }
        else if(tempNode.left == null)
        {   
            if(prevNode.right == tempNode)
            {
                prevNode.right = tempNode.right;
            }
            else
            {
                prevNode.left = tempNode.right;
            }
        }    

    }

    find(value){

        let foundNode = this.root;
        let isValue = value;
        while(isValue != foundNode.data){
            
            if(isValue < foundNode.data)
            {
                foundNode = foundNode.left;
            }
            else{
                foundNode = foundNode.right;
            }
        }

        return foundNode;
    }
}

function buildTree(arr) {
    
    let setArr = [...new Set(arr)];
    let uniqueArr = Array.from(setArr);
    uniqueArr.sort((a,b) => a-b);


    let startNode = treeRec(uniqueArr);
    //left treeRec, recursive function, outisde of buidTree

    // function treeRec(arr2){
    // }

    return startNode;
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


function treeRec(arr2){

    let newNode = new Node();

    if(arr2 == null)
    {
        console.log("returning null");
        return null;
    }
    else if(arr2.length == 1)
    {
        console.log("returning a value");
        return new Node(arr2[0]);
    }
    else{
        console.log("halfing");
        let half = arr2.length/2;
        half = Math.floor(half);  
        
        let newNode = new Node(arr2[half]);
        console.log(arr2[half]);
        console.log(newNode);
        let leftarr2 = null;
        let rightarr2 = null;
        if(half > 0) {
            leftarr2 = arr2.slice(0,half); 
            console.log(arr2.slice(0,half)); }
        if(half < arr2.length - 1){
            rightarr2 = arr2.slice(half+1, arr2.length);
            console.log(arr2.slice(half+1, arr2.length));
        }
        newNode.right = treeRec(rightarr2);
        newNode.left = treeRec(leftarr2);
        
        console.log(newNode);
        return newNode;
    }
    return newNode;
}

let newTree = new Tree([20,10,120,70,40,110,30,60,130,140,90,80,100]);


prettyPrint(newTree.root);


console.log();

newTree.delete(130);

prettyPrint(newTree.root);

newTree.delete(140);
newTree.delete(60);

prettyPrint(newTree.root);