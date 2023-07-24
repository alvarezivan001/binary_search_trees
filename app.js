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
        //tempNode will keep track of the Node 
        // that has (value), to be deleted
        let prevNode = null;
        //prevNode will keep track of the Node BEFORE
        // Node(value), so as not to lose track of where 
        //deletion happened
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
        else{
            //since the Node seems to have 2 children now, we 
            //need to find inorder successor (is),  the inorder 
            //successor's right child, assign (is) to tempNode,
            //assign (is)'s right child to the left child of
            //(is)'s parent
            let inoSuccNode = tempNode.right;
            let inoSuccParent = tempNode;
            while(inoSuccNode.left != null)
            {
                inoSuccParent = inoSuccNode;
                inoSuccNode = inoSuccNode.left;
            }

            if(inoSuccParent == tempNode)
            {
                inoSuccParent.right = inoSuccNode.right;
                tempNode.data = inoSuccNode.data;
            }
            else
            {
                inoSuccParent.left = inoSuccNode.right;
                tempNode.data = inoSuccNode.data;
            }
            //may not account for root deletion
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

    levelOrder()
    {
        let queue = [];
        let arrayBFS = [];
        queue.push(this.root);

        while(queue.length != 0)
        {
                let tempNode = queue.shift();
                arrayBFS.push(tempNode.data);
                if(tempNode.left != null)
                {
                    queue.push(tempNode.left);
                }
                if(tempNode.right != null)
                {
                    queue.push(tempNode.right);
                }
        }

        return arrayBFS;
    }

    inOrder(){
        //will write recursion in the this function

        let arrayInO = [];
        let startingNode = this.root;

        function inOrderRecursion(node){
            if(node == null)
            {return;}
            inOrderRecursion(node.left);
            arrayInO.push(node.data);
            inOrderRecursion(node.right);
        }   

        inOrderRecursion(startingNode);

        return arrayInO;
    }
    preOrder()
    {
        let arrayPreO = [];
        let startingNode = this.root;

        function preOrderRecursion(node){
            if(node == null){
                return;
            }
            arrayPreO.push(node.data);
            preOrderRecursion(node.left);
            preOrderRecursion(node.right);
        }

        preOrderRecursion(startingNode);

        return arrayPreO;
    }
    postOrder()
    {
        let arrayPostO = [];
        function postOrderRecursion(node){
            if(node == null)
            {return;}
            postOrderRecursion(node.left);
            postOrderRecursion(node.right);
            arrayPostO.push(node.data);
        }

        postOrderRecursion(this.root);
        return arrayPostO;
    }

    height(node)
    {
        let hActual = 0;
        let h = 0;

        function heightRec(anode){

            if(anode == null){ 
                h--;
                if(hActual < h)
                {
                    hActual = h;
                }
                return;
            }
            else
            {
                ++h;
                heightRec(anode.left)
                heightRec(anode.right)
                --h;
                
            }

        }
        heightRec(node);

        return hActual;

    }
    depth(node){
        let foundNode = this.root;
        let d = 0;
        while(node.data != foundNode.data)
        {
            if(node.data < foundNode.data)
            {
                foundNode = foundNode.left;
                d++;
            }
            else if(node.data > foundNode.data)
            {
                foundNode = foundNode.right;
                d++;
            }
        }

        return d;
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

let newTree = new Tree([20,150,160,50,170,180,190,10,120,70,40,110,30,60,130,140,90,80,100]);


prettyPrint(newTree.root);


console.log();

// newTree.delete(130);

// prettyPrint(newTree.root);

// newTree.delete(140);
// newTree.delete(60);

// prettyPrint(newTree.root);


prettyPrint(newTree.root);
prettyPrint(newTree.root);

console.log(newTree.levelOrder());

prettyPrint(newTree.root);

console.log(newTree.postOrder());

prettyPrint(newTree.root);

// console.log(newTree.depth(newTree.root.left.right.left));

console.log(newTree.height(newTree.root.right));