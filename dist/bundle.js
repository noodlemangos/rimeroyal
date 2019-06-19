(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
var arrays = require("./arrays");
var LinkedList = /** @class */ (function () {
    /**
    * Creates an empty Linked List.
    * @class A linked list is a data structure consisting of a group of nodes
    * which together represent a sequence.
    * @constructor
    */
    function LinkedList() {
        /**
        * First node in the list
        * @type {Object}
        * @private
        */
        this.firstNode = null;
        /**
        * Last node in the list
        * @type {Object}
        * @private
        */
        this.lastNode = null;
        /**
        * Number of elements in the list
        * @type {number}
        * @private
        */
        this.nElements = 0;
    }
    /**
    * Adds an element to this list.
    * @param {Object} item element to be added.
    * @param {number=} index optional index to add the element. If no index is specified
    * the element is added to the end of this list.
    * @return {boolean} true if the element was added or false if the index is invalid
    * or if the element is undefined.
    */
    LinkedList.prototype.add = function (item, index) {
        if (util.isUndefined(index)) {
            index = this.nElements;
        }
        if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
        }
        var newNode = this.createNode(item);
        if (this.nElements === 0 || this.lastNode === null) {
            // First node in the list.
            this.firstNode = newNode;
            this.lastNode = newNode;
        }
        else if (index === this.nElements) {
            // Insert at the end.
            this.lastNode.next = newNode;
            this.lastNode = newNode;
        }
        else if (index === 0) {
            // Change first node.
            newNode.next = this.firstNode;
            this.firstNode = newNode;
        }
        else {
            var prev = this.nodeAtIndex(index - 1);
            if (prev == null) {
                return false;
            }
            newNode.next = prev.next;
            prev.next = newNode;
        }
        this.nElements++;
        return true;
    };
    /**
    * Returns the first element in this list.
    * @return {*} the first element of the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.first = function () {
        if (this.firstNode !== null) {
            return this.firstNode.element;
        }
        return undefined;
    };
    /**
    * Returns the last element in this list.
    * @return {*} the last element in the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.last = function () {
        if (this.lastNode !== null) {
            return this.lastNode.element;
        }
        return undefined;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index desired index.
     * @return {*} the element at the given index or undefined if the index is
     * out of bounds.
     */
    LinkedList.prototype.elementAtIndex = function (index) {
        var node = this.nodeAtIndex(index);
        if (node === null) {
            return undefined;
        }
        return node.element;
    };
    /**
     * Returns the index in this list of the first occurrence of the
     * specified element, or -1 if the List does not contain this element.
     * <p>If the elements inside this list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {number} the index in this list of the first occurrence
     * of the specified element, or -1 if this list does not contain the
     * element.
     */
    LinkedList.prototype.indexOf = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (util.isUndefined(item)) {
            return -1;
        }
        var currentNode = this.firstNode;
        var index = 0;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }
        return -1;
    };
    /**
       * Returns true if this list contains the specified element.
       * <p>If the elements inside the list are
       * not comparable with the === operator a custom equals function should be
       * provided to perform searches, the function must receive two arguments and
       * return true if they are equal, false otherwise. Example:</p>
       *
       * <pre>
       * const petsAreEqualByName = function(pet1, pet2) {
       *  return pet1.name === pet2.name;
       * }
       * </pre>
       * @param {Object} item element to search for.
       * @param {function(Object,Object):boolean=} equalsFunction Optional
       * function used to check if two elements are equal.
       * @return {boolean} true if this list contains the specified element, false
       * otherwise.
       */
    LinkedList.prototype.contains = function (item, equalsFunction) {
        return (this.indexOf(item, equalsFunction) >= 0);
    };
    /**
     * Removes the first occurrence of the specified element in this list.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to be removed from this list, if present.
     * @return {boolean} true if the list contained the specified element.
     */
    LinkedList.prototype.remove = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }
        var previous = null;
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                if (previous == null) {
                    this.firstNode = currentNode.next;
                    if (currentNode === this.lastNode) {
                        this.lastNode = null;
                    }
                }
                else if (currentNode === this.lastNode) {
                    this.lastNode = previous;
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                else {
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                this.nElements--;
                return true;
            }
            previous = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    };
    /**
     * Removes all of the elements from this list.
     */
    LinkedList.prototype.clear = function () {
        this.firstNode = null;
        this.lastNode = null;
        this.nElements = 0;
    };
    /**
     * Returns true if this list is equal to the given list.
     * Two lists are equal if they have the same elements in the same order.
     * @param {LinkedList} other the other list.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function used to check if two elements are equal. If the elements in the lists
     * are custom objects you should provide a function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} true if this list is equal to the given list.
     */
    LinkedList.prototype.equals = function (other, equalsFunction) {
        var eqF = equalsFunction || util.defaultEquals;
        if (!(other instanceof LinkedList)) {
            return false;
        }
        if (this.size() !== other.size()) {
            return false;
        }
        return this.equalsAux(this.firstNode, other.firstNode, eqF);
    };
    /**
    * @private
    */
    LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
        while (n1 !== null && n2 !== null) {
            if (!eqF(n1.element, n2.element)) {
                return false;
            }
            n1 = n1.next;
            n2 = n2.next;
        }
        return true;
    };
    /**
     * Removes the element at the specified position in this list.
     * @param {number} index given index.
     * @return {*} removed element or undefined if the index is out of bounds.
     */
    LinkedList.prototype.removeElementAtIndex = function (index) {
        if (index < 0 || index >= this.nElements || this.firstNode === null || this.lastNode === null) {
            return undefined;
        }
        var element;
        if (this.nElements === 1) {
            //First node in the list.
            element = this.firstNode.element;
            this.firstNode = null;
            this.lastNode = null;
        }
        else {
            var previous = this.nodeAtIndex(index - 1);
            if (previous === null) {
                element = this.firstNode.element;
                this.firstNode = this.firstNode.next;
            }
            else if (previous.next === this.lastNode) {
                element = this.lastNode.element;
                this.lastNode = previous;
            }
            if (previous !== null && previous.next !== null) {
                element = previous.next.element;
                previous.next = previous.next.next;
            }
        }
        this.nElements--;
        return element;
    };
    /**
     * Executes the provided function once for each element present in this list in order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    LinkedList.prototype.forEach = function (callback) {
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (callback(currentNode.element) === false) {
                break;
            }
            currentNode = currentNode.next;
        }
    };
    /**
     * Reverses the order of the elements in this linked list (makes the last
     * element first, and the first element last).
     */
    LinkedList.prototype.reverse = function () {
        var previous = null;
        var current = this.firstNode;
        var temp = null;
        while (current !== null) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
        }
        temp = this.firstNode;
        this.firstNode = this.lastNode;
        this.lastNode = temp;
    };
    /**
     * Returns an array containing all of the elements in this list in proper
     * sequence.
     * @return {Array.<*>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    LinkedList.prototype.toArray = function () {
        var array = [];
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            array.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return array;
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list.
     */
    LinkedList.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements.
     */
    LinkedList.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    LinkedList.prototype.toString = function () {
        return arrays.toString(this.toArray());
    };
    /**
     * @private
     */
    LinkedList.prototype.nodeAtIndex = function (index) {
        if (index < 0 || index >= this.nElements) {
            return null;
        }
        if (index === (this.nElements - 1)) {
            return this.lastNode;
        }
        var node = this.firstNode;
        for (var i = 0; i < index && node != null; i++) {
            node = node.next;
        }
        return node;
    };
    /**
     * @private
     */
    LinkedList.prototype.createNode = function (item) {
        return {
            element: item,
            next: null
        };
    };
    return LinkedList;
}()); // End of linked list
exports.default = LinkedList;

},{"./arrays":3,"./util":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList_1 = require("./LinkedList");
var Queue = /** @class */ (function () {
    /**
     * Creates an empty queue.
     * @class A queue is a First-In-First-Out (FIFO) data structure, the first
     * element added to the queue will be the first one to be removed. This
     * implementation uses a linked list as a container.
     * @constructor
     */
    function Queue() {
        this.list = new LinkedList_1.default();
    }
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.enqueue = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.add = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Retrieves and removes the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.dequeue = function () {
        if (this.list.size() !== 0) {
            var el = this.list.first();
            this.list.removeElementAtIndex(0);
            return el;
        }
        return undefined;
    };
    /**
     * Retrieves, but does not remove, the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.peek = function () {
        if (this.list.size() !== 0) {
            return this.list.first();
        }
        return undefined;
    };
    /**
     * Returns the number of elements in this queue.
     * @return {number} the number of elements in this queue.
     */
    Queue.prototype.size = function () {
        return this.list.size();
    };
    /**
     * Returns true if this queue contains the specified element.
     * <p>If the elements inside this stack are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName (pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function to check if two elements are equal.
     * @return {boolean} true if this queue contains the specified element,
     * false otherwise.
     */
    Queue.prototype.contains = function (elem, equalsFunction) {
        return this.list.contains(elem, equalsFunction);
    };
    /**
     * Checks if this queue is empty.
     * @return {boolean} true if and only if this queue contains no items; false
     * otherwise.
     */
    Queue.prototype.isEmpty = function () {
        return this.list.size() <= 0;
    };
    /**
     * Removes all of the elements from this queue.
     */
    Queue.prototype.clear = function () {
        this.list.clear();
    };
    /**
     * Executes the provided function once for each element present in this queue in
     * FIFO order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Queue.prototype.forEach = function (callback) {
        this.list.forEach(callback);
    };
    return Queue;
}()); // End of queue
exports.default = Queue;

},{"./LinkedList":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
/**
 * Returns the position of the first occurrence of the specified item
 * within the specified array.4
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the first occurrence of the specified element
 * within the specified array, or -1 if not found.
 */
function indexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
/**
 * Returns the position of the last occurrence of the specified element
 * within the specified array.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the last occurrence of the specified element
 * within the specified array or -1 if not found.
 */
function lastIndexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.lastIndexOf = lastIndexOf;
/**
 * Returns true if the specified array contains the specified element.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the specified array contains the specified element.
 */
function contains(array, item, equalsFunction) {
    return indexOf(array, item, equalsFunction) >= 0;
}
exports.contains = contains;
/**
 * Removes the first ocurrence of the specified element from the specified array.
 * @param {*} array the array in which to search element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the array changed after this call.
 */
function remove(array, item, equalsFunction) {
    var index = indexOf(array, item, equalsFunction);
    if (index < 0) {
        return false;
    }
    array.splice(index, 1);
    return true;
}
exports.remove = remove;
/**
 * Returns the number of elements in the specified array equal
 * to the specified object.
 * @param {Array} array the array in which to determine the frequency of the element.
 * @param {Object} item the element whose frequency is to be determined.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the number of elements in the specified array
 * equal to the specified object.
 */
function frequency(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    var freq = 0;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            freq++;
        }
    }
    return freq;
}
exports.frequency = frequency;
/**
 * Returns true if the two specified arrays are equal to one another.
 * Two arrays are considered equal if both arrays contain the same number
 * of elements, and all corresponding pairs of elements in the two
 * arrays are equal and are in the same order.
 * @param {Array} array1 one array to be tested for equality.
 * @param {Array} array2 the other array to be tested for equality.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between elemements in the arrays.
 * @return {boolean} true if the two arrays are equal
 */
function equals(array1, array2, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    if (array1.length !== array2.length) {
        return false;
    }
    var length = array1.length;
    for (var i = 0; i < length; i++) {
        if (!equals(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
/**
 * Returns shallow a copy of the specified array.
 * @param {*} array the array to copy.
 * @return {Array} a copy of the specified array
 */
function copy(array) {
    return array.concat();
}
exports.copy = copy;
/**
 * Swaps the elements at the specified positions in the specified array.
 * @param {Array} array The array in which to swap elements.
 * @param {number} i the index of one element to be swapped.
 * @param {number} j the index of the other element to be swapped.
 * @return {boolean} true if the array is defined and the indexes are valid.
 */
function swap(array, i, j) {
    if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
        return false;
    }
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return true;
}
exports.swap = swap;
function toString(array) {
    return '[' + array.toString() + ']';
}
exports.toString = toString;
/**
 * Executes the provided function once for each element present in this array
 * starting from index 0 to length - 1.
 * @param {Array} array The array in which to iterate.
 * @param {function(Object):*} callback function to execute, it is
 * invoked with one argument: the element value, to break the iteration you can
 * optionally return false.
 */
function forEach(array, callback) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var ele = array_1[_i];
        if (callback(ele) === false) {
            return;
        }
    }
}
exports.forEach = forEach;

},{"./util":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _hasOwnProperty = Object.prototype.hasOwnProperty;
exports.has = function (obj, prop) {
    return _hasOwnProperty.call(obj, prop);
};
/**
 * Default function to compare element order.
 * @function
 */
function defaultCompare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}
exports.defaultCompare = defaultCompare;
/**
 * Default function to test equality.
 * @function
 */
function defaultEquals(a, b) {
    return a === b;
}
exports.defaultEquals = defaultEquals;
/**
 * Default function to convert an object to a string.
 * @function
 */
function defaultToString(item) {
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return '$s' + item;
    }
    else {
        return '$o' + item.toString();
    }
}
exports.defaultToString = defaultToString;
/**
* Joins all the properies of the object using the provided join string
*/
function makeString(item, join) {
    if (join === void 0) { join = ','; }
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return item.toString();
    }
    else {
        var toret = '{';
        var first = true;
        for (var prop in item) {
            if (exports.has(item, prop)) {
                if (first) {
                    first = false;
                }
                else {
                    toret = toret + join;
                }
                toret = toret + prop + ':' + item[prop];
            }
        }
        return toret + '}';
    }
}
exports.makeString = makeString;
/**
 * Checks if the given argument is a function.
 * @function
 */
function isFunction(func) {
    return (typeof func) === 'function';
}
exports.isFunction = isFunction;
/**
 * Checks if the given argument is undefined.
 * @function
 */
