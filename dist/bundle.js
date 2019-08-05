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
var start_screen_active = false;
var day_screen_active = false;
var last_day = 15;
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
context.font = "8px 'Press Start 2P'";
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
var text_log = ["Log:", "Yuko!! My very old and very best friend! How’ve you been? I know you’re retired, but could you look after the ol’ guild for about a week? I gotta go run a very important errand! All you got to do is assign missions based off of what’s needed [STRENGTH, MAGIC, or INTELLIGENCE]! We use the buddy system around here, so two people have to be assigned to each mission, check who gets along with who by clicking on their profiles! After that, you can just use the [NEXT] button to move on with the day. Unassigned adventurers will just be hanging out and training at the guild hall. Have fun! Thanks in advance!<br> ~Sharro "];
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
        var aff_st = JSON.stringify(this.affinity);
        var st = this.name + "\nStr: " + this.stats["str"] + "\nMag: " + this.stats["mag"] + "\nInt: " + this.stats["int"] + "\nAffinity:" + "\n" + aff_st + "\nStatus:";
        //WIP
        if (this.is_on_mission) {
            st += "Out on Mission";
        }
        else {
            st += "Available";
        }
        return st;
    };
    Character.prototype.display_stats1 = function () {
        var st = "Str:" + this.stats["str"] + " Mag:" + this.stats["mag"] + " Int:" + this.stats["int"];
        //WIP
        return st;
    };
    Character.prototype.display_stats2 = function () {
        //var aff_st = "Affinity:" + " "+JSON.stringify(this.affinity)
        //return aff_st
    };
    Character.prototype.display_stats3 = function () {
        var st = "Status: ";
        if (this.is_on_mission) {
            st += "Out on Mission";
        }
        else {
            st += "Available";
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
    function Mission(title, desc, req_stat, /*req_affinity,*/ req_total, reward, win_txt, lose_txt, ticks, day) {
        //always gain +1 affinity on success. 
        //always lose -1 affinity on failure
        //maybe add type
        this.title = title;
        this.desc = desc;
        this.req_stat = req_stat; //maybe make this an array
        //this.req_affinity = req_affinity;//affinity
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
        //put in affinity win/lose
        if (combined_stat >= this.req_total) { //make check function
            //pass
            this.victory();
            return true;
        }
        //else if ( 
        //  this.affinity [this.c2] >= this.req_affinity) {
        //this.victory()
        //return true;
        //}
        else {
            this.failure();
            return false;
        }
    };
    Mission.prototype.victory = function () {
        //console.log("success");
        num_successful++;
        text_log.push("Mission: " + this.title + " was" + '<span style="color: #228B22"> successful!<br></span>' + roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.win_txt);
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
        text_log.push("Mission: " + this.title + '<span style="color: #ff0000"> failed!<br></span>' + roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.lose_txt);
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
            //update_time(); this is what updates time after missions are selected 
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
            if (w < this.image.width - 20) {
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
            context.fillText(txt[l], this.x + 20, this.b_text_pos);
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
    images["bg_evening"] = document.getElementById("bg_evening");
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
    images["moon"] = document.getElementById("moon");
    images["sun"] = document.getElementById("sun");
    images["dialogbox"] = document.getElementById("dialogbox");
    images["startscreen"] = document.getElementById("startscreen");
}
function dialog() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 900, 650);
    context.drawImage(images["dialogbox"], 0, 350);
    context.font = '10px "Press Start 2P"';
    context.fillStyle = 'white';
    //this is me starting to try and make the dialog screen, I'm leaving it alone for now 
    //but i think that eventualyl setting it up in a way similar to Missions would be good 
    //though I wonder how I'd handle avatars and such, dunno if itd be a seperate thing or a dictionary 
    //what even is a dictionary 
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
    mission_board.push(new Mission("An antimagic rat has taken over my attic and may be building a small nation state", "I can't get to my grandparent's old photos anymore!", "str", 5, 1, "I flexed at the rat and it left!", "The rat king rains supreme and wishes to be paid reparations via corn.", 2, 1));
    mission_board.push(new Mission("Lost cat", "Sneaky ol' fluffer escaped!", "int", 5, 1, "We found the cat behind a dumpster. It had a note in its collar that said 'shLdIfgsdFsjdEadnf dFjfksRgjObMnf dsMjaEfAngNkdnIbNkG'", "What cat?", 2, 1));
    mission_board.push(new Mission("My sheep keep on going missing", "Where are they going? What are they doing? Are they talking about me??? I have to know!", "mag", 8, 2, "They were being used by the goblins for fantasy football. They were returned, slightly more armored. ", "Sheep aren't real.", 2, 1));
    //day 2
    mission_board.push(new Mission("Slimes are eating my potatoes!", "I had one plan and that plan was whacking them with a sword and it didn't work.", "mag", 8, 2, "Slimes zapped, mission complete!", "The slimes shook off all the physical damage we could do so we shoved them into a hole and hoped for the best.", 2, 2));
    mission_board.push(new Mission("Goblins won't stop heckling my sheep", "They're getting very stressed out! Help!", "str", 10, 3, "The sheep can sheep in peace now!", "We lost, but on the bright side I don't think sheep understand English.", 2, 2));
    mission_board.push(new Mission("I think George is a vampire", "He never eats and his shirts are always stained with blood!", "int", 6, 1, "George is...a shy winery worker. We bought him new shirts.", "George moved out before we could talk to him...", 2, 2));
    //day 3
    mission_board.push(new Mission("An undead army is invading!", "THEY'VE GOTTEN INTO THE MILK BARNS! WE'RE DOOMED!", "mag", 14, 5, "Wasn't too hard, we juMasEdsAfgNubIjNvncxG FasjRdfOhgMhgjd dsLjfIdkFngEfkj", "The calcium..it made them ....too powerful", 2, 3));
    mission_board.push(new Mission("THE SKY TURNED RED", "WHY IS IT RED???", "int", 6, 1, "It...we had to spend 3 hours explaining the sunset to a family of 6. I mean money is money but how'd this mission even get on our list.", "We stopped by and they uhhh..said a lot of words and after an hour we graciously jumped out the window to escape. ", 2, 3));
    mission_board.push(new Mission("Lich King causing a ruckus", "Unholy magics and loud, booming noises are coming from the lich's keep, send her a warning!", "mag", 12, 4, "Our magic was cooler than hers so she agreed to move her party deeper underground", "Lich \"Partybrodudefella\" was deeply unimpressed by us and turned up her dubstep louder", 2, 3));
    //day 4
    mission_board.push(new Mission("A fish learned to walk on land and hes using his legs exclusively for evil", "He can't handle the responsibility of having legs! He's raising a tadpole army!", "str", 10, 3, "He got suplexed back into the ocean!", "His evil continues.....the neferious Captain Legbeard", 2, 4));
    mission_board.push(new Mission("Follow my cat aroud to see what she does all day", "I lose her every time I try, I have to know!", "int", 8, 2, "Dear god this cat gets so many treats. Please stop feeding her shes too powerful.", "Outsmarted by a cat....just another normal day honestly", 2, 4));
    mission_board.push(new Mission("Stop these weekly barfights!", "Every Wednesday an elf and an orc come to my bar, and they always end up fighting! They refuse to come on different days!", "str", 8, 2, "They started throwing chairs again so we also threw chairs at them. They were forced to team up against us and bonded over their shared defeat. Their wedding is next week, I think the problem is solved", "We couldn't stop them. I wonder if they'll still be at it when I have grandkids...", 2, 4));
    //day 5
    mission_board.push(new Mission("Kraken won't stop rearranging the boats at the dock every night!", "We don't need our boats ordered by color! We need them where we parked them!", "mag", 12, 4, "Turns out, she just needed a translator. We set up a magical one and now the Kraken gets a salary of fish to keep track of all the boats", "Well I guess they'll just have to accept their new organizational overlord", 2, 5));
    mission_board.push(new Mission("VERY LARGE BEAR! VERY VERY LARGE BEAR!!", "BEAR LARGE", "str", 10, 3, "Good news, we won! Bad news, it was a dragon.", "IT WAS NOT A BEAR!", 2, 5));
    mission_board.push(new Mission("A big rock is falling from the sky but it's probably fine", "I mean a firey death doesn't sound like the worst thing in the world", "mag", 14, 5, "We made a big bat out of magic and whacked it somewhere else!", "it was not fine!!!", 2, 5));
    //day 6
    mission_board.push(new Mission("Someone's stolen the town flag!", "We need our flag!", "int", 8, 2, "We found it in a shopping cart 10 miles away", "We couldn't find it so we replaced the flag with a coat someone left out..the mayor has not noticed yet.", 2, 6));
    mission_board.push(new Mission("Golem rampaging through town!", "IT'S DESTROYING THE FLOWERS AND ONLY THE FLOWERS!!", "str", 12, 4, "We hacked it! With an axe. But somehow this fixed it and now its a normal gardening golem!", "It beat us up and ran into the countryside to castrate more plants", 2, 6));
    mission_board.push(new Mission("A tiny dragon won't get out of my silverwear cabinet!", "Now normally this wouldn't be an issue but our house is very flammable!", "int", 10, 3, "Lil guy just wants to hoard spoons. We made him a pile of donated spoons out in the woods and he seems very happy!", "Well the dragon's out of the cabinet, but their house is...slightly....ablaze.", 2, 6));
    //day 7
    mission_board.push(new Mission("~Sharro", "djOfnLkghDjfnd FslRjkIgEfljNnDfkd dkjsfgnkjghBasdEfhg WjkEl;LjhkgjLhfds", "int", 100, 10, "this outcome is numerically impossible, what have you done now Yuko.", "We looked everywhere but we couldn't find them... They said they'd be back by now right? ..guess you'll have to look after things a while longer..", 2, 7));
    mission_board.push(new Mission("~Sharro", "djOfnLkghDjfnd FslRjkIgEfljNnDfkd dkjsfgnkjghBasdEfhg WjkEl;LjhkgjLhfds", "int", 100, 10, "this outcome is numerically impossible, what have you done now Yuko.", "We looked everywhere but we couldn't find them... They said they'd be back by now right? ..guess you'll have to look after things a while longer..", 2, 7));
    mission_board.push(new Mission("~Sharro", "djOfnLkghDjfnd FslRjkIgEfljNnDfkd dkjsfgnkjghBasdEfhg WjkEl;LjhkgjLhfds", "int", 100, 10, "this outcome is numerically impossible, what have you done now Yuko.", "We looked everywhere but we couldn't find them... They said they'd be back by now right? ..guess you'll have to look after things a while longer..", 2, 7));
    //day 8
    mission_board.push(new Mission("I found a sword in the woods!", "it just sits there...menacingly..", "int", 10, 3, "We went on a grand adenture! We saved lives, fell in love, but most importantly... we threw a tarp over the sword and covered it with dirt.", "sdTbHfEsf dCjYkfChsLgjEkndf djOkgfFhor fjdSskTfOasRfY", 2, 8));
    mission_board.push(new Mission("My baby has glowing eyes..", "She's otherwise normal.. but we're worried about her parents being killed for character development", "mag", 12, 4, "We taught her parents how to cast magic! As long as they don't decide to go on a journey and die in a war, it should be fine", "Sometimes babies' eyes just glow, it's normal! My eyes glowed when I was a kid", 2, 8));
    mission_board.push(new Mission("Where's my mail!", "Mailman won't deliver my mail! Somethin' about 'Work hazards', whatever those are.", "str", 8, 2, " Her old mailbox was actually just a bear trap with some paper in it, so we built her a new mailbox! One that definetly isn't a repurposed bucket", "Her..house is too on fire for us to find the mailbox", 2, 8));
    //day 9
    mission_board.push(new Mission("Help needed!", "dhjAfjNfbd sjEdfhTgkdEfjdRgnNfbAjkLvds sTjdRhfUgTsHdk", "int", 12, 4, "weird junk mail.. took us a bit to figure it out, but if you look at every capitalized letter, it spells out 'AN ETERNAL TRUTH'. Seems like something Sharro would do, but this kind of encoding is a bit simplistic for them, they always liked throwing puzzles at us", "its some sort of code..but we couldn't figure it out. Might have something to do with Sharro? They always loved codes", 2, 9));
    mission_board.push(new Mission("Find my son!", "I'd find him but I'm too busy unraveling a government conspiracy and spending 200 hours making a garden", "str", 10, 3, "He was just going through giant bug puberty and made a cocoon, we carried it back", "We found him but..we weren't able to push his cocoon back home.", 2, 9));
    mission_board.push(new Mission("Someone stole the town's well bucket!", "These bucket crimes cannot go unpunished!", "int", 8, 2, "A fire elemental was using it as her mailbox..We helped them set up a timeshare on the bucket, everyone's happy", "Danth seems to know where it is but he refuses to tell anyone", 2, 9));
    //day 10 
    mission_board.push(new Mission("sNnEVbEjRbgEdNjDnIfNG sCAhLbAMskItTrsYjn", "gUsNdvOgBsSfERvVsED adWhEsbg CgEkjAfShEgdfs sakThdOfkf fEkXjIgShTkdg", "int", 100, 10, "It's all falling apart now", "dfIjnjSkds dTksHjaEfnRdjEnf djkAfaskjfgf fLdIjkgFfEjhg fBdEYjgOsND fdjTgnHdEjsfng sdkEgjNfnDgfjkd?", 2, 10));
    mission_board.push(new Mission("sNEdVbEjRbgENkjDnING sCkAhfLbAMskItTrsY", "gUsNdvOgBsSfERvVsED adWhEsbg CgEkjAfShEgdfs sakThdOfkf fEkXjIgShTkdg", "int", 100, 10, "It's all falling apart now", "dfIjnjSkds dTksHjaEfnRdjEnf djkAfaskjfgf fLdIjkgFfEjhg fBdEYjgOsND fdjTgnHdEjsfng sdkEgjNfnDgfjkd?", 2, 10));
    mission_board.push(new Mission("sNnEVbEjRbEdNkjDIoNG sCkAhLbAMskItTrYjdf", "gUsNdvOgBsSfERvVsED adWhEsbg CgEkjAfShEgdfs sakThdOfkf fEkXjIgShTkdg", "int", 100, 10, "It's all falling apart now", "dfIjnjSkds dTksHjaEfnRdjEnf djkAfaskjfgf fLdIjkgFfEjhg fBdEYjgOsND fdjTgnHdEjsfng sdkEgjNfnDgfjkd?", 2, 10));
    //day 11
    mission_board.push(new Mission("I cfgan't openjnb this jar!", "I willghd pay you one entire chicdgken if you help me open this jar", "str", 6, 1, "There was a.. demon in that jar but hey we got it open!", "We couldn't open it so we smashed it and a demon came out?", 2, 11));
    mission_board.push(new Mission("A dradgshgon burnt ddfown my farms!", "She's got a flametsgfhhrower!!", "mag", 12, 4, "We stole the flamethrower and she ran off", "turns out, punching a flamethrower just makes it explode and set more things on fire..", 2, 11));
    mission_board.push(new Mission("A plague has kidfhslled my vildflage", "We neehrtd to stop rhit!", "int", 14, 5, "He wanted us to kill him to stop the plague, but we cleaned up the watter supply instead. Should be fine now!", "We couldn't figure out the cause so we just walled off the place. I'm sure that'll never get discovered by a morally grey necromancer later!", 2, 11));
    //day 12
    mission_board.push(new Mission("eEverything isf on fire!", "mY baUrbaKcuOe!", "mag", 12, 4, "We put it out, although, some of the fire seemed to be made out of snakes? Who's writing this?", "SNAKE FIRE", 2, 12));
    mission_board.push(new Mission("Thfe castle is being invaded by a small child!", "She's got disrespect for authority and the laws of physics!", "str", 12, 4, "thE LAWS OF PHYSICS MEAN NOTHING TO MY PECS ~Probably Min", "I think she accidentally deleted herself??", 2, 12));
    mission_board.push(new Mission("dYsOdUf dCANTf gShAjVhE kTlHrEeM aAsLdL", "WsdEfg fNgEED hCjOdNFLICT dWhEsf NhEfEgD sEjYfEdSg", "int", 100, 10, "You can't be here", "WaHsY dDfO YgOhU dDfENgY fMEd", 1, 12));
    //day 13
    mission_board.push(new Mission("DEgSTRuOY THaE COMPhILER", "...", "str", 20, 6, "tShDaFnk yFJoGuH", "....", 2, 13));
    mission_board.push(new Mission("sDESTROdY TeHE COkMPILER", "...", "mag", 20, 6, "gAoGoJdbKye", ".....", 2, 13));
    mission_board.push(new Mission("DESTgROY ToHE COMrPILrER", "...", "int", 20, 6, "HyuSkDo", "......", 2, 13));
    //day 14
    mission_board.push(new Mission("Yuko The Hero", "Stoic, perhaps to a fault. An aggresively uninteresting person, perhaps thats why she became you.", "str", 1, 3, "a friend", "a brick wall of a friend", 10, 14));
    mission_board.push(new Mission("Sharro The Mentor", "Larger than life, too large to fit in this story. They are proud of you. Wherever they are..", "mag", 1, 3, "good ol NB buddy", "fluffy", 10, 14));
    mission_board.push(new Mission("Avinus The Compiler", "A world made of stories needs a storyteller. And yet an end had to come.", "int", 1, 3, "writers block ended the world basically", "twas a silly plot, but I had fun", 20, 14));
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
    var str_loc = new Location("Training Dummy", 470, 300, "str");
    var mag_loc = new Location("Magic Tower", 750, 100, "mag");
    var int_loc = new Location("Library", 640, 280, "int");
    var aff_loc = new Location("Gazebo", 505, 135, "affinity");
    var aff_loc2 = new Location("Gazebo", 535, 135, "affinity");
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
    if (current_time == "morning") {
        context.drawImage(images["bg"], 0, 0);
    }
    if (current_time == "evening") {
        context.drawImage(images["bg_evening"], 0, 0);
    }
    //context.drawImage(images["bg"], 0, 0); //draw bg
    draw_character_buttons();
    draw_characters();
    context.fillText("Day " + current_day, 840, 575);
    draw_time();
    profile_text();
}
function draw_time() {
    if (current_time == "morning") {
        context.drawImage(images["sun"], 840, 520);
    }
    if (current_time == "evening") {
        context.drawImage(images["moon"], 840, 520);
    }
}
function draw_game_done() {
    console.log("done");
    context.drawImage(images["gamedone"], 0, 0); //draw done
    context.fillStyle = "#ffffff";
    context.font = "15px 'Press Start 2P'";
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
    //for every mission assigned, updated the time stuff. Doing this before the canvas redraw.
    for (var m in mission_board) {
        if (mission_board[m].assigned) {
            mission_board[m].decrease_time();
        }
    }
    //next, update time.
    if (current_time == "morning" && current_day < last_day) {
        current_time = "evening";
        draw_canvas();
    }
    else {
        current_day++;
        if (current_day < last_day) {
            current_time = "morning";
            day_change();
            var inttvID = window.setTimeout(day_screen_active_set, 1500);
            var intvID = window.setTimeout(draw_canvas, 1500);
            text_fix();
        }
    }
    //draw_canvas(); //redraw text.
    if (current_day == last_day) {
        text_log.push("You did a good job Yuko");
        log_text();
        draw_game_done();
    }
    else {
        text_log.push("Day " + current_day + ", " + current_time);
    }
    //characters always move
}
function start_screen() {
    start_screen_active = true;
    context.drawImage(images["startscreen"], 0, 0);
    // context.font = '68px "Press Start 2P"';
    ///context.fillStyle = "black"
    //context.fillText("Rime Royale", 100, 350);
    /*var button = document.createElement("button");
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);
    button.addEventListener ("click", function() {
        start_screen_kill();
        draw_canvas();
      });*/
}
function start_screen_kill() {
    start_screen_active = false;
}
function day_screen_active_set() {
    day_screen_active = false;
}
function day_change() {
    //New day screen
    //console.log("day change");
    //black is default, don't need to specify
    day_screen_active = true;
    context.fillStyle = "black";
    context.fillRect(0, 0, 900, 650);
    context.font = '68px "Press Start 2P"';
    context.fillStyle = 'white';
    //context.textBaseline = 'top'; <-- caused text sliding bug
    context.fillText('Day' + current_day, 325, 350);
}
function text_fix() {
    context.fillStyle = "black";
    context.font = "8px 'Press Start 2P'";
}
function profile_text() {
    //var s = /*'Min the Knight' + */ roster[find_in_list("roster", "Min")].display_stats()
    //  var str = this.write_text(s);
    context.fillText('Min the Knight', 70, 40);
    context.fillText(roster[find_in_list("roster", "Min")].display_stats1(), 70, 65);
    //context.fillText(roster[find_in_list("roster", "Min")].display_stats2(), 70, 65)
    context.fillText(roster[find_in_list("roster", "Min")].display_stats3(), 20, 85);
    context.fillText('Landol the Mage', 70, 130);
    context.fillText(roster[find_in_list("roster", "Landol")].display_stats1(), 70, 155);
    //context.fillText(roster[find_in_list("roster", "Landol")].display_stats2(), 70, 155)
    context.fillText(roster[find_in_list("roster", "Landol")].display_stats3(), 20, 175);
    context.fillText('Horst the Horseman', 70, 220);
    context.fillText(roster[find_in_list("roster", "Horst")].display_stats1(), 70, 245);
    //context.fillText(roster[find_in_list("roster", "Horst")].display_stats2(), 70, 245)
    context.fillText(roster[find_in_list("roster", "Horst")].display_stats3(), 20, 265);
    context.fillText('Rory the Summoner', 70, 310);
    context.fillText(roster[find_in_list("roster", "Rory")].display_stats1(), 70, 335);
    //context.fillText(roster[find_in_list("roster", "Rory")].display_stats2(), 70, 335)
    context.fillText(roster[find_in_list("roster", "Rory")].display_stats3(), 20, 355);
    context.fillText('Danth the Spymaster', 70, 400);
    context.fillText(roster[find_in_list("roster", "Danth")].display_stats1(), 70, 425);
    //context.fillText(roster[find_in_list("roster", "Danth")].display_stats2(), 70, 425)
    context.fillText(roster[find_in_list("roster", "Danth")].display_stats3(), 20, 445);
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
        y += 90;
    }
    y += 20;
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
    pass = new Button(720, 580, "pass", "pass");
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
    if (current_day == last_day)
        return;
    if (day_screen_active)
        return;
    if (start_screen_active)
        return;
    //only want to open popup when button is clicked.
    //close popup when popup is clicked off. 
    var rect = canvas.getBoundingClientRect();
    var canv_x = e.clientX - rect.left;
    var canv_y = e.clientY - rect.top;
    //figure out what was clicked first. 
    //console.log("moues pos: " + e.clientX + ", " + e.clientY); //debugging
    if (!pop.is_open) {
        //check if a button was clicked  
        for (var button in char_buttons) {
            if (checkBounds(char_buttons[button], canv_x, canv_y)) {
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
            if (!mission_buttons[button].assigned && checkBounds(mission_buttons[button], canv_x, canv_y) && current_day == mission_board[button].day) {
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
        if (checkBounds(pass, canv_x, canv_y)) {
            //console.log("pass clicked");
            update_time();
        }
    }
    else {
        //if pop up is open, want to check if anything BUT buttons was clicked (for now)
        if (checkBounds(pop, canv_x, canv_y)) {
            console.log("Popup clicked!");
            if (selected1 != null && selected2 != null) {
                console.log(checkBounds(ok, canv_x, canv_y));
                if (checkBounds(ok, canv_x, canv_y)) {
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
                if (checkBounds(popup_buttons[b], canv_x, canv_y)) {
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
    start_screen();
    //draw_canvas(); //get rid of this when reenable start screen
    var intttvID = window.setTimeout(start_screen_kill, 1500);
    var intttttvID = window.setTimeout(draw_canvas, 1500);
    text_fix();
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
        c.increase_affinity(c2);
        c2.increase_affinity(c);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2d1aWxkLmpzIiwic3JjL3NjcmlwdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUlBLHlDQU1xQjtBQUNyQiw0QkFBNEI7QUFDNUIsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDOUIsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO0FBQ25CLElBQUksTUFBTSxH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QzFCLG1EQUFtRDtJQUNuRCxtREFBbUQ7SUFDbkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCw0QkFBNEI7SUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDbEUsQ0FBQztBQUNEO0lBQ0ksT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDNUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztJQUN2QyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUM1QixzRkFBc0Y7SUFDdEYsdUZBQXVGO0lBQ3ZGLG9HQUFvRztJQUNwRyw0QkFBNEI7QUFHaEMsQ0FBQztBQUNEO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7SUFDM0csTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDcEYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbEYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbEYsS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUU7UUFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsYUFBYTtRQUMxQyxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDZC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QUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN4QyxHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ3hCO0lBQ0Qsc0JBQXNCO0lBQ3RCLDRFQUE0RTtJQUM1RSxnQkFBZ0I7QUFDcEIsQ0FBQztBQUNEO0lBQ0ksaUJBQWlCO0lBQ2pCLCtCQUErQjtJQUMvQixrQkFBa0I7SUFDbEIscUJBQXFCLEVBQUUsQ0FBQztJQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxrQkFBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQWRELDhCQWNDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xyXG52YXIgTGlua2VkTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxyXG4gICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xyXG4gICAgKiB3aGljaCB0b2dldGhlciByZXByZXNlbnQgYSBzZXF1ZW5jZS5cclxuICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTGFzdCBub2RlIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBBZGRzIGFuIGVsZW1lbnQgdG8gdGhpcyBsaXN0LlxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxyXG4gICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXHJcbiAgICAqIHRoZSBlbGVtZW50IGlzIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhpcyBsaXN0LlxyXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxyXG4gICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5uRWxlbWVudHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLm5FbGVtZW50cyB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoaXRlbSk7XHJcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAwIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIC8vIEluc2VydCBhdCB0aGUgZW5kLlxyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXHJcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgaWYgKHByZXYgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHByZXYubmV4dDtcclxuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMrKztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xyXG4gICAgKiBlbXB0eS5cclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4geyp9IHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXHJcbiAgICAqIGVtcHR5LlxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZGVzaXJlZCBpbmRleC5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzXHJcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XHJcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGVcclxuICAgICAqIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGUgTGlzdCBkb2VzIG5vdCBjb250YWluIHRoaXMgZWxlbWVudC5cclxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxyXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XHJcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICogfVxyXG4gICAgICogPC9wcmU+XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxyXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXHJcbiAgICAgKiBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoaXMgbGlzdCBkb2VzIG5vdCBjb250YWluIHRoZVxyXG4gICAgICogZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXHJcbiAgICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgICAqXHJcbiAgICAgICAqIDxwcmU+XHJcbiAgICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcclxuICAgICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAgICogfVxyXG4gICAgICAgKiA8L3ByZT5cclxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxyXG4gICAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcclxuICAgICAgICogb3RoZXJ3aXNlLlxyXG4gICAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxyXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcclxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXHJcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAqXHJcbiAgICAgKiA8cHJlPlxyXG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xyXG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAqIH1cclxuICAgICAqIDwvcHJlPlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPCAxIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxyXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3R9IG90aGVyIHRoZSBvdGhlciBsaXN0LlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcclxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xyXG4gICAgICogYXJlIGN1c3RvbSBvYmplY3RzIHlvdSBzaG91bGQgcHJvdmlkZSBhIGZ1bmN0aW9uLCBvdGhlcndpc2VcclxuICAgICAqIHRoZSA9PT0gb3BlcmF0b3IgaXMgdXNlZCB0byBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbnRzLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlciwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTGlua2VkTGlzdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVyLnNpemUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsc0F1eCh0aGlzLmZpcnN0Tm9kZSwgb3RoZXIuZmlyc3ROb2RlLCBlcUYpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xyXG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoIWVxRihuMS5lbGVtZW50LCBuMi5lbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG4xID0gbjEubmV4dDtcclxuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXHJcbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxlbWVudDtcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDEpIHtcclxuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwcmV2aW91cy5uZXh0ID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IHByZXZpb3VzLm5leHQubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xyXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGN1cnJlbnROb2RlLmVsZW1lbnQpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcclxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmxhc3ROb2RlO1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxyXG4gICAgICogc2VxdWVuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheS48Kj59IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QsXHJcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cyA8PSAwO1xyXG4gICAgfTtcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBhcnJheXMudG9TdHJpbmcodGhpcy50b0FycmF5KCkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT09ICh0aGlzLm5FbGVtZW50cyAtIDEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jcmVhdGVOb2RlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbGVtZW50OiBpdGVtLFxyXG4gICAgICAgICAgICBuZXh0OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTGlua2VkTGlzdDtcclxufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XHJcbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtlZExpc3Q7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZExpc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoXCIuL0xpbmtlZExpc3RcIik7XHJcbnZhciBRdWV1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cclxuICAgICAqIEBjbGFzcyBBIHF1ZXVlIGlzIGEgRmlyc3QtSW4tRmlyc3QtT3V0IChGSUZPKSBkYXRhIHN0cnVjdHVyZSwgdGhlIGZpcnN0XHJcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xyXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xyXG4gICAgICAgIHRoaXMubGlzdCA9IG5ldyBMaW5rZWRMaXN0XzEuZGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmxpc3QuZmlyc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5maXJzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXHJcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcclxuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgKiB9XHJcbiAgICAgKiA8L3ByZT5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXHJcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcclxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5jb250YWlucyhlbGVtLCBlcXVhbHNGdW5jdGlvbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcclxuICAgICAqIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXHJcbiAgICAgKiBGSUZPIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXHJcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChjYWxsYmFjayk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFF1ZXVlO1xyXG59KCkpOyAvLyBFbmQgb2YgcXVldWVcclxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgaXRlbVxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiBsYXN0SW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwO1xyXG59XHJcbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGNoYW5nZWQgYWZ0ZXIgdGhpcyBjYWxsLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLnJlbW92ZSA9IHJlbW92ZTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5IGVxdWFsXHJcbiAqIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHdob3NlIGZyZXF1ZW5jeSBpcyB0byBiZSBkZXRlcm1pbmVkLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcclxuICogZXF1YWwgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBmcmVxdWVuY3koYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIHZhciBmcmVxID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICBmcmVxKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZyZXE7XHJcbn1cclxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBzcGVjaWZpZWQgYXJyYXlzIGFyZSBlcXVhbCB0byBvbmUgYW5vdGhlci5cclxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxyXG4gKiBvZiBlbGVtZW50cywgYW5kIGFsbCBjb3JyZXNwb25kaW5nIHBhaXJzIG9mIGVsZW1lbnRzIGluIHRoZSB0d29cclxuICogYXJyYXlzIGFyZSBlcXVhbCBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiB0aGUgb3RoZXIgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWxcclxuICovXHJcbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBsZW5ndGggPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZXF1YWxzKGFycmF5MVtpXSwgYXJyYXkyW2ldKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0cy5lcXVhbHMgPSBlcXVhbHM7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IHRvIGNvcHkuXHJcbiAqIEByZXR1cm4ge0FycmF5fSBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheVxyXG4gKi9cclxuZnVuY3Rpb24gY29weShhcnJheSkge1xyXG4gICAgcmV0dXJuIGFycmF5LmNvbmNhdCgpO1xyXG59XHJcbmV4cG9ydHMuY29weSA9IGNvcHk7XHJcbi8qKlxyXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIHN3YXAgZWxlbWVudHMuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIHRoZSBpbmRleCBvZiBvbmUgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgZGVmaW5lZCBhbmQgdGhlIGluZGV4ZXMgYXJlIHZhbGlkLlxyXG4gKi9cclxuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xyXG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gYXJyYXkubGVuZ3RoIHx8IGogPCAwIHx8IGogPj0gYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcclxuICAgIGFycmF5W2ldID0gYXJyYXlbal07XHJcbiAgICBhcnJheVtqXSA9IHRlbXA7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLnN3YXAgPSBzd2FwO1xyXG5mdW5jdGlvbiB0b1N0cmluZyhhcnJheSkge1xyXG4gICAgcmV0dXJuICdbJyArIGFycmF5LnRvU3RyaW5nKCkgKyAnXSc7XHJcbn1cclxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xyXG4vKipcclxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcclxuICogc3RhcnRpbmcgZnJvbSBpbmRleCAwIHRvIGxlbmd0aCAtIDEuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBpdGVyYXRlLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcclxuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICovXHJcbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIGFycmF5XzEgPSBhcnJheTsgX2kgPCBhcnJheV8xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcclxuICAgICAgICBpZiAoY2FsbGJhY2soZWxlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbmV4cG9ydHMuaGFzID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xyXG4gICAgcmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XHJcbn07XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbXBhcmUgZWxlbWVudCBvcmRlci5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XHJcbiAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhID09PSBiKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHRDb21wYXJlID0gZGVmYXVsdENvbXBhcmU7XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XHJcbiAgICByZXR1cm4gYSA9PT0gYjtcclxufVxyXG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xyXG4vKipcclxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0VG9TdHJpbmcoaXRlbSkge1xyXG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJyRzJyArIGl0ZW07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHRUb1N0cmluZyA9IGRlZmF1bHRUb1N0cmluZztcclxuLyoqXHJcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcclxuKi9cclxuZnVuY3Rpb24gbWFrZVN0cmluZyhpdGVtLCBqb2luKSB7XHJcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cclxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciB0b3JldCA9ICd7JztcclxuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5oYXMoaXRlbSwgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMpIHtcclxuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xyXG59XHJcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgIHJldHVybiAodHlwZW9mIG9iaikgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG59XHJcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcclxuLyoqXHJcbiAqIFJldmVyc2VzIGEgY29tcGFyZSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgdikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xyXG4vKipcclxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKSA9PT0gMDtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlVG9FcXVhbHMgPSBjb21wYXJlVG9FcXVhbHM7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiaW1wb3J0IHtcclxuICAgIGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxyXG4gICAgZ2V0UmFuZE51bWJlciwgZ2V0VmFyaWFibGUsIHNlcXVlbmNlLCBzZWxlY3RvciwgZXhlY3V0ZSwgUHJlY29uZGl0aW9uLCBnZXRBZ2VudFZhcmlhYmxlLCBuZWdfZ3VhcmQsIGd1YXJkLFxyXG4gICAgaXNWYXJpYWJsZU5vdFNldCwgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uLCBhZGRVc2VyQWN0aW9uLCBhZGRVc2VySW50ZXJhY3Rpb25UcmVlLCBpbml0aWFsaXplLFxyXG4gICAgZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXHJcbiAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dCwgYXJlQWRqYWNlbnQsIGFkZFVzZXJBY3Rpb25UcmVlXHJcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XHJcbi8vcmVxdWlyZShcIi4vc2NyaXB0aW5nLnRzXCIpO1xyXG52YXIgc3RhcnRfc2NyZWVuX2FjdGl2ZSA9IGZhbHNlO1xyXG52YXIgZGF5X3NjcmVlbl9hY3RpdmUgPSBmYWxzZTtcclxuY29uc3QgbGFzdF9kYXkgPSAxNVxyXG52YXIgcm9zdGVyID0gW107IC8vbGlzdCBvZiBjaGFyYWN0ZXJzXHJcbnZhciBtaXNzaW9uX2JvYXJkID0gW107IC8vbGlzdCBvZiBtaXNzaW9uc1xyXG52YXIgaW1hZ2VzID0ge307IC8vZGljdGlvbmFyeSBvZiBJbWFnZSBvYmplY3RzLiBcclxudmFyIGNoYXJfYnV0dG9ucyA9IFtdOy8vbGlzdCBvZiBidXR0b25zXHJcbnZhciBtaXNzaW9uX2J1dHRvbnMgPSBbXTsgLy9saXN0IG9mIG1pc3Npb24gYnV0dG9uc1xyXG52YXIgcG9wdXBfYnV0dG9ucyA9IFtdOyAvL2xpc3Qgb2YgYnV0dG9ucyBkaXNwbGF5ZWQgb24gcG9wdXBcclxudmFyIGxvY2F0aW9ucyA9IHt9OyAvL2RpY3Qgb2YgbG9jYXRpb25zXHJcblxyXG52YXIgbnVtX21pc3Npb25zID0gMDtcclxudmFyIG51bV9zdWNjZXNzZnVsID0gMDtcclxudmFyIG51bV9mYWlsZWQgPSAwO1xyXG5cclxuLy9odHRwczovL2ltZ3VyLmNvbS9hL2puUTgwcTkgYnV0dG9uIHNvdXJjZVxyXG5cclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudlwiKTtcclxudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuY29udGV4dC5mb250ID0gXCI4cHggJ1ByZXNzIFN0YXJ0IDJQJ1wiXHJcbi8vY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG5cclxudmFyIERFRkFVTFRfQ0hBUl9YID0gMTAwXHJcbnZhciBERUZBVUxUX0NIQVJfWSA9IDEwMFxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHsgc2V0dXAoKSB9O1xyXG4vL2V2ZW50c1xyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrZWQpO1xyXG4vL3BvcHVwXHJcbnZhciBwb3A7XHJcbi8vcGFzcyBidXR0b25cclxudmFyIHBhc3M7XHJcbi8vb2sgYnV0dG9uXHJcbnZhciBvaztcclxuLy90aWNrOiA3IGRheXMgdG90YWwuIDIgdGlja3MgcGVyIGRheSAobW9ybi9ldmUpLiBFdmVuIHRpY2tzIGFyZSBtb3JuaW5nID0gbmV3IGRheVxyXG52YXIgY3VycmVudF90aW1lID0gXCJtb3JuaW5nXCI7XHJcbnZhciBjdXJyZW50X2RheSA9IDE7XHJcblxyXG52YXIgbWF4X3N0YXQgPSAxMDtcclxudmFyIG1heF9hZmZpbml0eSA9IDEwO1xyXG5cclxudmFyIHRleHRfbG9nID0gW1wiTG9nOlwiLCBcIll1a28hISBNeSB2ZXJ5IG9sZCBhbmQgdmVyeSBiZXN0IGZyaWVuZCEgSG934oCZdmUgeW91IGJlZW4/IEkga25vdyB5b3XigJlyZSByZXRpcmVkLCBidXQgY291bGQgeW91IGxvb2sgYWZ0ZXIgdGhlIG9s4oCZIGd1aWxkIGZvciBhYm91dCBhIHdlZWs/IEkgZ290dGEgZ28gcnVuIGEgdmVyeSBpbXBvcnRhbnQgZXJyYW5kISBBbGwgeW91IGdvdCB0byBkbyBpcyBhc3NpZ24gbWlzc2lvbnMgYmFzZWQgb2ZmIG9mIHdoYXTigJlzIG5lZWRlZCBbU1RSRU5HVEgsIE1BR0lDLCBvciBJTlRFTExJR0VOQ0VdISBXZSB1c2UgdGhlIGJ1ZGR5IHN5c3RlbSBhcm91bmQgaGVyZSwgc28gdHdvIHBlb3BsZSBoYXZlIHRvIGJlIGFzc2lnbmVkIHRvIGVhY2ggbWlzc2lvbiwgY2hlY2sgd2hvIGdldHMgYWxvbmcgd2l0aCB3aG8gYnkgY2xpY2tpbmcgb24gdGhlaXIgcHJvZmlsZXMhIEFmdGVyIHRoYXQsIHlvdSBjYW4ganVzdCB1c2UgdGhlIFtORVhUXSBidXR0b24gdG8gbW92ZSBvbiB3aXRoIHRoZSBkYXkuIFVuYXNzaWduZWQgYWR2ZW50dXJlcnMgd2lsbCBqdXN0IGJlIGhhbmdpbmcgb3V0IGFuZCB0cmFpbmluZyBhdCB0aGUgZ3VpbGQgaGFsbC4gSGF2ZSBmdW4hIFRoYW5rcyBpbiBhZHZhbmNlITxicj4gflNoYXJybyBcIl07XHJcblxyXG52YXIgc2VsZWN0ZWQxO1xyXG52YXIgc2VsZWN0ZWQyOyAvL2ZvciB0ZXN0aW5nIG1pc3Npb24gYXNzaWdubWVudC5cclxudmFyIHNlbGVjdGVkX21pc3Npb247XHJcblxyXG5jbGFzcyBDaGFyYWN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc3RhdHMsIHNwcikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IHsgJ3N0cic6IHN0YXRzWydzdHInXSwgJ2ludCc6IHN0YXRzWydpbnQnXSwgJ21hZyc6IHN0YXRzWydtYWcnXSB9XHJcbiAgICAgICAgdGhpcy5hZmZpbml0eSA9IHt9O1xyXG4gICAgICAgIHRoaXMuaXNfb2NjdXBpZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25zW1wic3RhcnRcIl07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmxvY2F0aW9uKTtcclxuICAgICAgICAvL3RoaXMueCA9IERFRkFVTFRfQ0hBUl9YO1xyXG4gICAgICAgIC8vdGhpcy55ID0gREVGQVVMVF9DSEFSX1k7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBpbWFnZXNbc3ByXTtcclxuICAgICAgICAvL3RoaXMuY2hhcl9pY29uID0gY2hhcl9pY29uc1tuYW1lXTtcclxuICAgIH1cclxuICAgIGNyZWF0ZV9hZmZpbml0eSgpIHtcclxuICAgICAgICAvLyBmb3IgKHZhciBjaGFyIGluIHJvc3Rlcikge1xyXG4gICAgICAgIC8vICAgICAvL2NvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgLy8gICAgIGlmIChyb3N0ZXJbY2hhcl0ubmFtZSAhPSB0aGlzLm5hbWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYWZmaW5pdHlbcm9zdGVyW2NoYXJdLm5hbWVdID0gNDsgLy9ldmVyeW9uZSBzdGFydHMgd2l0aCA0IGFmZmluaXR5XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9tYXliZSBkbyByYW5kb20gZXZlbnR1YWxseVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNaW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7IFwiTGFuZG9sXCI6IDEsIFwiSG9yc3RcIjogNSwgXCJSb3J5XCI6IDQsIFwiRGFudGhcIjogMiB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMYW5kb2xcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7IFwiTWluXCI6IDEsIFwiSG9yc3RcIjogMywgXCJSb3J5XCI6IDIsIFwiRGFudGhcIjogNSB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJIb3JzdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHsgXCJNaW5cIjogNSwgXCJMYW5kb2xcIjogMywgXCJSb3J5XCI6IDUsIFwiRGFudGhcIjogMSB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJSb3J5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmZmluaXR5ID0geyBcIk1pblwiOiA0LCBcIkhvcnN0XCI6IDUsIFwiTGFuZG9sXCI6IDIsIFwiRGFudGhcIjogMyB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYW50aFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHsgXCJNaW5cIjogMiwgXCJIb3JzdFwiOiAxLCBcIlJvcnlcIjogMywgXCJMYW5kb2xcIjogNSB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBpbmNyZWFzZV9hZmZpbml0eShjaGFyKSB7XHJcbiAgICAgICAgLy9maW5kIGNoYXJhY3RlciwgaW5jcmVtZW50IG51bWJlci4gXHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBjaGFyLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkZWNyZWFzZV9hZmZpbml0eShjaGFyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBjaGFyLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5jcmVhc2Vfc3RhdChzdGF0LCBhbW91bnQpIHtcclxuICAgICAgICB0aGlzLnN0YXRzW3N0YXRdICs9IGFtb3VudDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0c1tzdGF0XSA+IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHNbc3RhdF0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtb3ZlKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jaGFyX2ljb24sIHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuICAgIHN0YXRzX3Rvc3RyKCkge1xyXG4gICAgICAgIHZhciBhZmZfc3QgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmFmZmluaXR5KVxyXG4gICAgICAgIHZhciBzdCA9IHRoaXMubmFtZSArIFwiXFxuU3RyOiBcIiArIHRoaXMuc3RhdHNbXCJzdHJcIl0gKyBcIlxcbk1hZzogXCIgKyB0aGlzLnN0YXRzW1wibWFnXCJdICsgXCJcXG5JbnQ6IFwiICsgdGhpcy5zdGF0c1tcImludFwiXSArIFwiXFxuQWZmaW5pdHk6XCIgKyBcIlxcblwiICsgYWZmX3N0ICsgXCJcXG5TdGF0dXM6XCI7XHJcbiAgICAgICAgLy9XSVBcclxuICAgICAgICBpZiAodGhpcy5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHN0ICs9IFwiT3V0IG9uIE1pc3Npb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdCArPSBcIkF2YWlsYWJsZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdDtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5X3N0YXRzMSgpIHtcclxuXHJcbiAgICAgICAgdmFyIHN0ID0gXCJTdHI6XCIgKyB0aGlzLnN0YXRzW1wic3RyXCJdICsgXCIgTWFnOlwiICsgdGhpcy5zdGF0c1tcIm1hZ1wiXSArIFwiIEludDpcIiArIHRoaXMuc3RhdHNbXCJpbnRcIl07XHJcbiAgICAgICAgLy9XSVBcclxuICAgICAgICByZXR1cm4gc3Q7XHJcblxyXG4gICAgfVxyXG4gICAgZGlzcGxheV9zdGF0czIoKSB7XHJcbiAgICAgICAgLy92YXIgYWZmX3N0ID0gXCJBZmZpbml0eTpcIiArIFwiIFwiK0pTT04uc3RyaW5naWZ5KHRoaXMuYWZmaW5pdHkpXHJcbiAgICAgICAgLy9yZXR1cm4gYWZmX3N0XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlfc3RhdHMzKCkge1xyXG4gICAgICAgIHZhciBzdCA9IFwiU3RhdHVzOiBcIlxyXG4gICAgICAgIGlmICh0aGlzLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgc3QgKz0gXCJPdXQgb24gTWlzc2lvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0ICs9IFwiQXZhaWxhYmxlXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zcHJpdGUpO1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuc3ByaXRlLCB0aGlzLmxvY2F0aW9uLngsIHRoaXMubG9jYXRpb24ueSk7XHJcbiAgICB9XHJcbiAgICBzZXRfbG9jYXRpb24od2hlcmUpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25zW3doZXJlXTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBNaXNzaW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCByZXFfc3RhdCwgLypyZXFfYWZmaW5pdHksKi8gcmVxX3RvdGFsLCByZXdhcmQsIHdpbl90eHQsIGxvc2VfdHh0LCB0aWNrcywgZGF5KSB7XHJcbiAgICAgICAgLy9hbHdheXMgZ2FpbiArMSBhZmZpbml0eSBvbiBzdWNjZXNzLiBcclxuICAgICAgICAvL2Fsd2F5cyBsb3NlIC0xIGFmZmluaXR5IG9uIGZhaWx1cmVcclxuICAgICAgICAvL21heWJlIGFkZCB0eXBlXHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2M7XHJcbiAgICAgICAgdGhpcy5yZXFfc3RhdCA9IHJlcV9zdGF0OyAvL21heWJlIG1ha2UgdGhpcyBhbiBhcnJheVxyXG4gICAgICAgIC8vdGhpcy5yZXFfYWZmaW5pdHkgPSByZXFfYWZmaW5pdHk7Ly9hZmZpbml0eVxyXG4gICAgICAgIHRoaXMucmVxX3RvdGFsID0gcmVxX3RvdGFsOyAvL3RoaXMgdG9vIFxyXG4gICAgICAgIHRoaXMucmV3YXJkID0gcmV3YXJkO1xyXG4gICAgICAgIHRoaXMud2luX3R4dCA9IHdpbl90eHQ7XHJcbiAgICAgICAgdGhpcy5sb3NlX3R4dCA9IGxvc2VfdHh0O1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAvL3Byb2JhYmx5IGFkZCBzdGFydF9kYXkgKHdoZW4gaXQgc2hvd3MgdXApIGFuZCBsZW5ndGggKGhvdyBtYW55IGRheXMgaXQgdGFrZXMpXHJcbiAgICAgICAgdGhpcy5jMSA9IG51bGw7IC8vdGhpcyBpcyB0aGUgY2hhcmFjdGVyIG5hbWUuXHJcbiAgICAgICAgdGhpcy5jMiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gLTE7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gLTE7XHJcbiAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4gICAgICAgIC8vcmV3YXJkID09IGRpZmZpY3VsdHkgZm9yIG5vd1xyXG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IHJld2FyZFxyXG4gICAgfVxyXG4gICAgYXNzaWduKGNoYXIxLCBjaGFyMikgeyAvL3Bhc3MgaW4gdGhlIG5hbWUuXHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jMSA9IGNoYXIxO1xyXG4gICAgICAgIHRoaXMuYzIgPSBjaGFyMjtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmlzX29uX21pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIC8vY2hhcjEuaXNfb2NjdXBpZWQgPSB0cnVlOyAvL21heWJlIGdldCBmcm9tIGxpc3RcclxuICAgICAgICAvL2NoYXIyLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRvX21pc3Npb24oKSB7XHJcbiAgICAgICAgbnVtX21pc3Npb25zKys7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzEpO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlcV9zdGF0ICsgXCIgb2YgbW9yZSB0aGFuIFwiICsgdGhpcy5yZXFfdG90YWwpO1xyXG4gICAgICAgIHZhciBjb21iaW5lZF9zdGF0ID0gcm9zdGVyW3RoaXMuY2hhcjFfaV0uc3RhdHNbdGhpcy5yZXFfc3RhdF0gKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5zdGF0c1t0aGlzLnJlcV9zdGF0XTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRvdGFsIHBvaW50czogXCIgKyBjb21iaW5lZF9zdGF0KTtcclxuICAgICAgICAvL3B1dCBpbiBhZmZpbml0eSB3aW4vbG9zZVxyXG4gICAgICAgIGlmIChjb21iaW5lZF9zdGF0ID49IHRoaXMucmVxX3RvdGFsKSB7IC8vbWFrZSBjaGVjayBmdW5jdGlvblxyXG4gICAgICAgICAgICAvL3Bhc3NcclxuICAgICAgICAgICAgdGhpcy52aWN0b3J5KClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2Vsc2UgaWYgKCBcclxuICAgICAgICAvLyAgdGhpcy5hZmZpbml0eSBbdGhpcy5jMl0gPj0gdGhpcy5yZXFfYWZmaW5pdHkpIHtcclxuICAgICAgICAvL3RoaXMudmljdG9yeSgpXHJcbiAgICAgICAgLy9yZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvL31cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mYWlsdXJlKClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZpY3RvcnkoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgbnVtX3N1Y2Nlc3NmdWwrKztcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiTWlzc2lvbjogXCIgKyB0aGlzLnRpdGxlICsgXCIgd2FzXCIgKyAnPHNwYW4gc3R5bGU9XCJjb2xvcjogIzIyOEIyMlwiPiBzdWNjZXNzZnVsITxicj48L3NwYW4+JyArIHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMud2luX3R4dCk7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzEpO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMyKTtcclxuICAgICAgICAvL3RleHRfbG9nLnB1c2gocm9zdGVyW3RoaXMuY2hhcjFfaV0ubmFtZSArIFwiIGFuZCBcIiArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLm5hbWUgKyBcIiBoYXZlIHJldHVybmVkITxicj5UaGVpciBzdGF0ZW1lbnQ6IFwiICsgdGhpcy53aW5fdHh0KTtcclxuICAgICAgICAvL2luY3JlYXNlIHN0YXQgYnkgcmV3YXJkIGFtdFxyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmluY3JlYXNlX3N0YXQodGhpcy5yZXFfc3RhdCwgdGhpcy5yZXdhcmQpO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmluY3JlYXNlX3N0YXQodGhpcy5yZXFfc3RhdCwgdGhpcy5yZXdhcmQpO1xyXG4gICAgICAgIC8vaW5jcmVhc2UgYWZmaW5pdHlcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5pbmNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMl9pXSk7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaW5jcmVhc2VfYWZmaW5pdHkocm9zdGVyW3RoaXMuY2hhcjFfaV0pO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaCh0aGlzLndpbl90eHQpO1xyXG5cclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IG51bGw7XHJcblxyXG4gICAgfVxyXG4gICAgZmFpbHVyZSgpIHtcclxuICAgICAgICBudW1fZmFpbGVkKys7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImZhaWx1cmVcIik7XHJcbiAgICAgICAgdGV4dF9sb2cucHVzaChcIk1pc3Npb246IFwiICsgdGhpcy50aXRsZSArICc8c3BhbiBzdHlsZT1cImNvbG9yOiAjZmYwMDAwXCI+IGZhaWxlZCE8YnI+PC9zcGFuPicgKyByb3N0ZXJbdGhpcy5jaGFyMV9pXS5uYW1lICsgXCIgYW5kIFwiICsgcm9zdGVyW3RoaXMuY2hhcjJfaV0ubmFtZSArIFwiIGhhdmUgcmV0dXJuZWQhPGJyPlRoZWlyIHN0YXRlbWVudDogXCIgKyB0aGlzLmxvc2VfdHh0KTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaChyb3N0ZXJbdGhpcy5jaGFyMV9pXS5uYW1lICsgXCIgYW5kIFwiICsgcm9zdGVyW3RoaXMuY2hhcjJfaV0ubmFtZSArIFwiIGhhdmUgcmV0dXJuZWQhPGJyPlRoZWlyIHN0YXRlbWVudDogXCIgKyB0aGlzLmxvc2VfdHh0KTtcclxuICAgICAgICAvL2RlY3JlYXNlIGFmZmluaXR5XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uZGVjcmVhc2VfYWZmaW5pdHkocm9zdGVyW3RoaXMuY2hhcjJfaV0pO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmRlY3JlYXNlX2FmZmluaXR5KHJvc3Rlclt0aGlzLmNoYXIxX2ldKTtcclxuICAgICAgICAvL3RleHRfbG9nLnB1c2godGhpcy5sb3NlX3R4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gbnVsbDtcclxuICAgIH1cclxuICAgIGRlY3JlYXNlX3RpbWUoKSB7XHJcbiAgICAgICAgdGhpcy50aWNrcy0tO1xyXG4gICAgICAgIGlmICh0aGlzLnRpY2tzID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb19taXNzaW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlmZmljdWx0eV90b3N0cigpIHtcclxuICAgICAgICB2YXIgc3RyID0gXCJkaWZmaWN1bHR5OiBcIlxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kaWZmaWN1bHR5OyBpKyspIHtcclxuICAgICAgICAgICAgc3RyICs9IFwiKlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBnZXRfZGVzYygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldHRpbmcgZnVsbCBkZXNjXCIpO1xyXG4gICAgICAgIHZhciBmdWxsX2Rlc2MgPSBcIi0tLVxcblwiICsgdGhpcy5kZXNjICsgXCJcXG5yZXF1aXJlcyBcIiArIHRoaXMucmVxX3N0YXQgKyBcIiwgXCIgKyB0aGlzLmRpZmZpY3VsdHlfdG9zdHIoKTtcclxuICAgICAgICByZXR1cm4gZnVsbF9kZXNjO1xyXG4gICAgfVxyXG5cclxufVxyXG4vL1N0YXJ0IHBvc2l0aW9uIGlzIDU3MCwgMzQ1XHJcbmNsYXNzIExvY2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHgsIHksIHN0YXQpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaGFyMSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMiA9IG51bGw7IC8vZm9yIGFmZmluaXR5IE9OTFlcclxuICAgICAgICB0aGlzLnN0YXQgPSBudWxsO1xyXG4gICAgICAgIGlmIChzdGF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdCA9IHN0YXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGFzc2lnbihuYW1lLCBuYW1lMiA9IDApIHtcclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ID09IFwiYWZmaW5pdHlcIikge1xyXG4gICAgICAgICAgICAvL3R3byBjaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcjEgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXIyID0gbmFtZTI7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMSldLm1vdmUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjIpXS5tb3ZlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3N0YW5kYXJkIHN0YXQsIDEgY2hhclxyXG4gICAgICAgICAgICB0aGlzLmNoYXIxID0gbmFtZTtcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0ubW92ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGVuaGFuY2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdCA9PSBcImFmZmluaXR5XCIpIHtcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0uaW5jcmVhc2VfYWZmaW5pdHkodGhpcy5jaGFyMik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9vbmx5IG9uZVxyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjEpXS5pbmNyZWFzZV9zdGF0KHRoaXMuc3RhdCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuLy91c2VmdWwgdGhpbmdzXHJcbmNsYXNzIFBvcHVwIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHR5cGUpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlc1t0eXBlXTtcclxuICAgICAgICB0aGlzLmlzX29wZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy50ZXh0X3BvcyA9IHRoaXMueSArIDMwO1xyXG5cclxuICAgIH1cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG4gICAgZGlzbWlzcygpIHtcclxuICAgICAgICB0aGlzLmlzX29wZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgZHJhd19jYW52YXMoKTtcclxuICAgICAgICAvL2NoZWNrIGZvciBtaXNzaW9uIHN0dWZmIGluIGhlcmUgLk1ha2Ugc3VyZSAyIGNoYXJzIHNlbGVjdGVkIGV0Y1xyXG4gICAgICAgIGlmIChzZWxlY3RlZDEgIT0gbnVsbCAmJiBzZWxlY3RlZDIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvL3VwZGF0ZV90aW1lKCk7IHRoaXMgaXMgd2hhdCB1cGRhdGVzIHRpbWUgYWZ0ZXIgbWlzc2lvbnMgYXJlIHNlbGVjdGVkIFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc2V0dGluZyBpbiBwb3B1cCBkaXNtaXNzXCIpO1xyXG4gICAgICAgIHNlbGVjdGVkMSA9IG51bGw7XHJcbiAgICAgICAgc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICBzZWxlY3RlZF9taXNzaW9uID0gbnVsbDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIDIgaXMgbm93IFwiICsgc2VsZWN0ZWQyKTtcclxuICAgICAgICBmb3IgKHZhciBiIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjaGFyX2J1dHRvbnNbYl0ucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciB4IGluIHBvcHVwX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1t4XS5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyYXdfY2FudmFzKCk7XHJcbiAgICB9XHJcbiAgICB3cml0ZV90ZXh0KHRleHQpIHtcclxuICAgICAgICAvL3kgPSBzdGFydGluZyB5IHBvc2l0aW9uLiBcclxuICAgICAgICB2YXIgdHh0ID0gdGhpcy53cmFwX3BhcmFncmFwaF90ZXh0KHRleHQpO1xyXG4gICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgdHh0Lmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQodHh0W2xdLCB0aGlzLnggKyAxNSwgdGhpcy50ZXh0X3Bvcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9wb3MgKz0gMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy50ZXh0X3BvcyA9IHRoaXMueSArIDIwO1xyXG5cclxuICAgICAgICAvL3RoaXMudGV4dF94ICs9MjA7XHJcbiAgICAgICAgLy90aGlzLnRleHRfeSArPTIwO1xyXG4gICAgfVxyXG4gICAgLy90d28gYmVsb3cgZnVuY3Rpb25zIG1vZGlmaWVkIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5MzYxMTIvdGV4dC13cmFwLWluLWEtY2FudmFzLWVsZW1lbnRcclxuICAgIHdyYXBfcGFyYWdyYXBoX3RleHQodGV4dCkge1xyXG4gICAgICAgIHJldHVybiB0ZXh0LnNwbGl0KFwiXFxuXCIpLm1hcChwYXJhID0+IHRoaXMud3JhcF90ZXh0KHBhcmEpKS5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKTtcclxuICAgIH1cclxuICAgIHdyYXBfdGV4dCh0ZXh0KSB7XHJcbiAgICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnRMaW5lID0gd29yZHNbMF07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmltYWdlLngpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXTtcclxuICAgICAgICAgICAgdmFyIHcgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KGN1cnJlbnRMaW5lICsgXCIgXCIgKyB3b3JkKS53aWR0aDtcclxuICAgICAgICAgICAgaWYgKHcgPCB0aGlzLmltYWdlLndpZHRoIC0gNTApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lICs9IFwiIFwiICsgd29yZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgPSB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgIHJldHVybiBsaW5lcztcclxuICAgIH1cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMudGV4dF9wb3MgPSB0aGlzLnkgKyAzMDtcclxuICAgIH1cclxuICAgIGRyYXdfcG9wdXBfYnV0dG9ucygpIHtcclxuICAgICAgICB2YXIgdGlueV94ID0gMjUwO1xyXG4gICAgICAgIGZvciAodmFyIGIgaW4gcG9wdXBfYnV0dG9ucykge1xyXG4gICAgICAgICAgICB2YXIgY2hhciA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBwb3B1cF9idXR0b25zW2JdLnRleHQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvc3RlcltjaGFyXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlueV94ID49IHRoaXMuaW1hZ2Uud2lkdGggKyAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW55X3ggPSA0NTBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRfcG9zICs9IDQwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW55X3ggKz0gODA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnggPSB0aW55X3g7XHJcbiAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnkgPSB0aGlzLnRleHRfcG9zO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwb3B1cF9idXR0b25zW2JdLnggKyBcIiAsIFwiKyBwb3B1cF9idXR0b25zW2JdLnkpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgZHJhd19va19idXR0b24oKSB7XHJcbiAgICAgICAgb2sueCA9IDQ1NTtcclxuICAgICAgICBvay55ID0gdGhpcy50ZXh0X3BvcztcclxuICAgICAgICBvay5kcmF3KCk7XHJcbiAgICB9XHJcbiAgICBmaWxsX3BvcHVwKHRleHQsIGJ1dHRvbnMsIG9rKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZV90ZXh0KHRleHQpO1xyXG4gICAgICAgIGlmIChidXR0b25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdfb2tfYnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmNsYXNzIEJ1dHRvbiB7IC8vZXhpc3RpbmcgZnJhbWV3b3Jrcz9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHR5cGUsIHRleHQsIHByZXNzZWRfdHlwZSA9IDApIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlc1t0eXBlXTtcclxuICAgICAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnByZXNzZWRfaW1hZ2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYl90ZXh0X3BvcyA9IHRoaXMueSArIDIwO1xyXG4gICAgICAgIGlmIChwcmVzc2VkX3R5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVzc2VkX2ltYWdlID0gaW1hZ2VzW3ByZXNzZWRfdHlwZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0X2FjdGlvbigpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcclxuICAgIH1cclxuICAgIGRvX3NvbWV0aGluZygpIHtcclxuICAgICAgICBpZiAodGhpcy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXNldF90ZXh0X3BvcygpIHtcclxuICAgICAgICB0aGlzLmJfdGV4dF9wb3MgPSB0aGlzLnkgKyAyMDtcclxuICAgIH1cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnByZXNzZWQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wcmVzc2VkX2ltYWdlKTtcclxuICAgICAgICBpZiAodGhpcy5wcmVzc2VkKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMucHJlc3NlZF9pbWFnZSwgdGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZHJhd2luZyBwcmVzc2VkXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMueCArIDE1MCwgdGhpcy55ICsgNDUpO1xyXG4gICAgfVxyXG4gICAgLy90d28gYmVsb3cgZnVuY3Rpb25zIG1vZGlmaWVkIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5MzYxMTIvdGV4dC13cmFwLWluLWEtY2FudmFzLWVsZW1lbnRcclxuICAgIHdyYXBfcGFyYWdyYXBoX3RleHQodGV4dCkge1xyXG4gICAgICAgIHJldHVybiB0ZXh0LnNwbGl0KFwiXFxuXCIpLm1hcChwYXJhID0+IHRoaXMud3JhcF90ZXh0KHBhcmEpKS5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKTtcclxuICAgIH1cclxuICAgIHdyYXBfdGV4dCh0ZXh0KSB7XHJcbiAgICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnRMaW5lID0gd29yZHNbMF07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmltYWdlLngpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXTtcclxuICAgICAgICAgICAgdmFyIHcgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KGN1cnJlbnRMaW5lICsgXCIgXCIgKyB3b3JkKS53aWR0aDtcclxuICAgICAgICAgICAgaWYgKHcgPCB0aGlzLmltYWdlLndpZHRoIC0gMjApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lICs9IFwiIFwiICsgd29yZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgPSB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgIHJldHVybiBsaW5lcztcclxuICAgIH1cclxuICAgIHdyaXRlX3RleHQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIndyaXRpbmdcIik7XHJcbiAgICAgICAgdmFyIHR4dCA9IHRoaXMud3JhcF9wYXJhZ3JhcGhfdGV4dChcIk1pc3Npb246XFxuXCIgKyB0aGlzLnRleHQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codHh0KTtcclxuICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHR4dC5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHR4dFtsXSwgdGhpcy54ICsgMjAsIHRoaXMuYl90ZXh0X3Bvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYl90ZXh0X3BvcyArPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldF90ZXh0X3BvcygpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHByZWxvYWRfaW1nKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGltYWdlc1wiKTtcclxuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvblwiKVxyXG4gICAgLy92YXIgcG9wdXAgPSBuZXcgSW1hZ2UoKTtcclxuICAgIC8vYnV0dG9uLnNyYyA9IFwiaHR0cDovL2k2My50aW55cGljLmNvbS9yN25kNDQuanBnXCI7XHJcbiAgICAvL3BvcHVwLnNyYyA9IFwiaHR0cDovL2k2NC50aW55cGljLmNvbS8ydzVpdWo2LmpwZ1wiO1xyXG4gICAgaW1hZ2VzW1wiYnV0dG9uXCJdID0gYnV0dG9uO1xyXG4gICAgaW1hZ2VzW1wiTWluXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5cIik7XHJcbiAgICBpbWFnZXNbXCJNaW5fcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluX3BcIik7XHJcbiAgICBpbWFnZXNbXCJMYW5kb2xcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmRvbFwiKTtcclxuICAgIGltYWdlc1tcIkxhbmRvbF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5kb2xfcFwiKTtcclxuICAgIGltYWdlc1tcIlJvcnlcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlcIik7XHJcbiAgICBpbWFnZXNbXCJSb3J5X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlfcFwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3JzdFwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvcnN0X3BcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFudGhcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW50aF9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiYmdcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJnXCIpO1xyXG4gICAgaW1hZ2VzW1wiYmdfZXZlbmluZ1wiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmdfZXZlbmluZ1wiKTtcclxuICAgIGltYWdlc1tcInRpbnlNaW5cIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnltaW5cIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55TWluX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnltaW5fcFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlMYW5kb2xcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlsYW5kb2xcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55TGFuZG9sX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlsYW5kb2xfcFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlIb3JzdFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWhvcnN0XCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUhvcnN0X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlob3JzdF9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueVJvcnlcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlyb3J5XCIpO1xyXG4gICAgaW1hZ2VzW1widGlueVJvcnlfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueXJvcnlfcFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlEYW50aFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWRhbnRoXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueURhbnRoX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlkYW50aF9wXCIpO1xyXG4gICAgaW1hZ2VzW1wicGFzc1wiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc1wiKTtcclxuICAgIGltYWdlc1tcIk1pbnNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluc3ByXCIpO1xyXG4gICAgaW1hZ2VzW1wiTGFuZG9sc3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5kb2xzcHJcIik7XHJcbiAgICBpbWFnZXNbXCJIb3JzdHNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9yc3RzcHJcIik7XHJcbiAgICBpbWFnZXNbXCJSb3J5c3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3J5c3ByXCIpO1xyXG4gICAgaW1hZ2VzW1wiRGFudGhzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbnRoc3ByXCIpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhpbWFnZXNbXCJiZ1wiXSk7XHJcbiAgICBpbWFnZXNbXCJwb3B1cFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXBcIik7XHJcbiAgICBpbWFnZXNbXCJva1wiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2tcIik7XHJcbiAgICBpbWFnZXNbXCJnYW1lZG9uZVwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZW92ZXJcIik7XHJcbiAgICBpbWFnZXNbXCJtb29uXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb29uXCIpO1xyXG4gICAgaW1hZ2VzW1wic3VuXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5cIik7XHJcbiAgICBpbWFnZXNbXCJkaWFsb2dib3hcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpYWxvZ2JveFwiKTtcclxuICAgIGltYWdlc1tcInN0YXJ0c2NyZWVuXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydHNjcmVlblwiKVxyXG59XHJcbmZ1bmN0aW9uIGRpYWxvZygpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCA5MDAsIDY1MCk7XHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJkaWFsb2dib3hcIl0sIDAsIDM1MCk7XHJcbiAgICBjb250ZXh0LmZvbnQgPSAnMTBweCBcIlByZXNzIFN0YXJ0IDJQXCInO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgLy90aGlzIGlzIG1lIHN0YXJ0aW5nIHRvIHRyeSBhbmQgbWFrZSB0aGUgZGlhbG9nIHNjcmVlbiwgSSdtIGxlYXZpbmcgaXQgYWxvbmUgZm9yIG5vdyBcclxuICAgIC8vYnV0IGkgdGhpbmsgdGhhdCBldmVudHVhbHlsIHNldHRpbmcgaXQgdXAgaW4gYSB3YXkgc2ltaWxhciB0byBNaXNzaW9ucyB3b3VsZCBiZSBnb29kIFxyXG4gICAgLy90aG91Z2ggSSB3b25kZXIgaG93IEknZCBoYW5kbGUgYXZhdGFycyBhbmQgc3VjaCwgZHVubm8gaWYgaXRkIGJlIGEgc2VwZXJhdGUgdGhpbmcgb3IgYSBkaWN0aW9uYXJ5IFxyXG4gICAgLy93aGF0IGV2ZW4gaXMgYSBkaWN0aW9uYXJ5IFxyXG5cclxuXHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX3Jvc3RlcigpIHtcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJNaW5cIiwgeyAnc3RyJzogNywgJ21hZyc6IDAsICdpbnQnOiAzIH0sIFwiTWluc3ByXCIpKTsgLy9tYWtlIGEgZGljdGlvbmFyeS9sYWJlbCBpdFxyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIkxhbmRvbFwiLCB7ICdzdHInOiAwLCAnbWFnJzogNiwgJ2ludCc6IDQgfSwgXCJMYW5kb2xzcHJcIikpO1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIkhvcnN0XCIsIHsgJ3N0cic6IDgsICdtYWcnOiAwLCAnaW50JzogMiB9LCBcIkhvcnN0c3ByXCIpKTtcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJSb3J5XCIsIHsgJ3N0cic6IDIsICdtYWcnOiA2LCAnaW50JzogMiB9LCBcIlJvcnlzcHJcIikpO1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIkRhbnRoXCIsIHsgJ3N0cic6IDIsICdtYWcnOiAyLCAnaW50JzogNiB9LCBcIkRhbnRoc3ByXCIpKTtcclxuICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgcm9zdGVyW2NdLmNyZWF0ZV9hZmZpbml0eSgpOyAvL3N0YXJ0IGF0IDI/XHJcbiAgICAgICAgYWRkQWdlbnQocm9zdGVyW2NdLm5hbWUpOyAvL2FkZCBhZ2VudCBmb3IgYmVoYXZpb3IgdHJlZVxyXG4gICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2NdKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfbWlzc2lvbnMoKSB7XHJcbiAgICAvL3RlbXBsYXRlOiBcclxuICAgIC8vbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwidGl0bGVcIiwgXCJkZXNjXCIsIFwic3RhdFwiLCA8dG90YWxwdHM+LCA8ZGlmZmljdWx0eT4sIFwid2luXCIsIFwibG9zZVwiLCA8bGVuKjI+LCA8YXBwZWFyZGF5PikpO1xyXG4gICAgLy9kYXkgMVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQW4gYW50aW1hZ2ljIHJhdCBoYXMgdGFrZW4gb3ZlciBteSBhdHRpYyBhbmQgbWF5IGJlIGJ1aWxkaW5nIGEgc21hbGwgbmF0aW9uIHN0YXRlXCIsIFwiSSBjYW4ndCBnZXQgdG8gbXkgZ3JhbmRwYXJlbnQncyBvbGQgcGhvdG9zIGFueW1vcmUhXCIsIFwic3RyXCIsIDUsIDEsIFwiSSBmbGV4ZWQgYXQgdGhlIHJhdCBhbmQgaXQgbGVmdCFcIiwgXCJUaGUgcmF0IGtpbmcgcmFpbnMgc3VwcmVtZSBhbmQgd2lzaGVzIHRvIGJlIHBhaWQgcmVwYXJhdGlvbnMgdmlhIGNvcm4uXCIsIDIsIDEpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkxvc3QgY2F0XCIsIFwiU25lYWt5IG9sJyBmbHVmZmVyIGVzY2FwZWQhXCIsIFwiaW50XCIsIDUsIDEsIFwiV2UgZm91bmQgdGhlIGNhdCBiZWhpbmQgYSBkdW1wc3Rlci4gSXQgaGFkIGEgbm90ZSBpbiBpdHMgY29sbGFyIHRoYXQgc2FpZCAnc2hMZElmZ3NkRnNqZEVhZG5mIGRGamZrc1Jnak9iTW5mIGRzTWphRWZBbmdOa2RuSWJOa0cnXCIsIFwiV2hhdCBjYXQ/XCIsIDIsIDEpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIk15IHNoZWVwIGtlZXAgb24gZ29pbmcgbWlzc2luZ1wiLCBcIldoZXJlIGFyZSB0aGV5IGdvaW5nPyBXaGF0IGFyZSB0aGV5IGRvaW5nPyBBcmUgdGhleSB0YWxraW5nIGFib3V0IG1lPz8/IEkgaGF2ZSB0byBrbm93IVwiLCBcIm1hZ1wiLCA4LCAyLCBcIlRoZXkgd2VyZSBiZWluZyB1c2VkIGJ5IHRoZSBnb2JsaW5zIGZvciBmYW50YXN5IGZvb3RiYWxsLiBUaGV5IHdlcmUgcmV0dXJuZWQsIHNsaWdodGx5IG1vcmUgYXJtb3JlZC4gXCIsIFwiU2hlZXAgYXJlbid0IHJlYWwuXCIsIDIsIDEpKTtcclxuICAgIC8vZGF5IDJcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlNsaW1lcyBhcmUgZWF0aW5nIG15IHBvdGF0b2VzIVwiLCBcIkkgaGFkIG9uZSBwbGFuIGFuZCB0aGF0IHBsYW4gd2FzIHdoYWNraW5nIHRoZW0gd2l0aCBhIHN3b3JkIGFuZCBpdCBkaWRuJ3Qgd29yay5cIiwgXCJtYWdcIiwgOCwgMiwgXCJTbGltZXMgemFwcGVkLCBtaXNzaW9uIGNvbXBsZXRlIVwiLCBcIlRoZSBzbGltZXMgc2hvb2sgb2ZmIGFsbCB0aGUgcGh5c2ljYWwgZGFtYWdlIHdlIGNvdWxkIGRvIHNvIHdlIHNob3ZlZCB0aGVtIGludG8gYSBob2xlIGFuZCBob3BlZCBmb3IgdGhlIGJlc3QuXCIsIDIsIDIpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkdvYmxpbnMgd29uJ3Qgc3RvcCBoZWNrbGluZyBteSBzaGVlcFwiLCBcIlRoZXkncmUgZ2V0dGluZyB2ZXJ5IHN0cmVzc2VkIG91dCEgSGVscCFcIiwgXCJzdHJcIiwgMTAsIDMsIFwiVGhlIHNoZWVwIGNhbiBzaGVlcCBpbiBwZWFjZSBub3chXCIsIFwiV2UgbG9zdCwgYnV0IG9uIHRoZSBicmlnaHQgc2lkZSBJIGRvbid0IHRoaW5rIHNoZWVwIHVuZGVyc3RhbmQgRW5nbGlzaC5cIiwgMiwgMikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiSSB0aGluayBHZW9yZ2UgaXMgYSB2YW1waXJlXCIsIFwiSGUgbmV2ZXIgZWF0cyBhbmQgaGlzIHNoaXJ0cyBhcmUgYWx3YXlzIHN0YWluZWQgd2l0aCBibG9vZCFcIiwgXCJpbnRcIiwgNiwgMSwgXCJHZW9yZ2UgaXMuLi5hIHNoeSB3aW5lcnkgd29ya2VyLiBXZSBib3VnaHQgaGltIG5ldyBzaGlydHMuXCIsIFwiR2VvcmdlIG1vdmVkIG91dCBiZWZvcmUgd2UgY291bGQgdGFsayB0byBoaW0uLi5cIiwgMiwgMikpO1xyXG4gICAgLy9kYXkgM1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQW4gdW5kZWFkIGFybXkgaXMgaW52YWRpbmchXCIsIFwiVEhFWSdWRSBHT1RURU4gSU5UTyBUSEUgTUlMSyBCQVJOUyEgV0UnUkUgRE9PTUVEIVwiLCBcIm1hZ1wiLCAxNCwgNSwgXCJXYXNuJ3QgdG9vIGhhcmQsIHdlIGp1TWFzRWRzQWZnTnViSWpOdm5jeEcgRmFzalJkZk9oZ01oZ2pkIGRzTGpmSWRrRm5nRWZralwiLCBcIlRoZSBjYWxjaXVtLi5pdCBtYWRlIHRoZW0gLi4uLnRvbyBwb3dlcmZ1bFwiLCAyLCAzKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJUSEUgU0tZIFRVUk5FRCBSRURcIiwgXCJXSFkgSVMgSVQgUkVEPz8/XCIsIFwiaW50XCIsIDYsIDEsIFwiSXQuLi53ZSBoYWQgdG8gc3BlbmQgMyBob3VycyBleHBsYWluaW5nIHRoZSBzdW5zZXQgdG8gYSBmYW1pbHkgb2YgNi4gSSBtZWFuIG1vbmV5IGlzIG1vbmV5IGJ1dCBob3cnZCB0aGlzIG1pc3Npb24gZXZlbiBnZXQgb24gb3VyIGxpc3QuXCIsIFwiV2Ugc3RvcHBlZCBieSBhbmQgdGhleSB1aGhoLi5zYWlkIGEgbG90IG9mIHdvcmRzIGFuZCBhZnRlciBhbiBob3VyIHdlIGdyYWNpb3VzbHkganVtcGVkIG91dCB0aGUgd2luZG93IHRvIGVzY2FwZS4gXCIsIDIsIDMpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkxpY2ggS2luZyBjYXVzaW5nIGEgcnVja3VzXCIsIFwiVW5ob2x5IG1hZ2ljcyBhbmQgbG91ZCwgYm9vbWluZyBub2lzZXMgYXJlIGNvbWluZyBmcm9tIHRoZSBsaWNoJ3Mga2VlcCwgc2VuZCBoZXIgYSB3YXJuaW5nIVwiLCBcIm1hZ1wiLCAxMiwgNCwgXCJPdXIgbWFnaWMgd2FzIGNvb2xlciB0aGFuIGhlcnMgc28gc2hlIGFncmVlZCB0byBtb3ZlIGhlciBwYXJ0eSBkZWVwZXIgdW5kZXJncm91bmRcIiwgXCJMaWNoIFxcXCJQYXJ0eWJyb2R1ZGVmZWxsYVxcXCIgd2FzIGRlZXBseSB1bmltcHJlc3NlZCBieSB1cyBhbmQgdHVybmVkIHVwIGhlciBkdWJzdGVwIGxvdWRlclwiLCAyLCAzKSk7XHJcbiAgICAvL2RheSA0XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBIGZpc2ggbGVhcm5lZCB0byB3YWxrIG9uIGxhbmQgYW5kIGhlcyB1c2luZyBoaXMgbGVncyBleGNsdXNpdmVseSBmb3IgZXZpbFwiLCBcIkhlIGNhbid0IGhhbmRsZSB0aGUgcmVzcG9uc2liaWxpdHkgb2YgaGF2aW5nIGxlZ3MhIEhlJ3MgcmFpc2luZyBhIHRhZHBvbGUgYXJteSFcIiwgXCJzdHJcIiwgMTAsIDMsIFwiSGUgZ290IHN1cGxleGVkIGJhY2sgaW50byB0aGUgb2NlYW4hXCIsIFwiSGlzIGV2aWwgY29udGludWVzLi4uLi50aGUgbmVmZXJpb3VzIENhcHRhaW4gTGVnYmVhcmRcIiwgMiwgNCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiRm9sbG93IG15IGNhdCBhcm91ZCB0byBzZWUgd2hhdCBzaGUgZG9lcyBhbGwgZGF5XCIsIFwiSSBsb3NlIGhlciBldmVyeSB0aW1lIEkgdHJ5LCBJIGhhdmUgdG8ga25vdyFcIiwgXCJpbnRcIiwgOCwgMiwgXCJEZWFyIGdvZCB0aGlzIGNhdCBnZXRzIHNvIG1hbnkgdHJlYXRzLiBQbGVhc2Ugc3RvcCBmZWVkaW5nIGhlciBzaGVzIHRvbyBwb3dlcmZ1bC5cIiwgXCJPdXRzbWFydGVkIGJ5IGEgY2F0Li4uLmp1c3QgYW5vdGhlciBub3JtYWwgZGF5IGhvbmVzdGx5XCIsIDIsIDQpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlN0b3AgdGhlc2Ugd2Vla2x5IGJhcmZpZ2h0cyFcIiwgXCJFdmVyeSBXZWRuZXNkYXkgYW4gZWxmIGFuZCBhbiBvcmMgY29tZSB0byBteSBiYXIsIGFuZCB0aGV5IGFsd2F5cyBlbmQgdXAgZmlnaHRpbmchIFRoZXkgcmVmdXNlIHRvIGNvbWUgb24gZGlmZmVyZW50IGRheXMhXCIsIFwic3RyXCIsIDgsIDIsIFwiVGhleSBzdGFydGVkIHRocm93aW5nIGNoYWlycyBhZ2FpbiBzbyB3ZSBhbHNvIHRocmV3IGNoYWlycyBhdCB0aGVtLiBUaGV5IHdlcmUgZm9yY2VkIHRvIHRlYW0gdXAgYWdhaW5zdCB1cyBhbmQgYm9uZGVkIG92ZXIgdGhlaXIgc2hhcmVkIGRlZmVhdC4gVGhlaXIgd2VkZGluZyBpcyBuZXh0IHdlZWssIEkgdGhpbmsgdGhlIHByb2JsZW0gaXMgc29sdmVkXCIsIFwiV2UgY291bGRuJ3Qgc3RvcCB0aGVtLiBJIHdvbmRlciBpZiB0aGV5J2xsIHN0aWxsIGJlIGF0IGl0IHdoZW4gSSBoYXZlIGdyYW5ka2lkcy4uLlwiLCAyLCA0KSk7XHJcbiAgICAvL2RheSA1XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJLcmFrZW4gd29uJ3Qgc3RvcCByZWFycmFuZ2luZyB0aGUgYm9hdHMgYXQgdGhlIGRvY2sgZXZlcnkgbmlnaHQhXCIsIFwiV2UgZG9uJ3QgbmVlZCBvdXIgYm9hdHMgb3JkZXJlZCBieSBjb2xvciEgV2UgbmVlZCB0aGVtIHdoZXJlIHdlIHBhcmtlZCB0aGVtIVwiLCBcIm1hZ1wiLCAxMiwgNCwgXCJUdXJucyBvdXQsIHNoZSBqdXN0IG5lZWRlZCBhIHRyYW5zbGF0b3IuIFdlIHNldCB1cCBhIG1hZ2ljYWwgb25lIGFuZCBub3cgdGhlIEtyYWtlbiBnZXRzIGEgc2FsYXJ5IG9mIGZpc2ggdG8ga2VlcCB0cmFjayBvZiBhbGwgdGhlIGJvYXRzXCIsIFwiV2VsbCBJIGd1ZXNzIHRoZXknbGwganVzdCBoYXZlIHRvIGFjY2VwdCB0aGVpciBuZXcgb3JnYW5pemF0aW9uYWwgb3ZlcmxvcmRcIiwgMiwgNSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiVkVSWSBMQVJHRSBCRUFSISBWRVJZIFZFUlkgTEFSR0UgQkVBUiEhXCIsIFwiQkVBUiBMQVJHRVwiLCBcInN0clwiLCAxMCwgMywgXCJHb29kIG5ld3MsIHdlIHdvbiEgQmFkIG5ld3MsIGl0IHdhcyBhIGRyYWdvbi5cIiwgXCJJVCBXQVMgTk9UIEEgQkVBUiFcIiwgMiwgNSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQSBiaWcgcm9jayBpcyBmYWxsaW5nIGZyb20gdGhlIHNreSBidXQgaXQncyBwcm9iYWJseSBmaW5lXCIsIFwiSSBtZWFuIGEgZmlyZXkgZGVhdGggZG9lc24ndCBzb3VuZCBsaWtlIHRoZSB3b3JzdCB0aGluZyBpbiB0aGUgd29ybGRcIiwgXCJtYWdcIiwgMTQsIDUsIFwiV2UgbWFkZSBhIGJpZyBiYXQgb3V0IG9mIG1hZ2ljIGFuZCB3aGFja2VkIGl0IHNvbWV3aGVyZSBlbHNlIVwiLCBcIml0IHdhcyBub3QgZmluZSEhIVwiLCAyLCA1KSk7XHJcbiAgICAvL2RheSA2XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJTb21lb25lJ3Mgc3RvbGVuIHRoZSB0b3duIGZsYWchXCIsIFwiV2UgbmVlZCBvdXIgZmxhZyFcIiwgXCJpbnRcIiwgOCwgMiwgXCJXZSBmb3VuZCBpdCBpbiBhIHNob3BwaW5nIGNhcnQgMTAgbWlsZXMgYXdheVwiLCBcIldlIGNvdWxkbid0IGZpbmQgaXQgc28gd2UgcmVwbGFjZWQgdGhlIGZsYWcgd2l0aCBhIGNvYXQgc29tZW9uZSBsZWZ0IG91dC4udGhlIG1heW9yIGhhcyBub3Qgbm90aWNlZCB5ZXQuXCIsIDIsIDYpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkdvbGVtIHJhbXBhZ2luZyB0aHJvdWdoIHRvd24hXCIsIFwiSVQnUyBERVNUUk9ZSU5HIFRIRSBGTE9XRVJTIEFORCBPTkxZIFRIRSBGTE9XRVJTISFcIiwgXCJzdHJcIiwgMTIsIDQsIFwiV2UgaGFja2VkIGl0ISBXaXRoIGFuIGF4ZS4gQnV0IHNvbWVob3cgdGhpcyBmaXhlZCBpdCBhbmQgbm93IGl0cyBhIG5vcm1hbCBnYXJkZW5pbmcgZ29sZW0hXCIsIFwiSXQgYmVhdCB1cyB1cCBhbmQgcmFuIGludG8gdGhlIGNvdW50cnlzaWRlIHRvIGNhc3RyYXRlIG1vcmUgcGxhbnRzXCIsIDIsIDYpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkEgdGlueSBkcmFnb24gd29uJ3QgZ2V0IG91dCBvZiBteSBzaWx2ZXJ3ZWFyIGNhYmluZXQhXCIsIFwiTm93IG5vcm1hbGx5IHRoaXMgd291bGRuJ3QgYmUgYW4gaXNzdWUgYnV0IG91ciBob3VzZSBpcyB2ZXJ5IGZsYW1tYWJsZSFcIiwgXCJpbnRcIiwgMTAsIDMsIFwiTGlsIGd1eSBqdXN0IHdhbnRzIHRvIGhvYXJkIHNwb29ucy4gV2UgbWFkZSBoaW0gYSBwaWxlIG9mIGRvbmF0ZWQgc3Bvb25zIG91dCBpbiB0aGUgd29vZHMgYW5kIGhlIHNlZW1zIHZlcnkgaGFwcHkhXCIsIFwiV2VsbCB0aGUgZHJhZ29uJ3Mgb3V0IG9mIHRoZSBjYWJpbmV0LCBidXQgdGhlaXIgaG91c2UgaXMuLi5zbGlnaHRseS4uLi5hYmxhemUuXCIsIDIsIDYpKTtcclxuICAgIC8vZGF5IDdcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIn5TaGFycm9cIiwgXCJkak9mbkxrZ2hEamZuZCBGc2xSamtJZ0VmbGpObkRma2QgZGtqc2ZnbmtqZ2hCYXNkRWZoZyBXamtFbDtMamhrZ2pMaGZkc1wiLCBcImludFwiLCAxMDAsIDEwLFwidGhpcyBvdXRjb21lIGlzIG51bWVyaWNhbGx5IGltcG9zc2libGUsIHdoYXQgaGF2ZSB5b3UgZG9uZSBub3cgWXVrby5cIiwgXCJXZSBsb29rZWQgZXZlcnl3aGVyZSBidXQgd2UgY291bGRuJ3QgZmluZCB0aGVtLi4uIFRoZXkgc2FpZCB0aGV5J2QgYmUgYmFjayBieSBub3cgcmlnaHQ/IC4uZ3Vlc3MgeW91J2xsIGhhdmUgdG8gbG9vayBhZnRlciB0aGluZ3MgYSB3aGlsZSBsb25nZXIuLlwiLCAyLCA3KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJ+U2hhcnJvXCIsIFwiZGpPZm5Ma2doRGpmbmQgRnNsUmprSWdFZmxqTm5EZmtkIGRranNmZ25ramdoQmFzZEVmaGcgV2prRWw7TGpoa2dqTGhmZHNcIiwgXCJpbnRcIiwgMTAwLCAxMCxcInRoaXMgb3V0Y29tZSBpcyBudW1lcmljYWxseSBpbXBvc3NpYmxlLCB3aGF0IGhhdmUgeW91IGRvbmUgbm93IFl1a28uXCIsIFwiV2UgbG9va2VkIGV2ZXJ5d2hlcmUgYnV0IHdlIGNvdWxkbid0IGZpbmQgdGhlbS4uLiBUaGV5IHNhaWQgdGhleSdkIGJlIGJhY2sgYnkgbm93IHJpZ2h0PyAuLmd1ZXNzIHlvdSdsbCBoYXZlIHRvIGxvb2sgYWZ0ZXIgdGhpbmdzIGEgd2hpbGUgbG9uZ2VyLi5cIiwgMiwgNykpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiflNoYXJyb1wiLCBcImRqT2ZuTGtnaERqZm5kIEZzbFJqa0lnRWZsak5uRGZrZCBka2pzZmdua2pnaEJhc2RFZmhnIFdqa0VsO0xqaGtnakxoZmRzXCIsIFwiaW50XCIsIDEwMCwgMTAsXCJ0aGlzIG91dGNvbWUgaXMgbnVtZXJpY2FsbHkgaW1wb3NzaWJsZSwgd2hhdCBoYXZlIHlvdSBkb25lIG5vdyBZdWtvLlwiLCBcIldlIGxvb2tlZCBldmVyeXdoZXJlIGJ1dCB3ZSBjb3VsZG4ndCBmaW5kIHRoZW0uLi4gVGhleSBzYWlkIHRoZXknZCBiZSBiYWNrIGJ5IG5vdyByaWdodD8gLi5ndWVzcyB5b3UnbGwgaGF2ZSB0byBsb29rIGFmdGVyIHRoaW5ncyBhIHdoaWxlIGxvbmdlci4uXCIsIDIsIDcpKTtcclxuICAgIC8vZGF5IDhcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkkgZm91bmQgYSBzd29yZCBpbiB0aGUgd29vZHMhXCIsIFwiaXQganVzdCBzaXRzIHRoZXJlLi4ubWVuYWNpbmdseS4uXCIsIFwiaW50XCIsIDEwLCAzLCBcIldlIHdlbnQgb24gYSBncmFuZCBhZGVudHVyZSEgV2Ugc2F2ZWQgbGl2ZXMsIGZlbGwgaW4gbG92ZSwgYnV0IG1vc3QgaW1wb3J0YW50bHkuLi4gd2UgdGhyZXcgYSB0YXJwIG92ZXIgdGhlIHN3b3JkIGFuZCBjb3ZlcmVkIGl0IHdpdGggZGlydC5cIiwgXCJzZFRiSGZFc2YgZENqWWtmQ2hzTGdqRWtuZGYgZGpPa2dmRmhvciBmamRTc2tUZk9hc1JmWVwiLCAyLCA4KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJNeSBiYWJ5IGhhcyBnbG93aW5nIGV5ZXMuLlwiLCBcIlNoZSdzIG90aGVyd2lzZSBub3JtYWwuLiBidXQgd2UncmUgd29ycmllZCBhYm91dCBoZXIgcGFyZW50cyBiZWluZyBraWxsZWQgZm9yIGNoYXJhY3RlciBkZXZlbG9wbWVudFwiLCBcIm1hZ1wiLCAxMiwgNCxcIldlIHRhdWdodCBoZXIgcGFyZW50cyBob3cgdG8gY2FzdCBtYWdpYyEgQXMgbG9uZyBhcyB0aGV5IGRvbid0IGRlY2lkZSB0byBnbyBvbiBhIGpvdXJuZXkgYW5kIGRpZSBpbiBhIHdhciwgaXQgc2hvdWxkIGJlIGZpbmVcIiAsXCJTb21ldGltZXMgYmFiaWVzJyBleWVzIGp1c3QgZ2xvdywgaXQncyBub3JtYWwhIE15IGV5ZXMgZ2xvd2VkIHdoZW4gSSB3YXMgYSBraWRcIiwgMiwgOCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiV2hlcmUncyBteSBtYWlsIVwiLCBcIk1haWxtYW4gd29uJ3QgZGVsaXZlciBteSBtYWlsISBTb21ldGhpbicgYWJvdXQgJ1dvcmsgaGF6YXJkcycsIHdoYXRldmVyIHRob3NlIGFyZS5cIiwgXCJzdHJcIiw4LCAyLCBcIiBIZXIgb2xkIG1haWxib3ggd2FzIGFjdHVhbGx5IGp1c3QgYSBiZWFyIHRyYXAgd2l0aCBzb21lIHBhcGVyIGluIGl0LCBzbyB3ZSBidWlsdCBoZXIgYSBuZXcgbWFpbGJveCEgT25lIHRoYXQgZGVmaW5ldGx5IGlzbid0IGEgcmVwdXJwb3NlZCBidWNrZXRcIiwgXCJIZXIuLmhvdXNlIGlzIHRvbyBvbiBmaXJlIGZvciB1cyB0byBmaW5kIHRoZSBtYWlsYm94XCIsIDIsIDgpKTtcclxuICAgIC8vZGF5IDlcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkhlbHAgbmVlZGVkIVwiLCBcImRoakFmak5mYmQgc2pFZGZoVGdrZEVmamRSZ25OZmJBamtMdmRzIHNUamRSaGZVZ1RzSGRrXCIsXCJpbnRcIiwgMTIsIDQsIFwid2VpcmQganVuayBtYWlsLi4gdG9vayB1cyBhIGJpdCB0byBmaWd1cmUgaXQgb3V0LCBidXQgaWYgeW91IGxvb2sgYXQgZXZlcnkgY2FwaXRhbGl6ZWQgbGV0dGVyLCBpdCBzcGVsbHMgb3V0ICdBTiBFVEVSTkFMIFRSVVRIJy4gU2VlbXMgbGlrZSBzb21ldGhpbmcgU2hhcnJvIHdvdWxkIGRvLCBidXQgdGhpcyBraW5kIG9mIGVuY29kaW5nIGlzIGEgYml0IHNpbXBsaXN0aWMgZm9yIHRoZW0sIHRoZXkgYWx3YXlzIGxpa2VkIHRocm93aW5nIHB1enpsZXMgYXQgdXNcIiwgXCJpdHMgc29tZSBzb3J0IG9mIGNvZGUuLmJ1dCB3ZSBjb3VsZG4ndCBmaWd1cmUgaXQgb3V0LiBNaWdodCBoYXZlIHNvbWV0aGluZyB0byBkbyB3aXRoIFNoYXJybz8gVGhleSBhbHdheXMgbG92ZWQgY29kZXNcIiwgMiwgOSApKVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiRmluZCBteSBzb24hXCIsIFwiSSdkIGZpbmQgaGltIGJ1dCBJJ20gdG9vIGJ1c3kgdW5yYXZlbGluZyBhIGdvdmVybm1lbnQgY29uc3BpcmFjeSBhbmQgc3BlbmRpbmcgMjAwIGhvdXJzIG1ha2luZyBhIGdhcmRlblwiLCBcInN0clwiLCAxMCwgMywgXCJIZSB3YXMganVzdCBnb2luZyB0aHJvdWdoIGdpYW50IGJ1ZyBwdWJlcnR5IGFuZCBtYWRlIGEgY29jb29uLCB3ZSBjYXJyaWVkIGl0IGJhY2tcIiwgXCJXZSBmb3VuZCBoaW0gYnV0Li53ZSB3ZXJlbid0IGFibGUgdG8gcHVzaCBoaXMgY29jb29uIGJhY2sgaG9tZS5cIiwgMiwgOSkpXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJTb21lb25lIHN0b2xlIHRoZSB0b3duJ3Mgd2VsbCBidWNrZXQhXCIsIFwiVGhlc2UgYnVja2V0IGNyaW1lcyBjYW5ub3QgZ28gdW5wdW5pc2hlZCFcIiwgXCJpbnRcIiwgOCwgMixcIkEgZmlyZSBlbGVtZW50YWwgd2FzIHVzaW5nIGl0IGFzIGhlciBtYWlsYm94Li5XZSBoZWxwZWQgdGhlbSBzZXQgdXAgYSB0aW1lc2hhcmUgb24gdGhlIGJ1Y2tldCwgZXZlcnlvbmUncyBoYXBweVwiLCBcIkRhbnRoIHNlZW1zIHRvIGtub3cgd2hlcmUgaXQgaXMgYnV0IGhlIHJlZnVzZXMgdG8gdGVsbCBhbnlvbmVcIiwgMiwgOSkpXHJcbiAgICAvL2RheSAxMCBcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcInNObkVWYkVqUmJnRWROakRuSWZORyBzQ0FoTGJBTXNrSXRUcnNZam5cIiwgXCJnVXNOZHZPZ0JzU2ZFUnZWc0VEIGFkV2hFc2JnIENnRWtqQWZTaEVnZGZzIHNha1RoZE9ma2YgZkVrWGpJZ1NoVGtkZ1wiLCBcImludFwiLCAxMDAsIDEwLCBcIkl0J3MgYWxsIGZhbGxpbmcgYXBhcnQgbm93XCIsIFwiZGZJam5qU2tkcyBkVGtzSGphRWZuUmRqRW5mIGRqa0FmYXNramZnZiBmTGRJamtnRmZFamhnIGZCZEVZamdPc05EIGZkalRnbkhkRWpzZm5nIHNka0Vnak5mbkRnZmprZD9cIiwgMiwgMTApKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcInNORWRWYkVqUmJnRU5rakRuSU5HIHNDa0FoZkxiQU1za0l0VHJzWVwiLCBcImdVc05kdk9nQnNTZkVSdlZzRUQgYWRXaEVzYmcgQ2dFa2pBZlNoRWdkZnMgc2FrVGhkT2ZrZiBmRWtYaklnU2hUa2RnXCIsIFwiaW50XCIsIDEwMCwgMTAsIFwiSXQncyBhbGwgZmFsbGluZyBhcGFydCBub3dcIiwgXCJkZklqbmpTa2RzIGRUa3NIamFFZm5SZGpFbmYgZGprQWZhc2tqZmdmIGZMZElqa2dGZkVqaGcgZkJkRVlqZ09zTkQgZmRqVGduSGRFanNmbmcgc2RrRWdqTmZuRGdmamtkP1wiLCAyLCAxMCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwic05uRVZiRWpSYkVkTmtqRElvTkcgc0NrQWhMYkFNc2tJdFRyWWpkZlwiLCBcImdVc05kdk9nQnNTZkVSdlZzRUQgYWRXaEVzYmcgQ2dFa2pBZlNoRWdkZnMgc2FrVGhkT2ZrZiBmRWtYaklnU2hUa2RnXCIsIFwiaW50XCIsIDEwMCwgMTAsIFwiSXQncyBhbGwgZmFsbGluZyBhcGFydCBub3dcIiwgXCJkZklqbmpTa2RzIGRUa3NIamFFZm5SZGpFbmYgZGprQWZhc2tqZmdmIGZMZElqa2dGZkVqaGcgZkJkRVlqZ09zTkQgZmRqVGduSGRFanNmbmcgc2RrRWdqTmZuRGdmamtkP1wiLCAyLCAxMCkpO1xyXG4gICAgLy9kYXkgMTFcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaCAobmV3IE1pc3Npb24oXCJJIGNmZ2FuJ3Qgb3BlbmpuYiB0aGlzIGphciFcIiwgXCJJIHdpbGxnaGQgcGF5IHlvdSBvbmUgZW50aXJlIGNoaWNkZ2tlbiBpZiB5b3UgaGVscCBtZSBvcGVuIHRoaXMgamFyXCIsIFwic3RyXCIsIDYsIDEsIFwiVGhlcmUgd2FzIGEuLiBkZW1vbiBpbiB0aGF0IGphciBidXQgaGV5IHdlIGdvdCBpdCBvcGVuIVwiLCBcIldlIGNvdWxkbid0IG9wZW4gaXQgc28gd2Ugc21hc2hlZCBpdCBhbmQgYSBkZW1vbiBjYW1lIG91dD9cIiwgMiwgMTEpKVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQSBkcmFkZ3NoZ29uIGJ1cm50IGRkZm93biBteSBmYXJtcyFcIiwgXCJTaGUncyBnb3QgYSBmbGFtZXRzZ2ZoaHJvd2VyISFcIiwgXCJtYWdcIiwgMTIsIDQsIFwiV2Ugc3RvbGUgdGhlIGZsYW1ldGhyb3dlciBhbmQgc2hlIHJhbiBvZmZcIiwgXCJ0dXJucyBvdXQsIHB1bmNoaW5nIGEgZmxhbWV0aHJvd2VyIGp1c3QgbWFrZXMgaXQgZXhwbG9kZSBhbmQgc2V0IG1vcmUgdGhpbmdzIG9uIGZpcmUuLlwiLCAyLCAxMSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQSBwbGFndWUgaGFzIGtpZGZoc2xsZWQgbXkgdmlsZGZsYWdlXCIsIFwiV2UgbmVlaHJ0ZCB0byBzdG9wIHJoaXQhXCIsIFwiaW50XCIsIDE0LCA1LCBcIkhlIHdhbnRlZCB1cyB0byBraWxsIGhpbSB0byBzdG9wIHRoZSBwbGFndWUsIGJ1dCB3ZSBjbGVhbmVkIHVwIHRoZSB3YXR0ZXIgc3VwcGx5IGluc3RlYWQuIFNob3VsZCBiZSBmaW5lIG5vdyFcIiwgXCJXZSBjb3VsZG4ndCBmaWd1cmUgb3V0IHRoZSBjYXVzZSBzbyB3ZSBqdXN0IHdhbGxlZCBvZmYgdGhlIHBsYWNlLiBJJ20gc3VyZSB0aGF0J2xsIG5ldmVyIGdldCBkaXNjb3ZlcmVkIGJ5IGEgbW9yYWxseSBncmV5IG5lY3JvbWFuY2VyIGxhdGVyIVwiLCAyLCAxMSkpO1xyXG4gICAgLy9kYXkgMTJcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcImVFdmVyeXRoaW5nIGlzZiBvbiBmaXJlIVwiLCBcIm1ZIGJhVXJiYUtjdU9lIVwiLCBcIm1hZ1wiLCAxMiwgNCwgXCJXZSBwdXQgaXQgb3V0LCBhbHRob3VnaCwgc29tZSBvZiB0aGUgZmlyZSBzZWVtZWQgdG8gYmUgbWFkZSBvdXQgb2Ygc25ha2VzPyBXaG8ncyB3cml0aW5nIHRoaXM/XCIsIFwiU05BS0UgRklSRVwiLCAyLCAxMikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiVGhmZSBjYXN0bGUgaXMgYmVpbmcgaW52YWRlZCBieSBhIHNtYWxsIGNoaWxkIVwiLCBcIlNoZSdzIGdvdCBkaXNyZXNwZWN0IGZvciBhdXRob3JpdHkgYW5kIHRoZSBsYXdzIG9mIHBoeXNpY3MhXCIsIFwic3RyXCIsMTIsIDQsXCJ0aEUgTEFXUyBPRiBQSFlTSUNTIE1FQU4gTk9USElORyBUTyBNWSBQRUNTIH5Qcm9iYWJseSBNaW5cIiwgXCJJIHRoaW5rIHNoZSBhY2NpZGVudGFsbHkgZGVsZXRlZCBoZXJzZWxmPz9cIiwgMiwgMTIgKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJkWXNPZFVmIGRDQU5UZiBnU2hBalZoRSBrVGxIckVlTSBhQXNMZExcIiwgXCJXc2RFZmcgZk5nRUVEIGhDak9kTkZMSUNUIGRXaEVzZiBOaEVmRWdEIHNFallmRWRTZ1wiLCBcImludFwiLCAxMDAsIDEwLCBcIllvdSBjYW4ndCBiZSBoZXJlXCIsIFwiV2FIc1kgZERmTyBZZ09oVSBkRGZFTmdZIGZNRWRcIiwgMSwgMTIpKTtcclxuICAgIC8vZGF5IDEzXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJERWdTVFJ1T1kgVEhhRSBDT01QaElMRVJcIiwgXCIuLi5cIiwgXCJzdHJcIiwgMjAsIDYsIFwidFNoRGFGbmsgeUZKb0d1SFwiLCBcIi4uLi5cIiwgMiwgMTMpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaCAobmV3IE1pc3Npb24oXCJzREVTVFJPZFkgVGVIRSBDT2tNUElMRVJcIiwgXCIuLi5cIiwgXCJtYWdcIiwgMjAsIDYsIFwiZ0FvR29KZGJLeWVcIiwgXCIuLi4uLlwiLCAyLCAxMykpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoIChuZXcgTWlzc2lvbihcIkRFU1RnUk9ZIFRvSEUgQ09NclBJTHJFUlwiLCBcIi4uLlwiLCBcImludFwiLCAyMCwgNiwgXCJIeXVTa0RvXCIsIFwiLi4uLi4uXCIsIDIsIDEzKSk7XHJcbiAgICAvL2RheSAxNFxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uIChcIll1a28gVGhlIEhlcm9cIiwgXCJTdG9pYywgcGVyaGFwcyB0byBhIGZhdWx0LiBBbiBhZ2dyZXNpdmVseSB1bmludGVyZXN0aW5nIHBlcnNvbiwgcGVyaGFwcyB0aGF0cyB3aHkgc2hlIGJlY2FtZSB5b3UuXCIsIFwic3RyXCIsIDEsIDMsIFwiYSBmcmllbmRcIiwgXCJhIGJyaWNrIHdhbGwgb2YgYSBmcmllbmRcIiwgMTAsIDE0KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJTaGFycm8gVGhlIE1lbnRvclwiLCBcIkxhcmdlciB0aGFuIGxpZmUsIHRvbyBsYXJnZSB0byBmaXQgaW4gdGhpcyBzdG9yeS4gVGhleSBhcmUgcHJvdWQgb2YgeW91LiBXaGVyZXZlciB0aGV5IGFyZS4uXCIsIFwibWFnXCIsMSwzLCBcImdvb2Qgb2wgTkIgYnVkZHlcIiwgXCJmbHVmZnlcIiwgMTAsMTQpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkF2aW51cyBUaGUgQ29tcGlsZXJcIiwgXCJBIHdvcmxkIG1hZGUgb2Ygc3RvcmllcyBuZWVkcyBhIHN0b3J5dGVsbGVyLiBBbmQgeWV0IGFuIGVuZCBoYWQgdG8gY29tZS5cIiwgXCJpbnRcIiwgMSwgMywgXCJ3cml0ZXJzIGJsb2NrIGVuZGVkIHRoZSB3b3JsZCBiYXNpY2FsbHlcIiwgXCJ0d2FzIGEgc2lsbHkgcGxvdCwgYnV0IEkgaGFkIGZ1blwiLCAyMCwgMTQpKTtcclxufVxyXG5mdW5jdGlvbiBsb2dfdGV4dCgpIHtcclxuICAgIHZhciBsZ190eHQgPSBcIlwiO1xyXG4gICAgZm9yICh2YXIgZSBpbiB0ZXh0X2xvZykge1xyXG4gICAgICAgIGxnX3R4dCArPSB0ZXh0X2xvZ1tlXSArIFwiPGJyPiAqICogKiA8YnI+XCI7XHJcbiAgICB9XHJcbiAgICB2YXIgZGl2X2xvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nXCIpXHJcblxyXG4gICAgZGl2X2xvZy5pbm5lckhUTUwgPSBsZ190eHQ7XHJcbiAgICBkaXZfbG9nLnNjcm9sbFRvcCA9IGRpdl9sb2cuc2Nyb2xsSGVpZ2h0O1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZV9sb2NhdGlvbnMoKSB7XHJcbiAgICB2YXIgc3RyX2xvYyA9IG5ldyBMb2NhdGlvbihcIlRyYWluaW5nIER1bW15XCIsIDQ3MCwgMzAwLCBcInN0clwiKTtcclxuICAgIHZhciBtYWdfbG9jID0gbmV3IExvY2F0aW9uKFwiTWFnaWMgVG93ZXJcIiwgNzUwLCAxMDAsIFwibWFnXCIpO1xyXG4gICAgdmFyIGludF9sb2MgPSBuZXcgTG9jYXRpb24oXCJMaWJyYXJ5XCIsIDY0MCwgMjgwLCBcImludFwiKTtcclxuICAgIHZhciBhZmZfbG9jID0gbmV3IExvY2F0aW9uKFwiR2F6ZWJvXCIsIDUwNSwgMTM1LCBcImFmZmluaXR5XCIpO1xyXG4gICAgdmFyIGFmZl9sb2MyID0gbmV3IExvY2F0aW9uKFwiR2F6ZWJvXCIsIDUzNSwgMTM1LCBcImFmZmluaXR5XCIpO1xyXG4gICAgdmFyIHN0YXJ0X2xvYyA9IG5ldyBMb2NhdGlvbihcIk91dHNpZGVcIiwgNjAwLCAzMTUpO1xyXG4gICAgbG9jYXRpb25zW1wic3RhcnRcIl0gPSBzdGFydF9sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJzdHJcIl0gPSBzdHJfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wibWFnXCJdID0gbWFnX2xvYztcclxuICAgIGxvY2F0aW9uc1tcImludFwiXSA9IGludF9sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0gPSBhZmZfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wiYWZmaW5pdHkyXCJdID0gYWZmX2xvYzI7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGZpbmRfaW5fbGlzdCh0eXBlLCB0b19zZWFyY2gpIHtcclxuICAgIGlmICh0eXBlID09IFwicm9zdGVyXCIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvc3Rlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocm9zdGVyW2ldLm5hbWUgPT0gdG9fc2VhcmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcIm1pc3Npb25cIikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWlzc2lvbl9ib2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobWlzc2lvbl9ib2FyZFtpXS50aXRsZSA9PSB0b19zZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBkcmF3X2NhbnZhcygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZHJhd2luZyBjYW52YXNcIik7XHJcbiAgICBsb2dfdGV4dCgpO1xyXG4gICAgLy9zdHVmZiB0byByZWRyYXcgd2hlbiBwb3B1cCBjbG9zZXMuIFxyXG4gICAgLy8gb3V0bGluZVxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQubGluZVdpZHRoID0gXCI2XCI7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgY29udGV4dC5yZWN0KDAsIDAsIDgwMCwgNjUwKTtcclxuICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlc1tcImJnXCJdKTtcclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJtb3JuaW5nXCIpIHtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJiZ1wiXSwgMCwgMCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY3VycmVudF90aW1lID09IFwiZXZlbmluZ1wiKSB7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiYmdfZXZlbmluZ1wiXSwgMCwgMCk7XHJcbiAgICB9XHJcbiAgICAvL2NvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcImJnXCJdLCAwLCAwKTsgLy9kcmF3IGJnXHJcbiAgICBkcmF3X2NoYXJhY3Rlcl9idXR0b25zKCk7XHJcbiAgICBkcmF3X2NoYXJhY3RlcnMoKTtcclxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJEYXkgXCIgKyBjdXJyZW50X2RheSwgODQwLCA1NzUpO1xyXG4gICAgZHJhd190aW1lKCk7XHJcbiAgICBwcm9maWxlX3RleHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd190aW1lKCkge1xyXG4gICAgaWYgKGN1cnJlbnRfdGltZSA9PSBcIm1vcm5pbmdcIikge1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcInN1blwiXSwgODQwLCA1MjApO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRfdGltZSA9PSBcImV2ZW5pbmdcIikge1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcIm1vb25cIl0sIDg0MCwgNTIwKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBkcmF3X2dhbWVfZG9uZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZG9uZVwiKTtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcImdhbWVkb25lXCJdLCAwLCAwKTsgLy9kcmF3IGRvbmVcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XHJcbiAgICBjb250ZXh0LmZvbnQgPSBcIjE1cHggJ1ByZXNzIFN0YXJ0IDJQJ1wiXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTWlzc2lvbnMgQXR0ZW1wdGVkOiBcIiArIG51bV9taXNzaW9ucywgMzAwLCAzNjApO1xyXG4gICAgY29udGV4dC5maWxsVGV4dChcIk1pc3Npb25zIFN1Y2NlZWRlZDogXCIgKyBudW1fc3VjY2Vzc2Z1bCwgMzAwLCA0MDApO1xyXG4gICAgY29udGV4dC5maWxsVGV4dChcIk1pc3Npb25zIEZhaWxlZDogXCIgKyBudW1fZmFpbGVkLCAzMDAsIDQ0MCk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlX3RpbWUoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInVwZGF0ZSB0aW1lIHJlc2V0XCIpO1xyXG4gICAgcG9wLmlzX29wZW4gPSBmYWxzZTtcclxuICAgIHNlbGVjdGVkMSA9IG51bGw7XHJcbiAgICBzZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAvL3BvcC5kaXNtaXNzKCk7XHJcblxyXG4gICAgLy9maXJzdDogaGF2ZSBjaGFyYWN0ZXJzIGRvIHRoZWlyIGFjdGlvbnNcclxuICAgIG1vdmVfY2hhcmFjdGVycygpO1xyXG4gICAgLy9mb3IgZXZlcnkgbWlzc2lvbiBhc3NpZ25lZCwgdXBkYXRlZCB0aGUgdGltZSBzdHVmZi4gRG9pbmcgdGhpcyBiZWZvcmUgdGhlIGNhbnZhcyByZWRyYXcuXHJcbiAgICBmb3IgKHZhciBtIGluIG1pc3Npb25fYm9hcmQpIHtcclxuICAgICAgICBpZiAobWlzc2lvbl9ib2FyZFttXS5hc3NpZ25lZCkge1xyXG4gICAgICAgICAgICBtaXNzaW9uX2JvYXJkW21dLmRlY3JlYXNlX3RpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL25leHQsIHVwZGF0ZSB0aW1lLlxyXG4gICAgaWYgKGN1cnJlbnRfdGltZSA9PSBcIm1vcm5pbmdcIiAmJiBjdXJyZW50X2RheSA8IGxhc3RfZGF5KSB7XHJcbiAgICAgICAgY3VycmVudF90aW1lID0gXCJldmVuaW5nXCI7XHJcbiAgICAgICAgZHJhd19jYW52YXMoKTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGN1cnJlbnRfZGF5Kys7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRfZGF5IDwgbGFzdF9kYXkpIHtcclxuICAgICAgICAgICAgY3VycmVudF90aW1lID0gXCJtb3JuaW5nXCI7XHJcbiAgICAgICAgICAgIGRheV9jaGFuZ2UoKTtcclxuICAgICAgICAgICAgdmFyIGludHR2SUQgPSB3aW5kb3cuc2V0VGltZW91dChkYXlfc2NyZWVuX2FjdGl2ZV9zZXQsIDE1MDApO1xyXG4gICAgICAgICAgICB2YXIgaW50dklEID0gd2luZG93LnNldFRpbWVvdXQoZHJhd19jYW52YXMsIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgdGV4dF9maXgoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLy9kcmF3X2NhbnZhcygpOyAvL3JlZHJhdyB0ZXh0LlxyXG4gICAgaWYgKGN1cnJlbnRfZGF5ID09IGxhc3RfZGF5KSB7XHJcbiAgICAgICAgdGV4dF9sb2cucHVzaChcIllvdSBkaWQgYSBnb29kIGpvYiBZdWtvXCIpO1xyXG4gICAgICAgIGxvZ190ZXh0KCk7XHJcbiAgICAgICAgZHJhd19nYW1lX2RvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGV4dF9sb2cucHVzaChcIkRheSBcIiArIGN1cnJlbnRfZGF5ICsgXCIsIFwiICsgY3VycmVudF90aW1lKTtcclxuICAgIH1cclxuICAgIC8vY2hhcmFjdGVycyBhbHdheXMgbW92ZVxyXG5cclxuXHJcbn1cclxuZnVuY3Rpb24gc3RhcnRfc2NyZWVuKCkge1xyXG4gICAgc3RhcnRfc2NyZWVuX2FjdGl2ZSA9IHRydWU7XHJcblxyXG5cclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcInN0YXJ0c2NyZWVuXCJdLCAwLCAwKTtcclxuXHJcbiAgIC8vIGNvbnRleHQuZm9udCA9ICc2OHB4IFwiUHJlc3MgU3RhcnQgMlBcIic7XHJcbiAgICAvLy9jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIlxyXG4gICAgLy9jb250ZXh0LmZpbGxUZXh0KFwiUmltZSBSb3lhbGVcIiwgMTAwLCAzNTApO1xyXG5cclxuICAgIC8qdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXTtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyIChcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHN0YXJ0X3NjcmVlbl9raWxsKCk7XHJcbiAgICAgICAgZHJhd19jYW52YXMoKTtcclxuICAgICAgfSk7Ki9cclxufVxyXG5mdW5jdGlvbiBzdGFydF9zY3JlZW5fa2lsbCgpIHtcclxuICAgIHN0YXJ0X3NjcmVlbl9hY3RpdmUgPSBmYWxzZTtcclxuXHJcbn1cclxuZnVuY3Rpb24gZGF5X3NjcmVlbl9hY3RpdmVfc2V0KCkge1xyXG4gICAgZGF5X3NjcmVlbl9hY3RpdmUgPSBmYWxzZVxyXG59XHJcbmZ1bmN0aW9uIGRheV9jaGFuZ2UoKSB7XHJcbiAgICAvL05ldyBkYXkgc2NyZWVuXHJcbiAgICAvL2NvbnNvbGUubG9nKFwiZGF5IGNoYW5nZVwiKTtcclxuICAgIC8vYmxhY2sgaXMgZGVmYXVsdCwgZG9uJ3QgbmVlZCB0byBzcGVjaWZ5XHJcblxyXG4gICAgZGF5X3NjcmVlbl9hY3RpdmUgPSB0cnVlXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgOTAwLCA2NTApO1xyXG5cclxuICAgIGNvbnRleHQuZm9udCA9ICc2OHB4IFwiUHJlc3MgU3RhcnQgMlBcIic7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICAvL2NvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7IDwtLSBjYXVzZWQgdGV4dCBzbGlkaW5nIGJ1Z1xyXG4gICAgY29udGV4dC5maWxsVGV4dCgnRGF5JyArIGN1cnJlbnRfZGF5LCAzMjUsIDM1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRleHRfZml4KCkge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCJcclxuICAgIGNvbnRleHQuZm9udCA9IFwiOHB4ICdQcmVzcyBTdGFydCAyUCdcIlxyXG59XHJcbmZ1bmN0aW9uIHByb2ZpbGVfdGV4dCgpIHtcclxuICAgIC8vdmFyIHMgPSAvKidNaW4gdGhlIEtuaWdodCcgKyAqLyByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiTWluXCIpXS5kaXNwbGF5X3N0YXRzKClcclxuICAgIC8vICB2YXIgc3RyID0gdGhpcy53cml0ZV90ZXh0KHMpO1xyXG4gICAgY29udGV4dC5maWxsVGV4dCgnTWluIHRoZSBLbmlnaHQnLCA3MCwgNDApO1xyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiTWluXCIpXS5kaXNwbGF5X3N0YXRzMSgpLCA3MCwgNjUpXHJcbiAgICAvL2NvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIk1pblwiKV0uZGlzcGxheV9zdGF0czIoKSwgNzAsIDY1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiTWluXCIpXS5kaXNwbGF5X3N0YXRzMygpLCAyMCwgODUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KCdMYW5kb2wgdGhlIE1hZ2UnLCA3MCwgMTMwKVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiTGFuZG9sXCIpXS5kaXNwbGF5X3N0YXRzMSgpLCA3MCwgMTU1KVxyXG4gICAgLy9jb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJMYW5kb2xcIildLmRpc3BsYXlfc3RhdHMyKCksIDcwLCAxNTUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJMYW5kb2xcIildLmRpc3BsYXlfc3RhdHMzKCksIDIwLCAxNzUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KCdIb3JzdCB0aGUgSG9yc2VtYW4nLCA3MCwgMjIwKVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiSG9yc3RcIildLmRpc3BsYXlfc3RhdHMxKCksIDcwLCAyNDUpXHJcbiAgICAvL2NvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkhvcnN0XCIpXS5kaXNwbGF5X3N0YXRzMigpLCA3MCwgMjQ1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiSG9yc3RcIildLmRpc3BsYXlfc3RhdHMzKCksIDIwLCAyNjUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KCdSb3J5IHRoZSBTdW1tb25lcicsIDcwLCAzMTApXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJSb3J5XCIpXS5kaXNwbGF5X3N0YXRzMSgpLCA3MCwgMzM1KVxyXG4gICAgLy9jb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJSb3J5XCIpXS5kaXNwbGF5X3N0YXRzMigpLCA3MCwgMzM1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiUm9yeVwiKV0uZGlzcGxheV9zdGF0czMoKSwgMjAsIDM1NSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQoJ0RhbnRoIHRoZSBTcHltYXN0ZXInLCA3MCwgNDAwKVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiRGFudGhcIildLmRpc3BsYXlfc3RhdHMxKCksIDcwLCA0MjUpXHJcbiAgICAvL2NvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkRhbnRoXCIpXS5kaXNwbGF5X3N0YXRzMigpLCA3MCwgNDI1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiRGFudGhcIildLmRpc3BsYXlfc3RhdHMzKCksIDIwLCA0NDUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdfY2hhcmFjdGVycygpIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJpbiBkcmF3IGNoYXJhY3RlcnNcIik7XHJcbiAgICBmb3IgKHZhciBjaGFyIGluIHJvc3Rlcikge1xyXG4gICAgICAgIGlmICghcm9zdGVyW2NoYXJdLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgcm9zdGVyW2NoYXJdLmRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbW92ZV9jaGFyYWN0ZXJzKCkge1xyXG4gICAgLy9yYW5kb20gdGhlIGNoYXJhY3RlciBvcmRlciBmb3IgdGhvc2Ugd2hvIGFyZW50IGJ1c3lcclxuICAgIGNvbnNvbGUubG9nKFwiaW4gbW92ZSBjaGFyXCIpO1xyXG4gICAgLy9nZXRfcmFuZG9tX2NoYXJfbGlzdCgpO1xyXG4gICAgLy9OZWVkIHRvIHN0b3Agb25jZSBldmVyeSBjaGFyYWN0ZXIgaXMgYXNzaWduZWQuIFxyXG4gICAgaWYgKGN1cnJlbnRfdGltZSA9PSBcIm1vcm5pbmdcIikge1xyXG4gICAgICAgIGZvciAodmFyIGNoIGluIHJvc3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoIXJvc3RlcltjaF0uaXNfb2NjdXBpZWQgJiYgIXJvc3RlcltjaF0uaXNfb25fbWlzc2lvbikgeyAvL2lmIGNoYXJhY3RlciBpc24ndCBvbiBhIG1pc3Npb24gb3IgYWxyZWFkeSBvY2N1cGllZFxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsb2NhdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgLy9zZWxlY3RfYWN0aW9uKHJvc3RlcltjaF0pO1xyXG4gICAgICAgICAgICAgICAgYXR0YWNoVHJlZVRvQWdlbnQocm9zdGVyW2NoXS5uYW1lLCBzZWxlY3RfYWN0aW9uKHJvc3RlcltjaF0pKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3b3JsZFRpY2soKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9ldmVuaW5nLCBldmVyeW9uZSBnb2VzIHRvIHN0YXJ0XHJcbiAgICAgICAgZm9yICh2YXIgYyBpbiByb3N0ZXIpIHtcclxuICAgICAgICAgICAgcm9zdGVyW2NdLnNldF9sb2NhdGlvbihcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgICByb3N0ZXJbY10uaXNfb2NjdXBpZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hbGwgbG9jYXRpb25zIGFyZSB1bm9jY3VwaWVkIFxyXG4gICAgICAgIGxvY2F0aW9uc1tcInN0clwiXS5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIGxvY2F0aW9uc1tcImludFwiXS5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIGxvY2F0aW9uc1tcIm1hZ1wiXS5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MVwiXS5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MlwiXS5hc3NpZ25lZCA9IGZhbHNlO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuZnVuY3Rpb24gZHJhd19jaGFyYWN0ZXJfYnV0dG9ucygpIHtcclxuICAgIC8vdmFyIHkgPSA1MDtcclxuICAgIGZvciAodmFyIGIgaW4gY2hhcl9idXR0b25zKSB7XHJcbiAgICAgICAgY2hhcl9idXR0b25zW2JdLmRyYXcoKTtcclxuICAgIH1cclxuICAgIHBhc3MuZHJhdygpO1xyXG4gICAgZm9yICh2YXIgYiBpbiBtaXNzaW9uX2J1dHRvbnMpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGN1cnJlbnRfZGF5KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKG1pc3Npb25fYm9hcmRbYl0uZGF5KVxyXG4gICAgICAgIGlmIChjdXJyZW50X2RheSA9PSBtaXNzaW9uX2JvYXJkW2JdLmRheSAmJiAhbWlzc2lvbl9ib2FyZFtiXS5hc3NpZ25lZCkge1xyXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbnNbYl0uZHJhdygpO1xyXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbnNbYl0ud3JpdGVfdGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9jb250ZXh0LmRyYXdJbWFnZShjaGFyX2J1dHRvbnNbMF0uaW1hZ2UsIGNoYXJfYnV0dG9uc1swXS54LCBjaGFyX2J1dHRvbnNbMF0ueSk7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZV9idXR0b25zKCkge1xyXG4gICAgcG9wID0gbmV3IFBvcHVwKDMwMCwgMjAwLCBcInBvcHVwXCIpO1xyXG4gICAgdmFyIHkgPSAyMDtcclxuICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgdmFyIGNoYXJfbmFtZSA9IHJvc3RlcltjXS5uYW1lO1xyXG4gICAgICAgIHZhciBiID0gbmV3IEJ1dHRvbigxMCwgeSwgY2hhcl9uYW1lLCBjaGFyX25hbWUsIGNoYXJfbmFtZSArIFwiX3BcIik7XHJcbiAgICAgICAgdmFyIG4gPSBcInRpbnlcIiArIGNoYXJfbmFtZVxyXG4gICAgICAgIHZhciB0aW55X2IgPSBuZXcgQnV0dG9uKDAsIDAsIG4sIGNoYXJfbmFtZSwgbiArIFwiX3BcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpbWFnZXNbbitcIl9wXCJdKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGltYWdlcyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhuKTtcclxuICAgICAgICBwb3B1cF9idXR0b25zLnB1c2godGlueV9iKTtcclxuICAgICAgICBjaGFyX2J1dHRvbnMucHVzaChiKTtcclxuICAgICAgICB5ICs9IDkwO1xyXG4gICAgfVxyXG4gICAgeSArPSAyMDtcclxuICAgIHZhciB4ID0gMjA7XHJcbiAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgZm9yICh2YXIgYyBpbiBtaXNzaW9uX2JvYXJkKSB7XHJcbiAgICAgICAgLy9oYXJkIGNvZGVkIGFuZCBoYWNreSwgMyBtaXNzaW9ucyBwZXIgZGF5XHJcbiAgICAgICAgaWYgKGNvdW50ID09IDMpIHtcclxuICAgICAgICAgICAgeCA9IDIwO1xyXG4gICAgICAgICAgICBjb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coeCk7XHJcbiAgICAgICAgdmFyIG1pc3Npb25fdGl0bGUgPSBtaXNzaW9uX2JvYXJkW2NdLnRpdGxlO1xyXG4gICAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCB5LCBcImJ1dHRvblwiLCBtaXNzaW9uX3RpdGxlKTtcclxuICAgICAgICBtaXNzaW9uX2J1dHRvbnMucHVzaChiKTtcclxuICAgICAgICB4ICs9IDIyMDtcclxuICAgICAgICBjb3VudCsrO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBwYXNzID0gbmV3IEJ1dHRvbig3MjAsIDU4MCwgXCJwYXNzXCIsIFwicGFzc1wiKTtcclxuICAgIG9rID0gbmV3IEJ1dHRvbigwLCAwLCBcIm9rXCIsIFwib2tcIik7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrQm91bmRzKG9iamVjdCwgeCwgeSkge1xyXG4gICAgdmFyIG1pblggPSBvYmplY3QueDtcclxuICAgIHZhciBtYXhYID0gb2JqZWN0LnggKyBvYmplY3QuaW1hZ2Uud2lkdGg7XHJcbiAgICB2YXIgbWluWSA9IG9iamVjdC55O1xyXG4gICAgdmFyIG1heFkgPSBvYmplY3QueSArIG9iamVjdC5pbWFnZS5oZWlnaHQ7XHJcbiAgICB2YXIgbXggPSB4O1xyXG4gICAgdmFyIG15ID0geTtcclxuICAgIC8vY29uc29sZS5sb2coXCJGb3Igb2JqZWN0IFwiICsgb2JqZWN0LnRleHQpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImJ1dHRvbiB4IHJhbmdlOlwiICsgbWluWCArIFwiIHRvIFwiICsgbWF4WCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiYnV0dG9uIHkgcmFuZ2U6XCIgKyBtaW5ZICsgXCIgdG8gXCIgKyBtYXhZKTtcclxuXHJcbiAgICBpZiAobXggPj0gbWluWCAmJiBteCA8PSBtYXhYICYmIG15ID49IG1pblkgJiYgbXkgPD0gbWF4WSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2xpY2tlZChlKSB7XHJcbiAgICBpZiAoY3VycmVudF9kYXkgPT0gbGFzdF9kYXkpIHJldHVybjtcclxuICAgIGlmIChkYXlfc2NyZWVuX2FjdGl2ZSkgcmV0dXJuO1xyXG4gICAgaWYgKHN0YXJ0X3NjcmVlbl9hY3RpdmUpIHJldHVybjtcclxuICAgIC8vb25seSB3YW50IHRvIG9wZW4gcG9wdXAgd2hlbiBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgIC8vY2xvc2UgcG9wdXAgd2hlbiBwb3B1cCBpcyBjbGlja2VkIG9mZi4gXHJcbiAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICBjb25zdCBjYW52X3ggPSBlLmNsaWVudFggLSByZWN0LmxlZnRcclxuICAgIGNvbnN0IGNhbnZfeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wXHJcbiAgICAvL2ZpZ3VyZSBvdXQgd2hhdCB3YXMgY2xpY2tlZCBmaXJzdC4gXHJcbiAgICAvL2NvbnNvbGUubG9nKFwibW91ZXMgcG9zOiBcIiArIGUuY2xpZW50WCArIFwiLCBcIiArIGUuY2xpZW50WSk7IC8vZGVidWdnaW5nXHJcbiAgICBpZiAoIXBvcC5pc19vcGVuKSB7XHJcbiAgICAgICAgLy9jaGVjayBpZiBhIGJ1dHRvbiB3YXMgY2xpY2tlZCAgXHJcbiAgICAgICAgZm9yICh2YXIgYnV0dG9uIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tCb3VuZHMoY2hhcl9idXR0b25zW2J1dHRvbl0sIGNhbnZfeCwgY2Fudl95KSkge1xyXG4gICAgICAgICAgICAgICAgLy9kcmF3IHBvcHVwXHJcbiAgICAgICAgICAgICAgICBjaGFyX2J1dHRvbnNbYnV0dG9uXS5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBvcC5pc19vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRyYXdfY2FudmFzKCk7XHJcbiAgICAgICAgICAgICAgICBwb3AuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5zdGF0c190b3N0cigpKTtcclxuICAgICAgICAgICAgICAgIHBvcC5maWxsX3BvcHVwKHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgY2hhcl9idXR0b25zW2J1dHRvbl0udGV4dCldLnN0YXRzX3Rvc3RyKCksIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2hhcmFjdGVyOiBcIiArIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgY2hhcl9idXR0b25zW2J1dHRvbl0udGV4dCldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5zdGF0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgYnV0dG9uIGluIG1pc3Npb25fYnV0dG9ucykge1xyXG4gICAgICAgICAgICBpZiAoIW1pc3Npb25fYnV0dG9uc1tidXR0b25dLmFzc2lnbmVkICYmIGNoZWNrQm91bmRzKG1pc3Npb25fYnV0dG9uc1tidXR0b25dLCBjYW52X3gsIGNhbnZfeSkgJiYgY3VycmVudF9kYXkgPT0gbWlzc2lvbl9ib2FyZFtidXR0b25dLmRheSkge1xyXG4gICAgICAgICAgICAgICAgcG9wLmlzX29wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfbWlzc2lvbiA9IGJ1dHRvbjtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJTRVRUSU5HIFNFTEVDVEVEIE1JU1NJT05cIik7XHJcbiAgICAgICAgICAgICAgICBwb3AuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgLy9kcmF3X3BvcHVwX2J1dHRvbnMoKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWlzc2lvbl9idXR0b25zW2J1dHRvbl0udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGZpbmRfaW5fbGlzdChcIm1pc3Npb25cIiwgbWlzc2lvbl9idXR0b25zW2J1dHRvbl0udGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhtaXNzaW9uX2JvYXJkWzBdLnRpdGxlKTtcclxuICAgICAgICAgICAgICAgIHZhciBtaXNzaW9uX3RpdGxlID0gbWlzc2lvbl9ib2FyZFtmaW5kX2luX2xpc3QoXCJtaXNzaW9uXCIsIG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpXS50aXRsZTtcclxuICAgICAgICAgICAgICAgIHZhciBtaXNzaW9uX2Rlc2MgPSBtaXNzaW9uX2JvYXJkW2ZpbmRfaW5fbGlzdChcIm1pc3Npb25cIiwgbWlzc2lvbl9idXR0b25zW2J1dHRvbl0udGV4dCldLmdldF9kZXNjKCk7XHJcbiAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChtaXNzaW9uX3RpdGxlICsgXCJcXG5cIiArIG1pc3Npb25fZGVzYywgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9wb3AuZmlsbF9wb3B1cChcImRlc2NcIiwgdHJ1ZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAvL3BvcC5kcmF3X3BvcHVwX2J1dHRvbnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hlY2tCb3VuZHMocGFzcywgY2Fudl94LCBjYW52X3kpKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwYXNzIGNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIHVwZGF0ZV90aW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9pZiBwb3AgdXAgaXMgb3Blbiwgd2FudCB0byBjaGVjayBpZiBhbnl0aGluZyBCVVQgYnV0dG9ucyB3YXMgY2xpY2tlZCAoZm9yIG5vdylcclxuICAgICAgICBpZiAoY2hlY2tCb3VuZHMocG9wLCBjYW52X3gsIGNhbnZfeSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb3B1cCBjbGlja2VkIVwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkMSAhPSBudWxsICYmIHNlbGVjdGVkMiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjaGVja0JvdW5kcyhvaywgY2Fudl94LCBjYW52X3kpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0JvdW5kcyhvaywgY2Fudl94LCBjYW52X3kpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk9rIGNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wLmRpc21pc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkMSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgYiBpbiBwb3B1cF9idXR0b25zKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRob3NlIGJ1dHRvbnMgd2VyZSBjbGlja2VkLiBcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocG9wdXBfYnV0dG9uc1tiXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tCb3VuZHMocG9wdXBfYnV0dG9uc1tiXSwgY2Fudl94LCBjYW52X3kpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkIGlzIFwiICsgcG9wdXBfYnV0dG9uc1tiXS50ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL1NlbGVjdCBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQxID09IG51bGwgJiYgc2VsZWN0ZWRfbWlzc2lvbiAhPSBudWxsICYmICFyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHBvcHVwX2J1dHRvbnNbYl0udGV4dCldLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQxID0gcG9wdXBfYnV0dG9uc1tiXS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZF9taXNzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZWRyYXcgdyBwcmVzc2VkIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG10ID0gbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1kID0gbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS5nZXRfZGVzYygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChtdCArIFwiXFxuXCIgKyBtZCwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9wdXBfYnV0dG9uc1tiXS50ZXh0ICE9IHNlbGVjdGVkMSAmJiAhcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBwb3B1cF9idXR0b25zW2JdLnRleHQpXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMiA9IHBvcHVwX2J1dHRvbnNbYl0udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyc3Q6IFwiICsgc2VsZWN0ZWQxKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlY29uZDogXCIgKyBzZWxlY3RlZDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZDEgIT0gbnVsbCAmJiBzZWxlY3RlZDIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVHdvIGNoYXJhY3RlcnMgc2VsZWN0ZWQuIEFzc3NpZ25pbmcgbWlzc2lvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUaXRsZTogXCIrIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0udGl0bGUgKyBcIlxcbkRlc2M6IFwiICsgbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS5kZXNjKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYXNzaWduIG1pc3Npb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS5hc3NpZ24oc2VsZWN0ZWQxLCBzZWxlY3RlZDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZpbGwgbmV3IHRleHQgb24gcG9wdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wb3AuZGlzbWlzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmlzX29wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic3RpbGwgaW4gaWZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5maWxsX3BvcHVwKFwiU2VuZGluZyBcIiArIHNlbGVjdGVkMSArIFwiIGFuZCBcIiArIHNlbGVjdGVkMiArIFwiIG9uIHRoZSBtaXNzaW9uLlwiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRfbG9nLnB1c2goXCJTZW50IFwiICsgc2VsZWN0ZWQxICsgXCIgYW5kIFwiICsgc2VsZWN0ZWQyICsgXCIgb246IFwiICsgbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF9taXNzaW9uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wYXNzIHRpbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGVfdGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2xvc2UgcG9wdXBcIik7XHJcbiAgICAgICAgICAgIHBvcC5pc19vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHBvcC5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgIC8vc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgICAgICAgICAgLy9zZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICAvL3NlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgICAgICAvL3BvcC5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy9jb25zdHJ1Y3QgcG9wdXAuIE1heWJlIG1ha2UgaXQgb2JqZWN0PyBcclxuZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICAvL3RoaW5ncyB0byBvbmx5IGRvIG9uZSB0aW1lLlxyXG4gICAgcHJlbG9hZF9pbWcoKTtcclxuICAgIGNyZWF0ZV9sb2NhdGlvbnMoKTtcclxuICAgIGNyZWF0ZV9yb3N0ZXIoKTtcclxuICAgIGNyZWF0ZV9taXNzaW9ucygpO1xyXG4gICAgY3JlYXRlX2J1dHRvbnMoKTtcclxuICAgIHN0YXJ0X3NjcmVlbigpO1xyXG4gICAgLy9kcmF3X2NhbnZhcygpOyAvL2dldCByaWQgb2YgdGhpcyB3aGVuIHJlZW5hYmxlIHN0YXJ0IHNjcmVlblxyXG4gICAgdmFyIGludHR0dklEID0gd2luZG93LnNldFRpbWVvdXQoc3RhcnRfc2NyZWVuX2tpbGwsIDE1MDApO1xyXG4gICAgdmFyIGludHR0dHR2SUQgPSB3aW5kb3cuc2V0VGltZW91dChkcmF3X2NhbnZhcywgMTUwMCk7XHJcbiAgICB0ZXh0X2ZpeCgpO1xyXG5cclxufVxyXG4vL3ZpbGxhbmVsbGUgc3R1ZmZcclxuLy9mdW5jdGlvbiByZWZlcmVuY2VkIGZyb206IGh0dHBzOi8vd3d3LnczcmVzb3VyY2UuY29tL2phdmFzY3JpcHQtZXhlcmNpc2VzL2phdmFzY3JpcHQtYXJyYXktZXhlcmNpc2UtMTcucGhwXHJcbmZ1bmN0aW9uIGdldF9yYW5kb21fY2hhcl9saXN0KCkge1xyXG4gICAgdmFyIGxlbiA9IHJvc3Rlci5sZW5ndGg7XHJcbiAgICB2YXIgdGVtcDtcclxuICAgIHZhciBpbmRleDtcclxuXHJcbiAgICB3aGlsZSAobGVuID4gMCkge1xyXG4gICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKTtcclxuICAgICAgICBsZW4tLTtcclxuICAgICAgICB0ZW1wID0gcm9zdGVyW2xlbl1cclxuICAgICAgICByb3N0ZXJbbGVuXSA9IHJvc3RlcltpbmRleF1cclxuICAgICAgICByb3N0ZXJbaW5kZXhdID0gdGVtcDtcclxuICAgIH1cclxuICAgIC8vY29uc29sZS5sb2cocm9zdGVyKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJoaWdoZXN0IGFmZjogXCIgKyBnZXRfY2hhcl90b19yYWlzZV9hZmZpbml0eShyb3N0ZXJbMF0pLm5hbWUpO1xyXG4gICAgLy9zdGFydCBhY3Rpb25zOlxyXG59XHJcbmZ1bmN0aW9uIHNlbGVjdF9hY3Rpb24oYykge1xyXG4gICAgLy9zd2l0Y2ggc3RhdGVtZW50XHJcbiAgICBjb25zb2xlLmxvZyhjLm5hbWUgKyBcIiBzZWxlY3RpbmcgYWN0aW9uLi4uXCIpO1xyXG4gICAgc3dpdGNoIChjLm5hbWUpIHtcclxuICAgICAgICBjYXNlIFwiTWluXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyksIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKV0pO1xyXG4gICAgICAgIGNhc2UgXCJMYW5kb2xcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIkhvcnN0XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKV0pO1xyXG4gICAgICAgIGNhc2UgXCJSb3J5XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyksIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKV0pO1xyXG4gICAgICAgIGNhc2UgXCJEYW50aFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKTtcclxuICAgIH1cclxuICAgIC8vcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSlcclxufVxyXG5mdW5jdGlvbiBnZXRfY2hhcl90b19yYWlzZV9hZmZpbml0eShjKSB7XHJcbiAgICAvL2ZpbmQgdGhlIGNoYXJhY3RlciB3aXRoIHRoZSBoaWdoZXN0IGFmZmluaXR5IHRoYXQgaXMgTk9UIDEwIGFuZCBOT1Qgb2NjdXBpZWRcclxuICAgIHZhciBoaWdoZXN0ID0gbnVsbDtcclxuICAgIHZhciBoaWdoZXN0X2FmZiA9IC0xO1xyXG4gICAgZm9yICh2YXIgY2ggaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJvc3RlcltjaF0pO1xyXG4gICAgICAgIHZhciBjb21wID0gcm9zdGVyW2NoXTtcclxuICAgICAgICBpZiAoY29tcC5uYW1lICE9IGMubmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIWNvbXAuaXNfb2NjdXBpZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjLmFmZmluaXR5W2NvbXAubmFtZV0gPCAxMCAmJiBjLmFmZmluaXR5W2NvbXAubmFtZV0gPj0gaGlnaGVzdF9hZmYpIHtcclxuICAgICAgICAgICAgICAgICAgICBoaWdoZXN0ID0gY29tcDtcclxuICAgICAgICAgICAgICAgICAgICBoaWdoZXN0X2FmZiA9IGMuYWZmaW5pdHlbY29tcC5uYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGMubmFtZSArIFwiJ3MgaGlnaGVzdCBhZmZpbml0eSBpcyB3aXRoIFwiICsgaGlnaGVzdC5uYW1lKTtcclxuICAgIHJldHVybiBoaWdoZXN0O1xyXG59XHJcbi8vQ0hFQ0sgU1BPVCBERUNcclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYykge1xyXG4gICAgbGV0IHRyYWluX3N0ciA9IGFjdGlvbihcclxuICAgICAgICAoKSA9PiAhbG9jYXRpb25zW1wic3RyXCJdLmFzc2lnbmVkICYmIGMuc3RhdHNbXCJzdHJcIl0gPCAxMCAmJiAhYy5pc19vY2N1cGllZCAmJiAhYy5pc19vbl9taXNzaW9uLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGV4dF9sb2cucHVzaChjLm5hbWUgKyBcIiBpcyB0cmFpbmluZyBzdHIuXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy9pbmNyZWFzZSBzdGF0XHJcbiAgICAgICAgICAgIGMuaW5jcmVhc2Vfc3RhdChcInN0clwiLCAxKTtcclxuICAgICAgICAgICAgLy9zZXQgYydzIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwic3RyXCIpO1xyXG5cclxuICAgICAgICB9LCAwXHJcbiAgICApXHJcblxyXG4gICAgcmV0dXJuIHRyYWluX3N0cjtcclxufVxyXG5mdW5jdGlvbiBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiaW50IGxvYzogXCIgKyBpbnRfY29uZCk7XHJcbiAgICBsZXQgdHJhaW5faW50ID0gYWN0aW9uKFxyXG4gICAgICAgICgpID0+ICFsb2NhdGlvbnNbXCJpbnRcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1tcImludFwiXSA8IDEwICYmICFjLmlzX29jY3VwaWVkICYmICFjLmlzX29uX21pc3Npb24sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKGMubmFtZSArIFwiIGlzIHRyYWluaW5nIGludC5cIik7XHJcbiAgICAgICAgICAgIC8vc2V0IGxvY2F0aW9uIGFzc2lnbmVkXHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcImludFwiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL2luY3JlYXNlIHN0YXRcclxuICAgICAgICAgICAgYy5pbmNyZWFzZV9zdGF0KFwiaW50XCIsIDEpO1xyXG4gICAgICAgICAgICAvL3NldCBjJ3MgbG9jYXRpb25cclxuICAgICAgICAgICAgYy5zZXRfbG9jYXRpb24oXCJpbnRcIik7XHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHRyYWluX2ludDtcclxufVxyXG5mdW5jdGlvbiBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKSB7XHJcbiAgICAvL3ZhciBtYWdfY29uZCA9ICFsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1snbWFnJ10gPCAxMCAmJiAhYy5pc19vY2N1cGllZDtcclxuICAgIGxldCB0cmFpbl9tYWcgPSBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gIWxvY2F0aW9uc1tcIm1hZ1wiXS5hc3NpZ25lZCAmJiBjLnN0YXRzW1wibWFnXCJdIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQgJiYgIWMuaXNfb25fbWlzc2lvbixcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWFnX2NvbmQpOyAgICBcclxuICAgICAgICAgICAgdGV4dF9sb2cucHVzaChjLm5hbWUgKyBcIiBpcyB0cmFpbmluZyBtYWcuXCIpO1xyXG4gICAgICAgICAgICAvL3NldCBsb2NhdGlvbiBhc3NpZ25lZFxyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy9pbmNyZWFzZSBzdGF0XHJcbiAgICAgICAgICAgIGMuaW5jcmVhc2Vfc3RhdChcIm1hZ1wiLCAxKTtcclxuICAgICAgICAgICAgLy9zZXQgYydzIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwibWFnXCIpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGMpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGxvY2F0aW9uc1tcIm1hZ1wiXSk7XHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHRyYWluX21hZztcclxufVxyXG5mdW5jdGlvbiBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpIHtcclxuICAgIGxldCByYWlzZV9hZmZpbml0eSA9IGFjdGlvbihcclxuICAgICAgICAoKSA9PiAhbG9jYXRpb25zW1wiYWZmaW5pdHkxXCJdLmFzc2lnbmVkICYmICFsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0uYXNzaWduZWQgJiYgIWMuaXNfb2NjdXBpZWQsXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgYzIgPSBnZXRfY2hhcl90b19yYWlzZV9hZmZpbml0eShjKTsgLy90aGlzIGlzIGNoYXJhY3RlciBvYmouIFNob3VsZCBiZSB1bm9jY3VwaWVkIHcgbGVzcyB0aGFuIDEwIGFmZlxyXG4gICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKGMubmFtZSArIFwiIGlzIHJhaXNpbmcgYWZmaW5pdHkgd2l0aCBcIiArIGMyLm5hbWUgKyBcIi5cIik7XHJcbiAgICAgICAgICAgIC8vc2V0IGxvY2F0aW9uIGFzc2lnbmVkXHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MVwiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MlwiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vaW5jcmVhc2UgYWZmaW5pdHkgd2l0aCB0aGVtXHJcbiAgICAgICAgICAgIGMuaW5jcmVhc2VfYWZmaW5pdHkoYzIpO1xyXG4gICAgICAgICAgICBjMi5pbmNyZWFzZV9hZmZpbml0eShjKTtcclxuXHJcbiAgICAgICAgICAgIC8vc2V0IGJvdGggdG8gb2NjdXBpZWRcclxuICAgICAgICAgICAgYy5pc19vY2N1cGllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGMyLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy9zZXQgYm90aCcgbG9jYXRpb25cclxuICAgICAgICAgICAgYy5zZXRfbG9jYXRpb24oXCJhZmZpbml0eTFcIik7XHJcbiAgICAgICAgICAgIGMyLnNldF9sb2NhdGlvbihcImFmZmluaXR5MlwiKTtcclxuICAgICAgICB9LCAwXHJcbiAgICApXHJcbiAgICByZXR1cm4gcmFpc2VfYWZmaW5pdHk7XHJcbn1cclxuLy9UT0RPXHJcbi8vW3hdIGJ1dHRvbiBvbiBwb3AgdXAuXHJcblxyXG4vL0Z1dHVyZSBJbXByb3ZlbWVudHM6XHJcbi8vSW1wcm92ZWQgVUlcclxuLy9DaGFyYWN0ZXIgZGlhbG9ndWVcclxuLy9DaGFyYWN0ZXJzIHRyYWluaW5nIHRvZ2V0aGVyXHJcbi8vTWlzc2lvbnMgaGF2aW5nIGEgd2F5IHRvIHdpbiB3aXRoIGFmZmluaXR5XHJcbiIsImltcG9ydCBRdWV1ZSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9RdWV1ZVwiO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XHJcblxyXG5leHBvcnQgZW51bSBTdGF0dXMge1xyXG4gICAgUlVOTklORyxcclxuICAgIFNVQ0NFU1MsXHJcbiAgICBGQUlMVVJFXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlcm1pbmF0ZUFuZFJldHVybihpZDogbnVtYmVyLCBibGFja2JvYXJkOiBhbnksIHN0YXR1czogU3RhdHVzKSB7XHJcbiAgICBkZWxldGUgYmxhY2tib2FyZFtpZF07XHJcbiAgICByZXR1cm4gc3RhdHVzO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBFZmZlY3QgPSAoKSA9PiB2b2lkXHJcbmV4cG9ydCB0eXBlIFByZWNvbmRpdGlvbiA9ICgpID0+IGJvb2xlYW5cclxuZXhwb3J0IHR5cGUgVGljayA9ICgpID0+IFN0YXR1c1xyXG5leHBvcnQgdHlwZSBBY3Rpb25UaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcikgPT4gVGlja1xyXG4vKipcclxuICogVGhlIGd1YXJkIHRpY2sgaXMgdG8gYWRkIGEgcHJlY29uZGl0aW9uIHRvIHRoZSBjb21wb3NpdGUgdGlja3NcclxuICovXHJcbmV4cG9ydCB0eXBlIEd1YXJkVGljayA9IChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljaywgbmVnYXRlPzogYm9vbGVhbikgPT4gVGlja1xyXG4vKipcclxuICogU2VxdWVuY2UvU2VsZWN0b3JcclxuICovXHJcbmV4cG9ydCB0eXBlIENvbXBvc2l0ZVRpY2sgPSAoYXN0VGlja3M6IFRpY2tbXSkgPT4gVGlja1xyXG5cclxudmFyIGJsYWNrYm9hcmQgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGdldEFjdGlvblRpY2soaWQ6IG51bWJlcik6IEFjdGlvblRpY2sge1xyXG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZCA9IDEpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJlY29uZGl0aW9uKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUtLTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuRkFJTFVSRTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0R3VhcmRUaWNrKCk6IEd1YXJkVGljayB7XHJcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgYXN0VGljaywgbmVnYXRlID0gZmFsc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvY2VlZCA9IG5lZ2F0ZSA/ICFwcmVjb25kaXRpb24oKSA6IHByZWNvbmRpdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvY2VlZCA/IGV4ZWN1dGUoYXN0VGljaykgOiBTdGF0dXMuRkFJTFVSRTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlcXVlbmNlVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XHJcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5TVUNDRVNTKVxyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlbGVjdG9yVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XHJcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5TVUNDRVNTKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlKGFzdFRpY2s6IFRpY2spOiBTdGF0dXMge1xyXG4gICAgcmV0dXJuIGFzdFRpY2soKTtcclxufVxyXG5cclxudmFyIGdsb2JhbElkQ291bnRlciA9IDA7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0aW9uKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcik6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEFjdGlvblRpY2soZ2xvYmFsSWRDb3VudGVyKyspKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmVnX2d1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gc3VjY2VzcyBvZiBhIGNoaWxkXHJcbiAqIFN1Y2NlZWRzIGlmIGFsbCBzdWNjZWVkLCBlbHNlIGZhaWxzXHJcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xyXG4gKiBAcmV0dXJucyB7VGlja31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShhc3RUaWNrczogVGlja1tdKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0U2VxdWVuY2VUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIGZhaWx1cmUgb2YgYSBjaGlsZCh0aGluayBvZiBpdCBhcyBpZi1lbHNlIGJsb2NrcylcclxuICogU3VjY2VlZHMgaWYgZXZlbiBvbmUgc3VjY2VlZHMsIGVsc2UgZmFpbHNcclxuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXHJcbiAqIEByZXR1cm5zIHtUaWNrfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdG9yKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRTZWxlY3RvclRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcclxufVxyXG5cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tIEFQSXMgLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4vLzAuIHV0aWxpdGllc1xyXG4vLyBtaW4gYW5kIG1heCBhcmUgaW5jbHVzaXZlXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kTnVtYmVyKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxufVxyXG5cclxuLy8xLiBzdG9yeSBpbnN0YW5jZVxyXG5cclxuLy8xLjEgbG9jYXRpb25zXHJcbnZhciBsb2NhdGlvbkdyYXBoID0ge307XHJcblxyXG4vL2FkZCB0byBib3RoIHNpZGVzXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMb2NhdGlvbihsb2NhdGlvbk5hbWU6IHN0cmluZywgYWRqYWNlbnRMb2NhdGlvbnM6IHN0cmluZ1tdKSB7XHJcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID09IHVuZGVmaW5lZClcclxuICAgICAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBbXTtcclxuICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXS5jb25jYXQoYWRqYWNlbnRMb2NhdGlvbnMpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnRMb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9IFtdO1xyXG5cclxuICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXS5wdXNoKGxvY2F0aW9uTmFtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcmVBZGphY2VudChsb2NhdGlvbjE6IHN0cmluZywgbG9jYXRpb24yOiBzdHJpbmcpOmJvb2xlYW4ge1xyXG4gICAgY29uc29sZS5sb2coXCJBcmUgYWRqYWNlbnQ6IFwiICsgbG9jYXRpb24xICsgXCIsIFwiK2xvY2F0aW9uMik7XHJcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdID09IHVuZGVmaW5lZCB8fCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMl0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVpdGhlciBvbmUvYm90aCBsb2NhdGlvbnMgdW5kZWZpbmVkXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV1baV0gPT0gbG9jYXRpb24yKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG4vL3BhdGhmaW5kaW5nIHByaW1pdGl2ZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRMb2NhdGlvbihzdGFydDogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHZhciB2aXNpdGVkID0ge307XHJcbiAgICB2YXIgcHJldmlvdXMgPSB7fTtcclxuICAgIGZvciAodmFyIGtleSBpbiBsb2NhdGlvbkdyYXBoKSB7XHJcbiAgICAgICAgdmlzaXRlZFtrZXldID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2aXNpdGVkW3N0YXJ0XSA9IHRydWU7XHJcblxyXG4gICAgdmFyIG15UXVldWUgPSBuZXcgUXVldWU8c3RyaW5nPigpO1xyXG4gICAgbXlRdWV1ZS5lbnF1ZXVlKHN0YXJ0KTtcclxuXHJcbiAgICB3aGlsZSAoIW15UXVldWUuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IG15UXVldWUuZGVxdWV1ZSgpO1xyXG4gICAgICAgIGlmIChjdXJyZW50ID09PSBkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IGxvY2F0aW9uR3JhcGhbY3VycmVudF07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdmlzaXRlZFtuZWlnaGJvcnNbaV1dKSB7XHJcbiAgICAgICAgICAgICAgICBteVF1ZXVlLmVucXVldWUobmVpZ2hib3JzW2ldKTtcclxuICAgICAgICAgICAgICAgIHZpc2l0ZWRbbmVpZ2hib3JzW2ldXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1tuZWlnaGJvcnNbaV1dID0gY3VycmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgY3VycmVudDogc3RyaW5nID0gZGVzdGluYXRpb247XHJcbiAgICBpZiAoY3VycmVudCA9PSBzdGFydClcclxuICAgICAgICByZXR1cm4gY3VycmVudDtcclxuICAgIHdoaWxlIChwcmV2aW91c1tjdXJyZW50XSAhPSBzdGFydCkge1xyXG4gICAgICAgIGN1cnJlbnQgPSBwcmV2aW91c1tjdXJyZW50XTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuLy8xLjIgYWdlbnRzXHJcbnZhciBhZ2VudHMgPSBbXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRBZ2VudChhZ2VudE5hbWU6IHN0cmluZykge1xyXG4gICAgYWdlbnRzLnB1c2goYWdlbnROYW1lKTtcclxuICAgIHJldHVybiBhZ2VudE5hbWU7XHJcbn1cclxuXHJcbi8vMS4zIGl0ZW1zXHJcbnZhciBpdGVtcyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEl0ZW0oaXRlbU5hbWU6IHN0cmluZykge1xyXG4gICAgaXRlbXMucHVzaChpdGVtTmFtZSk7XHJcbiAgICByZXR1cm4gaXRlbU5hbWU7XHJcbn1cclxuXHJcbi8vMS40IHZhcmlhYmxlc1xyXG52YXIgdmFyaWFibGVzID0ge307XHJcbnZhciBhZ2VudFZhcmlhYmxlcyA9IHt9O1xyXG52YXIgaXRlbVZhcmlhYmxlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhcmlhYmxlKHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgdmFyaWFibGVzW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFyTmFtZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSlcclxuICAgICAgICBhZ2VudFZhcmlhYmxlc1thZ2VudF0gPSB7fTtcclxuXHJcbiAgICBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlKHZhck5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgbm90IHNldCFcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhcmlhYmxlc1t2YXJOYW1lXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgYWdlbnQgXCIgKyBhZ2VudCArIFwiIG5vdCBzZXQhXCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFyaWFibGVOb3RTZXQodmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQWdlbnRWYXJpYWJsZU5vdFNldChhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSlcclxuICAgICAgICBpdGVtVmFyaWFibGVzW2l0ZW1dID0ge307XHJcblxyXG4gICAgaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbVZhcmlhYmxlKGl0ZW06IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkgfHwgaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBpdGVtIFwiICsgaXRlbSArIFwiIG5vdCBzZXQhXCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV07XHJcbn1cclxuXHJcblxyXG4vLzJcclxuLy9hZ2VudC1iZWhhdmlvciB0cmVlIG1hcHBpbmdcclxudmFyIGFnZW50VHJlZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hUcmVlVG9BZ2VudChhZ2VudDogc3RyaW5nLCB0cmVlOiBUaWNrKSB7XHJcbiAgICBhZ2VudFRyZWVzW2FnZW50XSA9IHRyZWU7XHJcbn1cclxuXHJcbi8vMy4xXHJcbi8vdXNlciBhY3Rpb25zXHJcbi8vVE9ETyBhZGQgdmFyaWFibGVzIHRvIHVzZXIgYWN0aW9uIHRleHRzXHJcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSB7XHJcbiAgICB0ZXh0OiBcIlwiLFxyXG4gICAgdXNlckFjdGlvbnNUZXh0OiBbXSxcclxuICAgIGFjdGlvbkVmZmVjdHNUZXh0OiBcIlwiXHJcbn1cclxudmFyIHVzZXJJbnRlcmFjdGlvblRyZWVzID0gW107XHJcbnZhciB1c2VyQWN0aW9ucyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKSB7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCA9IFwiXCI7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0ID0gW107XHJcbiAgICB1c2VyQWN0aW9ucyA9IHt9Oy8ve1wiR28gdG8gbG9jYXRpb24gWFwiIDogZWZmZWN0XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzZXJJbnRlcmFjdGlvblRyZWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZXhlY3V0ZSh1c2VySW50ZXJhY3Rpb25UcmVlc1tpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uID0gKHRleHQ6IHN0cmluZykgPT5cclxuICAgIGFjdGlvbihcclxuICAgICAgICAoKSA9PiB0cnVlLFxyXG4gICAgICAgICgpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ICs9IFwiXFxuXCIgKyB0ZXh0LCAwXHJcbiAgICApO1xyXG5leHBvcnQgbGV0IGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ICs9IFwiXFxuXCIgKyB0ZXh0O1xyXG5cclxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uVHJlZSA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdFRyZWU6IFRpY2spID0+IGFjdGlvbihcclxuICAgICgpID0+IHRydWUsXHJcbiAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGVmZmVjdFRyZWUpLCAwXHJcbik7XHJcblxyXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb24gPSAodGV4dDogc3RyaW5nLCBlZmZlY3Q6ICgpID0+IGFueSkgPT5cclxuICAgIGFjdGlvbihcclxuICAgICAgICAoKSA9PiB0cnVlLFxyXG4gICAgICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgYWN0aW9uKCgpPT50cnVlLCBlZmZlY3QsIDApKSwgMFxyXG4gICAgKTtcclxuXHJcbmZ1bmN0aW9uIG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dDogc3RyaW5nLCB0cmVlOiBUaWNrKSB7XHJcbiAgICB1c2VyQWN0aW9uc1t0ZXh0XSA9IHRyZWU7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0LnB1c2godGV4dCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRpY2s6IFRpY2spIHtcclxuICAgIHVzZXJJbnRlcmFjdGlvblRyZWVzLnB1c2godGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlVXNlckFjdGlvbih0ZXh0OiBzdHJpbmcpIHtcclxuICAgIC8vZXhlY3V0ZSB0aGUgdXNlciBhY3Rpb25cclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCA9IFwiXCI7XHJcbiAgICB2YXIgdXNlckFjdGlvbkVmZmVjdFRyZWUgPSB1c2VyQWN0aW9uc1t0ZXh0XTtcclxuICAgIGV4ZWN1dGUodXNlckFjdGlvbkVmZmVjdFRyZWUpO1xyXG59XHJcblxyXG4vLzQuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpIHtcclxuICAgIHJldHVybiB1c2VySW50ZXJhY3Rpb25PYmplY3Q7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X3JhbmRvbV9hZ2VudF9saXN0KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJyYW5kb21pemluZ1wiKTtcclxuICAgIHZhciBsZW4gPSBhZ2VudHMubGVuZ3RoO1xyXG4gICAgdmFyIHRlbXA7XHJcbiAgICB2YXIgaW5kZXg7XHJcblxyXG4gICAgd2hpbGUgKGxlbiA+IDApIHtcclxuICAgICAgICBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlbik7XHJcbiAgICAgICAgbGVuLS07XHJcbiAgICAgICAgdGVtcCA9IGFnZW50c1tsZW5dXHJcbiAgICAgICAgYWdlbnRzW2xlbl0gPSBhZ2VudHNbaW5kZXhdXHJcbiAgICAgICAgYWdlbnRzW2luZGV4XSA9IHRlbXA7XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKHJvc3Rlcik7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiaGlnaGVzdCBhZmY6IFwiICsgZ2V0X2NoYXJfdG9fcmFpc2VfYWZmaW5pdHkocm9zdGVyWzBdKS5uYW1lKTtcclxuICAgIC8vc3RhcnQgYWN0aW9uczpcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gd29ybGRUaWNrKCkge1xyXG4gICAgLy9hbGwgYWdlbnQgdGlja3NcclxuICAgIC8vY29uc29sZS5sb2coXCJJbiB3b3JsZCB0aWNrXCIpO1xyXG4gICAgLy9yYW5kb21pemUgYWdlbnRzXHJcbiAgICBnZXRfcmFuZG9tX2FnZW50X2xpc3QoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWdlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRyZWUgPSBhZ2VudFRyZWVzW2FnZW50c1tpXV07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0cmVlKTtcclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XHJcbiAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiZXhlY3V0aW5nQWdlbnRcIiwgYWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgZXhlY3V0ZSh0cmVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xyXG59Il19
