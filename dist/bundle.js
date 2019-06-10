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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2d1aWxkLmpzIiwic3JjL3NjcmlwdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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SSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCw0QkFBNEI7SUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUNEO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLFFBQVEsQ0FBRSxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7SUFDdkcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDL0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDOUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMs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RSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDeEI7SUFDRCxzQkFBc0I7SUFDdEIsNEVBQTRFO0lBQzVFLGdCQUFnQjtBQUNwQixDQUFDO0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIsK0JBQStCO0lBQy9CLGtCQUFrQjtJQUNsQixxQkFBcUIsRUFBRSxDQUFDO0lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLGtCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBZEQsOEJBY0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBhcnJheXMgPSByZXF1aXJlKFwiLi9hcnJheXNcIik7XG52YXIgTGlua2VkTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAqIENyZWF0ZXMgYW4gZW1wdHkgTGlua2VkIExpc3QuXG4gICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xuICAgICogd2hpY2ggdG9nZXRoZXIgcmVwcmVzZW50IGEgc2VxdWVuY2UuXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqL1xuICAgIGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAqIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICogTGFzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICogQWRkcyBhbiBlbGVtZW50IHRvIHRoaXMgbGlzdC5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgYWRkZWQuXG4gICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXG4gICAgKiB0aGUgZWxlbWVudCBpcyBhZGRlZCB0byB0aGUgZW5kIG9mIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGFkZGVkIG9yIGZhbHNlIGlmIHRoZSBpbmRleCBpcyBpbnZhbGlkXG4gICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMubkVsZW1lbnRzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLm5FbGVtZW50cyB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoaXRlbSk7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBGaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnQgYXQgdGhlIGVuZC5cbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUubmV4dCA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXYgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHByZXYubmV4dDtcbiAgICAgICAgICAgIHByZXYubmV4dCA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Kn0gdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXG4gICAgKiBlbXB0eS5cbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHsqfSB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICogZW1wdHkuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZGVzaXJlZCBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpc1xuICAgICAqIG91dCBvZiBib3VuZHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4KTtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGVcbiAgICAgKiBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhlIExpc3QgZG9lcyBub3QgY29udGFpbiB0aGlzIGVsZW1lbnQuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXG4gICAgICogb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGlzIGxpc3QgZG9lcyBub3QgY29udGFpbiB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAgICpcbiAgICAgICAqIDxwcmU+XG4gICAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAgICogfVxuICAgICAgICogPC9wcmU+XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxuICAgICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBmYWxzZVxuICAgICAgICogb3RoZXJ3aXNlLlxuICAgICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpc3QsIGlmIHByZXNlbnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzIDwgMSB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKiBUd28gbGlzdHMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3R9IG90aGVyIHRoZSBvdGhlciBsaXN0LlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLiBJZiB0aGUgZWxlbWVudHMgaW4gdGhlIGxpc3RzXG4gICAgICogYXJlIGN1c3RvbSBvYmplY3RzIHlvdSBzaG91bGQgcHJvdmlkZSBhIGZ1bmN0aW9uLCBvdGhlcndpc2VcbiAgICAgKiB0aGUgPT09IG9wZXJhdG9yIGlzIHVzZWQgdG8gY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIsIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcUYgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTGlua2VkTGlzdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVyLnNpemUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsc0F1eCh0aGlzLmZpcnN0Tm9kZSwgb3RoZXIuZmlyc3ROb2RlLCBlcUYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAcHJpdmF0ZVxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzQXV4ID0gZnVuY3Rpb24gKG4xLCBuMiwgZXFGKSB7XG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFlcUYobjEuZWxlbWVudCwgbjIuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuMSA9IG4xLm5leHQ7XG4gICAgICAgICAgICBuMiA9IG4yLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBnaXZlbiBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAxKSB7XG4gICAgICAgICAgICAvL0ZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJldmlvdXMubmV4dCA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSBudWxsICYmIHByZXZpb3VzLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBwcmV2aW91cy5uZXh0Lm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhjdXJyZW50Tm9kZS5lbGVtZW50KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0ZW1wID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5sYXN0Tm9kZTtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXG4gICAgICogc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7QXJyYXkuPCo+fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0LFxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPD0gMDtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJyYXlzLnRvU3RyaW5nKHRoaXMudG9BcnJheSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAodGhpcy5uRWxlbWVudHMgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleCAmJiBub2RlICE9IG51bGw7IGkrKykge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY3JlYXRlTm9kZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbGVtZW50OiBpdGVtLFxuICAgICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtlZExpc3Q7XG59KCkpOyAvLyBFbmQgb2YgbGlua2VkIGxpc3RcbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtlZExpc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5rZWRMaXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoXCIuL0xpbmtlZExpc3RcIik7XG52YXIgUXVldWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cbiAgICAgKiBAY2xhc3MgQSBxdWV1ZSBpcyBhIEZpcnN0LUluLUZpcnN0LU91dCAoRklGTykgZGF0YSBzdHJ1Y3R1cmUsIHRoZSBmaXJzdFxuICAgICAqIGVsZW1lbnQgYWRkZWQgdG8gdGhlIHF1ZXVlIHdpbGwgYmUgdGhlIGZpcnN0IG9uZSB0byBiZSByZW1vdmVkLiBUaGlzXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlua2VkTGlzdF8xLmRlZmF1bHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbmQgcmVtb3ZlcyB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3QuZmlyc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBzdGFjayBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSAocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuY29udGFpbnMoZWxlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhbmQgb25seSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIG5vIGl0ZW1zOyBmYWxzZVxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXG4gICAgICogRklGTyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goY2FsbGJhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXVlO1xufSgpKTsgLy8gRW5kIG9mIHF1ZXVlXG5leHBvcnRzLmRlZmF1bHQgPSBRdWV1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGl0ZW1cbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LjRcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXksIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5IG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbGFzdEluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0cy5sYXN0SW5kZXhPZiA9IGxhc3RJbmRleE9mO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwO1xufVxuZXhwb3J0cy5jb250YWlucyA9IGNvbnRhaW5zO1xuLyoqXG4gKiBSZW1vdmVzIHRoZSBmaXJzdCBvY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGZyb20gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGNoYW5nZWQgYWZ0ZXIgdGhpcyBjYWxsLlxuICovXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5yZW1vdmUgPSByZW1vdmU7XG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5IGVxdWFsXG4gKiB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHdob3NlIGZyZXF1ZW5jeSBpcyB0byBiZSBkZXRlcm1pbmVkLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAqIGVxdWFsIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmcmVxdWVuY3koYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBmcmVxID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICBmcmVxKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZyZXE7XG59XG5leHBvcnRzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gc3BlY2lmaWVkIGFycmF5cyBhcmUgZXF1YWwgdG8gb25lIGFub3RoZXIuXG4gKiBUd28gYXJyYXlzIGFyZSBjb25zaWRlcmVkIGVxdWFsIGlmIGJvdGggYXJyYXlzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyXG4gKiBvZiBlbGVtZW50cywgYW5kIGFsbCBjb3JyZXNwb25kaW5nIHBhaXJzIG9mIGVsZW1lbnRzIGluIHRoZSB0d29cbiAqIGFycmF5cyBhcmUgZXF1YWwgYW5kIGFyZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBvbmUgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiB0aGUgb3RoZXIgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVtZW50cyBpbiB0aGUgYXJyYXlzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxzKGFycmF5MSwgYXJyYXkyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkxLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZXF1YWxzKGFycmF5MVtpXSwgYXJyYXkyW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5lcXVhbHMgPSBlcXVhbHM7XG4vKipcbiAqIFJldHVybnMgc2hhbGxvdyBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IHRvIGNvcHkuXG4gKiBAcmV0dXJuIHtBcnJheX0gYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAqL1xuZnVuY3Rpb24gY29weShhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5jb25jYXQoKTtcbn1cbmV4cG9ydHMuY29weSA9IGNvcHk7XG4vKipcbiAqIFN3YXBzIHRoZSBlbGVtZW50cyBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9ucyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIHN3YXAgZWxlbWVudHMuXG4gKiBAcGFyYW0ge251bWJlcn0gaSB0aGUgaW5kZXggb2Ygb25lIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBqIHRoZSBpbmRleCBvZiB0aGUgb3RoZXIgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgZGVmaW5lZCBhbmQgdGhlIGluZGV4ZXMgYXJlIHZhbGlkLlxuICovXG5mdW5jdGlvbiBzd2FwKGFycmF5LCBpLCBqKSB7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gYXJyYXkubGVuZ3RoIHx8IGogPCAwIHx8IGogPj0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcbiAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xuICAgIGFycmF5W2pdID0gdGVtcDtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuc3dhcCA9IHN3YXA7XG5mdW5jdGlvbiB0b1N0cmluZyhhcnJheSkge1xuICAgIHJldHVybiAnWycgKyBhcnJheS50b1N0cmluZygpICsgJ10nO1xufVxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuLyoqXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBhcnJheVxuICogc3RhcnRpbmcgZnJvbSBpbmRleCAwIHRvIGxlbmd0aCAtIDEuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gaXRlcmF0ZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBhcnJheV8xID0gYXJyYXk7IF9pIDwgYXJyYXlfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGVsZSA9IGFycmF5XzFbX2ldO1xuICAgICAgICBpZiAoY2FsbGJhY2soZWxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZm9yRWFjaCA9IGZvckVhY2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmV4cG9ydHMuaGFzID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICAgIHJldHVybiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufTtcbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb21wYXJlIGVsZW1lbnQgb3JkZXIuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmUoYSwgYikge1xuICAgIGlmIChhIDwgYikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHRDb21wYXJlID0gZGVmYXVsdENvbXBhcmU7XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gdGVzdCBlcXVhbGl0eS5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSA9PT0gYjtcbn1cbmV4cG9ydHMuZGVmYXVsdEVxdWFscyA9IGRlZmF1bHRFcXVhbHM7XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdFRvU3RyaW5nKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gJyRzJyArIGl0ZW07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHRUb1N0cmluZyA9IGRlZmF1bHRUb1N0cmluZztcbi8qKlxuKiBKb2lucyBhbGwgdGhlIHByb3BlcmllcyBvZiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBqb2luIHN0cmluZ1xuKi9cbmZ1bmN0aW9uIG1ha2VTdHJpbmcoaXRlbSwgam9pbikge1xuICAgIGlmIChqb2luID09PSB2b2lkIDApIHsgam9pbiA9ICcsJzsgfVxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdG9yZXQgPSAneyc7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuaGFzKGl0ZW0sIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIHByb3AgKyAnOicgKyBpdGVtW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3JldCArICd9JztcbiAgICB9XG59XG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZnVuYykgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmopID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHN0cmluZy5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBSZXZlcnNlcyBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoY29tcGFyZUZ1bmN0aW9uKSB8fCAhaXNGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oZCwgdikgKiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xuLyoqXG4gKiBSZXR1cm5zIGFuIGVxdWFsIGZ1bmN0aW9uIGdpdmVuIGEgY29tcGFyZSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBjb21wYXJlVG9FcXVhbHMoY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYikgPT09IDA7XG4gICAgfTtcbn1cbmV4cG9ydHMuY29tcGFyZVRvRXF1YWxzID0gY29tcGFyZVRvRXF1YWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCJpbXBvcnQge1xyXG4gICAgYWRkQWdlbnQsIHNldEFnZW50VmFyaWFibGUsIGFkZEl0ZW0sIGFkZExvY2F0aW9uLCBzZXRWYXJpYWJsZSwgZ2V0TmV4dExvY2F0aW9uLCBhY3Rpb24sXHJcbiAgICBnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXHJcbiAgICBpc1ZhcmlhYmxlTm90U2V0LCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24sIGFkZFVzZXJBY3Rpb24sIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUsIGluaXRpYWxpemUsXHJcbiAgICBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QsIGV4ZWN1dGVVc2VyQWN0aW9uLCB3b3JsZFRpY2ssIGF0dGFjaFRyZWVUb0FnZW50LCBzZXRJdGVtVmFyaWFibGUsIGdldEl0ZW1WYXJpYWJsZSxcclxuICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWVcclxufSBmcm9tIFwiLi9zY3JpcHRpbmdcIjtcclxuLy9yZXF1aXJlKFwiLi9zY3JpcHRpbmcudHNcIik7XHJcblxyXG5cclxudmFyIHJvc3RlciA9IFtdOyAvL2xpc3Qgb2YgY2hhcmFjdGVyc1xyXG52YXIgbWlzc2lvbl9ib2FyZCA9IFtdOyAvL2xpc3Qgb2YgbWlzc2lvbnNcclxudmFyIGltYWdlcyA9IHt9OyAvL2RpY3Rpb25hcnkgb2YgSW1hZ2Ugb2JqZWN0cy4gXHJcbnZhciBjaGFyX2J1dHRvbnMgPSBbXTsvL2xpc3Qgb2YgYnV0dG9uc1xyXG52YXIgbWlzc2lvbl9idXR0b25zID0gW107IC8vbGlzdCBvZiBtaXNzaW9uIGJ1dHRvbnNcclxudmFyIHBvcHVwX2J1dHRvbnMgPSBbXTsgLy9saXN0IG9mIGJ1dHRvbnMgZGlzcGxheWVkIG9uIHBvcHVwXHJcbnZhciBsb2NhdGlvbnMgPSB7fTsgLy9kaWN0IG9mIGxvY2F0aW9uc1xyXG5cclxudmFyIG51bV9taXNzaW9ucyA9IDA7XHJcbnZhciBudW1fc3VjY2Vzc2Z1bCA9IDA7XHJcbnZhciBudW1fZmFpbGVkID0gMDtcclxuXHJcbi8vaHR0cHM6Ly9pbWd1ci5jb20vYS9qblE4MHE5IGJ1dHRvbiBzb3VyY2VcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZcIik7XHJcbnZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbmNvbnRleHQuZm9udCA9IFwiMTVweCBTbWFsbCBGb250c1wiXHJcbi8vY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG5cclxudmFyIERFRkFVTFRfQ0hBUl9YID0gMTAwXHJcbnZhciBERUZBVUxUX0NIQVJfWSA9IDEwMFxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge3NldHVwKCl9O1xyXG4vL2V2ZW50c1xyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrZWQpO1xyXG4vL3BvcHVwXHJcbnZhciBwb3A7XHJcbi8vcGFzcyBidXR0b25cclxudmFyIHBhc3M7XHJcbi8vb2sgYnV0dG9uXHJcbnZhciBvaztcclxuLy90aWNrOiA3IGRheXMgdG90YWwuIDIgdGlja3MgcGVyIGRheSAobW9ybi9ldmUpLiBFdmVuIHRpY2tzIGFyZSBtb3JuaW5nID0gbmV3IGRheVxyXG52YXIgY3VycmVudF90aW1lID0gXCJtb3JuaW5nXCI7XHJcbnZhciBjdXJyZW50X2RheSA9IDE7XHJcblxyXG52YXIgbWF4X3N0YXQgPSAxMDtcclxudmFyIG1heF9hZmZpbml0eSA9IDEwO1xyXG5cclxudmFyIHRleHRfbG9nID0gW1wiTG9nOlwiLCBcIlRoYW5rcyBmb3IgY29taW5nIGluIG9uIHN1Y2ggc2hvcnQgbm90aWNlISBJIHdpbGwgYmUgYXdheSBmb3IgYWJvdXQgYSB3ZWVrIDxzdHJpa2U+ZmlzaGluZzwvc3RyaWtlPiBvbiBhIHZlcnkgaW1wb3J0YW50IGVycmFuZC48YnI+THVja2lseSwgdGhpcyBjYW4gYWxzbyBhY3QgYXMgeW91ciB0cmlhbCBwZXJpb2QhIFdoaWxlIHlvdSB0YWtlIG92ZXIgdGhlIHJvbGUgb2YgZ3VpbGRtYXN0ZXIgZm9yIG1lLCB5b3VyIHJlc3BvbnNpYmlsaXRpZXMgd2lsbCBpbmNsdWRlIGFzc2lnbmluZyBtaXNzaW9ucyB0byBndWlsZCBtZW1iZXJzIGJhc2VkIG9mZiBvZiBob3cgd2VsbCB0aGV5IHdvcmsgdG9nZXRoZXIgYXMgd2VsbCBhcyB0aGVpciBpbmRpdmlkdWFsIHN0cmVuZ3Roczxicj5UaGF0J3MgaXQsIHRoYXQncyB0aGUgb25seSByZXNwb25zaWJpbGl0eS4gVGhvc2Ugd2hvIGFyZSBzdGlsbCBoZXJlIHdpbGwgZG8gdGhlaXIgb3duIHRoaW5nIGR1cmluZyB0aGUgZGF5Ljxicj5JZiB5b3UgZG9uJ3Qgd2FudCB0byBhc3NpZ24gYW55b25lIG9uIGEgbWlzc2lvbiBkdXJpbmcgdGhlIGRheSwgdGhhdCdzIGZpbmUgdG9vISBZb3UgY2FuIGp1c3QgdXNlIHRoZSBbTkVYVF0gYnV0dG9uIHRvIHdhaXQgYXJvdW5kLjxicj5IYXZlIGZ1biEgSWYgdGhlIGdhemVibyBmYWxscyBkb3duIGFnYWluIGp1c3QgZ2V0IExhbmRvbCB0byBmaXggaXQgZm9yIHlvdSwgaGUgd2lsbCBjb21wbGFpbiBidXQgaXQgd2lsbCBiZSB3b3J0aCBpdC5cIl07XHJcblxyXG52YXIgc2VsZWN0ZWQxO1xyXG52YXIgc2VsZWN0ZWQyOyAvL2ZvciB0ZXN0aW5nIG1pc3Npb24gYXNzaWdubWVudC5cclxudmFyIHNlbGVjdGVkX21pc3Npb247XHJcblxyXG5jbGFzcyBDaGFyYWN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc3RhdHMsIHNwcikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IHsnc3RyJzpzdGF0c1snc3RyJ10sICdpbnQnOnN0YXRzWydpbnQnXSwgJ21hZyc6c3RhdHNbJ21hZyddfVxyXG4gICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7fTtcclxuICAgICAgICB0aGlzLmlzX29jY3VwaWVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uc1tcInN0YXJ0XCJdO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5sb2NhdGlvbik7XHJcbiAgICAgICAgLy90aGlzLnggPSBERUZBVUxUX0NIQVJfWDtcclxuICAgICAgICAvL3RoaXMueSA9IERFRkFVTFRfQ0hBUl9ZO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gaW1hZ2VzW3Nwcl07XHJcbiAgICAgICAgLy90aGlzLmNoYXJfaWNvbiA9IGNoYXJfaWNvbnNbbmFtZV07XHJcbiAgICB9XHJcbiAgICBjcmVhdGVfYWZmaW5pdHkoKSB7XHJcbiAgICAgICAgLy8gZm9yICh2YXIgY2hhciBpbiByb3N0ZXIpIHtcclxuICAgICAgICAvLyAgICAgLy9jb25zb2xlLmxvZygpO1xyXG4gICAgICAgIC8vICAgICBpZiAocm9zdGVyW2NoYXJdLm5hbWUgIT0gdGhpcy5uYW1lKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmFmZmluaXR5W3Jvc3RlcltjaGFyXS5uYW1lXSA9IDQ7IC8vZXZlcnlvbmUgc3RhcnRzIHdpdGggNCBhZmZpbml0eVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vbWF5YmUgZG8gcmFuZG9tIGV2ZW50dWFsbHlcclxuICAgICAgICBzd2l0Y2godGhpcy5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNaW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7XCJMYW5kb2xcIjogMSwgXCJIb3JzdFwiOiA1LCBcIlJvcnlcIiA6IDQsIFwiRGFudGhcIiA6IDJ9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMYW5kb2xcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7XCJNaW5cIjogMSwgXCJIb3JzdFwiOiAzLCBcIlJvcnlcIiA6IDIsIFwiRGFudGhcIiA6IDV9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJIb3JzdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHtcIk1pblwiOiA1LCBcIkxhbmRvbFwiOiAzLCBcIlJvcnlcIiA6IDUsIFwiRGFudGhcIiA6IDF9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJSb3J5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmZmluaXR5ID0ge1wiTWluXCI6IDQsIFwiSG9yc3RcIjogNSwgXCJMYW5kb2xcIiA6IDIsIFwiRGFudGhcIiA6IDN9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYW50aFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHtcIk1pblwiOiAyLCBcIkhvcnN0XCI6IDEsIFwiUm9yeVwiIDogMywgXCJMYW5kb2xcIiA6IDV9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBpbmNyZWFzZV9hZmZpbml0eShjaGFyKSB7XHJcbiAgICAgICAgLy9maW5kIGNoYXJhY3RlciwgaW5jcmVtZW50IG51bWJlci4gXHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBjaGFyLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkZWNyZWFzZV9hZmZpbml0eShjaGFyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBjaGFyLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5jcmVhc2Vfc3RhdChzdGF0LCBhbW91bnQpIHtcclxuICAgICAgICB0aGlzLnN0YXRzW3N0YXRdICs9IGFtb3VudDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0c1tzdGF0XSA+IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHNbc3RhdF0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtb3ZlKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jaGFyX2ljb24sIHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuICAgIHN0YXRzX3Rvc3RyKCkge1xyXG4gICAgICAgIHZhciBzdCA9IHRoaXMubmFtZSArIFwiXFxuU3RyOiBcIiArIHRoaXMuc3RhdHNbXCJzdHJcIl0gKyBcIlxcbk1hZzogXCIgKyB0aGlzLnN0YXRzW1wibWFnXCJdICsgXCJcXG5JbnQ6IFwiICsgdGhpcy5zdGF0c1tcImludFwiXStcIlxcblN0YXR1czpcIjtcclxuICAgICAgICBpZih0aGlzLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgc3QrPVwiIE91dCBvbiBNaXNzaW9uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3QrPVwiIEF2YWlsYWJsZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdDtcclxuICAgIH1cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNwcml0ZSk7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5zcHJpdGUsIHRoaXMubG9jYXRpb24ueCwgdGhpcy5sb2NhdGlvbi55KTtcclxuICAgIH1cclxuICAgIHNldF9sb2NhdGlvbih3aGVyZSkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbnNbd2hlcmVdO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIE1pc3Npb24ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIHJlcV9zdGF0LCByZXFfdG90YWwsIHJld2FyZCwgd2luX3R4dCwgbG9zZV90eHQsIHRpY2tzLCBkYXkpIHtcclxuICAgICAgICAvL2Fsd2F5cyBnYWluICsxIGFmZmluaXR5IG9uIHN1Y2Nlc3MuIFxyXG4gICAgICAgIC8vYWx3YXlzIGxvc2UgLTEgYWZmaW5pdHkgb24gZmFpbHVyZVxyXG4gICAgICAgIC8vbWF5YmUgYWRkIHR5cGVcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzYztcclxuICAgICAgICB0aGlzLnJlcV9zdGF0ID0gcmVxX3N0YXQ7IC8vbWF5YmUgbWFrZSB0aGlzIGFuIGFycmF5XHJcbiAgICAgICAgdGhpcy5yZXFfdG90YWwgPSByZXFfdG90YWw7IC8vdGhpcyB0b28gXHJcbiAgICAgICAgdGhpcy5yZXdhcmQgPSByZXdhcmQ7XHJcbiAgICAgICAgdGhpcy53aW5fdHh0ID0gd2luX3R4dDtcclxuICAgICAgICB0aGlzLmxvc2VfdHh0ID0gbG9zZV90eHQ7XHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vcHJvYmFibHkgYWRkIHN0YXJ0X2RheSAod2hlbiBpdCBzaG93cyB1cCkgYW5kIGxlbmd0aCAoaG93IG1hbnkgZGF5cyBpdCB0YWtlcylcclxuICAgICAgICB0aGlzLmMxID0gbnVsbDsgLy90aGlzIGlzIHRoZSBjaGFyYWN0ZXIgbmFtZS5cclxuICAgICAgICB0aGlzLmMyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSAtMTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSAtMTtcclxuICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgICAgICAgdGhpcy5kYXkgPSBkYXk7XHJcbiAgICAgICAgLy9yZXdhcmQgPT0gZGlmZmljdWx0eSBmb3Igbm93XHJcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gcmV3YXJkXHJcbiAgICB9XHJcbiAgICBhc3NpZ24oY2hhcjEsIGNoYXIyKSB7IC8vcGFzcyBpbiB0aGUgbmFtZS5cclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gdHJ1ZTsgXHJcbiAgICAgICAgdGhpcy5jMSA9IGNoYXIxO1xyXG4gICAgICAgIHRoaXMuYzIgPSBjaGFyMjtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmlzX29uX21pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIC8vY2hhcjEuaXNfb2NjdXBpZWQgPSB0cnVlOyAvL21heWJlIGdldCBmcm9tIGxpc3RcclxuICAgICAgICAvL2NoYXIyLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRvX21pc3Npb24oKSB7XHJcbiAgICAgICAgbnVtX21pc3Npb25zKys7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzEpO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlcV9zdGF0ICtcIiBvZiBtb3JlIHRoYW4gXCIgKyB0aGlzLnJlcV90b3RhbCk7XHJcbiAgICAgICAgdmFyIGNvbWJpbmVkX3N0YXQgPSByb3N0ZXJbdGhpcy5jaGFyMV9pXS5zdGF0c1t0aGlzLnJlcV9zdGF0XSArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLnN0YXRzW3RoaXMucmVxX3N0YXRdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG90YWwgcG9pbnRzOiBcIiArIGNvbWJpbmVkX3N0YXQpO1xyXG4gICAgICAgIGlmKGNvbWJpbmVkX3N0YXQgPj0gdGhpcy5yZXFfdG90YWwpIHsgLy9tYWtlIGNoZWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vcGFzc1xyXG4gICAgICAgICAgICB0aGlzLnZpY3RvcnkoKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mYWlsdXJlKClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZpY3RvcnkoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgbnVtX3N1Y2Nlc3NmdWwrKztcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiTWlzc2lvbjogXCIgKyB0aGlzLnRpdGxlICsgXCIgd2FzIHN1Y2Nlc3NmdWwhPGJyPlwiICsgcm9zdGVyW3RoaXMuY2hhcjFfaV0ubmFtZSArIFwiIGFuZCBcIiArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLm5hbWUgKyBcIiBoYXZlIHJldHVybmVkITxicj5UaGVpciBzdGF0ZW1lbnQ6IFwiICsgdGhpcy53aW5fdHh0KTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaChyb3N0ZXJbdGhpcy5jaGFyMV9pXS5uYW1lICsgXCIgYW5kIFwiICsgcm9zdGVyW3RoaXMuY2hhcjJfaV0ubmFtZSArIFwiIGhhdmUgcmV0dXJuZWQhPGJyPlRoZWlyIHN0YXRlbWVudDogXCIgKyB0aGlzLndpbl90eHQpO1xyXG4gICAgICAgIC8vaW5jcmVhc2Ugc3RhdCBieSByZXdhcmQgYW10XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnJlcV9zdGF0LCB0aGlzLnJld2FyZCk7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnJlcV9zdGF0LCB0aGlzLnJld2FyZCk7XHJcbiAgICAgICAgLy9pbmNyZWFzZSBhZmZpbml0eVxyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmluY3JlYXNlX2FmZmluaXR5KHJvc3Rlclt0aGlzLmNoYXIyX2ldKTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5pbmNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMV9pXSk7XHJcbiAgICAgICAgLy90ZXh0X2xvZy5wdXNoKHRoaXMud2luX3R4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTsgXHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IG51bGw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgZmFpbHVyZSgpIHtcclxuICAgICAgICBudW1fZmFpbGVkKys7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImZhaWx1cmVcIik7XHJcbiAgICAgICAgdGV4dF9sb2cucHVzaChcIk1pc3Npb246IFwiICsgdGhpcy50aXRsZSArIFwiIGZhaWxlZCE8YnI+XCIrIHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMubG9zZV90eHQpO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMxKTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMik7XHJcbiAgICAgICAgLy90ZXh0X2xvZy5wdXNoKHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMubG9zZV90eHQpO1xyXG4gICAgICAgIC8vZGVjcmVhc2UgYWZmaW5pdHlcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5kZWNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMl9pXSk7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uZGVjcmVhc2VfYWZmaW5pdHkocm9zdGVyW3RoaXMuY2hhcjFfaV0pO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaCh0aGlzLmxvc2VfdHh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IGZhbHNlOyBcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gbnVsbDtcclxuICAgIH1cclxuICAgIGRlY3JlYXNlX3RpbWUoKSB7XHJcbiAgICAgICAgdGhpcy50aWNrcy0tO1xyXG4gICAgICAgIGlmICh0aGlzLnRpY2tzID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb19taXNzaW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlmZmljdWx0eV90b3N0cigpIHtcclxuICAgICAgICB2YXIgc3RyID0gXCJkaWZmaWN1bHR5OiBcIlxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kaWZmaWN1bHR5OyBpKyspIHtcclxuICAgICAgICAgICAgc3RyKz0gXCIqXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuICAgIGdldF9kZXNjKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBmdWxsIGRlc2NcIik7XHJcbiAgICAgICAgdmFyIGZ1bGxfZGVzYyA9IFwiLS0tXFxuXCIgKyB0aGlzLmRlc2MgKyBcIlxcbnJlcXVpcmVzIFwiICsgdGhpcy5yZXFfc3RhdCArIFwiLCBcIiArIHRoaXMuZGlmZmljdWx0eV90b3N0cigpO1xyXG4gICAgICAgIHJldHVybiBmdWxsX2Rlc2M7XHJcbiAgICB9XHJcblxyXG59XHJcbi8vU3RhcnQgcG9zaXRpb24gaXMgNTcwLCAzNDVcclxuY2xhc3MgTG9jYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgeCwgeSwgc3RhdCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTsgXHJcbiAgICAgICAgdGhpcy5jaGFyMSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMiA9IG51bGw7IC8vZm9yIGFmZmluaXR5IE9OTFlcclxuICAgICAgICB0aGlzLnN0YXQgPSBudWxsO1xyXG4gICAgICAgIGlmIChzdGF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdCA9IHN0YXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgYXNzaWduKG5hbWUsIG5hbWUyID0gMCkge1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXQgPT0gXCJhZmZpbml0eVwiKSB7XHJcbiAgICAgICAgICAgIC8vdHdvIGNoYXJhY3RlcnNcclxuICAgICAgICAgICAgdGhpcy5jaGFyMSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcjIgPSBuYW1lMjtcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0ubW92ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMildLm1vdmUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vc3RhbmRhcmQgc3RhdCwgMSBjaGFyXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcjEgPSBuYW1lO1xyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjEpXS5tb3ZlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBlbmhhbmNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXQgPT0gXCJhZmZpbml0eVwiKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMSldLmluY3JlYXNlX2FmZmluaXR5KHRoaXMuY2hhcjIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vb25seSBvbmVcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnN0YXQsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbi8vdXNlZnVsIHRoaW5nc1xyXG5jbGFzcyBQb3B1cCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoeCwgeSwgdHlwZSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2VzW3R5cGVdO1xyXG4gICAgICAgIHRoaXMuaXNfb3BlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnRleHRfcG9zID0gdGhpcy55ICsgMzA7XHJcblxyXG4gICAgfVxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcbiAgICBkaXNtaXNzKCkge1xyXG4gICAgICAgIHRoaXMuaXNfb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgICAgIC8vY2hlY2sgZm9yIG1pc3Npb24gc3R1ZmYgaW4gaGVyZSAuTWFrZSBzdXJlIDIgY2hhcnMgc2VsZWN0ZWQgZXRjXHJcbiAgICAgICAgaWYoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXBkYXRlX3RpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcgaW4gcG9wdXAgZGlzbWlzc1wiKTtcclxuICAgICAgICBzZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgIHNlbGVjdGVkMiA9IG51bGw7XHJcbiAgICAgICAgc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCAyIGlzIG5vdyBcIiArIHNlbGVjdGVkMik7XHJcbiAgICAgICAgZm9yKHZhciBiIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjaGFyX2J1dHRvbnNbYl0ucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciB4IGluIHBvcHVwX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1t4XS5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyYXdfY2FudmFzKCk7XHJcbiAgICB9XHJcbiAgICB3cml0ZV90ZXh0KHRleHQpIHtcclxuICAgICAgICAvL3kgPSBzdGFydGluZyB5IHBvc2l0aW9uLiBcclxuICAgICAgICB2YXIgdHh0ID0gdGhpcy53cmFwX3BhcmFncmFwaF90ZXh0KHRleHQpO1xyXG4gICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgdHh0Lmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQodHh0W2xdLCB0aGlzLnggKyAxNSwgdGhpcy50ZXh0X3Bvcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9wb3MgKz0gMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy50ZXh0X3BvcyA9IHRoaXMueSArIDIwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy50ZXh0X3ggKz0yMDtcclxuICAgICAgICAvL3RoaXMudGV4dF95ICs9MjA7XHJcbiAgICB9XHJcbiAgICAvL3R3byBiZWxvdyBmdW5jdGlvbnMgbW9kaWZpZWQgZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjkzNjExMi90ZXh0LXdyYXAtaW4tYS1jYW52YXMtZWxlbWVudFxyXG4gICAgd3JhcF9wYXJhZ3JhcGhfdGV4dCh0ZXh0KSB7IFxyXG4gICAgICAgIHJldHVybiB0ZXh0LnNwbGl0KFwiXFxuXCIpLm1hcChwYXJhID0+IHRoaXMud3JhcF90ZXh0KHBhcmEpKS5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKTsgXHJcbiAgICB9XHJcbiAgICB3cmFwX3RleHQodGV4dCkgeyBcclxuICAgICAgICB2YXIgd29yZHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICB2YXIgbGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgY3VycmVudExpbmUgPSB3b3Jkc1swXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuaW1hZ2UueCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgd29yZCA9IHdvcmRzW2ldO1xyXG4gICAgICAgICAgICB2YXIgdyA9IGNvbnRleHQubWVhc3VyZVRleHQoY3VycmVudExpbmUgKyBcIiBcIiArIHdvcmQpLndpZHRoO1xyXG4gICAgICAgICAgICBpZiAodyA8IHRoaXMuaW1hZ2Uud2lkdGggLSA1MCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgKz0gXCIgXCIgKyB3b3JkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChjdXJyZW50TGluZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSA9IHdvcmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGluZXMucHVzaChjdXJyZW50TGluZSk7XHJcbiAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0X3BvcyA9IHRoaXMueSArIDMwO1xyXG4gICAgfVxyXG4gICAgZHJhd19wb3B1cF9idXR0b25zKCkge1xyXG4gICAgICAgIHZhciB0aW55X3ggPSAyNTA7XHJcbiAgICAgICAgZm9yICh2YXIgYiBpbiBwb3B1cF9idXR0b25zKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFyID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHBvcHVwX2J1dHRvbnNbYl0udGV4dCk7XHJcbiAgICAgICAgICAgIGlmKCFyb3N0ZXJbY2hhcl0uaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbnlfeCA+PSB0aGlzLmltYWdlLndpZHRoICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlueV94ID0gNDUwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0X3Bvcys9NDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbnlfeCs9ODA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnggPSB0aW55X3g7XHJcbiAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnkgPSB0aGlzLnRleHRfcG9zO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwb3B1cF9idXR0b25zW2JdLnggKyBcIiAsIFwiKyBwb3B1cF9idXR0b25zW2JdLnkpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxuICAgIGRyYXdfb2tfYnV0dG9uKCkge1xyXG4gICAgICAgIG9rLnggPSA0NTU7XHJcbiAgICAgICAgb2sueSA9IHRoaXMudGV4dF9wb3M7XHJcbiAgICAgICAgb2suZHJhdygpO1xyXG4gICAgfVxyXG4gICAgZmlsbF9wb3B1cCh0ZXh0LCBidXR0b25zLCBvaykge1xyXG4gICAgICAgIHRoaXMud3JpdGVfdGV4dCh0ZXh0KTtcclxuICAgICAgICBpZihidXR0b25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9rKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd19va19idXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQnV0dG9uIHsgLy9leGlzdGluZyBmcmFtZXdvcmtzP1xyXG4gICAgY29uc3RydWN0b3IgKHgsIHksIHR5cGUsIHRleHQsIHByZXNzZWRfdHlwZT0wKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZXNbdHlwZV07XHJcbiAgICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmVzc2VkX2ltYWdlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJfdGV4dF9wb3MgPSB0aGlzLnkgKyAyMDtcclxuICAgICAgICBpZiAocHJlc3NlZF90eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZF9pbWFnZSA9IGltYWdlc1twcmVzc2VkX3R5cGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldF9hY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICB9XHJcbiAgICBkb19zb21ldGhpbmcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzZXRfdGV4dF9wb3MoKSB7XHJcbiAgICAgICAgdGhpcy5iX3RleHRfcG9zID0gdGhpcy55ICsgMjA7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wcmVzc2VkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucHJlc3NlZF9pbWFnZSk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlc3NlZCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLnByZXNzZWRfaW1hZ2UsIHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyYXdpbmcgcHJlc3NlZFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMueCArIDE1MCwgdGhpcy55ICsgNDUpO1xyXG4gICAgfVxyXG4gICAgLy90d28gYmVsb3cgZnVuY3Rpb25zIG1vZGlmaWVkIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5MzYxMTIvdGV4dC13cmFwLWluLWEtY2FudmFzLWVsZW1lbnRcclxuICAgIHdyYXBfcGFyYWdyYXBoX3RleHQodGV4dCkgeyBcclxuICAgICAgICByZXR1cm4gdGV4dC5zcGxpdChcIlxcblwiKS5tYXAocGFyYSA9PiB0aGlzLndyYXBfdGV4dChwYXJhKSkucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSk7IFxyXG4gICAgfVxyXG4gICAgd3JhcF90ZXh0KHRleHQpIHsgXHJcbiAgICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnRMaW5lID0gd29yZHNbMF07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmltYWdlLngpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXTtcclxuICAgICAgICAgICAgdmFyIHcgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KGN1cnJlbnRMaW5lICsgXCIgXCIgKyB3b3JkKS53aWR0aDtcclxuICAgICAgICAgICAgaWYgKHcgPCB0aGlzLmltYWdlLndpZHRoIC0gMTUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lICs9IFwiIFwiICsgd29yZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgPSB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgIHJldHVybiBsaW5lcztcclxuICAgIH1cclxuICAgIHdyaXRlX3RleHQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIndyaXRpbmdcIik7XHJcbiAgICAgICAgdmFyIHR4dCA9IHRoaXMud3JhcF9wYXJhZ3JhcGhfdGV4dChcIk1pc3Npb246XFxuXCIgKyB0aGlzLnRleHQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codHh0KTtcclxuICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHR4dC5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHR4dFtsXSwgdGhpcy54ICsgMTUsIHRoaXMuYl90ZXh0X3Bvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYl90ZXh0X3BvcyArPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldF90ZXh0X3BvcygpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHByZWxvYWRfaW1nKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGltYWdlc1wiKTtcclxuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvblwiKVxyXG4gICAgLy92YXIgcG9wdXAgPSBuZXcgSW1hZ2UoKTtcclxuICAgIC8vYnV0dG9uLnNyYyA9IFwiaHR0cDovL2k2My50aW55cGljLmNvbS9yN25kNDQuanBnXCI7XHJcbiAgICAvL3BvcHVwLnNyYyA9IFwiaHR0cDovL2k2NC50aW55cGljLmNvbS8ydzVpdWo2LmpwZ1wiO1xyXG4gICAgaW1hZ2VzW1wiYnV0dG9uXCJdID0gYnV0dG9uO1xyXG4gICAgaW1hZ2VzW1wiTWluXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5cIik7XHJcbiAgICBpbWFnZXNbXCJNaW5fcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluX3BcIik7XHJcbiAgICBpbWFnZXNbXCJMYW5kb2xcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmRvbFwiKTtcclxuICAgIGltYWdlc1tcIkxhbmRvbF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5kb2xfcFwiKTtcclxuICAgIGltYWdlc1tcIlJvcnlcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlcIik7XHJcbiAgICBpbWFnZXNbXCJSb3J5X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlfcFwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3JzdFwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvcnN0X3BcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFudGhcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW50aF9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiYmdcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJnXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueU1pblwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueW1pblwiKTtcclxuICAgIGltYWdlc1tcInRpbnlNaW5fcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueW1pbl9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUxhbmRvbFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWxhbmRvbFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlMYW5kb2xfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWxhbmRvbF9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUhvcnN0XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55aG9yc3RcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55SG9yc3RfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWhvcnN0X3BcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55Um9yeVwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueXJvcnlcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55Um9yeV9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55cm9yeV9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueURhbnRoXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55ZGFudGhcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55RGFudGhfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWRhbnRoX3BcIik7XHJcbiAgICBpbWFnZXNbXCJwYXNzXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzXCIpO1xyXG4gICAgaW1hZ2VzW1wiTWluc3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5zcHJcIik7XHJcbiAgICBpbWFnZXNbXCJMYW5kb2xzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmRvbHNwclwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0c3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3JzdHNwclwiKTtcclxuICAgIGltYWdlc1tcIlJvcnlzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlzcHJcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aHNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFudGhzcHJcIik7XHJcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlc1tcImJnXCJdKTtcclxuICAgIGltYWdlc1tcInBvcHVwXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cFwiKTtcclxuICAgIGltYWdlc1tcIm9rXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJva1wiKTtcclxuICAgIGltYWdlc1tcImdhbWVkb25lXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lb3ZlclwiKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfcm9zdGVyKCkge1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIk1pblwiLHsnc3RyJzo3LCAnbWFnJzowLCAnaW50JzogM30sIFwiTWluc3ByXCIgKSk7IC8vbWFrZSBhIGRpY3Rpb25hcnkvbGFiZWwgaXRcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJMYW5kb2xcIix7J3N0cic6MCwgJ21hZyc6NiwgJ2ludCc6IDR9LCBcIkxhbmRvbHNwclwiKSk7XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiSG9yc3RcIiwgeydzdHInOjgsICdtYWcnOjAsICdpbnQnOiAyfSwgXCJIb3JzdHNwclwiKSk7XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiUm9yeVwiLCB7J3N0cic6MiwgJ21hZyc6NiwgJ2ludCc6IDJ9LCBcIlJvcnlzcHJcIikpO1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIkRhbnRoXCIsIHsnc3RyJzoyLCAnbWFnJzoyLCAnaW50JzogNn0sIFwiRGFudGhzcHJcIikpO1xyXG4gICAgZm9yICh2YXIgYyBpbiByb3N0ZXIpIHtcclxuICAgICAgICByb3N0ZXJbY10uY3JlYXRlX2FmZmluaXR5KCk7IC8vc3RhcnQgYXQgMj9cclxuICAgICAgICBhZGRBZ2VudChyb3N0ZXJbY10ubmFtZSk7IC8vYWRkIGFnZW50IGZvciBiZWhhdmlvciB0cmVlXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbY10pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZV9taXNzaW9ucygpIHtcclxuICAgIC8vdGVtcGxhdGU6IFxyXG4gICAgLy9taXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJ0aXRsZVwiLCBcImRlc2NcIiwgXCJzdGF0XCIsIDx0b3RhbHB0cz4sIDxkaWZmaWN1bHR5PiwgXCJ3aW5cIiwgXCJsb3NlXCIsIDxsZW4qMj4sIDxhcHBlYXJkYXk+KSk7XHJcbiAgICAvL2RheSAxXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBbiBhbnRpbWFnaWMgcmF0IGhhcyB0YWtlbiBvdmVyIG15IGF0dGljIGFuZCBtYXkgYmUgYnVpbGRpbmcgYSBzbWFsbCBuYXRpb24gc3RhdGVcIiwgXCJJIGNhbid0IGdldCB0byBteSBncmFuZHBhcmVudCdzIG9sZCBwaG90b3Mgbm93LCBwbGVhc2UgZ2V0IGl0IGF0IGJ5IGFueSBtZWFucyBuZWNlc3NhcnkhXCIsIFwic3RyXCIsIDUsIDEsIFwiSSBmbGV4ZWQgYXQgdGhlIHJhdCBhbmQgaXQgbGVmdCFcIiwgXCJUaGUgcmF0IGtpbmcgcmFpbnMgc3VwcmVtZSBhbmQgd2lzaGVzIHRvIGJlIHBhaWQgcmVwYXJhdGlvbnMgdmlhIGNvcm4uXCIsIDIsIDEpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkxvc3QgY2F0XCIsIFwiU25lYWt5IG9sJyBmbHVmZmVyIGVzY2FwZWQhXCIsIFwiaW50XCIsIDUsIDEsIFwiV2UgZm91bmQgdGhlIGNhdCBiZWhpbmQgYSBkdW1wc3Rlci4gVGhlIG93bmVyIHNhaWQgdGhhdCB0aGUgZ2xvd2luZyByZWQgZXllcyBhcmUgbm9ybWFsLi4/XCIsIFwiV2hhdCBjYXQ/XCIsIDQsIDEpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIk15IHNoZWVwIGtlZXAgb24gZ29pbmcgbWlzc2luZ1wiLCBcIldoZXJlIGFyZSB0aGV5IGdvaW5nPyBXaGF0IGFyZSB0aGV5IGRvaW5nPyBBcmUgdGhleSB0YWxraW5nIGFib3V0IG1lPz8/IEkgaGF2ZSB0byBrbm93IVwiLCBcIm1hZ1wiLCA4LCAyLCBcIlRoZXkgd2VyZSBiZWluZyB1c2VkIGJ5IHRoZSBnb2JsaW5zIGZvciBmYW50YXN5IGZvb3RiYWxsLiBUaGV5IHdlcmUgcmV0dXJuZWQsIHNsaWdodGx5IG1vcmUgYXJtb3JlZC4gXCIsIFwiU2hlZXAgYXJlbid0IHJlYWwuXCIsIDYsIDEpKTtcclxuICAgIC8vZGF5IDJcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlNsaW1lcyBhcmUgZWF0aW5nIG15IHBvdGF0b2VzIVwiLCBcIkkgaGFkIG9uZSBwbGFuIGFuZCB0aGF0IHBsYW4gd2FzIHdoYWNraW5nIHRoZW0gd2l0aCBhIHN3b3JkIGFuZCBpdCBkaWRuJ3Qgd29yay5cIiwgXCJtYWdcIiwgOCwgMiwgXCJTbGltZXMgemFwcGVkLCBtaXNzaW9uIGNvbXBsZXRlIVwiLCBcIlRoZSBzbGltZXMgc2hvb2sgb2ZmIGFsbCB0aGUgcGh5c2ljYWwgZGFtYWdlIHdlIGNvdWxkIGRvIHNvIHdlIHNob3ZlZCB0aGVtIGludG8gYSBob2xlIGFuZCBob3BlZCBmb3IgdGhlIGJlc3QuXCIsIDIsIDIpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkdvYmxpbnMgd29uJ3Qgc3RvcCBoZWNrbGluZyBteSBzaGVlcFwiLCBcIlRoZXkncmUgZ2V0dGluZyB2ZXJ5IHN0cmVzc2VkIG91dCEgSGVscCFcIiwgXCJzdHJcIiwgMTAsIDMsIFwiVGhlIHNoZWVwIGNhbiBzaGVlcCBpbiBwZWFjZSBub3chXCIsIFwiV2UgbG9zdCwgYnV0IG9uIHRoZSBicmlnaHQgc2lkZSBJIGRvbid0IHRoaW5rIHNoZWVwIHVuZGVyc3RhbmQgRW5nbGlzaC5cIiwgNiwgMikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiSSB0aGluayBHZW9yZ2UgaXMgYSB2YW1waXJlXCIsIFwiSGUgbmV2ZXIgZWF0cyBhbmQgaGlzIHNoaXJ0cyBhcmUgYWx3YXlzIHN0YWluZWQgd2l0aCBibG9vZCFcIiwgXCJpbnRcIiwgNiwgMSwgXCJHZW9yZ2UgaXMuLi5hIHNoeSB3aW5lcnkgd29ya2VyLiBXZSBib3VnaHQgaGltIG5ldyBzaGlydHMuXCIsIFwiR2VvcmdlIG1vdmVkIG91dCBiZWZvcmUgd2UgY291bGQgdGFsayB0byBoaW0uLi5cIiwgMiwgMikpO1xyXG4gICAgLy9kYXkgM1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQW4gdW5kZWFkIGFybXkgaXMgaW52YWRpbmchXCIsIFwiVEhFWSdWRSBHT1RURU4gSU5UTyBUSEUgTUlMSyBCQVJOUyEgV0UnUkUgRE9PTUVEIVwiLCBcIm1hZ1wiLCAxNCwgNSwgXCJ3aW5cIiwgXCJsb3NlXCIsIDYsIDMpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlRIRSBTS1kgVFVSTkVEIFJFRFwiLCBcIldIWSBJUyBJVCBSRUQ/Pz9cIiwgXCJpbnRcIiwgNiwgMSwgXCJJdC4uLndlIGhhZCB0byBzcGVuZCAzIGhvdXJzIGV4cGxhaW5pbmcgdGhlIHN1bnNldCB0byBhIGZhbWlseSBvZiA2LiBJIG1lYW4gbW9uZXkgaXMgbW9uZXkgYnV0IGhvdydkIHRoaXMgbWlzc2lvbiBldmVuIGdldCBvbiBvdXIgbGlzdC5cIiwgXCJXZSBzdG9wcGVkIGJ5IGFuZCB0aGV5IHVoaGguLnNhaWQgYSBsb3Qgb2Ygd29yZHMgYW5kIGFmdGVyIGFuIGhvdXIgd2UgZ3JhY2lvdXNseSBqdW1wZWQgb3V0IHRoZSB3aW5kb3cgdG8gZXNjYXBlLiBcIiwgMiwgMykpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiTGljaCBLaW5nIGNhdXNpbmcgYSBydWNrdXNcIiwgXCJVbmhvbHkgbWFnaWNzIGFuZCBsb3VkLCBib29taW5nIG5vaXNlcyBhcmUgY29taW5nIGZyb20gdGhlIGxpY2gncyBrZWVwLCBzZW5kIGhlciBhIHdhcm5pbmchXCIsIFwibWFnXCIsIDEyLCA0LCBcIk91ciBtYWdpYyB3YXMgY29vbGVyIHRoYW4gaGVycyBzbyBzaGUgYWdyZWVkIHRvIG1vdmUgaGVyIHBhcnR5IGRlZXBlciB1bmRlcmdyb3VuZFwiLCBcIkxpY2ggXFxcIlBhcnR5YnJvZHVkZWZlbGxhXFxcIiB3YXMgZGVlcGx5IHVuaW1wcmVzc2VkIGJ5IHVzIGFuZCB0dXJuZWQgdXAgaGVyIGR1YnN0ZXAgbG91ZGVyXCIsIDYsIDMpKTtcclxuICAgIC8vZGF5IDRcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkEgZmlzaCBsZWFybmVkIHRvIHdhbGsgb24gbGFuZCBhbmQgaGVzIHVzaW5nIGhpcyBsZWdzIGV4Y2x1c2l2ZWx5IGZvciBldmlsXCIsIFwiSGUgY2FuJ3QgaGFuZGxlIHRoZSByZXNwb25zaWJpbGl0eSBvZiBoYXZpbmcgbGVncyEgSGUncyByYWlzaW5nIGEgdGFkcG9sZSBhcm15IVwiLCBcInN0clwiLCAxMCwgMywgXCJIZSBnb3Qgc3VwbGV4ZWQgYmFjayBpbnRvIHRoZSBvY2VhbiFcIiwgXCJIaXMgZXZpbCBjb250aW51ZXMuLi4uLnRoZSBuZWZlcmlvdXMgQ2FwdGFpbiBMZWdiZWFyZFwiLCAyLCA0KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJGb2xsb3cgbXkgY2F0IGFyb3VkIHRvIHNlZSB3aGF0IHNoZSBkb2VzIGFsbCBkYXlcIiwgXCJJIGxvc2UgaGVyIGV2ZXJ5IHRpbWUgSSB0cnksIEkgaGF2ZSB0byBrbm93IVwiLCBcImludFwiLCA4LCAyLCBcIkRlYXIgZ29kIHRoaXMgY2F0IGdldHMgc28gbWFueSB0cmVhdHMuIFBsZWFzZSBzdG9wIGZlZWRpbmcgaGVyIHNoZXMgdG9vIHBvd2VyZnVsLlwiLCBcIk91dHNtYXJ0ZWQgYnkgYSBjYXQuLi4uanVzdCBhbm90aGVyIG5vcm1hbCBkYXkgaG9uZXN0bHlcIiwgMiwgNCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiU3RvcCB0aGVzZSB3ZWVrbHkgYmFyZmlnaHRzIVwiLCBcIkV2ZXJ5IFdlZG5lc2RheSBhbiBlbGYgYW5kIGFuIG9yYyBjb21lIHRvIG15IGJhciwgYW5kIHRoZXkgYWx3YXlzIGVuZCB1cCBmaWdodGluZyEgSSBkb24ndCB1bmRlcnN0YW5kIHdoeSB0aGV5IGRvbid0IGp1c3QgY29tZSBvbiBkaWZmZXJlbnQgZGF5cyFcIiwgXCJzdHJcIiwgOCwgMiwgXCJUaGV5IHN0YXJ0ZWQgdGhyb3dpbmcgY2hhaXJzIGFnYWluIHNvIHdlIGFsc28gdGhyZXcgY2hhaXJzIGF0IHRoZW0uIFRoZXkgd2VyZSBmb3JjZWQgdG8gdGVhbSB1cCBhZ2FpbnN0IHVzIGFuZCBib25kZWQgb3ZlciB0aGVpciBzaGFyZWQgZGVmZWF0LiBUaGVpciB3ZWRkaW5nIGlzIG5leHQgd2VlaywgSSB0aGluayB0aGUgcHJvYmxlbSBpcyBzb2x2ZWRcIiwgXCJXZSBjb3VsZG4ndCBzdG9wIHRoZW0uIEkgd29uZGVyIGlmIHRoZXknbGwgc3RpbGwgYmUgYXQgaXQgd2hlbiBJIGhhdmUgZ3JhbmRraWRzLi4uXCIsIDQsIDQpKTtcclxuICAgIC8vZGF5IDVcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIktyYWtlbiB3b24ndCBzdG9wIHJlYXJyYW5naW5nIHRoZSBib2F0cyBhdCB0aGUgZG9jayBldmVyeSBuaWdodCFcIiwgXCJXZSBkb24ndCBuZWVkIG91ciBib2F0cyBvcmRlcmVkIGJ5IGNvbG9yISBXZSBuZWVkIHRoZW0gd2hlcmUgd2UgcGFya2VkIHRoZW0hXCIsIFwibWFnXCIsIDEyLCA0LCBcIlR1cm5zIG91dCwgc2hlIGp1c3QgbmVlZGVkIGEgdHJhbnNsYXRvci4gV2Ugc2V0IHVwIGEgbWFnaWNhbCBvbmUgYW5kIG5vdyB0aGUgS3Jha2VuIGdldHMgYSBzYWxhcnkgb2YgZmlzaCB0byBrZWVwIHRyYWNrIG9mIGFsbCB0aGUgYm9hdHNcIiwgXCJXZWxsIEkgZ3Vlc3MgdGhleSdsbCBqdXN0IGhhdmUgdG8gYWNjZXB0IHRoZWlyIG5ldyBvcmdhbml6YXRpb25hbCBvdmVybG9yZFwiLCA0LCA1KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJWRVJZIExBUkdFIEJFQVIhIFZFUlkgVkVSWSBMQVJHRSBCRUFSISFcIiwgXCJCRUFSIExBUkdFXCIsIFwic3RyXCIsIDEwLCAzLCBcIkdvb2QgbmV3cywgd2Ugd29uISBCYWQgbmV3cywgaXQgd2FzIGEgZHJhZ29uLlwiLCBcIklUIFdBUyBOT1QgQSBCRUFSIVwiLCAyLCA1KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBIGJpZyByb2NrIGlzIGZhbGxpbmcgZnJvbSB0aGUgc2t5IGJ1dCBpdCdzIHByb2JhYmx5IGZpbmVcIiwgXCJJIG1lYW4gYSBmaXJleSBkZWF0aCBkb2Vzbid0IHNvdW5kIGxpa2UgdGhlIHdvcnN0IHRoaW5nIGluIHRoZSB3b3JsZFwiLCBcIm1hZ1wiLCAxNCwgNSwgXCJXZSBtYWRlIGEgYmlnIGJhdCBvdXQgb2YgbWFnaWMgYW5kIHdoYWNrZWQgaXQgc29tZXdoZXJlIGVsc2UhXCIsIFwiaXQgd2FzIG5vdCBmaW5lISEhXCIsIDQsIDUpKTtcclxuICAgIC8vZGF5IDZcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlNvbWVvbmUncyBzdG9sZW4gdGhlIHRvd24gZmxhZyFcIiwgXCJXZSBuZWVkIG91ciBmbGFnIVwiLCBcImludFwiLCA4LCAyLCBcIldlIGZvdW5kIGl0IGluIGEgc2hvcHBpbmcgY2FydCAxMCBtaWxlcyBhd2F5XCIsIFwiV2UgY291bGRuJ3QgZmluZCBpdCBzbyB3ZSByZXBsYWNlZCB0aGUgZmxhZyB3aXRoIGEgY29hdCBzb21lb25lIGxlZnQgb3V0P1wiLCAyLCA2KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJHb2xlbSByYW1wYWdpbmcgdGhyb3VnaCB0b3duIVwiLCBcIklUJ1MgREVTVFJPWUlORyBUSEUgRkxPV0VSUyBBTkQgT05MWSBUSEUgRkxPV0VSUyEhXCIsIFwic3RyXCIsIDEyLCA0LCBcIldlIGhhY2tlZCBpdCEgV2l0aCBhbiBheGUuIEJ1dCBzb21laG93IHRoaXMgZml4ZWQgaXQgYW5kIG5vdyBpdHMgYSBub3JtYWwgZ2FyZGVuaW5nIGdvbGVtIVwiLCBcIkl0IGJlYXQgdXMgdXAgYW5kIHJhbiBpbnRvIHRoZSBjb3VudHJ5c2lkZSB0byBjYXN0cmF0ZSBtb3JlIHBsYW50c1wiLCAyLCA2KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBIHRpbnkgZHJhZ29uIHdvbid0IGdldCBvdXQgb2YgbXkgc2lsdmVyd2VhciBjYWJpbmV0IVwiLCBcIk5vdyBub3JtYWxseSB0aGlzIHdvdWxkbid0IGJlIGFuIGlzc3VlIGJ1dCBvdXIgaG91c2UgaXMgdmVyeSBmbGFtbWFibGUhIFdlIGRvbid0IGtub3cgaG93IHRvIG1vdmUgaXQgc2FmZWx5LlwiLCBcImludFwiLCAxMCwgMywgXCJMaWwgZ3V5IGp1c3Qgd2FudHMgdG8gaG9hcmQgc3Bvb25zLiBXZSBtYWRlIGhpbSBhIHBpbGUgb2YgZG9uYXRlZCBzcG9vbnMgb3V0IGluIHRoZSB3b29kcyBhbmQgaGUgc2VlbXMgdmVyeSBoYXBweSFcIiwgXCJXZWxsIHRoZSBkcmFnb24ncyBvdXQgb2YgdGhlIGNhYmluZXQsIGJ1dCB0aGVpciBob3VzZSBpcy4uLnNsaWdodGx5Li4uLmFibGF6ZS5cIiwgMiwgNikpO1xyXG5cclxufVxyXG5mdW5jdGlvbiBsb2dfdGV4dCgpIHtcclxuICAgIHZhciBsZ190eHQgPSBcIlwiO1xyXG4gICAgZm9yICh2YXIgZSBpbiB0ZXh0X2xvZykge1xyXG4gICAgICAgIGxnX3R4dCArPSB0ZXh0X2xvZ1tlXSArIFwiPGJyPiAqICogKiA8YnI+XCI7XHJcbiAgICB9XHJcbiAgICB2YXIgZGl2X2xvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nXCIpXHJcbiAgICBcclxuICAgIGRpdl9sb2cuaW5uZXJIVE1MID0gbGdfdHh0O1xyXG4gICAgZGl2X2xvZy5zY3JvbGxUb3AgPSBkaXZfbG9nLnNjcm9sbEhlaWdodDtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfbG9jYXRpb25zKCkge1xyXG4gICAgdmFyIHN0cl9sb2MgPSBuZXcgTG9jYXRpb24oXCJUcmFpbmluZyBEdW1teVwiLCAzODAsIDMxNSwgXCJzdHJcIik7XHJcbiAgICB2YXIgbWFnX2xvYyA9IG5ldyBMb2NhdGlvbihcIk1hZ2ljIFRvd2VyXCIsIDY3MCwgMTIwLCBcIm1hZ1wiKTtcclxuICAgIHZhciBpbnRfbG9jID0gbmV3IExvY2F0aW9uKFwiTGlicmFyeVwiLCA1NzAsIDI4MCwgXCJpbnRcIik7XHJcbiAgICB2YXIgYWZmX2xvYyA9IG5ldyBMb2NhdGlvbihcIkdhemVib1wiLCA0MDUsIDEzNSwgXCJhZmZpbml0eVwiKTtcclxuICAgIHZhciBhZmZfbG9jMiA9IG5ldyBMb2NhdGlvbihcIkdhemVib1wiLCA0MzUsIDEzNSwgXCJhZmZpbml0eVwiKTtcclxuICAgIHZhciBzdGFydF9sb2MgPSBuZXcgTG9jYXRpb24oXCJPdXRzaWRlXCIsIDYwMCwgMzE1KTtcclxuICAgIGxvY2F0aW9uc1tcInN0YXJ0XCJdID0gc3RhcnRfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wic3RyXCJdID0gc3RyX2xvYztcclxuICAgIGxvY2F0aW9uc1tcIm1hZ1wiXSA9IG1hZ19sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJpbnRcIl0gPSBpbnRfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wiYWZmaW5pdHkxXCJdID0gYWZmX2xvYztcclxuICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MlwiXSA9IGFmZl9sb2MyO1xyXG5cclxufVxyXG5mdW5jdGlvbiBmaW5kX2luX2xpc3QodHlwZSwgdG9fc2VhcmNoKSB7XHJcbiAgICBpZiAodHlwZSA9PSBcInJvc3RlclwiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3N0ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHJvc3RlcltpXS5uYW1lID09IHRvX3NlYXJjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJtaXNzaW9uXCIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1pc3Npb25fYm9hcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1pc3Npb25fYm9hcmRbaV0udGl0bGUgPT0gdG9fc2VhcmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbmZ1bmN0aW9uIGRyYXdfY2FudmFzKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJkcmF3aW5nIGNhbnZhc1wiKTtcclxuICAgIGxvZ190ZXh0KCk7XHJcbiAgICAvL3N0dWZmIHRvIHJlZHJhdyB3aGVuIHBvcHVwIGNsb3Nlcy4gXHJcbiAgICAvLyBvdXRsaW5lXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5saW5lV2lkdGggPSBcIjZcIjtcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICBjb250ZXh0LnJlY3QoMCwgMCwgODAwLCA2NTApO1xyXG4gICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgIC8vY29uc29sZS5sb2coaW1hZ2VzW1wiYmdcIl0pO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiYmdcIl0sIDAsIDApOyAvL2RyYXcgYmdcclxuICAgIGRyYXdfY2hhcmFjdGVyX2J1dHRvbnMoKTtcclxuICAgIGRyYXdfY2hhcmFjdGVycygpO1xyXG4gICAgY29udGV4dC5maWxsVGV4dChcIkRheSBcIiArIGN1cnJlbnRfZGF5ICsgXCIsIFwiICsgY3VycmVudF90aW1lLCA2NzUsIDU3NSk7XHJcbn1cclxuZnVuY3Rpb24gZHJhd19nYW1lX2RvbmUoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImRvbmVcIik7XHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJnYW1lZG9uZVwiXSwgMCwgMCk7IC8vZHJhdyBkb25lXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgY29udGV4dC5mb250ID0gXCIyNHB4IFNtYWxsIEZvbnRzXCJcclxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJNaXNzaW9ucyBBdHRlbXB0ZWQ6IFwiICsgbnVtX21pc3Npb25zLCAzMDAsIDM2MCk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTWlzc2lvbnMgU3VjY2VlZGVkOiBcIiArIG51bV9zdWNjZXNzZnVsLCAzMDAsIDQwMCk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTWlzc2lvbnMgRmFpbGVkOiBcIiArIG51bV9mYWlsZWQsIDMwMCwgNDQwKTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVfdGltZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidXBkYXRlIHRpbWUgcmVzZXRcIik7XHJcbiAgICBwb3AuaXNfb3BlbiA9IGZhbHNlO1xyXG4gICAgc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgIHNlbGVjdGVkMiA9IG51bGw7XHJcbiAgICBzZWxlY3RlZF9taXNzaW9uID0gbnVsbDtcclxuICAgIC8vcG9wLmRpc21pc3MoKTtcclxuXHJcbiAgICAvL2ZpcnN0OiBoYXZlIGNoYXJhY3RlcnMgZG8gdGhlaXIgYWN0aW9uc1xyXG4gICAgbW92ZV9jaGFyYWN0ZXJzKCk7XHJcbiAgICAvL25leHQsIHVwZGF0ZSB0aW1lLlxyXG4gICAgaWYgKGN1cnJlbnRfdGltZSA9PSBcIm1vcm5pbmdcIikge1xyXG4gICAgICAgIGN1cnJlbnRfdGltZSA9ICBcImV2ZW5pbmdcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3VycmVudF90aW1lID0gXCJtb3JuaW5nXCI7XHJcbiAgICAgICAgY3VycmVudF9kYXkrKztcclxuICAgICAgICAvL3VwZGF0ZSBtaXNzaW9uIGJvYXJkXHJcbiAgICB9XHJcbiAgICAvL2ZvciBldmVyeSBtaXNzaW9uIGFzc2lnbmVkLCB1cGRhdGVkIHRoZSB0aW1lIHN0dWZmXHJcbiAgICBmb3IgKHZhciBtIGluIG1pc3Npb25fYm9hcmQpIHtcclxuICAgICAgICBpZiAobWlzc2lvbl9ib2FyZFttXS5hc3NpZ25lZCkge1xyXG4gICAgICAgICAgICBtaXNzaW9uX2JvYXJkW21dLmRlY3JlYXNlX3RpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3X2NhbnZhcygpOyAvL3JlZHJhdyB0ZXh0LlxyXG4gICAgaWYgKGN1cnJlbnRfZGF5ID09IDcpIHtcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiV2hldyEgTG9va3MgbGlrZSBldmVyeW9uZeKAmXMgc3RpbGwgaW4gb25jZSBwaWVjZSEgVGhhbmtzIGZvciB0YWtpbmcgY2FyZSBvZiB0aGluZ3Mgd2hpbGUgSSB3YXMgb3V0LiBCZWluZyBhIEd1aWxkbWFzdGVyIGlzIHRvdWdoIHdvcmssIHlvdSBkaWQgZ3JlYXQhIEnigJlsbCB0YWtlIG92ZXIgZnJvbSBoZXJlLCBidXQgaGV5LCB3aGVuIEkgcmV0aXJlIGZvciByZWFsIHlvdSBnb3QgYSByZWFsIHNvbGlkIHNob3QgYXQgdGFraW5nIG15IHBvc2l0aW9uISBTZWUgeW91IGFyb3VuZCFcIik7XHJcbiAgICAgICAgbG9nX3RleHQoKTtcclxuICAgICAgICBkcmF3X2dhbWVfZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiRGF5IFwiICsgY3VycmVudF9kYXkgKyBcIiwgXCIgKyBjdXJyZW50X3RpbWUpO1xyXG4gICAgfVxyXG4gICAgLy9jaGFyYWN0ZXJzIGFsd2F5cyBtb3ZlXHJcblxyXG4gICAgXHJcbn1cclxuZnVuY3Rpb24gZHJhd19jaGFyYWN0ZXJzKCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImluIGRyYXcgY2hhcmFjdGVyc1wiKTtcclxuICAgIGZvciAodmFyIGNoYXIgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgaWYoIXJvc3RlcltjaGFyXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltjaGFyXS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG1vdmVfY2hhcmFjdGVycygpIHtcclxuICAgIC8vcmFuZG9tIHRoZSBjaGFyYWN0ZXIgb3JkZXIgZm9yIHRob3NlIHdobyBhcmVudCBidXN5XHJcbiAgICBjb25zb2xlLmxvZyhcImluIG1vdmUgY2hhclwiKTtcclxuICAgIC8vZ2V0X3JhbmRvbV9jaGFyX2xpc3QoKTtcclxuICAgIC8vTmVlZCB0byBzdG9wIG9uY2UgZXZlcnkgY2hhcmFjdGVyIGlzIGFzc2lnbmVkLiBcclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJtb3JuaW5nXCIpIHtcclxuICAgICAgICBmb3IgKHZhciBjaCBpbiByb3N0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFyb3N0ZXJbY2hdLmlzX29jY3VwaWVkICYmICFyb3N0ZXJbY2hdLmlzX29uX21pc3Npb24pIHsgLy9pZiBjaGFyYWN0ZXIgaXNuJ3Qgb24gYSBtaXNzaW9uIG9yIGFscmVhZHkgb2NjdXBpZWRcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobG9jYXRpb25zKTtcclxuICAgICAgICAgICAgICAgIC8vc2VsZWN0X2FjdGlvbihyb3N0ZXJbY2hdKTtcclxuICAgICAgICAgICAgICAgIGF0dGFjaFRyZWVUb0FnZW50KHJvc3RlcltjaF0ubmFtZSwgc2VsZWN0X2FjdGlvbihyb3N0ZXJbY2hdKSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJvc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd29ybGRUaWNrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vZXZlbmluZywgZXZlcnlvbmUgZ29lcyB0byBzdGFydFxyXG4gICAgICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltjXS5zZXRfbG9jYXRpb24oXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgcm9zdGVyW2NdLmlzX29jY3VwaWVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWxsIGxvY2F0aW9ucyBhcmUgdW5vY2N1cGllZCBcclxuICAgICAgICBsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJpbnRcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbmZ1bmN0aW9uIGRyYXdfY2hhcmFjdGVyX2J1dHRvbnMoKSB7XHJcbiAgICAvL3ZhciB5ID0gNTA7XHJcbiAgICBmb3IgKHZhciBiIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgIGNoYXJfYnV0dG9uc1tiXS5kcmF3KCk7XHJcbiAgICB9XHJcbiAgICBwYXNzLmRyYXcoKTtcclxuICAgIGZvciAodmFyIGIgaW4gbWlzc2lvbl9idXR0b25zKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50X2RheSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhtaXNzaW9uX2JvYXJkW2JdLmRheSlcclxuICAgICAgICBpZihjdXJyZW50X2RheSA9PSBtaXNzaW9uX2JvYXJkW2JdLmRheSAmJiAhbWlzc2lvbl9ib2FyZFtiXS5hc3NpZ25lZCkge1xyXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbnNbYl0uZHJhdygpO1xyXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbnNbYl0ud3JpdGVfdGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vY29udGV4dC5kcmF3SW1hZ2UoY2hhcl9idXR0b25zWzBdLmltYWdlLCBjaGFyX2J1dHRvbnNbMF0ueCwgY2hhcl9idXR0b25zWzBdLnkpO1xyXG4gICAgXHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX2J1dHRvbnMoKSB7XHJcbiAgICBwb3AgPSBuZXcgUG9wdXAoMzAwLCAyMDAsIFwicG9wdXBcIik7XHJcbiAgICB2YXIgeSA9IDIwO1xyXG4gICAgdmFyIHRpbnlfeCA9IDMxMDtcclxuICAgIHZhciB0aW55X3kgPSAyODBcclxuICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgdmFyIGNoYXJfbmFtZSA9IHJvc3RlcltjXS5uYW1lO1xyXG4gICAgICAgIHZhciBiID0gbmV3IEJ1dHRvbigxMCwgeSwgY2hhcl9uYW1lLCBjaGFyX25hbWUsIGNoYXJfbmFtZStcIl9wXCIpO1xyXG4gICAgICAgIHZhciBuID0gXCJ0aW55XCIrY2hhcl9uYW1lXHJcbiAgICAgICAgdmFyIHRpbnlfYiA9IG5ldyBCdXR0b24oMCwgMCwgbiwgY2hhcl9uYW1lLCBuK1wiX3BcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpbWFnZXNbbitcIl9wXCJdKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGltYWdlcyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhuKTtcclxuICAgICAgICBwb3B1cF9idXR0b25zLnB1c2godGlueV9iKTtcclxuICAgICAgICBjaGFyX2J1dHRvbnMucHVzaChiKTtcclxuICAgICAgICB5Kz02MDtcclxuICAgIH1cclxuICAgIHkrPTEzMDtcclxuICAgIHZhciB4PSAyMDtcclxuICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICBmb3IgKHZhciBjIGluIG1pc3Npb25fYm9hcmQpIHtcclxuICAgICAgICAvL2hhcmQgY29kZWQgYW5kIGhhY2t5LCAzIG1pc3Npb25zIHBlciBkYXlcclxuICAgICAgICBpZiAoY291bnQgPT0gMykge1xyXG4gICAgICAgICAgICB4ID0gMjA7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh4KTtcclxuICAgICAgICB2YXIgbWlzc2lvbl90aXRsZSA9IG1pc3Npb25fYm9hcmRbY10udGl0bGU7XHJcbiAgICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIHksIFwiYnV0dG9uXCIsIG1pc3Npb25fdGl0bGUpO1xyXG4gICAgICAgIG1pc3Npb25fYnV0dG9ucy5wdXNoKGIpO1xyXG4gICAgICAgIHgrPTIyMDtcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuICAgIHBhc3MgPSBuZXcgQnV0dG9uKDYzMCwgNTgwLCBcInBhc3NcIiwgXCJwYXNzXCIpO1xyXG4gICAgb2sgPSBuZXcgQnV0dG9uKDAsMCxcIm9rXCIsIFwib2tcIik7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrQm91bmRzKG9iamVjdCwgeCwgeSkge1xyXG4gICAgdmFyIG1pblggPSBvYmplY3QueDtcclxuICAgIHZhciBtYXhYID0gb2JqZWN0LnggKyBvYmplY3QuaW1hZ2Uud2lkdGg7XHJcbiAgICB2YXIgbWluWSA9IG9iamVjdC55O1xyXG4gICAgdmFyIG1heFkgPSBvYmplY3QueSArIG9iamVjdC5pbWFnZS5oZWlnaHQ7XHJcbiAgICB2YXIgbXggPSB4O1xyXG4gICAgdmFyIG15ID0geTtcclxuICAgIC8vY29uc29sZS5sb2coXCJGb3Igb2JqZWN0IFwiICsgb2JqZWN0LnRleHQpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImJ1dHRvbiB4IHJhbmdlOlwiICsgbWluWCArIFwiIHRvIFwiICsgbWF4WCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiYnV0dG9uIHkgcmFuZ2U6XCIgKyBtaW5ZICsgXCIgdG8gXCIgKyBtYXhZKTtcclxuXHJcbiAgICBpZiAobXggPj0gbWluWCAmJiBteCA8PSBtYXhYICYmIG15ID49IG1pblkgJiYgbXkgPD0gbWF4WSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmZ1bmN0aW9uIGNsaWNrZWQoZSkge1xyXG4gICAgLy9vbmx5IHdhbnQgdG8gb3BlbiBwb3B1cCB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgLy9jbG9zZSBwb3B1cCB3aGVuIHBvcHVwIGlzIGNsaWNrZWQgb2ZmLiBcclxuXHJcbiAgICAvL2ZpZ3VyZSBvdXQgd2hhdCB3YXMgY2xpY2tlZCBmaXJzdC4gXHJcbiAgICAvL2NvbnNvbGUubG9nKFwibW91ZXMgcG9zOiBcIiArIGUuY2xpZW50WCArIFwiLCBcIiArIGUuY2xpZW50WSk7IC8vZGVidWdnaW5nXHJcbiAgICBpZighcG9wLmlzX29wZW4pe1xyXG4gICAgICAgIC8vY2hlY2sgaWYgYSBidXR0b24gd2FzIGNsaWNrZWQgIFxyXG4gICAgICAgIGZvciAodmFyIGJ1dHRvbiBpbiBjaGFyX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgaWYgKGNoZWNrQm91bmRzKGNoYXJfYnV0dG9uc1tidXR0b25dLCBlLmNsaWVudFgsIGUuY2xpZW50WSkpIHtcclxuICAgICAgICAgICAgICAgIC8vZHJhdyBwb3B1cFxyXG4gICAgICAgICAgICAgICAgY2hhcl9idXR0b25zW2J1dHRvbl0ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwb3AuaXNfb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBjaGFyX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0uc3RhdHNfdG9zdHIoKSk7XHJcbiAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5zdGF0c190b3N0cigpLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNoYXJhY3RlcjogXCIgKyByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBjaGFyX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0uc3RhdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGJ1dHRvbiBpbiBtaXNzaW9uX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS5hc3NpZ25lZCAmJiBjaGVja0JvdW5kcyhtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXSwgZS5jbGllbnRYLCBlLmNsaWVudFkpICYmIGN1cnJlbnRfZGF5ID09IG1pc3Npb25fYm9hcmRbYnV0dG9uXS5kYXkpIHtcclxuICAgICAgICAgICAgICAgIHBvcC5pc19vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkX21pc3Npb24gPSBidXR0b247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiU0VUVElORyBTRUxFQ1RFRCBNSVNTSU9OXCIpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIC8vZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmaW5kX2luX2xpc3QoXCJtaXNzaW9uXCIsIG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWlzc2lvbl9ib2FyZFswXS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWlzc2lvbl90aXRsZSA9IG1pc3Npb25fYm9hcmRbZmluZF9pbl9saXN0KFwibWlzc2lvblwiLCBtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWlzc2lvbl9kZXNjID0gbWlzc2lvbl9ib2FyZFtmaW5kX2luX2xpc3QoXCJtaXNzaW9uXCIsIG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpXS5nZXRfZGVzYygpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmZpbGxfcG9wdXAobWlzc2lvbl90aXRsZSArIFwiXFxuXCIgKyBtaXNzaW9uX2Rlc2MsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vcG9wLmZpbGxfcG9wdXAoXCJkZXNjXCIsIHRydWUsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgLy9wb3AuZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGVja0JvdW5kcyhwYXNzLCBlLmNsaWVudFgsIGUuY2xpZW50WSkpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBhc3MgY2xpY2tlZFwiKTtcclxuICAgICAgICAgICAgdXBkYXRlX3RpbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL2lmIHBvcCB1cCBpcyBvcGVuLCB3YW50IHRvIGNoZWNrIGlmIGFueXRoaW5nIEJVVCBidXR0b25zIHdhcyBjbGlja2VkIChmb3Igbm93KVxyXG4gICAgICAgIGlmIChjaGVja0JvdW5kcyhwb3AsIGUuY2xpZW50WCwgZS5jbGllbnRZKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvcHVwIGNsaWNrZWQhXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoZWNrQm91bmRzKG9rLCAgZS5jbGllbnRYLCBlLmNsaWVudFkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0JvdW5kcyhvaywgIGUuY2xpZW50WCwgZS5jbGllbnRZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJPayBjbGlja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcC5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGIgaW4gcG9wdXBfYnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiB0aG9zZSBidXR0b25zIHdlcmUgY2xpY2tlZC4gXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBvcHVwX2J1dHRvbnNbYl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQm91bmRzKHBvcHVwX2J1dHRvbnNbYl0sIGUuY2xpZW50WCwgZS5jbGllbnRZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBpcyBcIiArIHBvcHVwX2J1dHRvbnNbYl0udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TZWxlY3QgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkMSA9PSBudWxsICYmIHNlbGVjdGVkX21pc3Npb24gIT0gbnVsbCAmJiAhcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBwb3B1cF9idXR0b25zW2JdLnRleHQpXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMSA9IHBvcHVwX2J1dHRvbnNbYl0udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRfbWlzc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVkcmF3IHcgcHJlc3NlZCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtdCA9IG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZCA9IG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uZ2V0X2Rlc2MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmZpbGxfcG9wdXAobXQgKyBcIlxcblwiICsgbWQsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcHVwX2J1dHRvbnNbYl0udGV4dCAhPSBzZWxlY3RlZDEgJiYgIXJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgcG9wdXBfYnV0dG9uc1tiXS50ZXh0KV0uaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBwb3B1cF9idXR0b25zW2JdLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbYl0ucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcnN0OiBcIiArIHNlbGVjdGVkMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWNvbmQ6IFwiICsgc2VsZWN0ZWQyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlR3byBjaGFyYWN0ZXJzIHNlbGVjdGVkLiBBc3NzaWduaW5nIG1pc3Npb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGl0bGU6IFwiKyBtaXNzaW9uX2JvYXJkW3NlbGVjdGVkX21pc3Npb25dLnRpdGxlICsgXCJcXG5EZXNjOiBcIiArIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uZGVzYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Fzc2lnbiBtaXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uYXNzaWduKHNlbGVjdGVkMSwgc2VsZWN0ZWQyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maWxsIG5ldyB0ZXh0IG9uIHBvcHVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9wLmRpc21pc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5pc19vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInN0aWxsIGluIGlmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChcIlNlbmRpbmcgXCIrIHNlbGVjdGVkMSArXCIgYW5kIFwiKyBzZWxlY3RlZDIgKyBcIiBvbiB0aGUgbWlzc2lvbi5cIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiU2VudCBcIiArIHNlbGVjdGVkMSArIFwiIGFuZCBcIiArIHNlbGVjdGVkMiArIFwiIG9uOiBcIiArIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0udGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkMSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcGFzcyB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlX3RpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2xvc2UgcG9wdXBcIik7XHJcbiAgICAgICAgICAgIHBvcC5pc19vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHBvcC5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgIC8vc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgICAgICAgICAgLy9zZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICAvL3NlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgICAgICAvL3BvcC5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy9jb25zdHJ1Y3QgcG9wdXAuIE1heWJlIG1ha2UgaXQgb2JqZWN0PyBcclxuZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICAvL3RoaW5ncyB0byBvbmx5IGRvIG9uZSB0aW1lLiBcclxuICAgIHByZWxvYWRfaW1nKCk7XHJcbiAgICBjcmVhdGVfbG9jYXRpb25zKCk7XHJcbiAgICBjcmVhdGVfcm9zdGVyKCk7XHJcbiAgICBjcmVhdGVfbWlzc2lvbnMoKTtcclxuICAgIGNyZWF0ZV9idXR0b25zKCk7XHJcbiAgICBkcmF3X2NhbnZhcygpO1xyXG5cclxufVxyXG4vL3ZpbGxhbmVsbGUgc3R1ZmZcclxuLy9mdW5jdGlvbiByZWZlcmVuY2VkIGZyb206IGh0dHBzOi8vd3d3LnczcmVzb3VyY2UuY29tL2phdmFzY3JpcHQtZXhlcmNpc2VzL2phdmFzY3JpcHQtYXJyYXktZXhlcmNpc2UtMTcucGhwXHJcbmZ1bmN0aW9uIGdldF9yYW5kb21fY2hhcl9saXN0KCkge1xyXG4gICAgdmFyIGxlbiA9IHJvc3Rlci5sZW5ndGg7XHJcbiAgICB2YXIgdGVtcDtcclxuICAgIHZhciBpbmRleDtcclxuXHJcbiAgICB3aGlsZSAobGVuID4gMCkge1xyXG4gICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKTtcclxuICAgICAgICBsZW4tLTtcclxuICAgICAgICB0ZW1wID0gcm9zdGVyW2xlbl1cclxuICAgICAgICByb3N0ZXJbbGVuXSA9IHJvc3RlcltpbmRleF1cclxuICAgICAgICByb3N0ZXJbaW5kZXhdID0gdGVtcDtcclxuICAgIH1cclxuICAgIC8vY29uc29sZS5sb2cocm9zdGVyKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJoaWdoZXN0IGFmZjogXCIgKyBnZXRfY2hhcl90b19yYWlzZV9hZmZpbml0eShyb3N0ZXJbMF0pLm5hbWUpO1xyXG4gICAgLy9zdGFydCBhY3Rpb25zOlxyXG59XHJcbmZ1bmN0aW9uIHNlbGVjdF9hY3Rpb24oYykge1xyXG4gICAgLy9zd2l0Y2ggc3RhdGVtZW50XHJcbiAgICBjb25zb2xlLmxvZyhjLm5hbWUgKyBcIiBzZWxlY3RpbmcgYWN0aW9uLi4uXCIpO1xyXG4gICAgc3dpdGNoKGMubmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJNaW5cIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIkxhbmRvbFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyldKTtcclxuICAgICAgICBjYXNlIFwiSG9yc3RcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIlJvcnlcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIkRhbnRoXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyksIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKV0pO1xyXG4gICAgfVxyXG4gICAgLy9yZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKVxyXG59XHJcbmZ1bmN0aW9uIGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KGMpIHtcclxuICAgIC8vZmluZCB0aGUgY2hhcmFjdGVyIHdpdGggdGhlIGhpZ2hlc3QgYWZmaW5pdHkgdGhhdCBpcyBOT1QgMTAgYW5kIE5PVCBvY2N1cGllZFxyXG4gICAgdmFyIGhpZ2hlc3QgPSBudWxsO1xyXG4gICAgdmFyIGhpZ2hlc3RfYWZmID0gLTE7XHJcbiAgICBmb3IgKHZhciBjaCBpbiByb3N0ZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGMpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2NoXSk7XHJcbiAgICAgICAgdmFyIGNvbXAgPSByb3N0ZXJbY2hdO1xyXG4gICAgICAgIGlmKGNvbXAubmFtZSAhPSBjLm5hbWUpIHtcclxuICAgICAgICAgICAgaWYoIWNvbXAuaXNfb2NjdXBpZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmKGMuYWZmaW5pdHlbY29tcC5uYW1lXSA8IDEwICYmIGMuYWZmaW5pdHlbY29tcC5uYW1lXSA+PSBoaWdoZXN0X2FmZikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3QgPSBjb21wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RfYWZmID0gYy5hZmZpbml0eVtjb21wLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYy5uYW1lICsgXCIncyBoaWdoZXN0IGFmZmluaXR5IGlzIHdpdGggXCIgKyBoaWdoZXN0Lm5hbWUpO1xyXG4gICAgcmV0dXJuIGhpZ2hlc3Q7XHJcbn1cclxuLy9DSEVDSyBTUE9UIERFQ1xyXG5mdW5jdGlvbiBnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSB7XHJcbiAgICBsZXQgdHJhaW5fc3RyID0gYWN0aW9uKCBcclxuICAgICgpID0+ICFsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1tcInN0clwiXSA8IDEwICYmICFjLmlzX29jY3VwaWVkICYmICFjLmlzX29uX21pc3Npb24sXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICtcIiBpcyB0cmFpbmluZyBzdHIuXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjLmlzX29jY3VwaWVkID0gdHJ1ZTsgXHJcbiAgICAgICAgICAgIC8vaW5jcmVhc2Ugc3RhdFxyXG4gICAgICAgICAgICBjLmluY3JlYXNlX3N0YXQoXCJzdHJcIiwgMSk7XHJcbiAgICAgICAgICAgIC8vc2V0IGMncyBsb2NhdGlvblxyXG4gICAgICAgICAgICBjLnNldF9sb2NhdGlvbihcInN0clwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG4gICAgXHJcbiAgICByZXR1cm4gdHJhaW5fc3RyO1xyXG59XHJcbmZ1bmN0aW9uIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJpbnQgbG9jOiBcIiArIGludF9jb25kKTtcclxuICAgIGxldCB0cmFpbl9pbnQgPSBhY3Rpb24oIFxyXG4gICAgKCkgPT4gIWxvY2F0aW9uc1tcImludFwiXS5hc3NpZ25lZCAmJiBjLnN0YXRzW1wiaW50XCJdIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQgJiYgIWMuaXNfb25fbWlzc2lvbixcclxuICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGV4dF9sb2cucHVzaChjLm5hbWUgK1wiIGlzIHRyYWluaW5nIGludC5cIik7XHJcbiAgICAgICAgICAgIC8vc2V0IGxvY2F0aW9uIGFzc2lnbmVkXHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcImludFwiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlOyBcclxuICAgICAgICAgICAgLy9pbmNyZWFzZSBzdGF0XHJcbiAgICAgICAgICAgIGMuaW5jcmVhc2Vfc3RhdChcImludFwiLCAxKTtcclxuICAgICAgICAgICAgLy9zZXQgYydzIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwiaW50XCIpO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiB0cmFpbl9pbnQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYykge1xyXG4gICAgLy92YXIgbWFnX2NvbmQgPSAhbG9jYXRpb25zW1wibWFnXCJdLmFzc2lnbmVkICYmIGMuc3RhdHNbJ21hZyddIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQ7XHJcbiAgICBsZXQgdHJhaW5fbWFnID0gYWN0aW9uKCBcclxuICAgICgpID0+ICFsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1tcIm1hZ1wiXSA8IDEwICYmICFjLmlzX29jY3VwaWVkICYmICFjLmlzX29uX21pc3Npb24sXHJcbiAgICAoKSA9PiB7IFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1hZ19jb25kKTsgICAgXHJcbiAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICtcIiBpcyB0cmFpbmluZyBtYWcuXCIpO1xyXG4gICAgICAgICAgICAvL3NldCBsb2NhdGlvbiBhc3NpZ25lZFxyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjLmlzX29jY3VwaWVkID0gdHJ1ZTsgXHJcbiAgICAgICAgICAgIC8vaW5jcmVhc2Ugc3RhdFxyXG4gICAgICAgICAgICBjLmluY3JlYXNlX3N0YXQoXCJtYWdcIiwgMSk7XHJcbiAgICAgICAgICAgIC8vc2V0IGMncyBsb2NhdGlvblxyXG4gICAgICAgICAgICBjLnNldF9sb2NhdGlvbihcIm1hZ1wiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsb2NhdGlvbnNbXCJtYWdcIl0pO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiB0cmFpbl9tYWc7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSB7XHJcbiAgICBsZXQgcmFpc2VfYWZmaW5pdHkgPSBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gIWxvY2F0aW9uc1tcImFmZmluaXR5MVwiXS5hc3NpZ25lZCAmJiAhbG9jYXRpb25zW1wiYWZmaW5pdHkyXCJdLmFzc2lnbmVkICYmICFjLmlzX29jY3VwaWVkLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBjMiA9IGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KGMpOyAvL3RoaXMgaXMgY2hhcmFjdGVyIG9iai4gU2hvdWxkIGJlIHVub2NjdXBpZWQgdyBsZXNzIHRoYW4gMTAgYWZmXHJcbiAgICAgICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKGMubmFtZSArXCIgaXMgcmFpc2luZyBhZmZpbml0eSB3aXRoIFwiICsgYzIubmFtZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgIC8vc2V0IGxvY2F0aW9uIGFzc2lnbmVkXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb25zW1wiYWZmaW5pdHkyXCJdLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vaW5jcmVhc2UgYWZmaW5pdHkgd2l0aCB0aGVtXHJcbiAgICAgICAgICAgICAgICBjLmluY3JlYXNlX2FmZmluaXR5KGMyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYzIuaW5jcmVhc2VfYWZmaW5pdHkoYy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vc2V0IGJvdGggdG8gb2NjdXBpZWRcclxuICAgICAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYzIuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy9zZXQgYm90aCcgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwiYWZmaW5pdHkxXCIpO1xyXG4gICAgICAgICAgICAgICAgYzIuc2V0X2xvY2F0aW9uKFwiYWZmaW5pdHkyXCIpO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiByYWlzZV9hZmZpbml0eTtcclxufVxyXG4vL1RPRE9cclxuLy9beF0gYnV0dG9uIG9uIHBvcCB1cC5cclxuXHJcbi8vRnV0dXJlIEltcHJvdmVtZW50czpcclxuLy9JbXByb3ZlZCBVSVxyXG4vL0NoYXJhY3RlciBkaWFsb2d1ZVxyXG4vL0NoYXJhY3RlcnMgdHJhaW5pbmcgdG9nZXRoZXJcclxuLy9NaXNzaW9ucyBoYXZpbmcgYSB3YXkgdG8gd2luIHdpdGggYWZmaW5pdHlcclxuIiwiaW1wb3J0IFF1ZXVlIGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1F1ZXVlXCI7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0YXR1cyB7XHJcbiAgICBSVU5OSU5HLFxyXG4gICAgU1VDQ0VTUyxcclxuICAgIEZBSUxVUkVcclxufVxyXG5cclxuZnVuY3Rpb24gdGVybWluYXRlQW5kUmV0dXJuKGlkOiBudW1iZXIsIGJsYWNrYm9hcmQ6IGFueSwgc3RhdHVzOiBTdGF0dXMpIHtcclxuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcclxuICAgIHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcclxuZXhwb3J0IHR5cGUgUHJlY29uZGl0aW9uID0gKCkgPT4gYm9vbGVhblxyXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXHJcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgR3VhcmRUaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrLCBuZWdhdGU/OiBib29sZWFuKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXHJcblxyXG52YXIgYmxhY2tib2FyZCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XHJcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkID0gMSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcmVjb25kaXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lID0gdGlja3NSZXF1aXJlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmxhY2tib2FyZFtpZF0udGlja3NEb25lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBhc3RUaWNrLCBuZWdhdGUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZWVkID8gZXhlY3V0ZShhc3RUaWNrKSA6IFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0b3JUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XHJcbiAgICByZXR1cm4gYXN0VGljaygpO1xyXG59XHJcblxyXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0QWN0aW9uVGljayhnbG9iYWxJZENvdW50ZXIrKykocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcclxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcclxuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXHJcbiAqIEByZXR1cm5zIHtUaWNrfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxyXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8vMC4gdXRpbGl0aWVzXHJcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmROdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG4vLzEuIHN0b3J5IGluc3RhbmNlXHJcblxyXG4vLzEuMSBsb2NhdGlvbnNcclxudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcclxuXHJcbi8vYWRkIHRvIGJvdGggc2lkZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xyXG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XHJcblxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcclxuICAgIHZhciBwcmV2aW91cyA9IHt9O1xyXG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcclxuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XHJcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xyXG5cclxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcclxuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcclxuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XHJcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG4vLzEuMiBhZ2VudHNcclxudmFyIGFnZW50cyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFnZW50KGFnZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICBhZ2VudHMucHVzaChhZ2VudE5hbWUpO1xyXG4gICAgcmV0dXJuIGFnZW50TmFtZTtcclxufVxyXG5cclxuLy8xLjMgaXRlbXNcclxudmFyIGl0ZW1zID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XHJcbiAgICBpdGVtcy5wdXNoKGl0ZW1OYW1lKTtcclxuICAgIHJldHVybiBpdGVtTmFtZTtcclxufVxyXG5cclxuLy8xLjQgdmFyaWFibGVzXHJcbnZhciB2YXJpYWJsZXMgPSB7fTtcclxudmFyIGFnZW50VmFyaWFibGVzID0ge307XHJcbnZhciBpdGVtVmFyaWFibGVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YXJOYW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pKVxyXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xyXG5cclxuICAgIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIGlmIChpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBub3Qgc2V0IVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFyaWFibGVzW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBhZ2VudCBcIiArIGFnZW50ICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYXJpYWJsZU5vdFNldCh2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2VudFZhcmlhYmxlTm90U2V0KGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pKVxyXG4gICAgICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV0gPSB7fTtcclxuXHJcbiAgICBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSB8fCBpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGl0ZW0gXCIgKyBpdGVtICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXTtcclxufVxyXG5cclxuXHJcbi8vMlxyXG4vL2FnZW50LWJlaGF2aW9yIHRyZWUgbWFwcGluZ1xyXG52YXIgYWdlbnRUcmVlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRyZWVUb0FnZW50KGFnZW50OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIGFnZW50VHJlZXNbYWdlbnRdID0gdHJlZTtcclxufVxyXG5cclxuLy8zLjFcclxuLy91c2VyIGFjdGlvbnNcclxuLy9UT0RPIGFkZCB2YXJpYWJsZXMgdG8gdXNlciBhY3Rpb24gdGV4dHNcclxudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcclxuICAgIHRleHQ6IFwiXCIsXHJcbiAgICB1c2VyQWN0aW9uc1RleHQ6IFtdLFxyXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcclxufVxyXG52YXIgdXNlckludGVyYWN0aW9uVHJlZXMgPSBbXTtcclxudmFyIHVzZXJBY3Rpb25zID0ge307XHJcblxyXG5mdW5jdGlvbiBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpIHtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcclxuICAgIHVzZXJBY3Rpb25zID0ge307Ly97XCJHbyB0byBsb2NhdGlvbiBYXCIgOiBlZmZlY3RcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24gPSAodGV4dDogc3RyaW5nKSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHQsIDBcclxuICAgICk7XHJcbmV4cG9ydCBsZXQgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQgPSAodGV4dDogc3RyaW5nKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgKz0gXCJcXG5cIiArIHRleHQ7XHJcblxyXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxyXG4gICAgKCkgPT4gdHJ1ZSxcclxuICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgZWZmZWN0VHJlZSksIDBcclxuKTtcclxuXHJcbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdDogKCkgPT4gYW55KSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBhY3Rpb24oKCk9PnRydWUsIGVmZmVjdCwgMCkpLCAwXHJcbiAgICApO1xyXG5cclxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIHVzZXJBY3Rpb25zW3RleHRdID0gdHJlZTtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xyXG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xyXG4gICAgLy9leGVjdXRlIHRoZSB1c2VyIGFjdGlvblxyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcclxuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xyXG4gICAgZXhlY3V0ZSh1c2VyQWN0aW9uRWZmZWN0VHJlZSk7XHJcbn1cclxuXHJcbi8vNC5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIHVzZXJJbnRlcmFjdGlvbk9iamVjdDtcclxufVxyXG5mdW5jdGlvbiBnZXRfcmFuZG9tX2FnZW50X2xpc3QoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInJhbmRvbWl6aW5nXCIpO1xyXG4gICAgdmFyIGxlbiA9IGFnZW50cy5sZW5ndGg7XHJcbiAgICB2YXIgdGVtcDtcclxuICAgIHZhciBpbmRleDtcclxuXHJcbiAgICB3aGlsZSAobGVuID4gMCkge1xyXG4gICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKTtcclxuICAgICAgICBsZW4tLTtcclxuICAgICAgICB0ZW1wID0gYWdlbnRzW2xlbl1cclxuICAgICAgICBhZ2VudHNbbGVuXSA9IGFnZW50c1tpbmRleF1cclxuICAgICAgICBhZ2VudHNbaW5kZXhdID0gdGVtcDtcclxuICAgIH1cclxuICAgIC8vY29uc29sZS5sb2cocm9zdGVyKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJoaWdoZXN0IGFmZjogXCIgKyBnZXRfY2hhcl90b19yYWlzZV9hZmZpbml0eShyb3N0ZXJbMF0pLm5hbWUpO1xyXG4gICAgLy9zdGFydCBhY3Rpb25zOlxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB3b3JsZFRpY2soKSB7XHJcbiAgICAvL2FsbCBhZ2VudCB0aWNrc1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIkluIHdvcmxkIHRpY2tcIik7XHJcbiAgICAvL3JhbmRvbWl6ZSBhZ2VudHNcclxuICAgIGdldF9yYW5kb21fYWdlbnRfbGlzdCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRyZWUpO1xyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodHJlZSkpIHtcclxuICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJleGVjdXRpbmdBZ2VudFwiLCBhZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XHJcbn0iXX0=