function isUndefined(obj) {
    return (typeof obj) === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * Checks if the given argument is a string.
 * @function
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
exports.isString = isString;
/**
 * Reverses a compare function.
 * @function
 */
function reverseCompareFunction(compareFunction) {
    if (isUndefined(compareFunction) || !isFunction(compareFunction)) {
        return function (a, b) {
            if (a < b) {
                return 1;
            }
            else if (a === b) {
                return 0;
            }
            else {
                return -1;
            }
        };
    }
    else {
        return function (d, v) {
            return compareFunction(d, v) * -1;
        };
    }
}
exports.reverseCompareFunction = reverseCompareFunction;
/**
 * Returns an equal function given a compare function.
 * @function
 */
function compareToEquals(compareFunction) {
    return function (a, b) {
        return compareFunction(a, b) === 0;
    };
}
exports.compareToEquals = compareToEquals;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scripting_1 = require("./scripting");
//require("./scripting.ts");
var roster = []; //list of characters
var mission_board = []; //list of missions
var images = {}; //dictionary of Image objects. 
var char_buttons = []; //list of buttons
var mission_buttons = []; //list of mission buttons
var popup_buttons = []; //list of buttons displayed on popup
var locations = {}; //dict of locations
var num_missions = 0;
var num_successful = 0;
var num_failed = 0;
//https://imgur.com/a/jnQ80q9 button source
var canvas = document.getElementById("canv");
var context = canvas.getContext('2d');
context.font = "15px Small Fonts";
//context.fillStyle = 'white';
var DEFAULT_CHAR_X = 100;
var DEFAULT_CHAR_Y = 100;
window.onload = function () { setup(); };
//events
canvas.addEventListener("click", clicked);
//popup
var pop;
//pass button
var pass;
//ok button
var ok;
//tick: 7 days total. 2 ticks per day (morn/eve). Even ticks are morning = new day
var current_time = "morning";
var current_day = 1;
var max_stat = 10;
var max_affinity = 10;
var text_log = ["Log:", "Thanks for coming in on such short notice! I will be away for about a week <strike>fishing</strike> on a very important errand.<br>Luckily, this can also act as your trial period! While you take over the role of guildmaster for me, your responsibilities will include assigning missions to guild members based off of how well they work together as well as their individual strengths<br>That's it, that's the only responsibility. Those who are still here will do their own thing during the day.<br>If you don't want to assign anyone on a mission during the day, that's fine too! You can just use the [NEXT] button to wait around.<br>Have fun! If the gazebo falls down again just get Landol to fix it for you, he will complain but it will be worth it."];
var selected1;
var selected2; //for testing mission assignment.
var selected_mission;
var Character = /** @class */ (function () {
    function Character(name, stats, spr) {
        this.name = name;
        this.stats = { 'str': stats['str'], 'int': stats['int'], 'mag': stats['mag'] };
        this.affinity = {};
        this.is_occupied = false;
        this.is_on_mission = false;
        this.location = locations["start"];
        //console.log(this.location);
        //this.x = DEFAULT_CHAR_X;
        //this.y = DEFAULT_CHAR_Y;
        this.sprite = images[spr];
        //this.char_icon = char_icons[name];
    }
    Character.prototype.create_affinity = function () {
        // for (var char in roster) {
        //     //console.log();
        //     if (roster[char].name != this.name) {
        //         this.affinity[roster[char].name] = 4; //everyone starts with 4 affinity
        //     }
        // }
        //maybe do random eventually
        switch (this.name) {
            case "Min":
                this.affinity = { "Landol": 1, "Horst": 5, "Rory": 4, "Danth": 2 };
                break;
            case "Landol":
                this.affinity = { "Min": 1, "Horst": 3, "Rory": 2, "Danth": 5 };
                break;
            case "Horst":
                this.affinity = { "Min": 5, "Landol": 3, "Rory": 5, "Danth": 1 };
                break;
            case "Rory":
                this.affinity = { "Min": 4, "Horst": 5, "Landol": 2, "Danth": 3 };
                break;
            case "Danth":
                this.affinity = { "Min": 2, "Horst": 1, "Rory": 3, "Landol": 5 };
        }
    };
    Character.prototype.increase_affinity = function (char) {
        //find character, increment number. 
        if (this.name != char.name) {
            this.affinity[char.name]++;
        }
        if (this.affinity[char.name] > 10) {
            this.affinity[char.name] = 10;
        }
    };
    Character.prototype.decrease_affinity = function (char) {
        if (this.name != char.name) {
            this.affinity[char.name]--;
        }
        if (this.affinity[char.name] < 0) {
            this.affinity[char.name] = 0;
        }
    };
    Character.prototype.increase_stat = function (stat, amount) {
        this.stats[stat] += amount;
        if (this.stats[stat] > 10) {
            this.stats[stat] = 10;
        }
    };
    Character.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Character.prototype.draw = function () {
        //context.drawImage(this.char_icon, this.x, this.y);
    };
    Character.prototype.stats_tostr = function () {
        var st = this.name + "\nStr: " + this.stats["str"] + "\nMag: " + this.stats["mag"] + "\nInt: " + this.stats["int"] + "\nStatus:";
        if (this.is_on_mission) {
            st += " Out on Mission";
        }
        else {
            st += " Available";
        }
        return st;
    };
    Character.prototype.draw = function () {
        //console.log(this.sprite);
        context.drawImage(this.sprite, this.location.x, this.location.y);
    };
    Character.prototype.set_location = function (where) {
        this.location = locations[where];
    };
    return Character;
}());
var Mission = /** @class */ (function () {
    function Mission(title, desc, req_stat, req_total, reward, win_txt, lose_txt, ticks, day) {
        //always gain +1 affinity on success. 
        //always lose -1 affinity on failure
        //maybe add type
        this.title = title;
        this.desc = desc;
        this.req_stat = req_stat; //maybe make this an array
        this.req_total = req_total; //this too 
        this.reward = reward;
        this.win_txt = win_txt;
        this.lose_txt = lose_txt;
        this.assigned = false;
        //probably add start_day (when it shows up) and length (how many days it takes)
        this.c1 = null; //this is the character name.
        this.c2 = null;
        this.char1_i = -1;
        this.char2_i = -1;
        this.ticks = ticks;
        this.day = day;
        //reward == difficulty for now
        this.difficulty = reward;
    }
    Mission.prototype.assign = function (char1, char2) {
        this.assigned = true;
        this.c1 = char1;
        this.c2 = char2;
        this.char1_i = find_in_list("roster", this.c1);
        this.char2_i = find_in_list("roster", this.c2);
        roster[this.char1_i].is_on_mission = true;
        roster[this.char2_i].is_on_mission = true;
        //char1.is_occupied = true; //maybe get from list
        //char2.is_occupied = true;
    };
    Mission.prototype.do_mission = function () {
        num_missions++;
        this.char1_i = find_in_list("roster", this.c1);
        this.char2_i = find_in_list("roster", this.c2);
        console.log(this.req_stat + " of more than " + this.req_total);
        var combined_stat = roster[this.char1_i].stats[this.req_stat] + roster[this.char2_i].stats[this.req_stat];
        console.log("total points: " + combined_stat);
        if (combined_stat >= this.req_total) { //make check function
            //pass
            this.victory();
            return true;
        }
        else {
            this.failure();
            return false;
        }
    };
    Mission.prototype.victory = function () {
        //console.log("success");
        num_successful++;
        text_log.push("Mission: " + this.title + " was successful!<br>" + roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.win_txt);
        this.char1_i = find_in_list("roster", this.c1);
        this.char2_i = find_in_list("roster", this.c2);
        //text_log.push(roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.win_txt);
        //increase stat by reward amt
        roster[this.char1_i].increase_stat(this.req_stat, this.reward);
        roster[this.char2_i].increase_stat(this.req_stat, this.reward);
        //increase affinity
        roster[this.char1_i].increase_affinity(roster[this.char2_i]);
        roster[this.char2_i].increase_affinity(roster[this.char1_i]);
        //text_log.push(this.win_txt);
        this.assigned = false;
        roster[this.char1_i].is_on_mission = false;
        roster[this.char2_i].is_on_mission = false;
        this.char1_i = null;
        this.char2_i = null;
    };
    Mission.prototype.failure = function () {
        num_failed++;
        //console.log("failure");
        text_log.push("Mission: " + this.title + " failed!<br>" + roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.lose_txt);
        this.char1_i = find_in_list("roster", this.c1);
        this.char2_i = find_in_list("roster", this.c2);
        //text_log.push(roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.lose_txt);
        //decrease affinity
        roster[this.char1_i].decrease_affinity(roster[this.char2_i]);
        roster[this.char2_i].decrease_affinity(roster[this.char1_i]);
        //text_log.push(this.lose_txt);
        this.assigned = false;
        roster[this.char1_i].is_on_mission = false;
        roster[this.char2_i].is_on_mission = false;
        this.char1_i = null;
        this.char2_i = null;
    };
    Mission.prototype.decrease_time = function () {
        this.ticks--;
        if (this.ticks == 0) {
            this.do_mission();
        }
    };
    Mission.prototype.difficulty_tostr = function () {
        var str = "difficulty: ";
        for (var i = 0; i < this.difficulty; i++) {
            str += "*";
        }
        return str;
    };
    Mission.prototype.get_desc = function () {
        console.log("getting full desc");
        var full_desc = "---\n" + this.desc + "\nrequires " + this.req_stat + ", " + this.difficulty_tostr();
        return full_desc;
    };
    return Mission;
}());
//Start position is 570, 345
var Location = /** @class */ (function () {
    function Location(name, x, y, stat) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.assigned = false;
        this.char1 = null;
        this.char2 = null; //for affinity ONLY
        this.stat = null;
        if (stat) {
            this.stat = stat;
        }
    }
    Location.prototype.assign = function (name, name2) {
        if (name2 === void 0) { name2 = 0; }
        this.assigned = true;
        if (this.stat == "affinity") {
            //two characters
            this.char1 = name;
            this.char2 = name2;
            roster[find_in_list("roster", this.char1)].move(this.x, this.y);
            roster[find_in_list("roster", this.char2)].move(this.x, this.y);
        }
        else {
            //standard stat, 1 char
            this.char1 = name;
            roster[find_in_list("roster", this.char1)].move(this.x, this.y);
        }
    };
    Location.prototype.enhance = function () {
        if (this.stat == "affinity") {
            roster[find_in_list("roster", this.char1)].increase_affinity(this.char2);
        }
        else {
            //only one
            roster[find_in_list("roster", this.char1)].increase_stat(this.stat, 1);
        }
    };
    return Location;
}());
//useful things
var Popup = /** @class */ (function () {
    function Popup(x, y, type) {
        this.x = x;
        this.y = y;
        this.image = images[type];
        this.is_open = false;
        this.text_pos = this.y + 30;
    }
    Popup.prototype.draw = function () {
        context.drawImage(this.image, this.x, this.y);
    };
    Popup.prototype.dismiss = function () {
        this.is_open = false;
        this.reset();
        draw_canvas();
        //check for mission stuff in here .Make sure 2 chars selected etc
        if (selected1 != null && selected2 != null) {
            update_time();
        }
        console.log("Resetting in popup dismiss");
        selected1 = null;
        selected2 = null;
        selected_mission = null;
        console.log("selected 2 is now " + selected2);
        for (var b in char_buttons) {
            char_buttons[b].pressed = false;
        }
        for (var x in popup_buttons) {
            popup_buttons[x].pressed = false;
        }
        draw_canvas();
    };
    Popup.prototype.write_text = function (text) {
        //y = starting y position. 
        var txt = this.wrap_paragraph_text(text);
        for (var l = 0; l < txt.length; l++) {
            context.fillText(txt[l], this.x + 15, this.text_pos);
            this.text_pos += 20;
        }
        //this.text_pos = this.y + 20;
        //this.text_x +=20;
        //this.text_y +=20;
    };
    //two below functions modified from: https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
    Popup.prototype.wrap_paragraph_text = function (text) {
        var _this = this;
        return text.split("\n").map(function (para) { return _this.wrap_text(para); }).reduce(function (a, b) { return a.concat(b); });
    };
    Popup.prototype.wrap_text = function (text) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
        //console.log(this.image.x);
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var w = context.measureText(currentLine + " " + word).width;
            if (w < this.image.width - 50) {
                currentLine += " " + word;
            }
            else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };
    Popup.prototype.reset = function () {
        this.text_pos = this.y + 30;
    };
    Popup.prototype.draw_popup_buttons = function () {
        var tiny_x = 250;
        for (var b in popup_buttons) {
            var char = find_in_list("roster", popup_buttons[b].text);
            if (!roster[char].is_on_mission) {
                if (tiny_x >= this.image.width + 100) {
                    tiny_x = 450;
                    this.text_pos += 40;
                }
                else {
                    tiny_x += 80;
                }
                popup_buttons[b].x = tiny_x;
                popup_buttons[b].y = this.text_pos;
                //console.log(popup_buttons[b].x + " , "+ popup_buttons[b].y);
                popup_buttons[b].draw();
            }
        }
    };
    Popup.prototype.draw_ok_button = function () {
        ok.x = 455;
        ok.y = this.text_pos;
        ok.draw();
    };
    Popup.prototype.fill_popup = function (text, buttons, ok) {
        this.write_text(text);
        if (buttons) {
            this.draw_popup_buttons();
        }
        if (ok) {
            this.draw_ok_button();
        }
    };
    return Popup;
}());
var Button = /** @class */ (function () {
    function Button(x, y, type, text, pressed_type) {
        if (pressed_type === void 0) { pressed_type = 0; }
        this.x = x;
        this.y = y;
        this.image = images[type];
        this.pressed = false;
        this.pressed_image = null;
        this.b_text_pos = this.y + 20;
        if (pressed_type) {
            this.pressed_image = images[pressed_type];
        }
        this.text = text;
        this.action = null;
    }
    Button.prototype.set_action = function () {
        this.action = scripting_1.action;
    };
    Button.prototype.do_something = function () {
        if (this.action) {
            this.action();
        }
    };
    Button.prototype.reset_text_pos = function () {
        this.b_text_pos = this.y + 20;
    };
    Button.prototype.draw = function () {
        //console.log(this.pressed);
        //console.log(this.pressed_image);
        if (this.pressed) {
            context.drawImage(this.pressed_image, this.x, this.y);
            //console.log("drawing pressed");
        }
        else {
            context.drawImage(this.image, this.x, this.y);
        }
        //context.fillText(this.text, this.x + 150, this.y + 45);
    };
    //two below functions modified from: https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
    Button.prototype.wrap_paragraph_text = function (text) {
        var _this = this;
        return text.split("\n").map(function (para) { return _this.wrap_text(para); }).reduce(function (a, b) { return a.concat(b); });
    };
    Button.prototype.wrap_text = function (text) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
        //console.log(this.image.x);
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var w = context.measureText(currentLine + " " + word).width;
            if (w < this.image.width - 15) {
                currentLine += " " + word;
            }
            else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };
    Button.prototype.write_text = function () {
        //console.log("writing");
        var txt = this.wrap_paragraph_text("Mission:\n" + this.text);
        //console.log(txt);
        for (var l = 0; l < txt.length; l++) {
            context.fillText(txt[l], this.x + 15, this.b_text_pos);
            this.b_text_pos += 20;
        }
        this.reset_text_pos();
    };
    return Button;
}());
function preload_img() {
    console.log("loading images");
    var button = document.getElementById("button");
    //var popup = new Image();
    //button.src = "http://i63.tinypic.com/r7nd44.jpg";
    //popup.src = "http://i64.tinypic.com/2w5iuj6.jpg";
    images["button"] = button;
    images["Min"] = document.getElementById("min");
    images["Min_p"] = document.getElementById("min_p");
    images["Landol"] = document.getElementById("landol");
    images["Landol_p"] = document.getElementById("landol_p");
    images["Rory"] = document.getElementById("rory");
    images["Rory_p"] = document.getElementById("rory_p");
    images["Horst"] = document.getElementById("horst");
    images["Horst_p"] = document.getElementById("horst_p");
    images["Danth"] = document.getElementById("danth");
    images["Danth_p"] = document.getElementById("danth_p");
    images["bg"] = document.getElementById("bg");
    images["tinyMin"] = document.getElementById("tinymin");
    images["tinyMin_p"] = document.getElementById("tinymin_p");
    images["tinyLandol"] = document.getElementById("tinylandol");
    images["tinyLandol_p"] = document.getElementById("tinylandol_p");
    images["tinyHorst"] = document.getElementById("tinyhorst");
    images["tinyHorst_p"] = document.getElementById("tinyhorst_p");
    images["tinyRory"] = document.getElementById("tinyrory");
    images["tinyRory_p"] = document.getElementById("tinyrory_p");
    images["tinyDanth"] = document.getElementById("tinydanth");
    images["tinyDanth_p"] = document.getElementById("tinydanth_p");
    images["pass"] = document.getElementById("pass");
    images["Minspr"] = document.getElementById("minspr");
    images["Landolspr"] = document.getElementById("landolspr");
    images["Horstspr"] = document.getElementById("horstspr");
    images["Roryspr"] = document.getElementById("roryspr");
    images["Danthspr"] = document.getElementById("danthspr");
    //console.log(images["bg"]);
    images["popup"] = document.getElementById("popup");
    images["ok"] = document.getElementById("ok");
    images["gamedone"] = document.getElementById("gameover");
}
function create_roster() {
    roster.push(new Character("Min", { 'str': 7, 'mag': 0, 'int': 3 }, "Minspr")); //make a dictionary/label it
    roster.push(new Character("Landol", { 'str': 0, 'mag': 6, 'int': 4 }, "Landolspr"));
    roster.push(new Character("Horst", { 'str': 8, 'mag': 0, 'int': 2 }, "Horstspr"));
    roster.push(new Character("Rory", { 'str': 2, 'mag': 6, 'int': 2 }, "Roryspr"));
    roster.push(new Character("Danth", { 'str': 2, 'mag': 2, 'int': 6 }, "Danthspr"));
    for (var c in roster) {
        roster[c].create_affinity(); //start at 2?
        scripting_1.addAgent(roster[c].name); //add agent for behavior tree
        //console.log(roster[c]);
    }
}
function create_missions() {
    //template: 
    //mission_board.push(new Mission("title", "desc", "stat", <totalpts>, <difficulty>, "win", "lose", <len*2>, <appearday>));
    //day 1
    mission_board.push(new Mission("An antimagic rat has taken over my attic and may be building a small nation state", "I can't get to my grandparent's old photos now, please get it at by any means necessary!", "str", 5, 1, "I flexed at the rat and it left!", "The rat king rains supreme and wishes to be paid reparations via corn.", 2, 1));
    mission_board.push(new Mission("Lost cat", "Sneaky ol' fluffer escaped!", "int", 5, 1, "We found the cat behind a dumpster. The owner said that the glowing red eyes are normal..?", "What cat?", 4, 1));
    mission_board.push(new Mission("My sheep keep on going missing", "Where are they going? What are they doing? Are they talking about me??? I have to know!", "mag", 8, 2, "They were being used by the goblins for fantasy football. They were returned, slightly more armored. ", "Sheep aren't real.", 6, 1));
    //day 2
    mission_board.push(new Mission("Slimes are eating my potatoes!", "I had one plan and that plan was whacking them with a sword and it didn't work.", "mag", 8, 2, "Slimes zapped, mission complete!", "The slimes shook off all the physical damage we could do so we shoved them into a hole and hoped for the best.", 2, 2));
    mission_board.push(new Mission("Goblins won't stop heckling my sheep", "They're getting very stressed out! Help!", "str", 10, 3, "The sheep can sheep in peace now!", "We lost, but on the bright side I don't think sheep understand English.", 6, 2));
    mission_board.push(new Mission("I think George is a vampire", "He never eats and his shirts are always stained with blood!", "int", 6, 1, "George is...a shy winery worker. We bought him new shirts.", "George moved out before we could talk to him...", 2, 2));
    //day 3
    mission_board.push(new Mission("An undead army is invading!", "THEY'VE GOTTEN INTO THE MILK BARNS! WE'RE DOOMED!", "mag", 14, 5, "win", "lose", 6, 3));
    mission_board.push(new Mission("THE SKY TURNED RED", "WHY IS IT RED???", "int", 6, 1, "It...we had to spend 3 hours explaining the sunset to a family of 6. I mean money is money but how'd this mission even get on our list.", "We stopped by and they uhhh..said a lot of words and after an hour we graciously jumped out the window to escape. ", 2, 3));
    mission_board.push(new Mission("Lich King causing a ruckus", "Unholy magics and loud, booming noises are coming from the lich's keep, send her a warning!", "mag", 12, 4, "Our magic was cooler than hers so she agreed to move her party deeper underground", "Lich \"Partybrodudefella\" was deeply unimpressed by us and turned up her dubstep louder", 6, 3));
    //day 4
    mission_board.push(new Mission("A fish learned to walk on land and hes using his legs exclusively for evil", "He can't handle the responsibility of having legs! He's raising a tadpole army!", "str", 10, 3, "He got suplexed back into the ocean!", "His evil continues.....the neferious Captain Legbeard", 2, 4));
    mission_board.push(new Mission("Follow my cat aroud to see what she does all day", "I lose her every time I try, I have to know!", "int", 8, 2, "Dear god this cat gets so many treats. Please stop feeding her shes too powerful.", "Outsmarted by a cat....just another normal day honestly", 2, 4));
    mission_board.push(new Mission("Stop these weekly barfights!", "Every Wednesday an elf and an orc come to my bar, and they always end up fighting! I don't understand why they don't just come on different days!", "str", 8, 2, "They started throwing chairs again so we also threw chairs at them. They were forced to team up against us and bonded over their shared defeat. Their wedding is next week, I think the problem is solved", "We couldn't stop them. I wonder if they'll still be at it when I have grandkids...", 4, 4));
    //day 5
    mission_board.push(new Mission("Kraken won't stop rearranging the boats at the dock every night!", "We don't need our boats ordered by color! We need them where we parked them!", "mag", 12, 4, "Turns out, she just needed a translator. We set up a magical one and now the Kraken gets a salary of fish to keep track of all the boats", "Well I guess they'll just have to accept their new organizational overlord", 4, 5));
    mission_board.push(new Mission("VERY LARGE BEAR! VERY VERY LARGE BEAR!!", "BEAR LARGE", "str", 10, 3, "Good news, we won! Bad news, it was a dragon.", "IT WAS NOT A BEAR!", 2, 5));
    mission_board.push(new Mission("A big rock is falling from the sky but it's probably fine", "I mean a firey death doesn't sound like the worst thing in the world", "mag", 14, 5, "We made a big bat out of magic and whacked it somewhere else!", "it was not fine!!!", 4, 5));
    //day 6
    mission_board.push(new Mission("Someone's stolen the town flag!", "We need our flag!", "int", 8, 2, "We found it in a shopping cart 10 miles away", "We couldn't find it so we replaced the flag with a coat someone left out?", 2, 6));
    mission_board.push(new Mission("Golem rampaging through town!", "IT'S DESTROYING THE FLOWERS AND ONLY THE FLOWERS!!", "str", 12, 4, "We hacked it! With an axe. But somehow this fixed it and now its a normal gardening golem!", "It beat us up and ran into the countryside to castrate more plants", 2, 6));
    mission_board.push(new Mission("A tiny dragon won't get out of my silverwear cabinet!", "Now normally this wouldn't be an issue but our house is very flammable! We don't know how to move it safely.", "int", 10, 3, "Lil guy just wants to hoard spoons. We made him a pile of donated spoons out in the woods and he seems very happy!", "Well the dragon's out of the cabinet, but their house is...slightly....ablaze.", 2, 6));
}
function log_text() {
    var lg_txt = "";
    for (var e in text_log) {
        lg_txt += text_log[e] + "<br> * * * <br>";
    }
    var div_log = document.getElementById("log");
    div_log.innerHTML = lg_txt;
    div_log.scrollTop = div_log.scrollHeight;
}
function create_locations() {
    var str_loc = new Location("Training Dummy", 380, 315, "str");
    var mag_loc = new Location("Magic Tower", 670, 120, "mag");
    var int_loc = new Location("Library", 570, 280, "int");
    var aff_loc = new Location("Gazebo", 405, 135, "affinity");
    var aff_loc2 = new Location("Gazebo", 435, 135, "affinity");
    var start_loc = new Location("Outside", 600, 315);
    locations["start"] = start_loc;
    locations["str"] = str_loc;
    locations["mag"] = mag_loc;
    locations["int"] = int_loc;
    locations["affinity1"] = aff_loc;
    locations["affinity2"] = aff_loc2;
}
function find_in_list(type, to_search) {
    if (type == "roster") {
        for (var i = 0; i < roster.length; i++) {
            if (roster[i].name == to_search) {
                return i;
            }
        }
    }
    else if (type == "mission") {
        for (var i = 0; i < mission_board.length; i++) {
            if (mission_board[i].title == to_search) {
                return i;
            }
        }
    }
}
function draw_canvas() {
    console.log("drawing canvas");
    log_text();
    //stuff to redraw when popup closes. 
    // outline
    context.beginPath();
    context.lineWidth = "6";
    context.strokeStyle = "black";
    context.rect(0, 0, 800, 650);
    context.stroke();
    //console.log(images["bg"]);
    context.drawImage(images["bg"], 0, 0); //draw bg
    draw_character_buttons();
    draw_characters();
    context.fillText("Day " + current_day + ", " + current_time, 675, 575);
}
function draw_game_done() {
    console.log("done");
    context.drawImage(images["gamedone"], 0, 0); //draw done
    context.fillStyle = "#ffffff";
    context.font = "24px Small Fonts";
    context.fillText("Missions Attempted: " + num_missions, 300, 360);
    context.fillText("Missions Succeeded: " + num_successful, 300, 400);
    context.fillText("Missions Failed: " + num_failed, 300, 440);
}
function update_time() {
    console.log("update time reset");
    pop.is_open = false;
    selected1 = null;
    selected2 = null;
    selected_mission = null;
    //pop.dismiss();
    //first: have characters do their actions
    move_characters();
    //next, update time.
    if (current_time == "morning") {
        current_time = "evening";
    }
    else {
        current_time = "morning";
        current_day++;
        var intervalID = window.setInterval(day_change, 100);
        function clear(id) {
            clearInterval(id);
        }
        setInterval(clear(intervalID), 3000);
        //update mission board
    }
    //for every mission assigned, updated the time stuff
    for (var m in mission_board) {
        if (mission_board[m].assigned) {
            mission_board[m].decrease_time();
        }
    }
    draw_canvas(); //redraw text.
    if (current_day == 7) {
        text_log.push("Whew! Looks like everyone’s still in once piece! Thanks for taking care of things while I was out. Being a Guildmaster is tough work, you did great! I’ll take over from here, but hey, when I retire for real you got a real solid shot at taking my position! See you around!");
        log_text();
        draw_game_done();
    }
    else {
        text_log.push("Day " + current_day + ", " + current_time);
    }
    //characters always move
}
function day_change() {
    //New day screen
    context.fillStyle = "black";
    context.fillRect(0, 0, 900, 650);
}
function draw_characters() {
    //console.log("in draw characters");
    for (var char in roster) {
        if (!roster[char].is_on_mission) {
            roster[char].draw();
        }
    }
}
function move_characters() {
    //random the character order for those who arent busy
    console.log("in move char");
    //get_random_char_list();
    //Need to stop once every character is assigned. 
    if (current_time == "morning") {
        for (var ch in roster) {
            if (!roster[ch].is_occupied && !roster[ch].is_on_mission) { //if character isn't on a mission or already occupied
                //console.log(locations);
                //select_action(roster[ch]);
                scripting_1.attachTreeToAgent(roster[ch].name, select_action(roster[ch]));
                //console.log(roster);
            }
        }
        scripting_1.worldTick();
    }
    else {
        //evening, everyone goes to start
        for (var c in roster) {
            roster[c].set_location("start");
            roster[c].is_occupied = false;
        }
        //all locations are unoccupied 
        locations["str"].assigned = false;
        locations["int"].assigned = false;
        locations["mag"].assigned = false;
        locations["affinity1"].assigned = false;
        locations["affinity2"].assigned = false;
    }
}
function draw_character_buttons() {
    //var y = 50;
    for (var b in char_buttons) {
        char_buttons[b].draw();
    }
    pass.draw();
    for (var b in mission_buttons) {
        //console.log(current_day);
        //console.log(mission_board[b].day)
        if (current_day == mission_board[b].day && !mission_board[b].assigned) {
            mission_buttons[b].draw();
            mission_buttons[b].write_text();
        }
    }
    //context.drawImage(char_buttons[0].image, char_buttons[0].x, char_buttons[0].y);
}
function create_buttons() {
    pop = new Popup(300, 200, "popup");
    var y = 20;
    var tiny_x = 310;
    var tiny_y = 280;
    for (var c in roster) {
        var char_name = roster[c].name;
        var b = new Button(10, y, char_name, char_name, char_name + "_p");
        var n = "tiny" + char_name;
        var tiny_b = new Button(0, 0, n, char_name, n + "_p");
        //console.log(images[n+"_p"]);
        //console.log(images);
        //console.log(n);
        popup_buttons.push(tiny_b);
        char_buttons.push(b);
        y += 60;
    }
    y += 130;
    var x = 20;
    var count = 0;
    for (var c in mission_board) {
        //hard coded and hacky, 3 missions per day
        if (count == 3) {
            x = 20;
            count = 0;
        }
        //console.log(x);
        var mission_title = mission_board[c].title;
        var b = new Button(x, y, "button", mission_title);
        mission_buttons.push(b);
        x += 220;
        count++;
    }
    pass = new Button(630, 580, "pass", "pass");
    ok = new Button(0, 0, "ok", "ok");
}
function checkBounds(object, x, y) {
    var minX = object.x;
    var maxX = object.x + object.image.width;
    var minY = object.y;
    var maxY = object.y + object.image.height;
    var mx = x;
    var my = y;
    //console.log("For object " + object.text);
    //console.log("button x range:" + minX + " to " + maxX);
    //console.log("button y range:" + minY + " to " + maxY);
    if (mx >= minX && mx <= maxX && my >= minY && my <= maxY) {
        return true;
    }
    return false;
}
function clicked(e) {
    //only want to open popup when button is clicked.
    //close popup when popup is clicked off. 
    //figure out what was clicked first. 
    //console.log("moues pos: " + e.clientX + ", " + e.clientY); //debugging
    if (!pop.is_open) {
        //check if a button was clicked  
        for (var button in char_buttons) {
            if (checkBounds(char_buttons[button], e.clientX, e.clientY)) {
                //draw popup
                char_buttons[button].pressed = true;
                pop.is_open = true;
                draw_canvas();
                pop.draw();
                //console.log(roster[find_in_list("roster", char_buttons[button].text)].stats_tostr());
                pop.fill_popup(roster[find_in_list("roster", char_buttons[button].text)].stats_tostr(), false, false);
                //console.log("Character: " + roster[find_in_list("roster", char_buttons[button].text)].name);
                //console.log(roster[find_in_list("roster", char_buttons[button].text)].stats);
            }
        }
        for (var button in mission_buttons) {
            if (!mission_buttons[button].assigned && checkBounds(mission_buttons[button], e.clientX, e.clientY) && current_day == mission_board[button].day) {
                pop.is_open = true;
                selected_mission = button;
                //console.log("SETTING SELECTED MISSION");
                pop.draw();
                //draw_popup_buttons();
                //console.log(mission_buttons[button].text);
                //console.log(find_in_list("mission", mission_buttons[button].text));
                //console.log(mission_board[0].title);
                var mission_title = mission_board[find_in_list("mission", mission_buttons[button].text)].title;
                var mission_desc = mission_board[find_in_list("mission", mission_buttons[button].text)].get_desc();
                pop.fill_popup(mission_title + "\n" + mission_desc, true, false);
                //pop.fill_popup("desc", true, false)
                //pop.draw_popup_buttons();
            }
        }
        if (checkBounds(pass, e.clientX, e.clientY)) {
            //console.log("pass clicked");
            update_time();
        }
    }
    else {
        //if pop up is open, want to check if anything BUT buttons was clicked (for now)
        if (checkBounds(pop, e.clientX, e.clientY)) {
            console.log("Popup clicked!");
            if (selected1 != null && selected2 != null) {
                console.log(checkBounds(ok, e.clientX, e.clientY));
                if (checkBounds(ok, e.clientX, e.clientY)) {
                    //console.log("Ok clicked");
                    pop.dismiss();
                    //selected1 = null;
                    //selected2 = null;
                    //selected_mission = null;
                }
            }
            for (var b in popup_buttons) {
                //check if those buttons were clicked. 
                //console.log(popup_buttons[b]);
                if (checkBounds(popup_buttons[b], e.clientX, e.clientY)) {
                    console.log("clicked is " + popup_buttons[b].text);
                    //Select character
                    if (selected1 == null && selected_mission != null && !roster[find_in_list("roster", popup_buttons[b].text)].is_on_mission) {
                        selected1 = popup_buttons[b].text;
                        popup_buttons[b].pressed = true;
                        console.log(selected_mission);
                        //redraw w pressed button
                        pop.draw();
                        pop.reset();
                        var mt = mission_board[selected_mission].title;
                        var md = mission_board[selected_mission].get_desc();
                        pop.fill_popup(mt + "\n" + md, true, false);
                    }
                    else if (popup_buttons[b].text != selected1 && !roster[find_in_list("roster", popup_buttons[b].text)].is_on_mission) {
                        selected2 = popup_buttons[b].text;
                        popup_buttons[b].pressed = false;
                    }
                    console.log("first: " + selected1);
                    console.log("second: " + selected2);
                    if (selected1 != null && selected2 != null) {
                        //console.log("Two characters selected. Asssigning mission.");
                        //console.log("Title: "+ mission_board[selected_mission].title + "\nDesc: " + mission_board[selected_mission].desc);
                        //assign mission
                        mission_board[selected_mission].assign(selected1, selected2);
                        //fill new text on popup
                        //pop.dismiss();
                        pop.reset();
                        pop.is_open = true;
                        pop.draw();
                        //console.log("still in if");
                        pop.fill_popup("Sending " + selected1 + " and " + selected2 + " on the mission.", false, true);
                        text_log.push("Sent " + selected1 + " and " + selected2 + " on: " + mission_board[selected_mission].title);
                        //selected1 = null;
                        //selected2 = null;
                        selected_mission = null;
                        //pass time
                        //update_time();
                    }
                }
            }
        }
        else {
            //console.log("close popup");
            pop.is_open = false;
            pop.dismiss();
            //selected1 = null;
            //selected2 = null;
            //selected_mission = null;
            //pop.reset();
        }
    }
}
//construct popup. Maybe make it object? 
function setup() {
    //things to only do one time. 
    preload_img();
    create_locations();
    create_roster();
    create_missions();
    create_buttons();
    draw_canvas();
}
//villanelle stuff
//function referenced from: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
function get_random_char_list() {
    var len = roster.length;
    var temp;
    var index;
    while (len > 0) {
        index = Math.floor(Math.random() * len);
        len--;
        temp = roster[len];
        roster[len] = roster[index];
        roster[index] = temp;
    }
    //console.log(roster);
    //console.log("highest aff: " + get_char_to_raise_affinity(roster[0]).name);
    //start actions:
}
function select_action(c) {
    //switch statement
    console.log(c.name + " selecting action...");
    switch (c.name) {
        case "Min":
            return scripting_1.selector([get_character_train_str(c), get_character_raise_affinity(c), get_character_train_int(c), get_character_train_mag(c)]);
        case "Landol":
            return scripting_1.selector([get_character_train_mag(c), get_character_train_int(c), get_character_raise_affinity(c), get_character_train_str(c)]);
        case "Horst":
            return scripting_1.selector([get_character_raise_affinity(c), get_character_train_str(c), get_character_train_int(c), get_character_train_mag(c)]);
        case "Rory":
            return scripting_1.selector([get_character_train_str(c), get_character_raise_affinity(c), get_character_train_int(c), get_character_train_mag(c)]);
        case "Danth":
            return scripting_1.selector([get_character_train_str(c), get_character_raise_affinity(c), get_character_train_int(c), get_character_train_mag(c)]);
    }
    //return selector([get_character_train_str(c), get_character_raise_affinity(c), get_character_train_int(c), get_character_train_mag(c)])
}
function get_char_to_raise_affinity(c) {
    //find the character with the highest affinity that is NOT 10 and NOT occupied
    var highest = null;
    var highest_aff = -1;
    for (var ch in roster) {
        //console.log(c);
        //console.log(roster[ch]);
        var comp = roster[ch];
        if (comp.name != c.name) {
            if (!comp.is_occupied) {
                if (c.affinity[comp.name] < 10 && c.affinity[comp.name] >= highest_aff) {
                    highest = comp;
                    highest_aff = c.affinity[comp.name];
                }
            }
        }
    }
    console.log(c.name + "'s highest affinity is with " + highest.name);
    return highest;
}
//CHECK SPOT DEC
function get_character_train_str(c) {
    var train_str = scripting_1.action(function () { return !locations["str"].assigned && c.stats["str"] < 10 && !c.is_occupied && !c.is_on_mission; }, function () {
        text_log.push(c.name + " is training str.");
        console.log(locations["str"].assigned);
        locations["str"].assigned = true;
        c.is_occupied = true;
        //increase stat
        c.increase_stat("str", 1);
        //set c's location
        c.set_location("str");
    }, 0);
    return train_str;
}
function get_character_train_int(c) {
    //console.log("int loc: " + int_cond);
    var train_int = scripting_1.action(function () { return !locations["int"].assigned && c.stats["int"] < 10 && !c.is_occupied && !c.is_on_mission; }, function () {
        text_log.push(c.name + " is training int.");
        //set location assigned
        locations["int"].assigned = true;
        c.is_occupied = true;
        //increase stat
        c.increase_stat("int", 1);
        //set c's location
        c.set_location("int");
    }, 0);
    return train_int;
}
function get_character_train_mag(c) {
    //var mag_cond = !locations["mag"].assigned && c.stats['mag'] < 10 && !c.is_occupied;
    var train_mag = scripting_1.action(function () { return !locations["mag"].assigned && c.stats["mag"] < 10 && !c.is_occupied && !c.is_on_mission; }, function () {
        //console.log(mag_cond);    
        text_log.push(c.name + " is training mag.");
        //set location assigned
        locations["mag"].assigned = true;
        c.is_occupied = true;
        //increase stat
        c.increase_stat("mag", 1);
        //set c's location
        c.set_location("mag");
        //console.log(c);
        //console.log(locations["mag"]);
    }, 0);
    return train_mag;
}
function get_character_raise_affinity(c) {
    var raise_affinity = scripting_1.action(function () { return !locations["affinity1"].assigned && !locations["affinity2"].assigned && !c.is_occupied; }, function () {
        var c2 = get_char_to_raise_affinity(c); //this is character obj. Should be unoccupied w less than 10 aff
        text_log.push(c.name + " is raising affinity with " + c2.name + ".");
        //set location assigned
        locations["affinity1"].assigned = true;
        locations["affinity2"].assigned = true;
        //increase affinity with them
        c.increase_affinity(c2.name);
        c2.increase_affinity(c.name);
        //set both to occupied
        c.is_occupied = true;
        c2.is_occupied = true;
        //set both' location
        c.set_location("affinity1");
        c2.set_location("affinity2");
    }, 0);
    return raise_affinity;
}
//TODO
//[x] button on pop up.
//Future Improvements:
//Improved UI
//Character dialogue
//Characters training together
//Missions having a way to win with affinity
},{"./scripting":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = require("typescript-collections/dist/lib/Queue");
var util_1 = require("typescript-collections/dist/lib/util");
var Status;
(function (Status) {
    Status[Status["RUNNING"] = 0] = "RUNNING";
    Status[Status["SUCCESS"] = 1] = "SUCCESS";
    Status[Status["FAILURE"] = 2] = "FAILURE";
})(Status = exports.Status || (exports.Status = {}));
function terminateAndReturn(id, blackboard, status) {
    delete blackboard[id];
    return status;
}
var blackboard = {};
function getActionTick(id) {
    return function (precondition, effect, ticksRequired) {
        if (ticksRequired === void 0) { ticksRequired = 1; }
        return function () {
            if (precondition()) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].ticksDone = ticksRequired;
                }
                if (blackboard[id].ticksDone > 0) {
                    blackboard[id].ticksDone--;
                    return Status.RUNNING;
                }
                else {
                    effect();
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                }
            }
            else {
                return Status.FAILURE;
            }
        };
    };
}
function getGuardTick() {
    return function (precondition, astTick, negate) {
        if (negate === void 0) { negate = false; }
        return function () {
            var proceed = negate ? !precondition() : precondition();
            return proceed ? execute(astTick) : Status.FAILURE;
        };
    };
}
function getSequenceTick(id) {
    return function (astTicks) {
        return function () {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }
            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex]);
                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.FAILURE)
                    return terminateAndReturn(id, blackboard, Status.FAILURE);
                else if (childStatus == Status.SUCCESS)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.SUCCESS);
        };
    };
}
function getSelectorTick(id) {
    return function (astTicks) {
        return function () {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }
            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex]);
                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.SUCCESS)
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                else if (childStatus == Status.FAILURE)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.FAILURE);
        };
    };
}
function execute(astTick) {
    return astTick();
}
exports.execute = execute;
var globalIdCounter = 0;
function action(precondition, effect, ticksRequired) {
    return getActionTick(globalIdCounter++)(precondition, effect, ticksRequired);
}
exports.action = action;
function guard(precondition, astTick) {
    return getGuardTick()(precondition, astTick);
}
exports.guard = guard;
function neg_guard(precondition, astTick) {
    return getGuardTick()(precondition, astTick, true);
}
exports.neg_guard = neg_guard;
/**
 * Cycles over its children: iterates to the next child on success of a child
 * Succeeds if all succeed, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function sequence(astTicks) {
    return getSequenceTick(globalIdCounter++)(astTicks);
}
exports.sequence = sequence;
/**
 * Cycles over its children: iterates to the next child on failure of a child(think of it as if-else blocks)
 * Succeeds if even one succeeds, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function selector(astTicks) {
    return getSelectorTick(globalIdCounter++)(astTicks);
}
exports.selector = selector;
/*--------------- APIs --------------- */
//0. utilities
// min and max are inclusive
function getRandNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandNumber = getRandNumber;
//1. story instance
//1.1 locations
var locationGraph = {};
//add to both sides
function addLocation(locationName, adjacentLocations) {
    if (locationGraph[locationName] == undefined)
        locationGraph[locationName] = [];
    locationGraph[locationName] = locationGraph[locationName].concat(adjacentLocations);
    for (var i = 0; i < adjacentLocations.length; i++) {
        if (locationGraph[adjacentLocations[i]] == undefined)
            locationGraph[adjacentLocations[i]] = [];
        locationGraph[adjacentLocations[i]].push(locationName);
    }
}
exports.addLocation = addLocation;
function areAdjacent(location1, location2) {
    console.log("Are adjacent: " + location1 + ", " + location2);
    if (locationGraph[location1] == undefined || locationGraph[location2] == undefined) {
        console.log("Either one/both locations undefined");
        return false;
    }
    for (var i = 0; i < locationGraph[location1].length; i++) {
        if (locationGraph[location1][i] == location2) {
            return true;
        }
    }
    return false;
}
exports.areAdjacent = areAdjacent;
//pathfinding primitives
function getNextLocation(start, destination) {
    var visited = {};
    var previous = {};
    for (var key in locationGraph) {
        visited[key] = false;
    }
    visited[start] = true;
    var myQueue = new Queue_1.default();
    myQueue.enqueue(start);
    while (!myQueue.isEmpty()) {
        var current = myQueue.dequeue();
        if (current === destination) {
            break;
        }
        var neighbors = locationGraph[current];
        for (var i = 0; i < neighbors.length; i++) {
            if (!visited[neighbors[i]]) {
                myQueue.enqueue(neighbors[i]);
                visited[neighbors[i]] = true;
                previous[neighbors[i]] = current;
            }
        }
    }
    var current = destination;
    if (current == start)
        return current;
    while (previous[current] != start) {
        current = previous[current];
    }
    return current;
}
exports.getNextLocation = getNextLocation;
//1.2 agents
var agents = [];
function addAgent(agentName) {
    agents.push(agentName);
    return agentName;
}
exports.addAgent = addAgent;
//1.3 items
var items = [];
function addItem(itemName) {
    items.push(itemName);
    return itemName;
}
exports.addItem = addItem;
//1.4 variables
var variables = {};
var agentVariables = {};
var itemVariables = {};
function setVariable(varName, value) {
    variables[varName] = value;
    return varName;
}
exports.setVariable = setVariable;
function setAgentVariable(agent, varName, value) {
    if (util_1.isUndefined(agentVariables[agent]))
        agentVariables[agent] = {};
    agentVariables[agent][varName] = value;
    return value;
}
exports.setAgentVariable = setAgentVariable;
function getVariable(varName) {
    if (util_1.isUndefined(variables[varName])) {
        console.log("Variable " + varName + " not set!");
        return;
    }
    return variables[varName];
}
exports.getVariable = getVariable;
function getAgentVariable(agent, varName) {
    if (util_1.isUndefined(agentVariables[agent]) || util_1.isUndefined(agentVariables[agent][varName])) {
        console.log("Variable " + varName + " for agent " + agent + " not set!");
        return;
    }
    return agentVariables[agent][varName];
}
exports.getAgentVariable = getAgentVariable;
function isVariableNotSet(varName) {
    return util_1.isUndefined(variables[varName]);
}
exports.isVariableNotSet = isVariableNotSet;
function isAgentVariableNotSet(agent, varName) {
    return util_1.isUndefined(agentVariables[agent]) || util_1.isUndefined(agentVariables[agent][varName]);
}
exports.isAgentVariableNotSet = isAgentVariableNotSet;
function setItemVariable(item, varName, value) {
    if (util_1.isUndefined(itemVariables[item]))
        itemVariables[item] = {};
    itemVariables[item][varName] = value;
    return value;
}
exports.setItemVariable = setItemVariable;
function getItemVariable(item, varName) {
    if (util_1.isUndefined(itemVariables[item]) || util_1.isUndefined(itemVariables[item][varName])) {
        console.log("Variable " + varName + " for item " + item + " not set!");
        return;
    }
    return itemVariables[item][varName];
}
exports.getItemVariable = getItemVariable;
//2
//agent-behavior tree mapping
var agentTrees = {};
function attachTreeToAgent(agent, tree) {
    agentTrees[agent] = tree;
}
exports.attachTreeToAgent = attachTreeToAgent;
//3.1
//user actions
//TODO add variables to user action texts
var userInteractionObject = {
    text: "",
    userActionsText: [],
    actionEffectsText: ""
};
var userInteractionTrees = [];
var userActions = {};
function runUserInteractionTrees() {
    userInteractionObject.text = "";
    userInteractionObject.userActionsText = [];
    userActions = {}; //{"Go to location X" : effect
    for (var i = 0; i < userInteractionTrees.length; i++) {
        execute(userInteractionTrees[i]);
    }
}
exports.displayDescriptionAction = function (text) {
    return action(function () { return true; }, function () { return userInteractionObject.text += "\n" + text; }, 0);
};
exports.displayActionEffectText = function (text) { return userInteractionObject.actionEffectsText += "\n" + text; };
exports.addUserActionTree = function (text, effectTree) { return action(function () { return true; }, function () { return mapUserActionToTree(text, effectTree); }, 0); };
exports.addUserAction = function (text, effect) {
    return action(function () { return true; }, function () { return mapUserActionToTree(text, action(function () { return true; }, effect, 0)); }, 0);
};
function mapUserActionToTree(text, tree) {
    userActions[text] = tree;
    userInteractionObject.userActionsText.push(text);
}
function addUserInteractionTree(tick) {
    userInteractionTrees.push(tick);
}
exports.addUserInteractionTree = addUserInteractionTree;
function executeUserAction(text) {
    //execute the user action
    userInteractionObject.actionEffectsText = "";
    var userActionEffectTree = userActions[text];
    execute(userActionEffectTree);
}
exports.executeUserAction = executeUserAction;
//4.
function initialize() {
    runUserInteractionTrees();
}
exports.initialize = initialize;
function getUserInteractionObject() {
    return userInteractionObject;
}
exports.getUserInteractionObject = getUserInteractionObject;
function get_random_agent_list() {
    console.log("randomizing");
    var len = agents.length;
    var temp;
    var index;
    while (len > 0) {
        index = Math.floor(Math.random() * len);
        len--;
        temp = agents[len];
        agents[len] = agents[index];
        agents[index] = temp;
    }
    //console.log(roster);
    //console.log("highest aff: " + get_char_to_raise_affinity(roster[0]).name);
    //start actions:
}
function worldTick() {
    //all agent ticks
    //console.log("In world tick");
    //randomize agents
    get_random_agent_list();
    for (var i = 0; i < agents.length; i++) {
        var tree = agentTrees[agents[i]];
        //console.log(tree);
        if (!util_1.isUndefined(tree)) {
            setVariable("executingAgent", agents[i]);
            execute(tree);
        }
    }
    runUserInteractionTrees();
}
exports.worldTick = worldTick;
},{"typescript-collections/dist/lib/Queue":2,"typescript-collections/dist/lib/util":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2d1aWxkLmpzIiwic3JjL3NjcmlwdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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SSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCw0QkFBNEI7SUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUNEO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLFFBQVEsQ0FBRSxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7SUFDdkcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDL0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDOUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMs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U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQWRELDhCQWNDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xyXG52YXIgTGlua2VkTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxyXG4gICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xyXG4gICAgKiB3aGljaCB0b2dldGhlciByZXByZXNlbnQgYSBzZXF1ZW5jZS5cclxuICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTGFzdCBub2RlIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBBZGRzIGFuIGVsZW1lbnQgdG8gdGhpcyBsaXN0LlxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxyXG4gICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXHJcbiAgICAqIHRoZSBlbGVtZW50IGlzIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhpcyBsaXN0LlxyXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxyXG4gICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5uRWxlbWVudHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLm5FbGVtZW50cyB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoaXRlbSk7XHJcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAwIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIC8vIEluc2VydCBhdCB0aGUgZW5kLlxyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXHJcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgaWYgKHByZXYgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHByZXYubmV4dDtcclxuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMrKztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xyXG4gICAgKiBlbXB0eS5cclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4geyp9IHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXHJcbiAgICAqIGVtcHR5LlxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZGVzaXJlZCBpbmRleC5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzXHJcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XHJcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGVcclxuICAgICAqIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGUgTGlzdCBkb2VzIG5vdCBjb250YWluIHRoaXMgZWxlbWVudC5cclxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxyXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XHJcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICogfVxyXG4gICAgICogPC9wcmU+XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxyXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXHJcbiAgICAgKiBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoaXMgbGlzdCBkb2VzIG5vdCBjb250YWluIHRoZVxyXG4gICAgICogZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXHJcbiAgICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgICAqXHJcbiAgICAgICAqIDxwcmU+XHJcbiAgICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcclxuICAgICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAgICogfVxyXG4gICAgICAgKiA8L3ByZT5cclxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxyXG4gICAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcclxuICAgICAgICogb3RoZXJ3aXNlLlxyXG4gICAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxyXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcclxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXHJcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAqXHJcbiAgICAgKiA8cHJlPlxyXG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xyXG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAqIH1cclxuICAgICAqIDwvcHJlPlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPCAxIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxyXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3R9IG90aGVyIHRoZSBvdGhlciBsaXN0LlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcclxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xyXG4gICAgICogYXJlIGN1c3RvbSBvYmplY3RzIHlvdSBzaG91bGQgcHJvdmlkZSBhIGZ1bmN0aW9uLCBvdGhlcndpc2VcclxuICAgICAqIHRoZSA9PT0gb3BlcmF0b3IgaXMgdXNlZCB0byBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbnRzLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlciwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTGlua2VkTGlzdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVyLnNpemUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsc0F1eCh0aGlzLmZpcnN0Tm9kZSwgb3RoZXIuZmlyc3ROb2RlLCBlcUYpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xyXG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoIWVxRihuMS5lbGVtZW50LCBuMi5lbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG4xID0gbjEubmV4dDtcclxuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXHJcbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxlbWVudDtcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDEpIHtcclxuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwcmV2aW91cy5uZXh0ID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IHByZXZpb3VzLm5leHQubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xyXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGN1cnJlbnROb2RlLmVsZW1lbnQpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcclxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmxhc3ROb2RlO1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxyXG4gICAgICogc2VxdWVuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheS48Kj59IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QsXHJcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cyA8PSAwO1xyXG4gICAgfTtcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBhcnJheXMudG9TdHJpbmcodGhpcy50b0FycmF5KCkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT09ICh0aGlzLm5FbGVtZW50cyAtIDEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jcmVhdGVOb2RlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbGVtZW50OiBpdGVtLFxyXG4gICAgICAgICAgICBuZXh0OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTGlua2VkTGlzdDtcclxufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XHJcbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtlZExpc3Q7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZExpc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoXCIuL0xpbmtlZExpc3RcIik7XHJcbnZhciBRdWV1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cclxuICAgICAqIEBjbGFzcyBBIHF1ZXVlIGlzIGEgRmlyc3QtSW4tRmlyc3QtT3V0IChGSUZPKSBkYXRhIHN0cnVjdHVyZSwgdGhlIGZpcnN0XHJcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xyXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xyXG4gICAgICAgIHRoaXMubGlzdCA9IG5ldyBMaW5rZWRMaXN0XzEuZGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmxpc3QuZmlyc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5maXJzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXHJcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcclxuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgKiB9XHJcbiAgICAgKiA8L3ByZT5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXHJcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcclxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5jb250YWlucyhlbGVtLCBlcXVhbHNGdW5jdGlvbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcclxuICAgICAqIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXHJcbiAgICAgKiBGSUZPIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXHJcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChjYWxsYmFjayk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFF1ZXVlO1xyXG59KCkpOyAvLyBFbmQgb2YgcXVldWVcclxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgaXRlbVxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiBsYXN0SW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwO1xyXG59XHJcbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGNoYW5nZWQgYWZ0ZXIgdGhpcyBjYWxsLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLnJlbW92ZSA9IHJlbW92ZTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5IGVxdWFsXHJcbiAqIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHdob3NlIGZyZXF1ZW5jeSBpcyB0byBiZSBkZXRlcm1pbmVkLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcclxuICogZXF1YWwgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBmcmVxdWVuY3koYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIHZhciBmcmVxID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICBmcmVxKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZyZXE7XHJcbn1cclxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBzcGVjaWZpZWQgYXJyYXlzIGFyZSBlcXVhbCB0byBvbmUgYW5vdGhlci5cclxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxyXG4gKiBvZiBlbGVtZW50cywgYW5kIGFsbCBjb3JyZXNwb25kaW5nIHBhaXJzIG9mIGVsZW1lbnRzIGluIHRoZSB0d29cclxuICogYXJyYXlzIGFyZSBlcXVhbCBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiB0aGUgb3RoZXIgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWxcclxuICovXHJcbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBsZW5ndGggPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZXF1YWxzKGFycmF5MVtpXSwgYXJyYXkyW2ldKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0cy5lcXVhbHMgPSBlcXVhbHM7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IHRvIGNvcHkuXHJcbiAqIEByZXR1cm4ge0FycmF5fSBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheVxyXG4gKi9cclxuZnVuY3Rpb24gY29weShhcnJheSkge1xyXG4gICAgcmV0dXJuIGFycmF5LmNvbmNhdCgpO1xyXG59XHJcbmV4cG9ydHMuY29weSA9IGNvcHk7XHJcbi8qKlxyXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIHN3YXAgZWxlbWVudHMuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIHRoZSBpbmRleCBvZiBvbmUgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgZGVmaW5lZCBhbmQgdGhlIGluZGV4ZXMgYXJlIHZhbGlkLlxyXG4gKi9cclxuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xyXG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gYXJyYXkubGVuZ3RoIHx8IGogPCAwIHx8IGogPj0gYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcclxuICAgIGFycmF5W2ldID0gYXJyYXlbal07XHJcbiAgICBhcnJheVtqXSA9IHRlbXA7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLnN3YXAgPSBzd2FwO1xyXG5mdW5jdGlvbiB0b1N0cmluZyhhcnJheSkge1xyXG4gICAgcmV0dXJuICdbJyArIGFycmF5LnRvU3RyaW5nKCkgKyAnXSc7XHJcbn1cclxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xyXG4vKipcclxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcclxuICogc3RhcnRpbmcgZnJvbSBpbmRleCAwIHRvIGxlbmd0aCAtIDEuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBpdGVyYXRlLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcclxuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICovXHJcbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIGFycmF5XzEgPSBhcnJheTsgX2kgPCBhcnJheV8xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcclxuICAgICAgICBpZiAoY2FsbGJhY2soZWxlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbmV4cG9ydHMuaGFzID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xyXG4gICAgcmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XHJcbn07XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbXBhcmUgZWxlbWVudCBvcmRlci5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XHJcbiAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhID09PSBiKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHRDb21wYXJlID0gZGVmYXVsdENvbXBhcmU7XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XHJcbiAgICByZXR1cm4gYSA9PT0gYjtcclxufVxyXG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xyXG4vKipcclxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0VG9TdHJpbmcoaXRlbSkge1xyXG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJyRzJyArIGl0ZW07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHRUb1N0cmluZyA9IGRlZmF1bHRUb1N0cmluZztcclxuLyoqXHJcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcclxuKi9cclxuZnVuY3Rpb24gbWFrZVN0cmluZyhpdGVtLCBqb2luKSB7XHJcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cclxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciB0b3JldCA9ICd7JztcclxuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5oYXMoaXRlbSwgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMpIHtcclxuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xyXG59XHJcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgIHJldHVybiAodHlwZW9mIG9iaikgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG59XHJcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcclxuLyoqXHJcbiAqIFJldmVyc2VzIGEgY29tcGFyZSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgdikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xyXG4vKipcclxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKSA9PT0gMDtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlVG9FcXVhbHMgPSBjb21wYXJlVG9FcXVhbHM7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiaW1wb3J0IHtcclxuICAgIGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxyXG4gICAgZ2V0UmFuZE51bWJlciwgZ2V0VmFyaWFibGUsIHNlcXVlbmNlLCBzZWxlY3RvciwgZXhlY3V0ZSwgUHJlY29uZGl0aW9uLCBnZXRBZ2VudFZhcmlhYmxlLCBuZWdfZ3VhcmQsIGd1YXJkLFxyXG4gICAgaXNWYXJpYWJsZU5vdFNldCwgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uLCBhZGRVc2VyQWN0aW9uLCBhZGRVc2VySW50ZXJhY3Rpb25UcmVlLCBpbml0aWFsaXplLFxyXG4gICAgZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXHJcbiAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dCwgYXJlQWRqYWNlbnQsIGFkZFVzZXJBY3Rpb25UcmVlXHJcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XHJcbi8vcmVxdWlyZShcIi4vc2NyaXB0aW5nLnRzXCIpO1xyXG5cclxuXHJcbnZhciByb3N0ZXIgPSBbXTsgLy9saXN0IG9mIGNoYXJhY3RlcnNcclxudmFyIG1pc3Npb25fYm9hcmQgPSBbXTsgLy9saXN0IG9mIG1pc3Npb25zXHJcbnZhciBpbWFnZXMgPSB7fTsgLy9kaWN0aW9uYXJ5IG9mIEltYWdlIG9iamVjdHMuIFxyXG52YXIgY2hhcl9idXR0b25zID0gW107Ly9saXN0IG9mIGJ1dHRvbnNcclxudmFyIG1pc3Npb25fYnV0dG9ucyA9IFtdOyAvL2xpc3Qgb2YgbWlzc2lvbiBidXR0b25zXHJcbnZhciBwb3B1cF9idXR0b25zID0gW107IC8vbGlzdCBvZiBidXR0b25zIGRpc3BsYXllZCBvbiBwb3B1cFxyXG52YXIgbG9jYXRpb25zID0ge307IC8vZGljdCBvZiBsb2NhdGlvbnNcclxuXHJcbnZhciBudW1fbWlzc2lvbnMgPSAwO1xyXG52YXIgbnVtX3N1Y2Nlc3NmdWwgPSAwO1xyXG52YXIgbnVtX2ZhaWxlZCA9IDA7XHJcblxyXG4vL2h0dHBzOi8vaW1ndXIuY29tL2Evam5RODBxOSBidXR0b24gc291cmNlXHJcblxyXG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52XCIpO1xyXG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5jb250ZXh0LmZvbnQgPSBcIjE1cHggU21hbGwgRm9udHNcIlxyXG4vL2NvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuXHJcbnZhciBERUZBVUxUX0NIQVJfWCA9IDEwMFxyXG52YXIgREVGQVVMVF9DSEFSX1kgPSAxMDBcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtzZXR1cCgpfTtcclxuLy9ldmVudHNcclxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja2VkKTtcclxuLy9wb3B1cFxyXG52YXIgcG9wO1xyXG4vL3Bhc3MgYnV0dG9uXHJcbnZhciBwYXNzO1xyXG4vL29rIGJ1dHRvblxyXG52YXIgb2s7XHJcbi8vdGljazogNyBkYXlzIHRvdGFsLiAyIHRpY2tzIHBlciBkYXkgKG1vcm4vZXZlKS4gRXZlbiB0aWNrcyBhcmUgbW9ybmluZyA9IG5ldyBkYXlcclxudmFyIGN1cnJlbnRfdGltZSA9IFwibW9ybmluZ1wiO1xyXG52YXIgY3VycmVudF9kYXkgPSAxO1xyXG5cclxudmFyIG1heF9zdGF0ID0gMTA7XHJcbnZhciBtYXhfYWZmaW5pdHkgPSAxMDtcclxuXHJcbnZhciB0ZXh0X2xvZyA9IFtcIkxvZzpcIiwgXCJUaGFua3MgZm9yIGNvbWluZyBpbiBvbiBzdWNoIHNob3J0IG5vdGljZSEgSSB3aWxsIGJlIGF3YXkgZm9yIGFib3V0IGEgd2VlayA8c3RyaWtlPmZpc2hpbmc8L3N0cmlrZT4gb24gYSB2ZXJ5IGltcG9ydGFudCBlcnJhbmQuPGJyPkx1Y2tpbHksIHRoaXMgY2FuIGFsc28gYWN0IGFzIHlvdXIgdHJpYWwgcGVyaW9kISBXaGlsZSB5b3UgdGFrZSBvdmVyIHRoZSByb2xlIG9mIGd1aWxkbWFzdGVyIGZvciBtZSwgeW91ciByZXNwb25zaWJpbGl0aWVzIHdpbGwgaW5jbHVkZSBhc3NpZ25pbmcgbWlzc2lvbnMgdG8gZ3VpbGQgbWVtYmVycyBiYXNlZCBvZmYgb2YgaG93IHdlbGwgdGhleSB3b3JrIHRvZ2V0aGVyIGFzIHdlbGwgYXMgdGhlaXIgaW5kaXZpZHVhbCBzdHJlbmd0aHM8YnI+VGhhdCdzIGl0LCB0aGF0J3MgdGhlIG9ubHkgcmVzcG9uc2liaWxpdHkuIFRob3NlIHdobyBhcmUgc3RpbGwgaGVyZSB3aWxsIGRvIHRoZWlyIG93biB0aGluZyBkdXJpbmcgdGhlIGRheS48YnI+SWYgeW91IGRvbid0IHdhbnQgdG8gYXNzaWduIGFueW9uZSBvbiBhIG1pc3Npb24gZHVyaW5nIHRoZSBkYXksIHRoYXQncyBmaW5lIHRvbyEgWW91IGNhbiBqdXN0IHVzZSB0aGUgW05FWFRdIGJ1dHRvbiB0byB3YWl0IGFyb3VuZC48YnI+SGF2ZSBmdW4hIElmIHRoZSBnYXplYm8gZmFsbHMgZG93biBhZ2FpbiBqdXN0IGdldCBMYW5kb2wgdG8gZml4IGl0IGZvciB5b3UsIGhlIHdpbGwgY29tcGxhaW4gYnV0IGl0IHdpbGwgYmUgd29ydGggaXQuXCJdO1xyXG5cclxudmFyIHNlbGVjdGVkMTtcclxudmFyIHNlbGVjdGVkMjsgLy9mb3IgdGVzdGluZyBtaXNzaW9uIGFzc2lnbm1lbnQuXHJcbnZhciBzZWxlY3RlZF9taXNzaW9uO1xyXG5cclxuY2xhc3MgQ2hhcmFjdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHN0YXRzLCBzcHIpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhdHMgPSB7J3N0cic6c3RhdHNbJ3N0ciddLCAnaW50JzpzdGF0c1snaW50J10sICdtYWcnOnN0YXRzWydtYWcnXX1cclxuICAgICAgICB0aGlzLmFmZmluaXR5ID0ge307XHJcbiAgICAgICAgdGhpcy5pc19vY2N1cGllZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbnNbXCJzdGFydFwiXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMubG9jYXRpb24pO1xyXG4gICAgICAgIC8vdGhpcy54ID0gREVGQVVMVF9DSEFSX1g7XHJcbiAgICAgICAgLy90aGlzLnkgPSBERUZBVUxUX0NIQVJfWTtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IGltYWdlc1tzcHJdO1xyXG4gICAgICAgIC8vdGhpcy5jaGFyX2ljb24gPSBjaGFyX2ljb25zW25hbWVdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlX2FmZmluaXR5KCkge1xyXG4gICAgICAgIC8vIGZvciAodmFyIGNoYXIgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgLy8gICAgIC8vY29uc29sZS5sb2coKTtcclxuICAgICAgICAvLyAgICAgaWYgKHJvc3RlcltjaGFyXS5uYW1lICE9IHRoaXMubmFtZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5hZmZpbml0eVtyb3N0ZXJbY2hhcl0ubmFtZV0gPSA0OyAvL2V2ZXJ5b25lIHN0YXJ0cyB3aXRoIDQgYWZmaW5pdHlcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL21heWJlIGRvIHJhbmRvbSBldmVudHVhbGx5XHJcbiAgICAgICAgc3dpdGNoKHRoaXMubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiTWluXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmZmluaXR5ID0ge1wiTGFuZG9sXCI6IDEsIFwiSG9yc3RcIjogNSwgXCJSb3J5XCIgOiA0LCBcIkRhbnRoXCIgOiAyfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTGFuZG9sXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmZmluaXR5ID0ge1wiTWluXCI6IDEsIFwiSG9yc3RcIjogMywgXCJSb3J5XCIgOiAyLCBcIkRhbnRoXCIgOiA1fTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiSG9yc3RcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7XCJNaW5cIjogNSwgXCJMYW5kb2xcIjogMywgXCJSb3J5XCIgOiA1LCBcIkRhbnRoXCIgOiAxfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiUm9yeVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHtcIk1pblwiOiA0LCBcIkhvcnN0XCI6IDUsIFwiTGFuZG9sXCIgOiAyLCBcIkRhbnRoXCIgOiAzfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRGFudGhcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7XCJNaW5cIjogMiwgXCJIb3JzdFwiOiAxLCBcIlJvcnlcIiA6IDMsIFwiTGFuZG9sXCIgOiA1fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgaW5jcmVhc2VfYWZmaW5pdHkoY2hhcikge1xyXG4gICAgICAgIC8vZmluZCBjaGFyYWN0ZXIsIGluY3JlbWVudCBudW1iZXIuIFxyXG4gICAgICAgIGlmICh0aGlzLm5hbWUgIT0gY2hhci5uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdID4gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVjcmVhc2VfYWZmaW5pdHkoY2hhcikge1xyXG4gICAgICAgIGlmICh0aGlzLm5hbWUgIT0gY2hhci5uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXS0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluY3JlYXNlX3N0YXQoc3RhdCwgYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0c1tzdGF0XSArPSBhbW91bnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHNbc3RhdF0gPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRzW3N0YXRdID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbW92ZSh4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICAvL2NvbnRleHQuZHJhd0ltYWdlKHRoaXMuY2hhcl9pY29uLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcbiAgICBzdGF0c190b3N0cigpIHtcclxuICAgICAgICB2YXIgc3QgPSB0aGlzLm5hbWUgKyBcIlxcblN0cjogXCIgKyB0aGlzLnN0YXRzW1wic3RyXCJdICsgXCJcXG5NYWc6IFwiICsgdGhpcy5zdGF0c1tcIm1hZ1wiXSArIFwiXFxuSW50OiBcIiArIHRoaXMuc3RhdHNbXCJpbnRcIl0rXCJcXG5TdGF0dXM6XCI7XHJcbiAgICAgICAgaWYodGhpcy5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHN0Kz1cIiBPdXQgb24gTWlzc2lvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0Kz1cIiBBdmFpbGFibGVcIlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3Q7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zcHJpdGUpO1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuc3ByaXRlLCB0aGlzLmxvY2F0aW9uLngsIHRoaXMubG9jYXRpb24ueSk7XHJcbiAgICB9XHJcbiAgICBzZXRfbG9jYXRpb24od2hlcmUpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25zW3doZXJlXTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBNaXNzaW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCByZXFfc3RhdCwgcmVxX3RvdGFsLCByZXdhcmQsIHdpbl90eHQsIGxvc2VfdHh0LCB0aWNrcywgZGF5KSB7XHJcbiAgICAgICAgLy9hbHdheXMgZ2FpbiArMSBhZmZpbml0eSBvbiBzdWNjZXNzLiBcclxuICAgICAgICAvL2Fsd2F5cyBsb3NlIC0xIGFmZmluaXR5IG9uIGZhaWx1cmVcclxuICAgICAgICAvL21heWJlIGFkZCB0eXBlXHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2M7XHJcbiAgICAgICAgdGhpcy5yZXFfc3RhdCA9IHJlcV9zdGF0OyAvL21heWJlIG1ha2UgdGhpcyBhbiBhcnJheVxyXG4gICAgICAgIHRoaXMucmVxX3RvdGFsID0gcmVxX3RvdGFsOyAvL3RoaXMgdG9vIFxyXG4gICAgICAgIHRoaXMucmV3YXJkID0gcmV3YXJkO1xyXG4gICAgICAgIHRoaXMud2luX3R4dCA9IHdpbl90eHQ7XHJcbiAgICAgICAgdGhpcy5sb3NlX3R4dCA9IGxvc2VfdHh0O1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAvL3Byb2JhYmx5IGFkZCBzdGFydF9kYXkgKHdoZW4gaXQgc2hvd3MgdXApIGFuZCBsZW5ndGggKGhvdyBtYW55IGRheXMgaXQgdGFrZXMpXHJcbiAgICAgICAgdGhpcy5jMSA9IG51bGw7IC8vdGhpcyBpcyB0aGUgY2hhcmFjdGVyIG5hbWUuXHJcbiAgICAgICAgdGhpcy5jMiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gLTE7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gLTE7XHJcbiAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4gICAgICAgIC8vcmV3YXJkID09IGRpZmZpY3VsdHkgZm9yIG5vd1xyXG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IHJld2FyZFxyXG4gICAgfVxyXG4gICAgYXNzaWduKGNoYXIxLCBjaGFyMikgeyAvL3Bhc3MgaW4gdGhlIG5hbWUuXHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IHRydWU7IFxyXG4gICAgICAgIHRoaXMuYzEgPSBjaGFyMTtcclxuICAgICAgICB0aGlzLmMyID0gY2hhcjI7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzEpO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMyKTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5pc19vbl9taXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5pc19vbl9taXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAvL2NoYXIxLmlzX29jY3VwaWVkID0gdHJ1ZTsgLy9tYXliZSBnZXQgZnJvbSBsaXN0XHJcbiAgICAgICAgLy9jaGFyMi5pc19vY2N1cGllZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBkb19taXNzaW9uKCkge1xyXG4gICAgICAgIG51bV9taXNzaW9ucysrO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMxKTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMik7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXFfc3RhdCArXCIgb2YgbW9yZSB0aGFuIFwiICsgdGhpcy5yZXFfdG90YWwpO1xyXG4gICAgICAgIHZhciBjb21iaW5lZF9zdGF0ID0gcm9zdGVyW3RoaXMuY2hhcjFfaV0uc3RhdHNbdGhpcy5yZXFfc3RhdF0gKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5zdGF0c1t0aGlzLnJlcV9zdGF0XTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRvdGFsIHBvaW50czogXCIgKyBjb21iaW5lZF9zdGF0KTtcclxuICAgICAgICBpZihjb21iaW5lZF9zdGF0ID49IHRoaXMucmVxX3RvdGFsKSB7IC8vbWFrZSBjaGVjayBmdW5jdGlvblxyXG4gICAgICAgICAgICAvL3Bhc3NcclxuICAgICAgICAgICAgdGhpcy52aWN0b3J5KClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbHVyZSgpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2aWN0b3J5KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgIG51bV9zdWNjZXNzZnVsKys7XHJcbiAgICAgICAgdGV4dF9sb2cucHVzaChcIk1pc3Npb246IFwiICsgdGhpcy50aXRsZSArIFwiIHdhcyBzdWNjZXNzZnVsITxicj5cIiArIHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMud2luX3R4dCk7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzEpO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMyKTtcclxuICAgICAgICAvL3RleHRfbG9nLnB1c2gocm9zdGVyW3RoaXMuY2hhcjFfaV0ubmFtZSArIFwiIGFuZCBcIiArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLm5hbWUgKyBcIiBoYXZlIHJldHVybmVkITxicj5UaGVpciBzdGF0ZW1lbnQ6IFwiICsgdGhpcy53aW5fdHh0KTtcclxuICAgICAgICAvL2luY3JlYXNlIHN0YXQgYnkgcmV3YXJkIGFtdFxyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmluY3JlYXNlX3N0YXQodGhpcy5yZXFfc3RhdCwgdGhpcy5yZXdhcmQpO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmluY3JlYXNlX3N0YXQodGhpcy5yZXFfc3RhdCwgdGhpcy5yZXdhcmQpO1xyXG4gICAgICAgIC8vaW5jcmVhc2UgYWZmaW5pdHlcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5pbmNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMl9pXSk7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaW5jcmVhc2VfYWZmaW5pdHkocm9zdGVyW3RoaXMuY2hhcjFfaV0pO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaCh0aGlzLndpbl90eHQpO1xyXG5cclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gZmFsc2U7IFxyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuICAgIGZhaWx1cmUoKSB7XHJcbiAgICAgICAgbnVtX2ZhaWxlZCsrO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJmYWlsdXJlXCIpO1xyXG4gICAgICAgIHRleHRfbG9nLnB1c2goXCJNaXNzaW9uOiBcIiArIHRoaXMudGl0bGUgKyBcIiBmYWlsZWQhPGJyPlwiKyByb3N0ZXJbdGhpcy5jaGFyMV9pXS5uYW1lICsgXCIgYW5kIFwiICsgcm9zdGVyW3RoaXMuY2hhcjJfaV0ubmFtZSArIFwiIGhhdmUgcmV0dXJuZWQhPGJyPlRoZWlyIHN0YXRlbWVudDogXCIgKyB0aGlzLmxvc2VfdHh0KTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaChyb3N0ZXJbdGhpcy5jaGFyMV9pXS5uYW1lICsgXCIgYW5kIFwiICsgcm9zdGVyW3RoaXMuY2hhcjJfaV0ubmFtZSArIFwiIGhhdmUgcmV0dXJuZWQhPGJyPlRoZWlyIHN0YXRlbWVudDogXCIgKyB0aGlzLmxvc2VfdHh0KTtcclxuICAgICAgICAvL2RlY3JlYXNlIGFmZmluaXR5XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uZGVjcmVhc2VfYWZmaW5pdHkocm9zdGVyW3RoaXMuY2hhcjJfaV0pO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmRlY3JlYXNlX2FmZmluaXR5KHJvc3Rlclt0aGlzLmNoYXIxX2ldKTtcclxuICAgICAgICAvL3RleHRfbG9nLnB1c2godGhpcy5sb3NlX3R4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTsgXHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNyZWFzZV90aW1lKCkge1xyXG4gICAgICAgIHRoaXMudGlja3MtLTtcclxuICAgICAgICBpZiAodGhpcy50aWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9fbWlzc2lvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpZmZpY3VsdHlfdG9zdHIoKSB7XHJcbiAgICAgICAgdmFyIHN0ciA9IFwiZGlmZmljdWx0eTogXCJcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGlmZmljdWx0eTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0cis9IFwiKlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBnZXRfZGVzYygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldHRpbmcgZnVsbCBkZXNjXCIpO1xyXG4gICAgICAgIHZhciBmdWxsX2Rlc2MgPSBcIi0tLVxcblwiICsgdGhpcy5kZXNjICsgXCJcXG5yZXF1aXJlcyBcIiArIHRoaXMucmVxX3N0YXQgKyBcIiwgXCIgKyB0aGlzLmRpZmZpY3VsdHlfdG9zdHIoKTtcclxuICAgICAgICByZXR1cm4gZnVsbF9kZXNjO1xyXG4gICAgfVxyXG5cclxufVxyXG4vL1N0YXJ0IHBvc2l0aW9uIGlzIDU3MCwgMzQ1XHJcbmNsYXNzIExvY2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHgsIHksIHN0YXQpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gZmFsc2U7IFxyXG4gICAgICAgIHRoaXMuY2hhcjEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hhcjIgPSBudWxsOyAvL2ZvciBhZmZpbml0eSBPTkxZXHJcbiAgICAgICAgdGhpcy5zdGF0ID0gbnVsbDtcclxuICAgICAgICBpZiAoc3RhdCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXQgPSBzdGF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGFzc2lnbihuYW1lLCBuYW1lMiA9IDApIHtcclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ID09IFwiYWZmaW5pdHlcIikge1xyXG4gICAgICAgICAgICAvL3R3byBjaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcjEgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXIyID0gbmFtZTI7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMSldLm1vdmUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjIpXS5tb3ZlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3N0YW5kYXJkIHN0YXQsIDEgY2hhclxyXG4gICAgICAgICAgICB0aGlzLmNoYXIxID0gbmFtZTtcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0ubW92ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZW5oYW5jZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ID09IFwiYWZmaW5pdHlcIikge1xyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjEpXS5pbmNyZWFzZV9hZmZpbml0eSh0aGlzLmNoYXIyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL29ubHkgb25lXHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMSldLmluY3JlYXNlX3N0YXQodGhpcy5zdGF0LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4vL3VzZWZ1bCB0aGluZ3NcclxuY2xhc3MgUG9wdXAge1xyXG4gICAgY29uc3RydWN0b3IgKHgsIHksIHR5cGUpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlc1t0eXBlXTtcclxuICAgICAgICB0aGlzLmlzX29wZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0X3BvcyA9IHRoaXMueSArIDMwO1xyXG5cclxuICAgIH1cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG4gICAgZGlzbWlzcygpIHtcclxuICAgICAgICB0aGlzLmlzX29wZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgZHJhd19jYW52YXMoKTtcclxuICAgICAgICAvL2NoZWNrIGZvciBtaXNzaW9uIHN0dWZmIGluIGhlcmUgLk1ha2Ugc3VyZSAyIGNoYXJzIHNlbGVjdGVkIGV0Y1xyXG4gICAgICAgIGlmKHNlbGVjdGVkMSAhPSBudWxsICYmIHNlbGVjdGVkMiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZV90aW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nIGluIHBvcHVwIGRpc21pc3NcIik7XHJcbiAgICAgICAgc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgICAgICBzZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgIHNlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgMiBpcyBub3cgXCIgKyBzZWxlY3RlZDIpO1xyXG4gICAgICAgIGZvcih2YXIgYiBpbiBjaGFyX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgY2hhcl9idXR0b25zW2JdLnByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgeCBpbiBwb3B1cF9idXR0b25zKSB7XHJcbiAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbeF0ucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgfVxyXG4gICAgd3JpdGVfdGV4dCh0ZXh0KSB7XHJcbiAgICAgICAgLy95ID0gc3RhcnRpbmcgeSBwb3NpdGlvbi4gXHJcbiAgICAgICAgdmFyIHR4dCA9IHRoaXMud3JhcF9wYXJhZ3JhcGhfdGV4dCh0ZXh0KTtcclxuICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHR4dC5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHR4dFtsXSwgdGhpcy54ICsgMTUsIHRoaXMudGV4dF9wb3MpO1xyXG4gICAgICAgICAgICB0aGlzLnRleHRfcG9zICs9IDIwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMudGV4dF9wb3MgPSB0aGlzLnkgKyAyMDtcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMudGV4dF94ICs9MjA7XHJcbiAgICAgICAgLy90aGlzLnRleHRfeSArPTIwO1xyXG4gICAgfVxyXG4gICAgLy90d28gYmVsb3cgZnVuY3Rpb25zIG1vZGlmaWVkIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5MzYxMTIvdGV4dC13cmFwLWluLWEtY2FudmFzLWVsZW1lbnRcclxuICAgIHdyYXBfcGFyYWdyYXBoX3RleHQodGV4dCkgeyBcclxuICAgICAgICByZXR1cm4gdGV4dC5zcGxpdChcIlxcblwiKS5tYXAocGFyYSA9PiB0aGlzLndyYXBfdGV4dChwYXJhKSkucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSk7IFxyXG4gICAgfVxyXG4gICAgd3JhcF90ZXh0KHRleHQpIHsgXHJcbiAgICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnRMaW5lID0gd29yZHNbMF07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmltYWdlLngpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXTtcclxuICAgICAgICAgICAgdmFyIHcgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KGN1cnJlbnRMaW5lICsgXCIgXCIgKyB3b3JkKS53aWR0aDtcclxuICAgICAgICAgICAgaWYgKHcgPCB0aGlzLmltYWdlLndpZHRoIC0gNTApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lICs9IFwiIFwiICsgd29yZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgPSB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgIHJldHVybiBsaW5lcztcclxuICAgIH1cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMudGV4dF9wb3MgPSB0aGlzLnkgKyAzMDtcclxuICAgIH1cclxuICAgIGRyYXdfcG9wdXBfYnV0dG9ucygpIHtcclxuICAgICAgICB2YXIgdGlueV94ID0gMjUwO1xyXG4gICAgICAgIGZvciAodmFyIGIgaW4gcG9wdXBfYnV0dG9ucykge1xyXG4gICAgICAgICAgICB2YXIgY2hhciA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBwb3B1cF9idXR0b25zW2JdLnRleHQpO1xyXG4gICAgICAgICAgICBpZighcm9zdGVyW2NoYXJdLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aW55X3ggPj0gdGhpcy5pbWFnZS53aWR0aCArIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbnlfeCA9IDQ1MFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dF9wb3MrPTQwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW55X3grPTgwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS54ID0gdGlueV94O1xyXG4gICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS55ID0gdGhpcy50ZXh0X3BvcztcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocG9wdXBfYnV0dG9uc1tiXS54ICsgXCIgLCBcIisgcG9wdXBfYnV0dG9uc1tiXS55KTtcclxuICAgICAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbYl0uZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcbiAgICBkcmF3X29rX2J1dHRvbigpIHtcclxuICAgICAgICBvay54ID0gNDU1O1xyXG4gICAgICAgIG9rLnkgPSB0aGlzLnRleHRfcG9zO1xyXG4gICAgICAgIG9rLmRyYXcoKTtcclxuICAgIH1cclxuICAgIGZpbGxfcG9wdXAodGV4dCwgYnV0dG9ucywgb2spIHtcclxuICAgICAgICB0aGlzLndyaXRlX3RleHQodGV4dCk7XHJcbiAgICAgICAgaWYoYnV0dG9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdfcG9wdXBfYnV0dG9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvaykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdfb2tfYnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmNsYXNzIEJ1dHRvbiB7IC8vZXhpc3RpbmcgZnJhbWV3b3Jrcz9cclxuICAgIGNvbnN0cnVjdG9yICh4LCB5LCB0eXBlLCB0ZXh0LCBwcmVzc2VkX3R5cGU9MCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2VzW3R5cGVdO1xyXG4gICAgICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJlc3NlZF9pbWFnZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iX3RleHRfcG9zID0gdGhpcy55ICsgMjA7XHJcbiAgICAgICAgaWYgKHByZXNzZWRfdHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzZWRfaW1hZ2UgPSBpbWFnZXNbcHJlc3NlZF90eXBlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLmFjdGlvbiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRfYWN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgfVxyXG4gICAgZG9fc29tZXRoaW5nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0X3RleHRfcG9zKCkge1xyXG4gICAgICAgIHRoaXMuYl90ZXh0X3BvcyA9IHRoaXMueSArIDIwO1xyXG4gICAgfVxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucHJlc3NlZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnByZXNzZWRfaW1hZ2UpO1xyXG4gICAgICAgIGlmICh0aGlzLnByZXNzZWQpIHtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5wcmVzc2VkX2ltYWdlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcmF3aW5nIHByZXNzZWRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL2NvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0aGlzLnggKyAxNTAsIHRoaXMueSArIDQ1KTtcclxuICAgIH1cclxuICAgIC8vdHdvIGJlbG93IGZ1bmN0aW9ucyBtb2RpZmllZCBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTM2MTEyL3RleHQtd3JhcC1pbi1hLWNhbnZhcy1lbGVtZW50XHJcbiAgICB3cmFwX3BhcmFncmFwaF90ZXh0KHRleHQpIHsgXHJcbiAgICAgICAgcmV0dXJuIHRleHQuc3BsaXQoXCJcXG5cIikubWFwKHBhcmEgPT4gdGhpcy53cmFwX3RleHQocGFyYSkpLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpOyBcclxuICAgIH1cclxuICAgIHdyYXBfdGV4dCh0ZXh0KSB7IFxyXG4gICAgICAgIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIHZhciBsaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBjdXJyZW50TGluZSA9IHdvcmRzWzBdO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5pbWFnZS54KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB3b3JkID0gd29yZHNbaV07XHJcbiAgICAgICAgICAgIHZhciB3ID0gY29udGV4dC5tZWFzdXJlVGV4dChjdXJyZW50TGluZSArIFwiIFwiICsgd29yZCkud2lkdGg7XHJcbiAgICAgICAgICAgIGlmICh3IDwgdGhpcy5pbWFnZS53aWR0aCAtIDE1KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSArPSBcIiBcIiArIHdvcmQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lID0gd29yZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsaW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcclxuICAgICAgICByZXR1cm4gbGluZXM7XHJcbiAgICB9XHJcbiAgICB3cml0ZV90ZXh0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ3cml0aW5nXCIpO1xyXG4gICAgICAgIHZhciB0eHQgPSB0aGlzLndyYXBfcGFyYWdyYXBoX3RleHQoXCJNaXNzaW9uOlxcblwiICsgdGhpcy50ZXh0KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHR4dCk7XHJcbiAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCB0eHQubGVuZ3RoOyBsKyspIHtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0eHRbbF0sIHRoaXMueCArIDE1LCB0aGlzLmJfdGV4dF9wb3MpO1xyXG4gICAgICAgICAgICB0aGlzLmJfdGV4dF9wb3MgKz0gMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzZXRfdGV4dF9wb3MoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBwcmVsb2FkX2ltZygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBpbWFnZXNcIik7XHJcbiAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25cIilcclxuICAgIC8vdmFyIHBvcHVwID0gbmV3IEltYWdlKCk7XHJcbiAgICAvL2J1dHRvbi5zcmMgPSBcImh0dHA6Ly9pNjMudGlueXBpYy5jb20vcjduZDQ0LmpwZ1wiO1xyXG4gICAgLy9wb3B1cC5zcmMgPSBcImh0dHA6Ly9pNjQudGlueXBpYy5jb20vMnc1aXVqNi5qcGdcIjtcclxuICAgIGltYWdlc1tcImJ1dHRvblwiXSA9IGJ1dHRvbjtcclxuICAgIGltYWdlc1tcIk1pblwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpO1xyXG4gICAgaW1hZ2VzW1wiTWluX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbl9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiTGFuZG9sXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5kb2xcIik7XHJcbiAgICBpbWFnZXNbXCJMYW5kb2xfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZG9sX3BcIik7XHJcbiAgICBpbWFnZXNbXCJSb3J5XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3J5XCIpO1xyXG4gICAgaW1hZ2VzW1wiUm9yeV9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3J5X3BcIik7XHJcbiAgICBpbWFnZXNbXCJIb3JzdFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9yc3RcIik7XHJcbiAgICBpbWFnZXNbXCJIb3JzdF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3JzdF9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiRGFudGhcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbnRoXCIpO1xyXG4gICAgaW1hZ2VzW1wiRGFudGhfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFudGhfcFwiKTtcclxuICAgIGltYWdlc1tcImJnXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiZ1wiKTtcclxuICAgIGltYWdlc1tcInRpbnlNaW5cIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnltaW5cIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55TWluX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnltaW5fcFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlMYW5kb2xcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlsYW5kb2xcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55TGFuZG9sX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlsYW5kb2xfcFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlIb3JzdFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWhvcnN0XCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUhvcnN0X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlob3JzdF9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueVJvcnlcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlyb3J5XCIpO1xyXG4gICAgaW1hZ2VzW1widGlueVJvcnlfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueXJvcnlfcFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlEYW50aFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWRhbnRoXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueURhbnRoX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlkYW50aF9wXCIpO1xyXG4gICAgaW1hZ2VzW1wicGFzc1wiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc1wiKTtcclxuICAgIGltYWdlc1tcIk1pbnNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluc3ByXCIpO1xyXG4gICAgaW1hZ2VzW1wiTGFuZG9sc3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5kb2xzcHJcIik7XHJcbiAgICBpbWFnZXNbXCJIb3JzdHNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9yc3RzcHJcIik7XHJcbiAgICBpbWFnZXNbXCJSb3J5c3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3J5c3ByXCIpO1xyXG4gICAgaW1hZ2VzW1wiRGFudGhzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbnRoc3ByXCIpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhpbWFnZXNbXCJiZ1wiXSk7XHJcbiAgICBpbWFnZXNbXCJwb3B1cFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXBcIik7XHJcbiAgICBpbWFnZXNbXCJva1wiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2tcIik7XHJcbiAgICBpbWFnZXNbXCJnYW1lZG9uZVwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZW92ZXJcIik7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX3Jvc3RlcigpIHtcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJNaW5cIix7J3N0cic6NywgJ21hZyc6MCwgJ2ludCc6IDN9LCBcIk1pbnNwclwiICkpOyAvL21ha2UgYSBkaWN0aW9uYXJ5L2xhYmVsIGl0XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiTGFuZG9sXCIseydzdHInOjAsICdtYWcnOjYsICdpbnQnOiA0fSwgXCJMYW5kb2xzcHJcIikpO1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIkhvcnN0XCIsIHsnc3RyJzo4LCAnbWFnJzowLCAnaW50JzogMn0sIFwiSG9yc3RzcHJcIikpO1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIlJvcnlcIiwgeydzdHInOjIsICdtYWcnOjYsICdpbnQnOiAyfSwgXCJSb3J5c3ByXCIpKTtcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJEYW50aFwiLCB7J3N0cic6MiwgJ21hZyc6MiwgJ2ludCc6IDZ9LCBcIkRhbnRoc3ByXCIpKTtcclxuICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgcm9zdGVyW2NdLmNyZWF0ZV9hZmZpbml0eSgpOyAvL3N0YXJ0IGF0IDI/XHJcbiAgICAgICAgYWRkQWdlbnQocm9zdGVyW2NdLm5hbWUpOyAvL2FkZCBhZ2VudCBmb3IgYmVoYXZpb3IgdHJlZVxyXG4gICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2NdKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfbWlzc2lvbnMoKSB7XHJcbiAgICAvL3RlbXBsYXRlOiBcclxuICAgIC8vbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwidGl0bGVcIiwgXCJkZXNjXCIsIFwic3RhdFwiLCA8dG90YWxwdHM+LCA8ZGlmZmljdWx0eT4sIFwid2luXCIsIFwibG9zZVwiLCA8bGVuKjI+LCA8YXBwZWFyZGF5PikpO1xyXG4gICAgLy9kYXkgMVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQW4gYW50aW1hZ2ljIHJhdCBoYXMgdGFrZW4gb3ZlciBteSBhdHRpYyBhbmQgbWF5IGJlIGJ1aWxkaW5nIGEgc21hbGwgbmF0aW9uIHN0YXRlXCIsIFwiSSBjYW4ndCBnZXQgdG8gbXkgZ3JhbmRwYXJlbnQncyBvbGQgcGhvdG9zIG5vdywgcGxlYXNlIGdldCBpdCBhdCBieSBhbnkgbWVhbnMgbmVjZXNzYXJ5IVwiLCBcInN0clwiLCA1LCAxLCBcIkkgZmxleGVkIGF0IHRoZSByYXQgYW5kIGl0IGxlZnQhXCIsIFwiVGhlIHJhdCBraW5nIHJhaW5zIHN1cHJlbWUgYW5kIHdpc2hlcyB0byBiZSBwYWlkIHJlcGFyYXRpb25zIHZpYSBjb3JuLlwiLCAyLCAxKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJMb3N0IGNhdFwiLCBcIlNuZWFreSBvbCcgZmx1ZmZlciBlc2NhcGVkIVwiLCBcImludFwiLCA1LCAxLCBcIldlIGZvdW5kIHRoZSBjYXQgYmVoaW5kIGEgZHVtcHN0ZXIuIFRoZSBvd25lciBzYWlkIHRoYXQgdGhlIGdsb3dpbmcgcmVkIGV5ZXMgYXJlIG5vcm1hbC4uP1wiLCBcIldoYXQgY2F0P1wiLCA0LCAxKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJNeSBzaGVlcCBrZWVwIG9uIGdvaW5nIG1pc3NpbmdcIiwgXCJXaGVyZSBhcmUgdGhleSBnb2luZz8gV2hhdCBhcmUgdGhleSBkb2luZz8gQXJlIHRoZXkgdGFsa2luZyBhYm91dCBtZT8/PyBJIGhhdmUgdG8ga25vdyFcIiwgXCJtYWdcIiwgOCwgMiwgXCJUaGV5IHdlcmUgYmVpbmcgdXNlZCBieSB0aGUgZ29ibGlucyBmb3IgZmFudGFzeSBmb290YmFsbC4gVGhleSB3ZXJlIHJldHVybmVkLCBzbGlnaHRseSBtb3JlIGFybW9yZWQuIFwiLCBcIlNoZWVwIGFyZW4ndCByZWFsLlwiLCA2LCAxKSk7XHJcbiAgICAvL2RheSAyXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJTbGltZXMgYXJlIGVhdGluZyBteSBwb3RhdG9lcyFcIiwgXCJJIGhhZCBvbmUgcGxhbiBhbmQgdGhhdCBwbGFuIHdhcyB3aGFja2luZyB0aGVtIHdpdGggYSBzd29yZCBhbmQgaXQgZGlkbid0IHdvcmsuXCIsIFwibWFnXCIsIDgsIDIsIFwiU2xpbWVzIHphcHBlZCwgbWlzc2lvbiBjb21wbGV0ZSFcIiwgXCJUaGUgc2xpbWVzIHNob29rIG9mZiBhbGwgdGhlIHBoeXNpY2FsIGRhbWFnZSB3ZSBjb3VsZCBkbyBzbyB3ZSBzaG92ZWQgdGhlbSBpbnRvIGEgaG9sZSBhbmQgaG9wZWQgZm9yIHRoZSBiZXN0LlwiLCAyLCAyKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJHb2JsaW5zIHdvbid0IHN0b3AgaGVja2xpbmcgbXkgc2hlZXBcIiwgXCJUaGV5J3JlIGdldHRpbmcgdmVyeSBzdHJlc3NlZCBvdXQhIEhlbHAhXCIsIFwic3RyXCIsIDEwLCAzLCBcIlRoZSBzaGVlcCBjYW4gc2hlZXAgaW4gcGVhY2Ugbm93IVwiLCBcIldlIGxvc3QsIGJ1dCBvbiB0aGUgYnJpZ2h0IHNpZGUgSSBkb24ndCB0aGluayBzaGVlcCB1bmRlcnN0YW5kIEVuZ2xpc2guXCIsIDYsIDIpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkkgdGhpbmsgR2VvcmdlIGlzIGEgdmFtcGlyZVwiLCBcIkhlIG5ldmVyIGVhdHMgYW5kIGhpcyBzaGlydHMgYXJlIGFsd2F5cyBzdGFpbmVkIHdpdGggYmxvb2QhXCIsIFwiaW50XCIsIDYsIDEsIFwiR2VvcmdlIGlzLi4uYSBzaHkgd2luZXJ5IHdvcmtlci4gV2UgYm91Z2h0IGhpbSBuZXcgc2hpcnRzLlwiLCBcIkdlb3JnZSBtb3ZlZCBvdXQgYmVmb3JlIHdlIGNvdWxkIHRhbGsgdG8gaGltLi4uXCIsIDIsIDIpKTtcclxuICAgIC8vZGF5IDNcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkFuIHVuZGVhZCBhcm15IGlzIGludmFkaW5nIVwiLCBcIlRIRVknVkUgR09UVEVOIElOVE8gVEhFIE1JTEsgQkFSTlMhIFdFJ1JFIERPT01FRCFcIiwgXCJtYWdcIiwgMTQsIDUsIFwid2luXCIsIFwibG9zZVwiLCA2LCAzKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJUSEUgU0tZIFRVUk5FRCBSRURcIiwgXCJXSFkgSVMgSVQgUkVEPz8/XCIsIFwiaW50XCIsIDYsIDEsIFwiSXQuLi53ZSBoYWQgdG8gc3BlbmQgMyBob3VycyBleHBsYWluaW5nIHRoZSBzdW5zZXQgdG8gYSBmYW1pbHkgb2YgNi4gSSBtZWFuIG1vbmV5IGlzIG1vbmV5IGJ1dCBob3cnZCB0aGlzIG1pc3Npb24gZXZlbiBnZXQgb24gb3VyIGxpc3QuXCIsIFwiV2Ugc3RvcHBlZCBieSBhbmQgdGhleSB1aGhoLi5zYWlkIGEgbG90IG9mIHdvcmRzIGFuZCBhZnRlciBhbiBob3VyIHdlIGdyYWNpb3VzbHkganVtcGVkIG91dCB0aGUgd2luZG93IHRvIGVzY2FwZS4gXCIsIDIsIDMpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkxpY2ggS2luZyBjYXVzaW5nIGEgcnVja3VzXCIsIFwiVW5ob2x5IG1hZ2ljcyBhbmQgbG91ZCwgYm9vbWluZyBub2lzZXMgYXJlIGNvbWluZyBmcm9tIHRoZSBsaWNoJ3Mga2VlcCwgc2VuZCBoZXIgYSB3YXJuaW5nIVwiLCBcIm1hZ1wiLCAxMiwgNCwgXCJPdXIgbWFnaWMgd2FzIGNvb2xlciB0aGFuIGhlcnMgc28gc2hlIGFncmVlZCB0byBtb3ZlIGhlciBwYXJ0eSBkZWVwZXIgdW5kZXJncm91bmRcIiwgXCJMaWNoIFxcXCJQYXJ0eWJyb2R1ZGVmZWxsYVxcXCIgd2FzIGRlZXBseSB1bmltcHJlc3NlZCBieSB1cyBhbmQgdHVybmVkIHVwIGhlciBkdWJzdGVwIGxvdWRlclwiLCA2LCAzKSk7XHJcbiAgICAvL2RheSA0XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBIGZpc2ggbGVhcm5lZCB0byB3YWxrIG9uIGxhbmQgYW5kIGhlcyB1c2luZyBoaXMgbGVncyBleGNsdXNpdmVseSBmb3IgZXZpbFwiLCBcIkhlIGNhbid0IGhhbmRsZSB0aGUgcmVzcG9uc2liaWxpdHkgb2YgaGF2aW5nIGxlZ3MhIEhlJ3MgcmFpc2luZyBhIHRhZHBvbGUgYXJteSFcIiwgXCJzdHJcIiwgMTAsIDMsIFwiSGUgZ290IHN1cGxleGVkIGJhY2sgaW50byB0aGUgb2NlYW4hXCIsIFwiSGlzIGV2aWwgY29udGludWVzLi4uLi50aGUgbmVmZXJpb3VzIENhcHRhaW4gTGVnYmVhcmRcIiwgMiwgNCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiRm9sbG93IG15IGNhdCBhcm91ZCB0byBzZWUgd2hhdCBzaGUgZG9lcyBhbGwgZGF5XCIsIFwiSSBsb3NlIGhlciBldmVyeSB0aW1lIEkgdHJ5LCBJIGhhdmUgdG8ga25vdyFcIiwgXCJpbnRcIiwgOCwgMiwgXCJEZWFyIGdvZCB0aGlzIGNhdCBnZXRzIHNvIG1hbnkgdHJlYXRzLiBQbGVhc2Ugc3RvcCBmZWVkaW5nIGhlciBzaGVzIHRvbyBwb3dlcmZ1bC5cIiwgXCJPdXRzbWFydGVkIGJ5IGEgY2F0Li4uLmp1c3QgYW5vdGhlciBub3JtYWwgZGF5IGhvbmVzdGx5XCIsIDIsIDQpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlN0b3AgdGhlc2Ugd2Vla2x5IGJhcmZpZ2h0cyFcIiwgXCJFdmVyeSBXZWRuZXNkYXkgYW4gZWxmIGFuZCBhbiBvcmMgY29tZSB0byBteSBiYXIsIGFuZCB0aGV5IGFsd2F5cyBlbmQgdXAgZmlnaHRpbmchIEkgZG9uJ3QgdW5kZXJzdGFuZCB3aHkgdGhleSBkb24ndCBqdXN0IGNvbWUgb24gZGlmZmVyZW50IGRheXMhXCIsIFwic3RyXCIsIDgsIDIsIFwiVGhleSBzdGFydGVkIHRocm93aW5nIGNoYWlycyBhZ2FpbiBzbyB3ZSBhbHNvIHRocmV3IGNoYWlycyBhdCB0aGVtLiBUaGV5IHdlcmUgZm9yY2VkIHRvIHRlYW0gdXAgYWdhaW5zdCB1cyBhbmQgYm9uZGVkIG92ZXIgdGhlaXIgc2hhcmVkIGRlZmVhdC4gVGhlaXIgd2VkZGluZyBpcyBuZXh0IHdlZWssIEkgdGhpbmsgdGhlIHByb2JsZW0gaXMgc29sdmVkXCIsIFwiV2UgY291bGRuJ3Qgc3RvcCB0aGVtLiBJIHdvbmRlciBpZiB0aGV5J2xsIHN0aWxsIGJlIGF0IGl0IHdoZW4gSSBoYXZlIGdyYW5ka2lkcy4uLlwiLCA0LCA0KSk7XHJcbiAgICAvL2RheSA1XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJLcmFrZW4gd29uJ3Qgc3RvcCByZWFycmFuZ2luZyB0aGUgYm9hdHMgYXQgdGhlIGRvY2sgZXZlcnkgbmlnaHQhXCIsIFwiV2UgZG9uJ3QgbmVlZCBvdXIgYm9hdHMgb3JkZXJlZCBieSBjb2xvciEgV2UgbmVlZCB0aGVtIHdoZXJlIHdlIHBhcmtlZCB0aGVtIVwiLCBcIm1hZ1wiLCAxMiwgNCwgXCJUdXJucyBvdXQsIHNoZSBqdXN0IG5lZWRlZCBhIHRyYW5zbGF0b3IuIFdlIHNldCB1cCBhIG1hZ2ljYWwgb25lIGFuZCBub3cgdGhlIEtyYWtlbiBnZXRzIGEgc2FsYXJ5IG9mIGZpc2ggdG8ga2VlcCB0cmFjayBvZiBhbGwgdGhlIGJvYXRzXCIsIFwiV2VsbCBJIGd1ZXNzIHRoZXknbGwganVzdCBoYXZlIHRvIGFjY2VwdCB0aGVpciBuZXcgb3JnYW5pemF0aW9uYWwgb3ZlcmxvcmRcIiwgNCwgNSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiVkVSWSBMQVJHRSBCRUFSISBWRVJZIFZFUlkgTEFSR0UgQkVBUiEhXCIsIFwiQkVBUiBMQVJHRVwiLCBcInN0clwiLCAxMCwgMywgXCJHb29kIG5ld3MsIHdlIHdvbiEgQmFkIG5ld3MsIGl0IHdhcyBhIGRyYWdvbi5cIiwgXCJJVCBXQVMgTk9UIEEgQkVBUiFcIiwgMiwgNSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQSBiaWcgcm9jayBpcyBmYWxsaW5nIGZyb20gdGhlIHNreSBidXQgaXQncyBwcm9iYWJseSBmaW5lXCIsIFwiSSBtZWFuIGEgZmlyZXkgZGVhdGggZG9lc24ndCBzb3VuZCBsaWtlIHRoZSB3b3JzdCB0aGluZyBpbiB0aGUgd29ybGRcIiwgXCJtYWdcIiwgMTQsIDUsIFwiV2UgbWFkZSBhIGJpZyBiYXQgb3V0IG9mIG1hZ2ljIGFuZCB3aGFja2VkIGl0IHNvbWV3aGVyZSBlbHNlIVwiLCBcIml0IHdhcyBub3QgZmluZSEhIVwiLCA0LCA1KSk7XHJcbiAgICAvL2RheSA2XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJTb21lb25lJ3Mgc3RvbGVuIHRoZSB0b3duIGZsYWchXCIsIFwiV2UgbmVlZCBvdXIgZmxhZyFcIiwgXCJpbnRcIiwgOCwgMiwgXCJXZSBmb3VuZCBpdCBpbiBhIHNob3BwaW5nIGNhcnQgMTAgbWlsZXMgYXdheVwiLCBcIldlIGNvdWxkbid0IGZpbmQgaXQgc28gd2UgcmVwbGFjZWQgdGhlIGZsYWcgd2l0aCBhIGNvYXQgc29tZW9uZSBsZWZ0IG91dD9cIiwgMiwgNikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiR29sZW0gcmFtcGFnaW5nIHRocm91Z2ggdG93biFcIiwgXCJJVCdTIERFU1RST1lJTkcgVEhFIEZMT1dFUlMgQU5EIE9OTFkgVEhFIEZMT1dFUlMhIVwiLCBcInN0clwiLCAxMiwgNCwgXCJXZSBoYWNrZWQgaXQhIFdpdGggYW4gYXhlLiBCdXQgc29tZWhvdyB0aGlzIGZpeGVkIGl0IGFuZCBub3cgaXRzIGEgbm9ybWFsIGdhcmRlbmluZyBnb2xlbSFcIiwgXCJJdCBiZWF0IHVzIHVwIGFuZCByYW4gaW50byB0aGUgY291bnRyeXNpZGUgdG8gY2FzdHJhdGUgbW9yZSBwbGFudHNcIiwgMiwgNikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQSB0aW55IGRyYWdvbiB3b24ndCBnZXQgb3V0IG9mIG15IHNpbHZlcndlYXIgY2FiaW5ldCFcIiwgXCJOb3cgbm9ybWFsbHkgdGhpcyB3b3VsZG4ndCBiZSBhbiBpc3N1ZSBidXQgb3VyIGhvdXNlIGlzIHZlcnkgZmxhbW1hYmxlISBXZSBkb24ndCBrbm93IGhvdyB0byBtb3ZlIGl0IHNhZmVseS5cIiwgXCJpbnRcIiwgMTAsIDMsIFwiTGlsIGd1eSBqdXN0IHdhbnRzIHRvIGhvYXJkIHNwb29ucy4gV2UgbWFkZSBoaW0gYSBwaWxlIG9mIGRvbmF0ZWQgc3Bvb25zIG91dCBpbiB0aGUgd29vZHMgYW5kIGhlIHNlZW1zIHZlcnkgaGFwcHkhXCIsIFwiV2VsbCB0aGUgZHJhZ29uJ3Mgb3V0IG9mIHRoZSBjYWJpbmV0LCBidXQgdGhlaXIgaG91c2UgaXMuLi5zbGlnaHRseS4uLi5hYmxhemUuXCIsIDIsIDYpKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gbG9nX3RleHQoKSB7XHJcbiAgICB2YXIgbGdfdHh0ID0gXCJcIjtcclxuICAgIGZvciAodmFyIGUgaW4gdGV4dF9sb2cpIHtcclxuICAgICAgICBsZ190eHQgKz0gdGV4dF9sb2dbZV0gKyBcIjxicj4gKiAqICogPGJyPlwiO1xyXG4gICAgfVxyXG4gICAgdmFyIGRpdl9sb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKVxyXG4gICAgXHJcbiAgICBkaXZfbG9nLmlubmVySFRNTCA9IGxnX3R4dDtcclxuICAgIGRpdl9sb2cuc2Nyb2xsVG9wID0gZGl2X2xvZy5zY3JvbGxIZWlnaHQ7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX2xvY2F0aW9ucygpIHtcclxuICAgIHZhciBzdHJfbG9jID0gbmV3IExvY2F0aW9uKFwiVHJhaW5pbmcgRHVtbXlcIiwgMzgwLCAzMTUsIFwic3RyXCIpO1xyXG4gICAgdmFyIG1hZ19sb2MgPSBuZXcgTG9jYXRpb24oXCJNYWdpYyBUb3dlclwiLCA2NzAsIDEyMCwgXCJtYWdcIik7XHJcbiAgICB2YXIgaW50X2xvYyA9IG5ldyBMb2NhdGlvbihcIkxpYnJhcnlcIiwgNTcwLCAyODAsIFwiaW50XCIpO1xyXG4gICAgdmFyIGFmZl9sb2MgPSBuZXcgTG9jYXRpb24oXCJHYXplYm9cIiwgNDA1LCAxMzUsIFwiYWZmaW5pdHlcIik7XHJcbiAgICB2YXIgYWZmX2xvYzIgPSBuZXcgTG9jYXRpb24oXCJHYXplYm9cIiwgNDM1LCAxMzUsIFwiYWZmaW5pdHlcIik7XHJcbiAgICB2YXIgc3RhcnRfbG9jID0gbmV3IExvY2F0aW9uKFwiT3V0c2lkZVwiLCA2MDAsIDMxNSk7XHJcbiAgICBsb2NhdGlvbnNbXCJzdGFydFwiXSA9IHN0YXJ0X2xvYztcclxuICAgIGxvY2F0aW9uc1tcInN0clwiXSA9IHN0cl9sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJtYWdcIl0gPSBtYWdfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wiaW50XCJdID0gaW50X2xvYztcclxuICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MVwiXSA9IGFmZl9sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0gPSBhZmZfbG9jMjtcclxuXHJcbn1cclxuZnVuY3Rpb24gZmluZF9pbl9saXN0KHR5cGUsIHRvX3NlYXJjaCkge1xyXG4gICAgaWYgKHR5cGUgPT0gXCJyb3N0ZXJcIikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9zdGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyb3N0ZXJbaV0ubmFtZSA9PSB0b19zZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwibWlzc2lvblwiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXNzaW9uX2JvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtaXNzaW9uX2JvYXJkW2ldLnRpdGxlID09IHRvX3NlYXJjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5mdW5jdGlvbiBkcmF3X2NhbnZhcygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZHJhd2luZyBjYW52YXNcIik7XHJcbiAgICBsb2dfdGV4dCgpO1xyXG4gICAgLy9zdHVmZiB0byByZWRyYXcgd2hlbiBwb3B1cCBjbG9zZXMuIFxyXG4gICAgLy8gb3V0bGluZVxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQubGluZVdpZHRoID0gXCI2XCI7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgY29udGV4dC5yZWN0KDAsIDAsIDgwMCwgNjUwKTtcclxuICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlc1tcImJnXCJdKTtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcImJnXCJdLCAwLCAwKTsgLy9kcmF3IGJnXHJcbiAgICBkcmF3X2NoYXJhY3Rlcl9idXR0b25zKCk7XHJcbiAgICBkcmF3X2NoYXJhY3RlcnMoKTtcclxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJEYXkgXCIgKyBjdXJyZW50X2RheSArIFwiLCBcIiArIGN1cnJlbnRfdGltZSwgNjc1LCA1NzUpO1xyXG59XHJcbmZ1bmN0aW9uIGRyYXdfZ2FtZV9kb25lKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJkb25lXCIpO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiZ2FtZWRvbmVcIl0sIDAsIDApOyAvL2RyYXcgZG9uZVxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgIGNvbnRleHQuZm9udCA9IFwiMjRweCBTbWFsbCBGb250c1wiXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTWlzc2lvbnMgQXR0ZW1wdGVkOiBcIiArIG51bV9taXNzaW9ucywgMzAwLCAzNjApO1xyXG4gICAgY29udGV4dC5maWxsVGV4dChcIk1pc3Npb25zIFN1Y2NlZWRlZDogXCIgKyBudW1fc3VjY2Vzc2Z1bCwgMzAwLCA0MDApO1xyXG4gICAgY29udGV4dC5maWxsVGV4dChcIk1pc3Npb25zIEZhaWxlZDogXCIgKyBudW1fZmFpbGVkLCAzMDAsIDQ0MCk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlX3RpbWUoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInVwZGF0ZSB0aW1lIHJlc2V0XCIpO1xyXG4gICAgcG9wLmlzX29wZW4gPSBmYWxzZTtcclxuICAgIHNlbGVjdGVkMSA9IG51bGw7XHJcbiAgICBzZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAvL3BvcC5kaXNtaXNzKCk7XHJcblxyXG4gICAgLy9maXJzdDogaGF2ZSBjaGFyYWN0ZXJzIGRvIHRoZWlyIGFjdGlvbnNcclxuICAgIG1vdmVfY2hhcmFjdGVycygpO1xyXG4gICAgLy9uZXh0LCB1cGRhdGUgdGltZS5cclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJtb3JuaW5nXCIpIHtcclxuICAgICAgICBjdXJyZW50X3RpbWUgPSAgXCJldmVuaW5nXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGN1cnJlbnRfdGltZSA9IFwibW9ybmluZ1wiO1xyXG4gICAgICAgIGN1cnJlbnRfZGF5Kys7XHJcbiAgICAgICAgdmFyIGludGVydmFsSUQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZGF5X2NoYW5nZSwgMTAwKTtcclxuICAgICAgICBmdW5jdGlvbiBjbGVhcihpZCl7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaWQpXHJcbiAgICAgICAgfSAgICBcclxuICAgICAgICBzZXRJbnRlcnZhbChjbGVhcihpbnRlcnZhbElEKSwgMzAwMClcclxuICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy91cGRhdGUgbWlzc2lvbiBib2FyZFxyXG4gICAgfVxyXG4gICAgLy9mb3IgZXZlcnkgbWlzc2lvbiBhc3NpZ25lZCwgdXBkYXRlZCB0aGUgdGltZSBzdHVmZlxyXG4gICAgZm9yICh2YXIgbSBpbiBtaXNzaW9uX2JvYXJkKSB7XHJcbiAgICAgICAgaWYgKG1pc3Npb25fYm9hcmRbbV0uYXNzaWduZWQpIHtcclxuICAgICAgICAgICAgbWlzc2lvbl9ib2FyZFttXS5kZWNyZWFzZV90aW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd19jYW52YXMoKTsgLy9yZWRyYXcgdGV4dC5cclxuICAgIGlmIChjdXJyZW50X2RheSA9PSA3KSB7XHJcbiAgICAgICAgdGV4dF9sb2cucHVzaChcIldoZXchIExvb2tzIGxpa2UgZXZlcnlvbmXigJlzIHN0aWxsIGluIG9uY2UgcGllY2UhIFRoYW5rcyBmb3IgdGFraW5nIGNhcmUgb2YgdGhpbmdzIHdoaWxlIEkgd2FzIG91dC4gQmVpbmcgYSBHdWlsZG1hc3RlciBpcyB0b3VnaCB3b3JrLCB5b3UgZGlkIGdyZWF0ISBJ4oCZbGwgdGFrZSBvdmVyIGZyb20gaGVyZSwgYnV0IGhleSwgd2hlbiBJIHJldGlyZSBmb3IgcmVhbCB5b3UgZ290IGEgcmVhbCBzb2xpZCBzaG90IGF0IHRha2luZyBteSBwb3NpdGlvbiEgU2VlIHlvdSBhcm91bmQhXCIpO1xyXG4gICAgICAgIGxvZ190ZXh0KCk7XHJcbiAgICAgICAgZHJhd19nYW1lX2RvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGV4dF9sb2cucHVzaChcIkRheSBcIiArIGN1cnJlbnRfZGF5ICsgXCIsIFwiICsgY3VycmVudF90aW1lKTtcclxuICAgIH1cclxuICAgIC8vY2hhcmFjdGVycyBhbHdheXMgbW92ZVxyXG5cclxuICAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBkYXlfY2hhbmdlKCl7XHJcbiAgICAvL05ldyBkYXkgc2NyZWVuXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgOTAwLCA2NTAsKTtcclxuXHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZHJhd19jaGFyYWN0ZXJzKCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImluIGRyYXcgY2hhcmFjdGVyc1wiKTtcclxuICAgIGZvciAodmFyIGNoYXIgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgaWYoIXJvc3RlcltjaGFyXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltjaGFyXS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG1vdmVfY2hhcmFjdGVycygpIHtcclxuICAgIC8vcmFuZG9tIHRoZSBjaGFyYWN0ZXIgb3JkZXIgZm9yIHRob3NlIHdobyBhcmVudCBidXN5XHJcbiAgICBjb25zb2xlLmxvZyhcImluIG1vdmUgY2hhclwiKTtcclxuICAgIC8vZ2V0X3JhbmRvbV9jaGFyX2xpc3QoKTtcclxuICAgIC8vTmVlZCB0byBzdG9wIG9uY2UgZXZlcnkgY2hhcmFjdGVyIGlzIGFzc2lnbmVkLiBcclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJtb3JuaW5nXCIpIHtcclxuICAgICAgICBmb3IgKHZhciBjaCBpbiByb3N0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFyb3N0ZXJbY2hdLmlzX29jY3VwaWVkICYmICFyb3N0ZXJbY2hdLmlzX29uX21pc3Npb24pIHsgLy9pZiBjaGFyYWN0ZXIgaXNuJ3Qgb24gYSBtaXNzaW9uIG9yIGFscmVhZHkgb2NjdXBpZWRcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobG9jYXRpb25zKTtcclxuICAgICAgICAgICAgICAgIC8vc2VsZWN0X2FjdGlvbihyb3N0ZXJbY2hdKTtcclxuICAgICAgICAgICAgICAgIGF0dGFjaFRyZWVUb0FnZW50KHJvc3RlcltjaF0ubmFtZSwgc2VsZWN0X2FjdGlvbihyb3N0ZXJbY2hdKSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJvc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd29ybGRUaWNrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vZXZlbmluZywgZXZlcnlvbmUgZ29lcyB0byBzdGFydFxyXG4gICAgICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltjXS5zZXRfbG9jYXRpb24oXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgcm9zdGVyW2NdLmlzX29jY3VwaWVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWxsIGxvY2F0aW9ucyBhcmUgdW5vY2N1cGllZCBcclxuICAgICAgICBsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJpbnRcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbmZ1bmN0aW9uIGRyYXdfY2hhcmFjdGVyX2J1dHRvbnMoKSB7XHJcbiAgICAvL3ZhciB5ID0gNTA7XHJcbiAgICBmb3IgKHZhciBiIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgIGNoYXJfYnV0dG9uc1tiXS5kcmF3KCk7XHJcbiAgICB9XHJcbiAgICBwYXNzLmRyYXcoKTtcclxuICAgIGZvciAodmFyIGIgaW4gbWlzc2lvbl9idXR0b25zKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50X2RheSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhtaXNzaW9uX2JvYXJkW2JdLmRheSlcclxuICAgICAgICBpZihjdXJyZW50X2RheSA9PSBtaXNzaW9uX2JvYXJkW2JdLmRheSAmJiAhbWlzc2lvbl9ib2FyZFtiXS5hc3NpZ25lZCkge1xyXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbnNbYl0uZHJhdygpO1xyXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbnNbYl0ud3JpdGVfdGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vY29udGV4dC5kcmF3SW1hZ2UoY2hhcl9idXR0b25zWzBdLmltYWdlLCBjaGFyX2J1dHRvbnNbMF0ueCwgY2hhcl9idXR0b25zWzBdLnkpO1xyXG4gICAgXHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX2J1dHRvbnMoKSB7XHJcbiAgICBwb3AgPSBuZXcgUG9wdXAoMzAwLCAyMDAsIFwicG9wdXBcIik7XHJcbiAgICB2YXIgeSA9IDIwO1xyXG4gICAgdmFyIHRpbnlfeCA9IDMxMDtcclxuICAgIHZhciB0aW55X3kgPSAyODBcclxuICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgdmFyIGNoYXJfbmFtZSA9IHJvc3RlcltjXS5uYW1lO1xyXG4gICAgICAgIHZhciBiID0gbmV3IEJ1dHRvbigxMCwgeSwgY2hhcl9uYW1lLCBjaGFyX25hbWUsIGNoYXJfbmFtZStcIl9wXCIpO1xyXG4gICAgICAgIHZhciBuID0gXCJ0aW55XCIrY2hhcl9uYW1lXHJcbiAgICAgICAgdmFyIHRpbnlfYiA9IG5ldyBCdXR0b24oMCwgMCwgbiwgY2hhcl9uYW1lLCBuK1wiX3BcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpbWFnZXNbbitcIl9wXCJdKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGltYWdlcyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhuKTtcclxuICAgICAgICBwb3B1cF9idXR0b25zLnB1c2godGlueV9iKTtcclxuICAgICAgICBjaGFyX2J1dHRvbnMucHVzaChiKTtcclxuICAgICAgICB5Kz02MDtcclxuICAgIH1cclxuICAgIHkrPTEzMDtcclxuICAgIHZhciB4PSAyMDtcclxuICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICBmb3IgKHZhciBjIGluIG1pc3Npb25fYm9hcmQpIHtcclxuICAgICAgICAvL2hhcmQgY29kZWQgYW5kIGhhY2t5LCAzIG1pc3Npb25zIHBlciBkYXlcclxuICAgICAgICBpZiAoY291bnQgPT0gMykge1xyXG4gICAgICAgICAgICB4ID0gMjA7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh4KTtcclxuICAgICAgICB2YXIgbWlzc2lvbl90aXRsZSA9IG1pc3Npb25fYm9hcmRbY10udGl0bGU7XHJcbiAgICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIHksIFwiYnV0dG9uXCIsIG1pc3Npb25fdGl0bGUpO1xyXG4gICAgICAgIG1pc3Npb25fYnV0dG9ucy5wdXNoKGIpO1xyXG4gICAgICAgIHgrPTIyMDtcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuICAgIHBhc3MgPSBuZXcgQnV0dG9uKDYzMCwgNTgwLCBcInBhc3NcIiwgXCJwYXNzXCIpO1xyXG4gICAgb2sgPSBuZXcgQnV0dG9uKDAsMCxcIm9rXCIsIFwib2tcIik7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrQm91bmRzKG9iamVjdCwgeCwgeSkge1xyXG4gICAgdmFyIG1pblggPSBvYmplY3QueDtcclxuICAgIHZhciBtYXhYID0gb2JqZWN0LnggKyBvYmplY3QuaW1hZ2Uud2lkdGg7XHJcbiAgICB2YXIgbWluWSA9IG9iamVjdC55O1xyXG4gICAgdmFyIG1heFkgPSBvYmplY3QueSArIG9iamVjdC5pbWFnZS5oZWlnaHQ7XHJcbiAgICB2YXIgbXggPSB4O1xyXG4gICAgdmFyIG15ID0geTtcclxuICAgIC8vY29uc29sZS5sb2coXCJGb3Igb2JqZWN0IFwiICsgb2JqZWN0LnRleHQpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImJ1dHRvbiB4IHJhbmdlOlwiICsgbWluWCArIFwiIHRvIFwiICsgbWF4WCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiYnV0dG9uIHkgcmFuZ2U6XCIgKyBtaW5ZICsgXCIgdG8gXCIgKyBtYXhZKTtcclxuXHJcbiAgICBpZiAobXggPj0gbWluWCAmJiBteCA8PSBtYXhYICYmIG15ID49IG1pblkgJiYgbXkgPD0gbWF4WSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmZ1bmN0aW9uIGNsaWNrZWQoZSkge1xyXG4gICAgLy9vbmx5IHdhbnQgdG8gb3BlbiBwb3B1cCB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgLy9jbG9zZSBwb3B1cCB3aGVuIHBvcHVwIGlzIGNsaWNrZWQgb2ZmLiBcclxuXHJcbiAgICAvL2ZpZ3VyZSBvdXQgd2hhdCB3YXMgY2xpY2tlZCBmaXJzdC4gXHJcbiAgICAvL2NvbnNvbGUubG9nKFwibW91ZXMgcG9zOiBcIiArIGUuY2xpZW50WCArIFwiLCBcIiArIGUuY2xpZW50WSk7IC8vZGVidWdnaW5nXHJcbiAgICBpZighcG9wLmlzX29wZW4pe1xyXG4gICAgICAgIC8vY2hlY2sgaWYgYSBidXR0b24gd2FzIGNsaWNrZWQgIFxyXG4gICAgICAgIGZvciAodmFyIGJ1dHRvbiBpbiBjaGFyX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgaWYgKGNoZWNrQm91bmRzKGNoYXJfYnV0dG9uc1tidXR0b25dLCBlLmNsaWVudFgsIGUuY2xpZW50WSkpIHtcclxuICAgICAgICAgICAgICAgIC8vZHJhdyBwb3B1cFxyXG4gICAgICAgICAgICAgICAgY2hhcl9idXR0b25zW2J1dHRvbl0ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwb3AuaXNfb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBjaGFyX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0uc3RhdHNfdG9zdHIoKSk7XHJcbiAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5zdGF0c190b3N0cigpLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNoYXJhY3RlcjogXCIgKyByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBjaGFyX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0uc3RhdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGJ1dHRvbiBpbiBtaXNzaW9uX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS5hc3NpZ25lZCAmJiBjaGVja0JvdW5kcyhtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXSwgZS5jbGllbnRYLCBlLmNsaWVudFkpICYmIGN1cnJlbnRfZGF5ID09IG1pc3Npb25fYm9hcmRbYnV0dG9uXS5kYXkpIHtcclxuICAgICAgICAgICAgICAgIHBvcC5pc19vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkX21pc3Npb24gPSBidXR0b247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiU0VUVElORyBTRUxFQ1RFRCBNSVNTSU9OXCIpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIC8vZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmaW5kX2luX2xpc3QoXCJtaXNzaW9uXCIsIG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWlzc2lvbl9ib2FyZFswXS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWlzc2lvbl90aXRsZSA9IG1pc3Npb25fYm9hcmRbZmluZF9pbl9saXN0KFwibWlzc2lvblwiLCBtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWlzc2lvbl9kZXNjID0gbWlzc2lvbl9ib2FyZFtmaW5kX2luX2xpc3QoXCJtaXNzaW9uXCIsIG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpXS5nZXRfZGVzYygpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmZpbGxfcG9wdXAobWlzc2lvbl90aXRsZSArIFwiXFxuXCIgKyBtaXNzaW9uX2Rlc2MsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vcG9wLmZpbGxfcG9wdXAoXCJkZXNjXCIsIHRydWUsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgLy9wb3AuZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGVja0JvdW5kcyhwYXNzLCBlLmNsaWVudFgsIGUuY2xpZW50WSkpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBhc3MgY2xpY2tlZFwiKTtcclxuICAgICAgICAgICAgdXBkYXRlX3RpbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL2lmIHBvcCB1cCBpcyBvcGVuLCB3YW50IHRvIGNoZWNrIGlmIGFueXRoaW5nIEJVVCBidXR0b25zIHdhcyBjbGlja2VkIChmb3Igbm93KVxyXG4gICAgICAgIGlmIChjaGVja0JvdW5kcyhwb3AsIGUuY2xpZW50WCwgZS5jbGllbnRZKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvcHVwIGNsaWNrZWQhXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoZWNrQm91bmRzKG9rLCAgZS5jbGllbnRYLCBlLmNsaWVudFkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0JvdW5kcyhvaywgIGUuY2xpZW50WCwgZS5jbGllbnRZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJPayBjbGlja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcC5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGIgaW4gcG9wdXBfYnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiB0aG9zZSBidXR0b25zIHdlcmUgY2xpY2tlZC4gXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBvcHVwX2J1dHRvbnNbYl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQm91bmRzKHBvcHVwX2J1dHRvbnNbYl0sIGUuY2xpZW50WCwgZS5jbGllbnRZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBpcyBcIiArIHBvcHVwX2J1dHRvbnNbYl0udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TZWxlY3QgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkMSA9PSBudWxsICYmIHNlbGVjdGVkX21pc3Npb24gIT0gbnVsbCAmJiAhcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBwb3B1cF9idXR0b25zW2JdLnRleHQpXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMSA9IHBvcHVwX2J1dHRvbnNbYl0udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRfbWlzc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVkcmF3IHcgcHJlc3NlZCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtdCA9IG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZCA9IG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uZ2V0X2Rlc2MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmZpbGxfcG9wdXAobXQgKyBcIlxcblwiICsgbWQsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcHVwX2J1dHRvbnNbYl0udGV4dCAhPSBzZWxlY3RlZDEgJiYgIXJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgcG9wdXBfYnV0dG9uc1tiXS50ZXh0KV0uaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBwb3B1cF9idXR0b25zW2JdLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbYl0ucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcnN0OiBcIiArIHNlbGVjdGVkMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWNvbmQ6IFwiICsgc2VsZWN0ZWQyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlR3byBjaGFyYWN0ZXJzIHNlbGVjdGVkLiBBc3NzaWduaW5nIG1pc3Npb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGl0bGU6IFwiKyBtaXNzaW9uX2JvYXJkW3NlbGVjdGVkX21pc3Npb25dLnRpdGxlICsgXCJcXG5EZXNjOiBcIiArIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uZGVzYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Fzc2lnbiBtaXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uYXNzaWduKHNlbGVjdGVkMSwgc2VsZWN0ZWQyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maWxsIG5ldyB0ZXh0IG9uIHBvcHVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9wLmRpc21pc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5pc19vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInN0aWxsIGluIGlmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChcIlNlbmRpbmcgXCIrIHNlbGVjdGVkMSArXCIgYW5kIFwiKyBzZWxlY3RlZDIgKyBcIiBvbiB0aGUgbWlzc2lvbi5cIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiU2VudCBcIiArIHNlbGVjdGVkMSArIFwiIGFuZCBcIiArIHNlbGVjdGVkMiArIFwiIG9uOiBcIiArIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0udGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkMSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcGFzcyB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlX3RpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2xvc2UgcG9wdXBcIik7XHJcbiAgICAgICAgICAgIHBvcC5pc19vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHBvcC5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgIC8vc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgICAgICAgICAgLy9zZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICAvL3NlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgICAgICAvL3BvcC5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy9jb25zdHJ1Y3QgcG9wdXAuIE1heWJlIG1ha2UgaXQgb2JqZWN0PyBcclxuZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICAvL3RoaW5ncyB0byBvbmx5IGRvIG9uZSB0aW1lLiBcclxuICAgIHByZWxvYWRfaW1nKCk7XHJcbiAgICBjcmVhdGVfbG9jYXRpb25zKCk7XHJcbiAgICBjcmVhdGVfcm9zdGVyKCk7XHJcbiAgICBjcmVhdGVfbWlzc2lvbnMoKTtcclxuICAgIGNyZWF0ZV9idXR0b25zKCk7XHJcbiAgICBkcmF3X2NhbnZhcygpO1xyXG5cclxufVxyXG4vL3ZpbGxhbmVsbGUgc3R1ZmZcclxuLy9mdW5jdGlvbiByZWZlcmVuY2VkIGZyb206IGh0dHBzOi8vd3d3LnczcmVzb3VyY2UuY29tL2phdmFzY3JpcHQtZXhlcmNpc2VzL2phdmFzY3JpcHQtYXJyYXktZXhlcmNpc2UtMTcucGhwXHJcbmZ1bmN0aW9uIGdldF9yYW5kb21fY2hhcl9saXN0KCkge1xyXG4gICAgdmFyIGxlbiA9IHJvc3Rlci5sZW5ndGg7XHJcbiAgICB2YXIgdGVtcDtcclxuICAgIHZhciBpbmRleDtcclxuXHJcbiAgICB3aGlsZSAobGVuID4gMCkge1xyXG4gICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKTtcclxuICAgICAgICBsZW4tLTtcclxuICAgICAgICB0ZW1wID0gcm9zdGVyW2xlbl1cclxuICAgICAgICByb3N0ZXJbbGVuXSA9IHJvc3RlcltpbmRleF1cclxuICAgICAgICByb3N0ZXJbaW5kZXhdID0gdGVtcDtcclxuICAgIH1cclxuICAgIC8vY29uc29sZS5sb2cocm9zdGVyKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJoaWdoZXN0IGFmZjogXCIgKyBnZXRfY2hhcl90b19yYWlzZV9hZmZpbml0eShyb3N0ZXJbMF0pLm5hbWUpO1xyXG4gICAgLy9zdGFydCBhY3Rpb25zOlxyXG59XHJcbmZ1bmN0aW9uIHNlbGVjdF9hY3Rpb24oYykge1xyXG4gICAgLy9zd2l0Y2ggc3RhdGVtZW50XHJcbiAgICBjb25zb2xlLmxvZyhjLm5hbWUgKyBcIiBzZWxlY3RpbmcgYWN0aW9uLi4uXCIpO1xyXG4gICAgc3dpdGNoKGMubmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJNaW5cIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIkxhbmRvbFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyldKTtcclxuICAgICAgICBjYXNlIFwiSG9yc3RcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIlJvcnlcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIkRhbnRoXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyksIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKV0pO1xyXG4gICAgfVxyXG4gICAgLy9yZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKVxyXG59XHJcbmZ1bmN0aW9uIGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KGMpIHtcclxuICAgIC8vZmluZCB0aGUgY2hhcmFjdGVyIHdpdGggdGhlIGhpZ2hlc3QgYWZmaW5pdHkgdGhhdCBpcyBOT1QgMTAgYW5kIE5PVCBvY2N1cGllZFxyXG4gICAgdmFyIGhpZ2hlc3QgPSBudWxsO1xyXG4gICAgdmFyIGhpZ2hlc3RfYWZmID0gLTE7XHJcbiAgICBmb3IgKHZhciBjaCBpbiByb3N0ZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGMpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2NoXSk7XHJcbiAgICAgICAgdmFyIGNvbXAgPSByb3N0ZXJbY2hdO1xyXG4gICAgICAgIGlmKGNvbXAubmFtZSAhPSBjLm5hbWUpIHtcclxuICAgICAgICAgICAgaWYoIWNvbXAuaXNfb2NjdXBpZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmKGMuYWZmaW5pdHlbY29tcC5uYW1lXSA8IDEwICYmIGMuYWZmaW5pdHlbY29tcC5uYW1lXSA+PSBoaWdoZXN0X2FmZikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3QgPSBjb21wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RfYWZmID0gYy5hZmZpbml0eVtjb21wLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYy5uYW1lICsgXCIncyBoaWdoZXN0IGFmZmluaXR5IGlzIHdpdGggXCIgKyBoaWdoZXN0Lm5hbWUpO1xyXG4gICAgcmV0dXJuIGhpZ2hlc3Q7XHJcbn1cclxuLy9DSEVDSyBTUE9UIERFQ1xyXG5mdW5jdGlvbiBnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSB7XHJcbiAgICBsZXQgdHJhaW5fc3RyID0gYWN0aW9uKCBcclxuICAgICgpID0+ICFsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1tcInN0clwiXSA8IDEwICYmICFjLmlzX29jY3VwaWVkICYmICFjLmlzX29uX21pc3Npb24sXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICtcIiBpcyB0cmFpbmluZyBzdHIuXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjLmlzX29jY3VwaWVkID0gdHJ1ZTsgXHJcbiAgICAgICAgICAgIC8vaW5jcmVhc2Ugc3RhdFxyXG4gICAgICAgICAgICBjLmluY3JlYXNlX3N0YXQoXCJzdHJcIiwgMSk7XHJcbiAgICAgICAgICAgIC8vc2V0IGMncyBsb2NhdGlvblxyXG4gICAgICAgICAgICBjLnNldF9sb2NhdGlvbihcInN0clwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG4gICAgXHJcbiAgICByZXR1cm4gdHJhaW5fc3RyO1xyXG59XHJcbmZ1bmN0aW9uIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJpbnQgbG9jOiBcIiArIGludF9jb25kKTtcclxuICAgIGxldCB0cmFpbl9pbnQgPSBhY3Rpb24oIFxyXG4gICAgKCkgPT4gIWxvY2F0aW9uc1tcImludFwiXS5hc3NpZ25lZCAmJiBjLnN0YXRzW1wiaW50XCJdIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQgJiYgIWMuaXNfb25fbWlzc2lvbixcclxuICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGV4dF9sb2cucHVzaChjLm5hbWUgK1wiIGlzIHRyYWluaW5nIGludC5cIik7XHJcbiAgICAgICAgICAgIC8vc2V0IGxvY2F0aW9uIGFzc2lnbmVkXHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcImludFwiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlOyBcclxuICAgICAgICAgICAgLy9pbmNyZWFzZSBzdGF0XHJcbiAgICAgICAgICAgIGMuaW5jcmVhc2Vfc3RhdChcImludFwiLCAxKTtcclxuICAgICAgICAgICAgLy9zZXQgYydzIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwiaW50XCIpO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiB0cmFpbl9pbnQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYykge1xyXG4gICAgLy92YXIgbWFnX2NvbmQgPSAhbG9jYXRpb25zW1wibWFnXCJdLmFzc2lnbmVkICYmIGMuc3RhdHNbJ21hZyddIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQ7XHJcbiAgICBsZXQgdHJhaW5fbWFnID0gYWN0aW9uKCBcclxuICAgICgpID0+ICFsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1tcIm1hZ1wiXSA8IDEwICYmICFjLmlzX29jY3VwaWVkICYmICFjLmlzX29uX21pc3Npb24sXHJcbiAgICAoKSA9PiB7IFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1hZ19jb25kKTsgICAgXHJcbiAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICtcIiBpcyB0cmFpbmluZyBtYWcuXCIpO1xyXG4gICAgICAgICAgICAvL3NldCBsb2NhdGlvbiBhc3NpZ25lZFxyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjLmlzX29jY3VwaWVkID0gdHJ1ZTsgXHJcbiAgICAgICAgICAgIC8vaW5jcmVhc2Ugc3RhdFxyXG4gICAgICAgICAgICBjLmluY3JlYXNlX3N0YXQoXCJtYWdcIiwgMSk7XHJcbiAgICAgICAgICAgIC8vc2V0IGMncyBsb2NhdGlvblxyXG4gICAgICAgICAgICBjLnNldF9sb2NhdGlvbihcIm1hZ1wiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsb2NhdGlvbnNbXCJtYWdcIl0pO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiB0cmFpbl9tYWc7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSB7XHJcbiAgICBsZXQgcmFpc2VfYWZmaW5pdHkgPSBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gIWxvY2F0aW9uc1tcImFmZmluaXR5MVwiXS5hc3NpZ25lZCAmJiAhbG9jYXRpb25zW1wiYWZmaW5pdHkyXCJdLmFzc2lnbmVkICYmICFjLmlzX29jY3VwaWVkLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBjMiA9IGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KGMpOyAvL3RoaXMgaXMgY2hhcmFjdGVyIG9iai4gU2hvdWxkIGJlIHVub2NjdXBpZWQgdyBsZXNzIHRoYW4gMTAgYWZmXHJcbiAgICAgICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKGMubmFtZSArXCIgaXMgcmFpc2luZyBhZmZpbml0eSB3aXRoIFwiICsgYzIubmFtZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgIC8vc2V0IGxvY2F0aW9uIGFzc2lnbmVkXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb25zW1wiYWZmaW5pdHkyXCJdLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vaW5jcmVhc2UgYWZmaW5pdHkgd2l0aCB0aGVtXHJcbiAgICAgICAgICAgICAgICBjLmluY3JlYXNlX2FmZmluaXR5KGMyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYzIuaW5jcmVhc2VfYWZmaW5pdHkoYy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vc2V0IGJvdGggdG8gb2NjdXBpZWRcclxuICAgICAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYzIuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy9zZXQgYm90aCcgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwiYWZmaW5pdHkxXCIpO1xyXG4gICAgICAgICAgICAgICAgYzIuc2V0X2xvY2F0aW9uKFwiYWZmaW5pdHkyXCIpO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiByYWlzZV9hZmZpbml0eTtcclxufVxyXG4vL1RPRE9cclxuLy9beF0gYnV0dG9uIG9uIHBvcCB1cC5cclxuXHJcbi8vRnV0dXJlIEltcHJvdmVtZW50czpcclxuLy9JbXByb3ZlZCBVSVxyXG4vL0NoYXJhY3RlciBkaWFsb2d1ZVxyXG4vL0NoYXJhY3RlcnMgdHJhaW5pbmcgdG9nZXRoZXJcclxuLy9NaXNzaW9ucyBoYXZpbmcgYSB3YXkgdG8gd2luIHdpdGggYWZmaW5pdHlcclxuIiwiaW1wb3J0IFF1ZXVlIGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1F1ZXVlXCI7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0YXR1cyB7XHJcbiAgICBSVU5OSU5HLFxyXG4gICAgU1VDQ0VTUyxcclxuICAgIEZBSUxVUkVcclxufVxyXG5cclxuZnVuY3Rpb24gdGVybWluYXRlQW5kUmV0dXJuKGlkOiBudW1iZXIsIGJsYWNrYm9hcmQ6IGFueSwgc3RhdHVzOiBTdGF0dXMpIHtcclxuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcclxuICAgIHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcclxuZXhwb3J0IHR5cGUgUHJlY29uZGl0aW9uID0gKCkgPT4gYm9vbGVhblxyXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXHJcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgR3VhcmRUaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrLCBuZWdhdGU/OiBib29sZWFuKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXHJcblxyXG52YXIgYmxhY2tib2FyZCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XHJcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkID0gMSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcmVjb25kaXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lID0gdGlja3NSZXF1aXJlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmxhY2tib2FyZFtpZF0udGlja3NEb25lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBhc3RUaWNrLCBuZWdhdGUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZWVkID8gZXhlY3V0ZShhc3RUaWNrKSA6IFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0b3JUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XHJcbiAgICByZXR1cm4gYXN0VGljaygpO1xyXG59XHJcblxyXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0QWN0aW9uVGljayhnbG9iYWxJZENvdW50ZXIrKykocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcclxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcclxuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXHJcbiAqIEByZXR1cm5zIHtUaWNrfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxyXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8vMC4gdXRpbGl0aWVzXHJcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmROdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG4vLzEuIHN0b3J5IGluc3RhbmNlXHJcblxyXG4vLzEuMSBsb2NhdGlvbnNcclxudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcclxuXHJcbi8vYWRkIHRvIGJvdGggc2lkZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xyXG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XHJcblxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcclxuICAgIHZhciBwcmV2aW91cyA9IHt9O1xyXG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcclxuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XHJcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xyXG5cclxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcclxuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcclxuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XHJcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG4vLzEuMiBhZ2VudHNcclxudmFyIGFnZW50cyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFnZW50KGFnZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICBhZ2VudHMucHVzaChhZ2VudE5hbWUpO1xyXG4gICAgcmV0dXJuIGFnZW50TmFtZTtcclxufVxyXG5cclxuLy8xLjMgaXRlbXNcclxudmFyIGl0ZW1zID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XHJcbiAgICBpdGVtcy5wdXNoKGl0ZW1OYW1lKTtcclxuICAgIHJldHVybiBpdGVtTmFtZTtcclxufVxyXG5cclxuLy8xLjQgdmFyaWFibGVzXHJcbnZhciB2YXJpYWJsZXMgPSB7fTtcclxudmFyIGFnZW50VmFyaWFibGVzID0ge307XHJcbnZhciBpdGVtVmFyaWFibGVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YXJOYW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pKVxyXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xyXG5cclxuICAgIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIGlmIChpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBub3Qgc2V0IVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFyaWFibGVzW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBhZ2VudCBcIiArIGFnZW50ICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYXJpYWJsZU5vdFNldCh2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2VudFZhcmlhYmxlTm90U2V0KGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pKVxyXG4gICAgICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV0gPSB7fTtcclxuXHJcbiAgICBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSB8fCBpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGl0ZW0gXCIgKyBpdGVtICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXTtcclxufVxyXG5cclxuXHJcbi8vMlxyXG4vL2FnZW50LWJlaGF2aW9yIHRyZWUgbWFwcGluZ1xyXG52YXIgYWdlbnRUcmVlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRyZWVUb0FnZW50KGFnZW50OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIGFnZW50VHJlZXNbYWdlbnRdID0gdHJlZTtcclxufVxyXG5cclxuLy8zLjFcclxuLy91c2VyIGFjdGlvbnNcclxuLy9UT0RPIGFkZCB2YXJpYWJsZXMgdG8gdXNlciBhY3Rpb24gdGV4dHNcclxudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcclxuICAgIHRleHQ6IFwiXCIsXHJcbiAgICB1c2VyQWN0aW9uc1RleHQ6IFtdLFxyXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcclxufVxyXG52YXIgdXNlckludGVyYWN0aW9uVHJlZXMgPSBbXTtcclxudmFyIHVzZXJBY3Rpb25zID0ge307XHJcblxyXG5mdW5jdGlvbiBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpIHtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcclxuICAgIHVzZXJBY3Rpb25zID0ge307Ly97XCJHbyB0byBsb2NhdGlvbiBYXCIgOiBlZmZlY3RcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24gPSAodGV4dDogc3RyaW5nKSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHQsIDBcclxuICAgICk7XHJcbmV4cG9ydCBsZXQgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQgPSAodGV4dDogc3RyaW5nKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgKz0gXCJcXG5cIiArIHRleHQ7XHJcblxyXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxyXG4gICAgKCkgPT4gdHJ1ZSxcclxuICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgZWZmZWN0VHJlZSksIDBcclxuKTtcclxuXHJcbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdDogKCkgPT4gYW55KSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBhY3Rpb24oKCk9PnRydWUsIGVmZmVjdCwgMCkpLCAwXHJcbiAgICApO1xyXG5cclxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIHVzZXJBY3Rpb25zW3RleHRdID0gdHJlZTtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xyXG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xyXG4gICAgLy9leGVjdXRlIHRoZSB1c2VyIGFjdGlvblxyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcclxuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xyXG4gICAgZXhlY3V0ZSh1c2VyQWN0aW9uRWZmZWN0VHJlZSk7XHJcbn1cclxuXHJcbi8vNC5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIHVzZXJJbnRlcmFjdGlvbk9iamVjdDtcclxufVxyXG5mdW5jdGlvbiBnZXRfcmFuZG9tX2FnZW50X2xpc3QoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInJhbmRvbWl6aW5nXCIpO1xyXG4gICAgdmFyIGxlbiA9IGFnZW50cy5sZW5ndGg7XHJcbiAgICB2YXIgdGVtcDtcclxuICAgIHZhciBpbmRleDtcclxuXHJcbiAgICB3aGlsZSAobGVuID4gMCkge1xyXG4gICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKTtcclxuICAgICAgICBsZW4tLTtcclxuICAgICAgICB0ZW1wID0gYWdlbnRzW2xlbl1cclxuICAgICAgICBhZ2VudHNbbGVuXSA9IGFnZW50c1tpbmRleF1cclxuICAgICAgICBhZ2VudHNbaW5kZXhdID0gdGVtcDtcclxuICAgIH1cclxuICAgIC8vY29uc29sZS5sb2cocm9zdGVyKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJoaWdoZXN0IGFmZjogXCIgKyBnZXRfY2hhcl90b19yYWlzZV9hZmZpbml0eShyb3N0ZXJbMF0pLm5hbWUpO1xyXG4gICAgLy9zdGFydCBhY3Rpb25zOlxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB3b3JsZFRpY2soKSB7XHJcbiAgICAvL2FsbCBhZ2VudCB0aWNrc1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIkluIHdvcmxkIHRpY2tcIik7XHJcbiAgICAvL3JhbmRvbWl6ZSBhZ2VudHNcclxuICAgIGdldF9yYW5kb21fYWdlbnRfbGlzdCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRyZWUpO1xyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodHJlZSkpIHtcclxuICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJleGVjdXRpbmdBZ2VudFwiLCBhZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XHJcbn0iXX0=
