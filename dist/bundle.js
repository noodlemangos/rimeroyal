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
        text_log.push("Mission: " + this.title + '<span style="color: #228B22"> was successful!<br></span>' + roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.win_txt);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2d1aWxkLmpzIiwic3JjL3NjcmlwdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUlBLHlDQU1xQjtBQUNyQiw0QkFBNEI7QUFDNUIsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDOUIsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO0FBQ25CLElBQUksTUFBTSxH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O0lBQ25ELG1EQUFtRDtJQUNuRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdELE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELDRCQUE0QjtJQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNsRSxDQUFDO0FBQ0Q7SUFDSSxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUM1QixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsSUFBSSxHQUFHLHVCQUF1QixDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzVCLHNGQUFzRjtJQUN0Rix1RkFBdUY7SUFDdkYsb0dBQW9HO0lBQ3BHLDRCQUE0QjtBQUdoQyxDQUFDO0FBQ0Q7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtJQUMzRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNwRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNsRixLQUFLLElBQUksQ0FBQyxJQUFJLE1BQU0sRUFBRTtRQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxhQUFhO1FBQzFDLG9CQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsNkJBQTZCO1FBQ3ZE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QUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDeEI7SUFDRCxzQkFBc0I7SUFDdEIsNEVBQTRFO0lBQzVFLGdCQUFnQjtBQUNwQixDQUFDO0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIsK0JBQStCO0lBQy9CLGtCQUFrQjtJQUNsQixxQkFBcUIsRUFBRSxDQUFDO0lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLGtCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBZEQsOEJBY0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBhcnJheXMgPSByZXF1aXJlKFwiLi9hcnJheXNcIik7XHJcbnZhciBMaW5rZWRMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAqIENyZWF0ZXMgYW4gZW1wdHkgTGlua2VkIExpc3QuXHJcbiAgICAqIEBjbGFzcyBBIGxpbmtlZCBsaXN0IGlzIGEgZGF0YSBzdHJ1Y3R1cmUgY29uc2lzdGluZyBvZiBhIGdyb3VwIG9mIG5vZGVzXHJcbiAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxyXG4gICAgKiBAY29uc3RydWN0b3JcclxuICAgICovXHJcbiAgICBmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdFxyXG4gICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBMYXN0IG5vZGUgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBOdW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgYWRkZWQuXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyPX0gaW5kZXggb3B0aW9uYWwgaW5kZXggdG8gYWRkIHRoZSBlbGVtZW50LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWRcclxuICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGFkZGVkIG9yIGZhbHNlIGlmIHRoZSBpbmRleCBpcyBpbnZhbGlkXHJcbiAgICAqIG9yIGlmIHRoZSBlbGVtZW50IGlzIHVuZGVmaW5lZC5cclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpbmRleCkpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubkVsZW1lbnRzIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShpdGVtKTtcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBGaXJzdCBub2RlIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5uRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUubmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyBDaGFuZ2UgZmlyc3Qgbm9kZS5cclxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gcHJldi5uZXh0O1xyXG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5FbGVtZW50cysrO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cclxuICAgICogQHJldHVybiB7Kn0gdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXHJcbiAgICAqIGVtcHR5LlxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cclxuICAgICogQHJldHVybiB7Kn0gdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcclxuICAgICogZW1wdHkuXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5sYXN0Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBkZXNpcmVkIGluZGV4LlxyXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcclxuICAgICAqIG91dCBvZiBib3VuZHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4KTtcclxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZS5lbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZVxyXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxyXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIGxpc3QgYXJlXHJcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxyXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgKlxyXG4gICAgICogPHByZT5cclxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcclxuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgKiB9XHJcbiAgICAgKiA8L3ByZT5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXHJcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2VcclxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXHJcbiAgICAgKiBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICAgICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcclxuICAgICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAgICpcclxuICAgICAgICogPHByZT5cclxuICAgICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xyXG4gICAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICAgKiB9XHJcbiAgICAgICAqIDwvcHJlPlxyXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXHJcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXHJcbiAgICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cclxuICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBmYWxzZVxyXG4gICAgICAgKiBvdGhlcndpc2UuXHJcbiAgICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuaW5kZXhPZihpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxyXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XHJcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICogfVxyXG4gICAgICogPC9wcmU+XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpc3QsIGlmIHByZXNlbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBsaXN0IGNvbnRhaW5lZCB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA8IDEgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzLS07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnROb2RlO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXHJcbiAgICAgKiBUd28gbGlzdHMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBvcmRlci5cclxuICAgICAqIEBwYXJhbSB7TGlua2VkTGlzdH0gb3RoZXIgdGhlIG90aGVyIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxyXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLiBJZiB0aGUgZWxlbWVudHMgaW4gdGhlIGxpc3RzXHJcbiAgICAgKiBhcmUgY3VzdG9tIG9iamVjdHMgeW91IHNob3VsZCBwcm92aWRlIGEgZnVuY3Rpb24sIG90aGVyd2lzZVxyXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcUYgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICAgICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBMaW5rZWRMaXN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXIuc2l6ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxzQXV4KHRoaXMuZmlyc3ROb2RlLCBvdGhlci5maXJzdE5vZGUsIGVxRik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzQXV4ID0gZnVuY3Rpb24gKG4xLCBuMiwgZXFGKSB7XHJcbiAgICAgICAgd2hpbGUgKG4xICE9PSBudWxsICYmIG4yICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xyXG4gICAgICAgICAgICBuMiA9IG4yLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBnaXZlbiBpbmRleC5cclxuICAgICAqIEByZXR1cm4geyp9IHJlbW92ZWQgZWxlbWVudCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzIG91dCBvZiBib3VuZHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cyB8fCB0aGlzLmZpcnN0Tm9kZSA9PT0gbnVsbCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbGVtZW50O1xyXG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMSkge1xyXG4gICAgICAgICAgICAvL0ZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzLm5leHQgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSBudWxsICYmIHByZXZpb3VzLm5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwcmV2aW91cy5uZXh0LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gcHJldmlvdXMubmV4dC5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzLS07XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXHJcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soY3VycmVudE5vZGUuZWxlbWVudCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxyXG4gICAgICogZWxlbWVudCBmaXJzdCwgYW5kIHRoZSBmaXJzdCBlbGVtZW50IGxhc3QpLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGVtcCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgY3VycmVudCA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXAgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMubGFzdE5vZGU7XHJcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXHJcbiAgICAgKiBzZXF1ZW5jZS5cclxuICAgICAqIEByZXR1cm4ge0FycmF5LjwqPn0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCxcclxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XHJcbiAgICB9O1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5cy50b1N0cmluZyh0aGlzLnRvQXJyYXkoKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5ub2RlQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gKHRoaXMubkVsZW1lbnRzIC0gMSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleCAmJiBub2RlICE9IG51bGw7IGkrKykge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IGl0ZW0sXHJcbiAgICAgICAgICAgIG5leHQ6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBMaW5rZWRMaXN0O1xyXG59KCkpOyAvLyBFbmQgb2YgbGlua2VkIGxpc3RcclxuZXhwb3J0cy5kZWZhdWx0ID0gTGlua2VkTGlzdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgTGlua2VkTGlzdF8xID0gcmVxdWlyZShcIi4vTGlua2VkTGlzdFwiKTtcclxudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IHF1ZXVlLlxyXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcclxuICAgICAqIGVsZW1lbnQgYWRkZWQgdG8gdGhlIHF1ZXVlIHdpbGwgYmUgdGhlIGZpcnN0IG9uZSB0byBiZSByZW1vdmVkLiBUaGlzXHJcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiB1c2VzIGEgbGlua2VkIGxpc3QgYXMgYSBjb250YWluZXIuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUXVldWUoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBhbmQgcmVtb3ZlcyB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBzdGFjayBhcmVcclxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciwgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxyXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgKlxyXG4gICAgICogPHByZT5cclxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSAocGV0MSwgcGV0Mikge1xyXG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAqIH1cclxuICAgICAqIDwvcHJlPlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcclxuICAgICAqIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LFxyXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoZWxlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhbmQgb25seSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIG5vIGl0ZW1zOyBmYWxzZVxyXG4gICAgICogb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKSA8PSAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBxdWV1ZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubGlzdC5jbGVhcigpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgcXVldWUgaW5cclxuICAgICAqIEZJRk8gb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcclxuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cclxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUXVldWU7XHJcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxyXG5leHBvcnRzLmRlZmF1bHQgPSBRdWV1ZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UXVldWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LjRcclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcclxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXksIG9yIC0xIGlmIG5vdCBmb3VuZC5cclxuICovXHJcbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn1cclxuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5IG9yIC0xIGlmIG5vdCBmb3VuZC5cclxuICovXHJcbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn1cclxuZXhwb3J0cy5sYXN0SW5kZXhPZiA9IGxhc3RJbmRleE9mO1xyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDA7XHJcbn1cclxuZXhwb3J0cy5jb250YWlucyA9IGNvbnRhaW5zO1xyXG4vKipcclxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgY2hhbmdlZCBhZnRlciB0aGlzIGNhbGwuXHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbik7XHJcbiAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXkgZXF1YWxcclxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgd2hvc2UgZnJlcXVlbmN5IGlzIHRvIGJlIGRldGVybWluZWQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheVxyXG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIGZyZXF1ZW5jeShhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgdmFyIGZyZXEgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGZyZXErKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnJlcTtcclxufVxyXG5leHBvcnRzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxyXG4gKiBUd28gYXJyYXlzIGFyZSBjb25zaWRlcmVkIGVxdWFsIGlmIGJvdGggYXJyYXlzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyXHJcbiAqIG9mIGVsZW1lbnRzLCBhbmQgYWxsIGNvcnJlc3BvbmRpbmcgcGFpcnMgb2YgZWxlbWVudHMgaW4gdGhlIHR3b1xyXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBvbmUgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIHRoZSBvdGhlciBhcnJheSB0byBiZSB0ZXN0ZWQgZm9yIGVxdWFsaXR5LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVtZW50cyBpbiB0aGUgYXJyYXlzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSB0d28gYXJyYXlzIGFyZSBlcXVhbFxyXG4gKi9cclxuZnVuY3Rpb24gZXF1YWxzKGFycmF5MSwgYXJyYXkyLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFlcXVhbHMoYXJyYXkxW2ldLCBhcnJheTJbaV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLmVxdWFscyA9IGVxdWFscztcclxuLyoqXHJcbiAqIFJldHVybnMgc2hhbGxvdyBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgdG8gY29weS5cclxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XHJcbiAqL1xyXG5mdW5jdGlvbiBjb3B5KGFycmF5KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XHJcbn1cclxuZXhwb3J0cy5jb3B5ID0gY29weTtcclxuLyoqXHJcbiAqIFN3YXBzIHRoZSBlbGVtZW50cyBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9ucyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gc3dhcCBlbGVtZW50cy5cclxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIHRoZSBpbmRleCBvZiB0aGUgb3RoZXIgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBpcyBkZWZpbmVkIGFuZCB0aGUgaW5kZXhlcyBhcmUgdmFsaWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBzd2FwKGFycmF5LCBpLCBqKSB7XHJcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBhcnJheS5sZW5ndGggfHwgaiA8IDAgfHwgaiA+PSBhcnJheS5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xyXG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcclxuICAgIGFycmF5W2pdID0gdGVtcDtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydHMuc3dhcCA9IHN3YXA7XHJcbmZ1bmN0aW9uIHRvU3RyaW5nKGFycmF5KSB7XHJcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcclxufVxyXG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XHJcbi8qKlxyXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBhcnJheVxyXG4gKiBzdGFydGluZyBmcm9tIGluZGV4IDAgdG8gbGVuZ3RoIC0gMS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xyXG4gKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxyXG4gKi9cclxuZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2spIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGVsZSA9IGFycmF5XzFbX2ldO1xyXG4gICAgICAgIGlmIChjYWxsYmFjayhlbGUpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZm9yRWFjaCA9IGZvckVhY2g7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuZXhwb3J0cy5oYXMgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XHJcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcclxufTtcclxuLyoqXHJcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcclxuICAgIGlmIChhIDwgYikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdENvbXBhcmUgPSBkZWZhdWx0Q29tcGFyZTtcclxuLyoqXHJcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gdGVzdCBlcXVhbGl0eS5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpIHtcclxuICAgIHJldHVybiBhID09PSBiO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdEVxdWFscyA9IGRlZmF1bHRFcXVhbHM7XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XHJcbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnJHMnICsgaXRlbTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAnJG8nICsgaXRlbS50b1N0cmluZygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdFRvU3RyaW5nID0gZGVmYXVsdFRvU3RyaW5nO1xyXG4vKipcclxuKiBKb2lucyBhbGwgdGhlIHByb3BlcmllcyBvZiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBqb2luIHN0cmluZ1xyXG4qL1xyXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcclxuICAgIGlmIChqb2luID09PSB2b2lkIDApIHsgam9pbiA9ICcsJzsgfVxyXG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xyXG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBqb2luO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIHByb3AgKyAnOicgKyBpdGVtW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b3JldCArICd9JztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xyXG4gICAgcmV0dXJuICh0eXBlb2YgZnVuYykgPT09ICdmdW5jdGlvbic7XHJcbn1cclxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgdW5kZWZpbmVkLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xyXG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHN0cmluZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcclxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbn1cclxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xyXG4vKipcclxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoY29tcGFyZUZ1bmN0aW9uKSB8fCAhaXNGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCB2KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oZCwgdikgKiAtMTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucmV2ZXJzZUNvbXBhcmVGdW5jdGlvbiA9IHJldmVyc2VDb21wYXJlRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGVxdWFsIGZ1bmN0aW9uIGdpdmVuIGEgY29tcGFyZSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlVG9FcXVhbHMoY29tcGFyZUZ1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpID09PSAwO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVUb0VxdWFscyA9IGNvbXBhcmVUb0VxdWFscztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCJpbXBvcnQge1xyXG4gICAgYWRkQWdlbnQsIHNldEFnZW50VmFyaWFibGUsIGFkZEl0ZW0sIGFkZExvY2F0aW9uLCBzZXRWYXJpYWJsZSwgZ2V0TmV4dExvY2F0aW9uLCBhY3Rpb24sXHJcbiAgICBnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXHJcbiAgICBpc1ZhcmlhYmxlTm90U2V0LCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24sIGFkZFVzZXJBY3Rpb24sIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUsIGluaXRpYWxpemUsXHJcbiAgICBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QsIGV4ZWN1dGVVc2VyQWN0aW9uLCB3b3JsZFRpY2ssIGF0dGFjaFRyZWVUb0FnZW50LCBzZXRJdGVtVmFyaWFibGUsIGdldEl0ZW1WYXJpYWJsZSxcclxuICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWVcclxufSBmcm9tIFwiLi9zY3JpcHRpbmdcIjtcclxuLy9yZXF1aXJlKFwiLi9zY3JpcHRpbmcudHNcIik7XHJcbnZhciBzdGFydF9zY3JlZW5fYWN0aXZlID0gZmFsc2U7XHJcbnZhciBkYXlfc2NyZWVuX2FjdGl2ZSA9IGZhbHNlO1xyXG5jb25zdCBsYXN0X2RheSA9IDE1XHJcbnZhciByb3N0ZXIgPSBbXTsgLy9saXN0IG9mIGNoYXJhY3RlcnNcclxudmFyIG1pc3Npb25fYm9hcmQgPSBbXTsgLy9saXN0IG9mIG1pc3Npb25zXHJcbnZhciBpbWFnZXMgPSB7fTsgLy9kaWN0aW9uYXJ5IG9mIEltYWdlIG9iamVjdHMuIFxyXG52YXIgY2hhcl9idXR0b25zID0gW107Ly9saXN0IG9mIGJ1dHRvbnNcclxudmFyIG1pc3Npb25fYnV0dG9ucyA9IFtdOyAvL2xpc3Qgb2YgbWlzc2lvbiBidXR0b25zXHJcbnZhciBwb3B1cF9idXR0b25zID0gW107IC8vbGlzdCBvZiBidXR0b25zIGRpc3BsYXllZCBvbiBwb3B1cFxyXG52YXIgbG9jYXRpb25zID0ge307IC8vZGljdCBvZiBsb2NhdGlvbnNcclxuXHJcbnZhciBudW1fbWlzc2lvbnMgPSAwO1xyXG52YXIgbnVtX3N1Y2Nlc3NmdWwgPSAwO1xyXG52YXIgbnVtX2ZhaWxlZCA9IDA7XHJcblxyXG4vL2h0dHBzOi8vaW1ndXIuY29tL2Evam5RODBxOSBidXR0b24gc291cmNlXHJcblxyXG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52XCIpO1xyXG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5jb250ZXh0LmZvbnQgPSBcIjhweCAnUHJlc3MgU3RhcnQgMlAnXCJcclxuLy9jb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcblxyXG52YXIgREVGQVVMVF9DSEFSX1ggPSAxMDBcclxudmFyIERFRkFVTFRfQ0hBUl9ZID0gMTAwXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkgeyBzZXR1cCgpIH07XHJcbi8vZXZlbnRzXHJcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tlZCk7XHJcbi8vcG9wdXBcclxudmFyIHBvcDtcclxuLy9wYXNzIGJ1dHRvblxyXG52YXIgcGFzcztcclxuLy9vayBidXR0b25cclxudmFyIG9rO1xyXG4vL3RpY2s6IDcgZGF5cyB0b3RhbC4gMiB0aWNrcyBwZXIgZGF5IChtb3JuL2V2ZSkuIEV2ZW4gdGlja3MgYXJlIG1vcm5pbmcgPSBuZXcgZGF5XHJcbnZhciBjdXJyZW50X3RpbWUgPSBcIm1vcm5pbmdcIjtcclxudmFyIGN1cnJlbnRfZGF5ID0gMTtcclxuXHJcbnZhciBtYXhfc3RhdCA9IDEwO1xyXG52YXIgbWF4X2FmZmluaXR5ID0gMTA7XHJcblxyXG52YXIgdGV4dF9sb2cgPSBbXCJMb2c6XCIsIFwiWXVrbyEhIE15IHZlcnkgb2xkIGFuZCB2ZXJ5IGJlc3QgZnJpZW5kISBIb3figJl2ZSB5b3UgYmVlbj8gSSBrbm93IHlvdeKAmXJlIHJldGlyZWQsIGJ1dCBjb3VsZCB5b3UgbG9vayBhZnRlciB0aGUgb2zigJkgZ3VpbGQgZm9yIGFib3V0IGEgd2Vlaz8gSSBnb3R0YSBnbyBydW4gYSB2ZXJ5IGltcG9ydGFudCBlcnJhbmQhIEFsbCB5b3UgZ290IHRvIGRvIGlzIGFzc2lnbiBtaXNzaW9ucyBiYXNlZCBvZmYgb2Ygd2hhdOKAmXMgbmVlZGVkIFtTVFJFTkdUSCwgTUFHSUMsIG9yIElOVEVMTElHRU5DRV0hIFdlIHVzZSB0aGUgYnVkZHkgc3lzdGVtIGFyb3VuZCBoZXJlLCBzbyB0d28gcGVvcGxlIGhhdmUgdG8gYmUgYXNzaWduZWQgdG8gZWFjaCBtaXNzaW9uLCBjaGVjayB3aG8gZ2V0cyBhbG9uZyB3aXRoIHdobyBieSBjbGlja2luZyBvbiB0aGVpciBwcm9maWxlcyEgQWZ0ZXIgdGhhdCwgeW91IGNhbiBqdXN0IHVzZSB0aGUgW05FWFRdIGJ1dHRvbiB0byBtb3ZlIG9uIHdpdGggdGhlIGRheS4gVW5hc3NpZ25lZCBhZHZlbnR1cmVycyB3aWxsIGp1c3QgYmUgaGFuZ2luZyBvdXQgYW5kIHRyYWluaW5nIGF0IHRoZSBndWlsZCBoYWxsLiBIYXZlIGZ1biEgVGhhbmtzIGluIGFkdmFuY2UhPGJyPiB+U2hhcnJvIFwiXTtcclxuXHJcbnZhciBzZWxlY3RlZDE7XHJcbnZhciBzZWxlY3RlZDI7IC8vZm9yIHRlc3RpbmcgbWlzc2lvbiBhc3NpZ25tZW50LlxyXG52YXIgc2VsZWN0ZWRfbWlzc2lvbjtcclxuXHJcbmNsYXNzIENoYXJhY3RlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzdGF0cywgc3ByKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnN0YXRzID0geyAnc3RyJzogc3RhdHNbJ3N0ciddLCAnaW50Jzogc3RhdHNbJ2ludCddLCAnbWFnJzogc3RhdHNbJ21hZyddIH1cclxuICAgICAgICB0aGlzLmFmZmluaXR5ID0ge307XHJcbiAgICAgICAgdGhpcy5pc19vY2N1cGllZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbnNbXCJzdGFydFwiXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMubG9jYXRpb24pO1xyXG4gICAgICAgIC8vdGhpcy54ID0gREVGQVVMVF9DSEFSX1g7XHJcbiAgICAgICAgLy90aGlzLnkgPSBERUZBVUxUX0NIQVJfWTtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IGltYWdlc1tzcHJdO1xyXG4gICAgICAgIC8vdGhpcy5jaGFyX2ljb24gPSBjaGFyX2ljb25zW25hbWVdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlX2FmZmluaXR5KCkge1xyXG4gICAgICAgIC8vIGZvciAodmFyIGNoYXIgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgLy8gICAgIC8vY29uc29sZS5sb2coKTtcclxuICAgICAgICAvLyAgICAgaWYgKHJvc3RlcltjaGFyXS5uYW1lICE9IHRoaXMubmFtZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5hZmZpbml0eVtyb3N0ZXJbY2hhcl0ubmFtZV0gPSA0OyAvL2V2ZXJ5b25lIHN0YXJ0cyB3aXRoIDQgYWZmaW5pdHlcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL21heWJlIGRvIHJhbmRvbSBldmVudHVhbGx5XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIk1pblwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHsgXCJMYW5kb2xcIjogMSwgXCJIb3JzdFwiOiA1LCBcIlJvcnlcIjogNCwgXCJEYW50aFwiOiAyIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkxhbmRvbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHsgXCJNaW5cIjogMSwgXCJIb3JzdFwiOiAzLCBcIlJvcnlcIjogMiwgXCJEYW50aFwiOiA1IH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkhvcnN0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmZmluaXR5ID0geyBcIk1pblwiOiA1LCBcIkxhbmRvbFwiOiAzLCBcIlJvcnlcIjogNSwgXCJEYW50aFwiOiAxIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlJvcnlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7IFwiTWluXCI6IDQsIFwiSG9yc3RcIjogNSwgXCJMYW5kb2xcIjogMiwgXCJEYW50aFwiOiAzIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRhbnRoXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmZmluaXR5ID0geyBcIk1pblwiOiAyLCBcIkhvcnN0XCI6IDEsIFwiUm9yeVwiOiAzLCBcIkxhbmRvbFwiOiA1IH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGluY3JlYXNlX2FmZmluaXR5KGNoYXIpIHtcclxuICAgICAgICAvL2ZpbmQgY2hhcmFjdGVyLCBpbmNyZW1lbnQgbnVtYmVyLiBcclxuICAgICAgICBpZiAodGhpcy5uYW1lICE9IGNoYXIubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0rKztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXSA+IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXSA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRlY3JlYXNlX2FmZmluaXR5KGNoYXIpIHtcclxuICAgICAgICBpZiAodGhpcy5uYW1lICE9IGNoYXIubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0tLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbmNyZWFzZV9zdGF0KHN0YXQsIGFtb3VudCkge1xyXG4gICAgICAgIHRoaXMuc3RhdHNbc3RhdF0gKz0gYW1vdW50O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRzW3N0YXRdID4gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0c1tzdGF0XSA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG1vdmUoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgLy9jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNoYXJfaWNvbiwgdGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG4gICAgc3RhdHNfdG9zdHIoKSB7XHJcbiAgICAgICAgdmFyIGFmZl9zdCA9IEpTT04uc3RyaW5naWZ5KHRoaXMuYWZmaW5pdHkpXHJcbiAgICAgICAgdmFyIHN0ID0gdGhpcy5uYW1lICsgXCJcXG5TdHI6IFwiICsgdGhpcy5zdGF0c1tcInN0clwiXSArIFwiXFxuTWFnOiBcIiArIHRoaXMuc3RhdHNbXCJtYWdcIl0gKyBcIlxcbkludDogXCIgKyB0aGlzLnN0YXRzW1wiaW50XCJdICsgXCJcXG5BZmZpbml0eTpcIiArIFwiXFxuXCIgKyBhZmZfc3QgKyBcIlxcblN0YXR1czpcIjtcclxuICAgICAgICAvL1dJUFxyXG4gICAgICAgIGlmICh0aGlzLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgc3QgKz0gXCJPdXQgb24gTWlzc2lvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0ICs9IFwiQXZhaWxhYmxlXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0O1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlfc3RhdHMxKCkge1xyXG5cclxuICAgICAgICB2YXIgc3QgPSBcIlN0cjpcIiArIHRoaXMuc3RhdHNbXCJzdHJcIl0gKyBcIiBNYWc6XCIgKyB0aGlzLnN0YXRzW1wibWFnXCJdICsgXCIgSW50OlwiICsgdGhpcy5zdGF0c1tcImludFwiXTtcclxuICAgICAgICAvL1dJUFxyXG4gICAgICAgIHJldHVybiBzdDtcclxuXHJcbiAgICB9XHJcbiAgICBkaXNwbGF5X3N0YXRzMigpIHtcclxuICAgICAgICAvL3ZhciBhZmZfc3QgPSBcIkFmZmluaXR5OlwiICsgXCIgXCIrSlNPTi5zdHJpbmdpZnkodGhpcy5hZmZpbml0eSlcclxuICAgICAgICAvL3JldHVybiBhZmZfc3RcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheV9zdGF0czMoKSB7XHJcbiAgICAgICAgdmFyIHN0ID0gXCJTdGF0dXM6IFwiXHJcbiAgICAgICAgaWYgKHRoaXMuaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICBzdCArPSBcIk91dCBvbiBNaXNzaW9uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3QgKz0gXCJBdmFpbGFibGVcIlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3Q7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNwcml0ZSk7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5zcHJpdGUsIHRoaXMubG9jYXRpb24ueCwgdGhpcy5sb2NhdGlvbi55KTtcclxuICAgIH1cclxuICAgIHNldF9sb2NhdGlvbih3aGVyZSkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbnNbd2hlcmVdO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIE1pc3Npb24ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIHJlcV9zdGF0LCAvKnJlcV9hZmZpbml0eSwqLyByZXFfdG90YWwsIHJld2FyZCwgd2luX3R4dCwgbG9zZV90eHQsIHRpY2tzLCBkYXkpIHtcclxuICAgICAgICAvL2Fsd2F5cyBnYWluICsxIGFmZmluaXR5IG9uIHN1Y2Nlc3MuIFxyXG4gICAgICAgIC8vYWx3YXlzIGxvc2UgLTEgYWZmaW5pdHkgb24gZmFpbHVyZVxyXG4gICAgICAgIC8vbWF5YmUgYWRkIHR5cGVcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzYztcclxuICAgICAgICB0aGlzLnJlcV9zdGF0ID0gcmVxX3N0YXQ7IC8vbWF5YmUgbWFrZSB0aGlzIGFuIGFycmF5XHJcbiAgICAgICAgLy90aGlzLnJlcV9hZmZpbml0eSA9IHJlcV9hZmZpbml0eTsvL2FmZmluaXR5XHJcbiAgICAgICAgdGhpcy5yZXFfdG90YWwgPSByZXFfdG90YWw7IC8vdGhpcyB0b28gXHJcbiAgICAgICAgdGhpcy5yZXdhcmQgPSByZXdhcmQ7XHJcbiAgICAgICAgdGhpcy53aW5fdHh0ID0gd2luX3R4dDtcclxuICAgICAgICB0aGlzLmxvc2VfdHh0ID0gbG9zZV90eHQ7XHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vcHJvYmFibHkgYWRkIHN0YXJ0X2RheSAod2hlbiBpdCBzaG93cyB1cCkgYW5kIGxlbmd0aCAoaG93IG1hbnkgZGF5cyBpdCB0YWtlcylcclxuICAgICAgICB0aGlzLmMxID0gbnVsbDsgLy90aGlzIGlzIHRoZSBjaGFyYWN0ZXIgbmFtZS5cclxuICAgICAgICB0aGlzLmMyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSAtMTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSAtMTtcclxuICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgICAgICAgdGhpcy5kYXkgPSBkYXk7XHJcbiAgICAgICAgLy9yZXdhcmQgPT0gZGlmZmljdWx0eSBmb3Igbm93XHJcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gcmV3YXJkXHJcbiAgICB9XHJcbiAgICBhc3NpZ24oY2hhcjEsIGNoYXIyKSB7IC8vcGFzcyBpbiB0aGUgbmFtZS5cclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmMxID0gY2hhcjE7XHJcbiAgICAgICAgdGhpcy5jMiA9IGNoYXIyO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMxKTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMik7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaXNfb25fbWlzc2lvbiA9IHRydWU7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaXNfb25fbWlzc2lvbiA9IHRydWU7XHJcbiAgICAgICAgLy9jaGFyMS5pc19vY2N1cGllZCA9IHRydWU7IC8vbWF5YmUgZ2V0IGZyb20gbGlzdFxyXG4gICAgICAgIC8vY2hhcjIuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZG9fbWlzc2lvbigpIHtcclxuICAgICAgICBudW1fbWlzc2lvbnMrKztcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVxX3N0YXQgKyBcIiBvZiBtb3JlIHRoYW4gXCIgKyB0aGlzLnJlcV90b3RhbCk7XHJcbiAgICAgICAgdmFyIGNvbWJpbmVkX3N0YXQgPSByb3N0ZXJbdGhpcy5jaGFyMV9pXS5zdGF0c1t0aGlzLnJlcV9zdGF0XSArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLnN0YXRzW3RoaXMucmVxX3N0YXRdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG90YWwgcG9pbnRzOiBcIiArIGNvbWJpbmVkX3N0YXQpO1xyXG4gICAgICAgIC8vcHV0IGluIGFmZmluaXR5IHdpbi9sb3NlXHJcbiAgICAgICAgaWYgKGNvbWJpbmVkX3N0YXQgPj0gdGhpcy5yZXFfdG90YWwpIHsgLy9tYWtlIGNoZWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vcGFzc1xyXG4gICAgICAgICAgICB0aGlzLnZpY3RvcnkoKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZWxzZSBpZiAoIFxyXG4gICAgICAgIC8vICB0aGlzLmFmZmluaXR5IFt0aGlzLmMyXSA+PSB0aGlzLnJlcV9hZmZpbml0eSkge1xyXG4gICAgICAgIC8vdGhpcy52aWN0b3J5KClcclxuICAgICAgICAvL3JldHVybiB0cnVlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZhaWx1cmUoKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmljdG9yeSgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICBudW1fc3VjY2Vzc2Z1bCsrO1xyXG4gICAgICAgIHRleHRfbG9nLnB1c2goXCJNaXNzaW9uOiBcIiArIHRoaXMudGl0bGUgKyAnPHNwYW4gc3R5bGU9XCJjb2xvcjogIzIyOEIyMlwiPiB3YXMgc3VjY2Vzc2Z1bCE8YnI+PC9zcGFuPicgKyByb3N0ZXJbdGhpcy5jaGFyMV9pXS5uYW1lICsgXCIgYW5kIFwiICsgcm9zdGVyW3RoaXMuY2hhcjJfaV0ubmFtZSArIFwiIGhhdmUgcmV0dXJuZWQhPGJyPlRoZWlyIHN0YXRlbWVudDogXCIgKyB0aGlzLndpbl90eHQpO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMxKTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMik7XHJcbiAgICAgICAgLy90ZXh0X2xvZy5wdXNoKHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMud2luX3R4dCk7XHJcbiAgICAgICAgLy9pbmNyZWFzZSBzdGF0IGJ5IHJld2FyZCBhbXRcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5pbmNyZWFzZV9zdGF0KHRoaXMucmVxX3N0YXQsIHRoaXMucmV3YXJkKTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5pbmNyZWFzZV9zdGF0KHRoaXMucmVxX3N0YXQsIHRoaXMucmV3YXJkKTtcclxuICAgICAgICAvL2luY3JlYXNlIGFmZmluaXR5XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaW5jcmVhc2VfYWZmaW5pdHkocm9zdGVyW3RoaXMuY2hhcjJfaV0pO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmluY3JlYXNlX2FmZmluaXR5KHJvc3Rlclt0aGlzLmNoYXIxX2ldKTtcclxuICAgICAgICAvL3RleHRfbG9nLnB1c2godGhpcy53aW5fdHh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBudWxsO1xyXG5cclxuICAgIH1cclxuICAgIGZhaWx1cmUoKSB7XHJcbiAgICAgICAgbnVtX2ZhaWxlZCsrO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJmYWlsdXJlXCIpO1xyXG4gICAgICAgIHRleHRfbG9nLnB1c2goXCJNaXNzaW9uOiBcIiArIHRoaXMudGl0bGUgKyAnPHNwYW4gc3R5bGU9XCJjb2xvcjogI2ZmMDAwMFwiPiBmYWlsZWQhPGJyPjwvc3Bhbj4nICsgcm9zdGVyW3RoaXMuY2hhcjFfaV0ubmFtZSArIFwiIGFuZCBcIiArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLm5hbWUgKyBcIiBoYXZlIHJldHVybmVkITxicj5UaGVpciBzdGF0ZW1lbnQ6IFwiICsgdGhpcy5sb3NlX3R4dCk7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzEpO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMyKTtcclxuICAgICAgICAvL3RleHRfbG9nLnB1c2gocm9zdGVyW3RoaXMuY2hhcjFfaV0ubmFtZSArIFwiIGFuZCBcIiArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLm5hbWUgKyBcIiBoYXZlIHJldHVybmVkITxicj5UaGVpciBzdGF0ZW1lbnQ6IFwiICsgdGhpcy5sb3NlX3R4dCk7XHJcbiAgICAgICAgLy9kZWNyZWFzZSBhZmZpbml0eVxyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmRlY3JlYXNlX2FmZmluaXR5KHJvc3Rlclt0aGlzLmNoYXIyX2ldKTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5kZWNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMV9pXSk7XHJcbiAgICAgICAgLy90ZXh0X2xvZy5wdXNoKHRoaXMubG9zZV90eHQpO1xyXG5cclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBkZWNyZWFzZV90aW1lKCkge1xyXG4gICAgICAgIHRoaXMudGlja3MtLTtcclxuICAgICAgICBpZiAodGhpcy50aWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9fbWlzc2lvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpZmZpY3VsdHlfdG9zdHIoKSB7XHJcbiAgICAgICAgdmFyIHN0ciA9IFwiZGlmZmljdWx0eTogXCJcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGlmZmljdWx0eTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0ciArPSBcIipcIlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgZ2V0X2Rlc2MoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXR0aW5nIGZ1bGwgZGVzY1wiKTtcclxuICAgICAgICB2YXIgZnVsbF9kZXNjID0gXCItLS1cXG5cIiArIHRoaXMuZGVzYyArIFwiXFxucmVxdWlyZXMgXCIgKyB0aGlzLnJlcV9zdGF0ICsgXCIsIFwiICsgdGhpcy5kaWZmaWN1bHR5X3Rvc3RyKCk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bGxfZGVzYztcclxuICAgIH1cclxuXHJcbn1cclxuLy9TdGFydCBwb3NpdGlvbiBpcyA1NzAsIDM0NVxyXG5jbGFzcyBMb2NhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB4LCB5LCBzdGF0KSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hhcjEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hhcjIgPSBudWxsOyAvL2ZvciBhZmZpbml0eSBPTkxZXHJcbiAgICAgICAgdGhpcy5zdGF0ID0gbnVsbDtcclxuICAgICAgICBpZiAoc3RhdCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXQgPSBzdGF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBhc3NpZ24obmFtZSwgbmFtZTIgPSAwKSB7XHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdCA9PSBcImFmZmluaXR5XCIpIHtcclxuICAgICAgICAgICAgLy90d28gY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICB0aGlzLmNoYXIxID0gbmFtZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyMiA9IG5hbWUyO1xyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjEpXS5tb3ZlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIyKV0ubW92ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9zdGFuZGFyZCBzdGF0LCAxIGNoYXJcclxuICAgICAgICAgICAgdGhpcy5jaGFyMSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMSldLm1vdmUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBlbmhhbmNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXQgPT0gXCJhZmZpbml0eVwiKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMSldLmluY3JlYXNlX2FmZmluaXR5KHRoaXMuY2hhcjIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vb25seSBvbmVcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnN0YXQsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbi8vdXNlZnVsIHRoaW5nc1xyXG5jbGFzcyBQb3B1cCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB0eXBlKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZXNbdHlwZV07XHJcbiAgICAgICAgdGhpcy5pc19vcGVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dF9wb3MgPSB0aGlzLnkgKyAzMDtcclxuXHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuICAgIGRpc21pc3MoKSB7XHJcbiAgICAgICAgdGhpcy5pc19vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIGRyYXdfY2FudmFzKCk7XHJcbiAgICAgICAgLy9jaGVjayBmb3IgbWlzc2lvbiBzdHVmZiBpbiBoZXJlIC5NYWtlIHN1cmUgMiBjaGFycyBzZWxlY3RlZCBldGNcclxuICAgICAgICBpZiAoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy91cGRhdGVfdGltZSgpOyB0aGlzIGlzIHdoYXQgdXBkYXRlcyB0aW1lIGFmdGVyIG1pc3Npb25zIGFyZSBzZWxlY3RlZCBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcgaW4gcG9wdXAgZGlzbWlzc1wiKTtcclxuICAgICAgICBzZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgIHNlbGVjdGVkMiA9IG51bGw7XHJcbiAgICAgICAgc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCAyIGlzIG5vdyBcIiArIHNlbGVjdGVkMik7XHJcbiAgICAgICAgZm9yICh2YXIgYiBpbiBjaGFyX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgY2hhcl9idXR0b25zW2JdLnByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgeCBpbiBwb3B1cF9idXR0b25zKSB7XHJcbiAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbeF0ucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgfVxyXG4gICAgd3JpdGVfdGV4dCh0ZXh0KSB7XHJcbiAgICAgICAgLy95ID0gc3RhcnRpbmcgeSBwb3NpdGlvbi4gXHJcbiAgICAgICAgdmFyIHR4dCA9IHRoaXMud3JhcF9wYXJhZ3JhcGhfdGV4dCh0ZXh0KTtcclxuICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHR4dC5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHR4dFtsXSwgdGhpcy54ICsgMTUsIHRoaXMudGV4dF9wb3MpO1xyXG4gICAgICAgICAgICB0aGlzLnRleHRfcG9zICs9IDIwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMudGV4dF9wb3MgPSB0aGlzLnkgKyAyMDtcclxuXHJcbiAgICAgICAgLy90aGlzLnRleHRfeCArPTIwO1xyXG4gICAgICAgIC8vdGhpcy50ZXh0X3kgKz0yMDtcclxuICAgIH1cclxuICAgIC8vdHdvIGJlbG93IGZ1bmN0aW9ucyBtb2RpZmllZCBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTM2MTEyL3RleHQtd3JhcC1pbi1hLWNhbnZhcy1lbGVtZW50XHJcbiAgICB3cmFwX3BhcmFncmFwaF90ZXh0KHRleHQpIHtcclxuICAgICAgICByZXR1cm4gdGV4dC5zcGxpdChcIlxcblwiKS5tYXAocGFyYSA9PiB0aGlzLndyYXBfdGV4dChwYXJhKSkucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSk7XHJcbiAgICB9XHJcbiAgICB3cmFwX3RleHQodGV4dCkge1xyXG4gICAgICAgIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIHZhciBsaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBjdXJyZW50TGluZSA9IHdvcmRzWzBdO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5pbWFnZS54KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB3b3JkID0gd29yZHNbaV07XHJcbiAgICAgICAgICAgIHZhciB3ID0gY29udGV4dC5tZWFzdXJlVGV4dChjdXJyZW50TGluZSArIFwiIFwiICsgd29yZCkud2lkdGg7XHJcbiAgICAgICAgICAgIGlmICh3IDwgdGhpcy5pbWFnZS53aWR0aCAtIDUwKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSArPSBcIiBcIiArIHdvcmQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lID0gd29yZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsaW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcclxuICAgICAgICByZXR1cm4gbGluZXM7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICB0aGlzLnRleHRfcG9zID0gdGhpcy55ICsgMzA7XHJcbiAgICB9XHJcbiAgICBkcmF3X3BvcHVwX2J1dHRvbnMoKSB7XHJcbiAgICAgICAgdmFyIHRpbnlfeCA9IDI1MDtcclxuICAgICAgICBmb3IgKHZhciBiIGluIHBvcHVwX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGNoYXIgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgcG9wdXBfYnV0dG9uc1tiXS50ZXh0KTtcclxuICAgICAgICAgICAgaWYgKCFyb3N0ZXJbY2hhcl0uaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbnlfeCA+PSB0aGlzLmltYWdlLndpZHRoICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlueV94ID0gNDUwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0X3BvcyArPSA0MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlueV94ICs9IDgwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS54ID0gdGlueV94O1xyXG4gICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS55ID0gdGhpcy50ZXh0X3BvcztcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocG9wdXBfYnV0dG9uc1tiXS54ICsgXCIgLCBcIisgcG9wdXBfYnV0dG9uc1tiXS55KTtcclxuICAgICAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbYl0uZHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGRyYXdfb2tfYnV0dG9uKCkge1xyXG4gICAgICAgIG9rLnggPSA0NTU7XHJcbiAgICAgICAgb2sueSA9IHRoaXMudGV4dF9wb3M7XHJcbiAgICAgICAgb2suZHJhdygpO1xyXG4gICAgfVxyXG4gICAgZmlsbF9wb3B1cCh0ZXh0LCBidXR0b25zLCBvaykge1xyXG4gICAgICAgIHRoaXMud3JpdGVfdGV4dCh0ZXh0KTtcclxuICAgICAgICBpZiAoYnV0dG9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdfcG9wdXBfYnV0dG9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3X29rX2J1dHRvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5jbGFzcyBCdXR0b24geyAvL2V4aXN0aW5nIGZyYW1ld29ya3M/XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB0eXBlLCB0ZXh0LCBwcmVzc2VkX3R5cGUgPSAwKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZXNbdHlwZV07XHJcbiAgICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmVzc2VkX2ltYWdlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJfdGV4dF9wb3MgPSB0aGlzLnkgKyAyMDtcclxuICAgICAgICBpZiAocHJlc3NlZF90eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZF9pbWFnZSA9IGltYWdlc1twcmVzc2VkX3R5cGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldF9hY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICB9XHJcbiAgICBkb19zb21ldGhpbmcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzZXRfdGV4dF9wb3MoKSB7XHJcbiAgICAgICAgdGhpcy5iX3RleHRfcG9zID0gdGhpcy55ICsgMjA7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wcmVzc2VkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucHJlc3NlZF9pbWFnZSk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlc3NlZCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLnByZXNzZWRfaW1hZ2UsIHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyYXdpbmcgcHJlc3NlZFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0aGlzLnggKyAxNTAsIHRoaXMueSArIDQ1KTtcclxuICAgIH1cclxuICAgIC8vdHdvIGJlbG93IGZ1bmN0aW9ucyBtb2RpZmllZCBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTM2MTEyL3RleHQtd3JhcC1pbi1hLWNhbnZhcy1lbGVtZW50XHJcbiAgICB3cmFwX3BhcmFncmFwaF90ZXh0KHRleHQpIHtcclxuICAgICAgICByZXR1cm4gdGV4dC5zcGxpdChcIlxcblwiKS5tYXAocGFyYSA9PiB0aGlzLndyYXBfdGV4dChwYXJhKSkucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSk7XHJcbiAgICB9XHJcbiAgICB3cmFwX3RleHQodGV4dCkge1xyXG4gICAgICAgIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIHZhciBsaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBjdXJyZW50TGluZSA9IHdvcmRzWzBdO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5pbWFnZS54KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB3b3JkID0gd29yZHNbaV07XHJcbiAgICAgICAgICAgIHZhciB3ID0gY29udGV4dC5tZWFzdXJlVGV4dChjdXJyZW50TGluZSArIFwiIFwiICsgd29yZCkud2lkdGg7XHJcbiAgICAgICAgICAgIGlmICh3IDwgdGhpcy5pbWFnZS53aWR0aCAtIDIwKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSArPSBcIiBcIiArIHdvcmQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lID0gd29yZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsaW5lcy5wdXNoKGN1cnJlbnRMaW5lKTtcclxuICAgICAgICByZXR1cm4gbGluZXM7XHJcbiAgICB9XHJcbiAgICB3cml0ZV90ZXh0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ3cml0aW5nXCIpO1xyXG4gICAgICAgIHZhciB0eHQgPSB0aGlzLndyYXBfcGFyYWdyYXBoX3RleHQoXCJNaXNzaW9uOlxcblwiICsgdGhpcy50ZXh0KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHR4dCk7XHJcbiAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCB0eHQubGVuZ3RoOyBsKyspIHtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0eHRbbF0sIHRoaXMueCArIDIwLCB0aGlzLmJfdGV4dF9wb3MpO1xyXG4gICAgICAgICAgICB0aGlzLmJfdGV4dF9wb3MgKz0gMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzZXRfdGV4dF9wb3MoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBwcmVsb2FkX2ltZygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBpbWFnZXNcIik7XHJcbiAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25cIilcclxuICAgIC8vdmFyIHBvcHVwID0gbmV3IEltYWdlKCk7XHJcbiAgICAvL2J1dHRvbi5zcmMgPSBcImh0dHA6Ly9pNjMudGlueXBpYy5jb20vcjduZDQ0LmpwZ1wiO1xyXG4gICAgLy9wb3B1cC5zcmMgPSBcImh0dHA6Ly9pNjQudGlueXBpYy5jb20vMnc1aXVqNi5qcGdcIjtcclxuICAgIGltYWdlc1tcImJ1dHRvblwiXSA9IGJ1dHRvbjtcclxuICAgIGltYWdlc1tcIk1pblwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpO1xyXG4gICAgaW1hZ2VzW1wiTWluX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbl9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiTGFuZG9sXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5kb2xcIik7XHJcbiAgICBpbWFnZXNbXCJMYW5kb2xfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZG9sX3BcIik7XHJcbiAgICBpbWFnZXNbXCJSb3J5XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3J5XCIpO1xyXG4gICAgaW1hZ2VzW1wiUm9yeV9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3J5X3BcIik7XHJcbiAgICBpbWFnZXNbXCJIb3JzdFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9yc3RcIik7XHJcbiAgICBpbWFnZXNbXCJIb3JzdF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3JzdF9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiRGFudGhcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbnRoXCIpO1xyXG4gICAgaW1hZ2VzW1wiRGFudGhfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFudGhfcFwiKTtcclxuICAgIGltYWdlc1tcImJnXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiZ1wiKTtcclxuICAgIGltYWdlc1tcImJnX2V2ZW5pbmdcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJnX2V2ZW5pbmdcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55TWluXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55bWluXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueU1pbl9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55bWluX3BcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55TGFuZG9sXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55bGFuZG9sXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUxhbmRvbF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55bGFuZG9sX3BcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55SG9yc3RcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlob3JzdFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlIb3JzdF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55aG9yc3RfcFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlSb3J5XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55cm9yeVwiKTtcclxuICAgIGltYWdlc1tcInRpbnlSb3J5X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlyb3J5X3BcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55RGFudGhcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbnlkYW50aFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlEYW50aF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55ZGFudGhfcFwiKTtcclxuICAgIGltYWdlc1tcInBhc3NcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3NcIik7XHJcbiAgICBpbWFnZXNbXCJNaW5zcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbnNwclwiKTtcclxuICAgIGltYWdlc1tcIkxhbmRvbHNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZG9sc3ByXCIpO1xyXG4gICAgaW1hZ2VzW1wiSG9yc3RzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvcnN0c3ByXCIpO1xyXG4gICAgaW1hZ2VzW1wiUm9yeXNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9yeXNwclwiKTtcclxuICAgIGltYWdlc1tcIkRhbnRoc3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW50aHNwclwiKTtcclxuICAgIC8vY29uc29sZS5sb2coaW1hZ2VzW1wiYmdcIl0pO1xyXG4gICAgaW1hZ2VzW1wicG9wdXBcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwXCIpO1xyXG4gICAgaW1hZ2VzW1wib2tcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9rXCIpO1xyXG4gICAgaW1hZ2VzW1wiZ2FtZWRvbmVcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVvdmVyXCIpO1xyXG4gICAgaW1hZ2VzW1wibW9vblwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vblwiKTtcclxuICAgIGltYWdlc1tcInN1blwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VuXCIpO1xyXG4gICAgaW1hZ2VzW1wiZGlhbG9nYm94XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWFsb2dib3hcIik7XHJcbiAgICBpbWFnZXNbXCJzdGFydHNjcmVlblwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRzY3JlZW5cIilcclxufVxyXG5mdW5jdGlvbiBkaWFsb2coKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgOTAwLCA2NTApO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiZGlhbG9nYm94XCJdLCAwLCAzNTApO1xyXG4gICAgY29udGV4dC5mb250ID0gJzEwcHggXCJQcmVzcyBTdGFydCAyUFwiJztcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIC8vdGhpcyBpcyBtZSBzdGFydGluZyB0byB0cnkgYW5kIG1ha2UgdGhlIGRpYWxvZyBzY3JlZW4sIEknbSBsZWF2aW5nIGl0IGFsb25lIGZvciBub3cgXHJcbiAgICAvL2J1dCBpIHRoaW5rIHRoYXQgZXZlbnR1YWx5bCBzZXR0aW5nIGl0IHVwIGluIGEgd2F5IHNpbWlsYXIgdG8gTWlzc2lvbnMgd291bGQgYmUgZ29vZCBcclxuICAgIC8vdGhvdWdoIEkgd29uZGVyIGhvdyBJJ2QgaGFuZGxlIGF2YXRhcnMgYW5kIHN1Y2gsIGR1bm5vIGlmIGl0ZCBiZSBhIHNlcGVyYXRlIHRoaW5nIG9yIGEgZGljdGlvbmFyeSBcclxuICAgIC8vd2hhdCBldmVuIGlzIGEgZGljdGlvbmFyeSBcclxuXHJcblxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZV9yb3N0ZXIoKSB7XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiTWluXCIsIHsgJ3N0cic6IDcsICdtYWcnOiAwLCAnaW50JzogMyB9LCBcIk1pbnNwclwiKSk7IC8vbWFrZSBhIGRpY3Rpb25hcnkvbGFiZWwgaXRcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJMYW5kb2xcIiwgeyAnc3RyJzogMCwgJ21hZyc6IDYsICdpbnQnOiA0IH0sIFwiTGFuZG9sc3ByXCIpKTtcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJIb3JzdFwiLCB7ICdzdHInOiA4LCAnbWFnJzogMCwgJ2ludCc6IDIgfSwgXCJIb3JzdHNwclwiKSk7XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiUm9yeVwiLCB7ICdzdHInOiAyLCAnbWFnJzogNiwgJ2ludCc6IDIgfSwgXCJSb3J5c3ByXCIpKTtcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJEYW50aFwiLCB7ICdzdHInOiAyLCAnbWFnJzogMiwgJ2ludCc6IDYgfSwgXCJEYW50aHNwclwiKSk7XHJcbiAgICBmb3IgKHZhciBjIGluIHJvc3Rlcikge1xyXG4gICAgICAgIHJvc3RlcltjXS5jcmVhdGVfYWZmaW5pdHkoKTsgLy9zdGFydCBhdCAyP1xyXG4gICAgICAgIGFkZEFnZW50KHJvc3RlcltjXS5uYW1lKTsgLy9hZGQgYWdlbnQgZm9yIGJlaGF2aW9yIHRyZWVcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJvc3RlcltjXSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX21pc3Npb25zKCkge1xyXG4gICAgLy90ZW1wbGF0ZTogXHJcbiAgICAvL21pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcInRpdGxlXCIsIFwiZGVzY1wiLCBcInN0YXRcIiwgPHRvdGFscHRzPiwgPGRpZmZpY3VsdHk+LCBcIndpblwiLCBcImxvc2VcIiwgPGxlbioyPiwgPGFwcGVhcmRheT4pKTtcclxuICAgIC8vZGF5IDFcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkFuIGFudGltYWdpYyByYXQgaGFzIHRha2VuIG92ZXIgbXkgYXR0aWMgYW5kIG1heSBiZSBidWlsZGluZyBhIHNtYWxsIG5hdGlvbiBzdGF0ZVwiLCBcIkkgY2FuJ3QgZ2V0IHRvIG15IGdyYW5kcGFyZW50J3Mgb2xkIHBob3RvcyBhbnltb3JlIVwiLCBcInN0clwiLCA1LCAxLCBcIkkgZmxleGVkIGF0IHRoZSByYXQgYW5kIGl0IGxlZnQhXCIsIFwiVGhlIHJhdCBraW5nIHJhaW5zIHN1cHJlbWUgYW5kIHdpc2hlcyB0byBiZSBwYWlkIHJlcGFyYXRpb25zIHZpYSBjb3JuLlwiLCAyLCAxKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJMb3N0IGNhdFwiLCBcIlNuZWFreSBvbCcgZmx1ZmZlciBlc2NhcGVkIVwiLCBcImludFwiLCA1LCAxLCBcIldlIGZvdW5kIHRoZSBjYXQgYmVoaW5kIGEgZHVtcHN0ZXIuIEl0IGhhZCBhIG5vdGUgaW4gaXRzIGNvbGxhciB0aGF0IHNhaWQgJ3NoTGRJZmdzZEZzamRFYWRuZiBkRmpma3NSZ2pPYk1uZiBkc01qYUVmQW5nTmtkbkliTmtHJ1wiLCBcIldoYXQgY2F0P1wiLCAyLCAxKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJNeSBzaGVlcCBrZWVwIG9uIGdvaW5nIG1pc3NpbmdcIiwgXCJXaGVyZSBhcmUgdGhleSBnb2luZz8gV2hhdCBhcmUgdGhleSBkb2luZz8gQXJlIHRoZXkgdGFsa2luZyBhYm91dCBtZT8/PyBJIGhhdmUgdG8ga25vdyFcIiwgXCJtYWdcIiwgOCwgMiwgXCJUaGV5IHdlcmUgYmVpbmcgdXNlZCBieSB0aGUgZ29ibGlucyBmb3IgZmFudGFzeSBmb290YmFsbC4gVGhleSB3ZXJlIHJldHVybmVkLCBzbGlnaHRseSBtb3JlIGFybW9yZWQuIFwiLCBcIlNoZWVwIGFyZW4ndCByZWFsLlwiLCAyLCAxKSk7XHJcbiAgICAvL2RheSAyXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJTbGltZXMgYXJlIGVhdGluZyBteSBwb3RhdG9lcyFcIiwgXCJJIGhhZCBvbmUgcGxhbiBhbmQgdGhhdCBwbGFuIHdhcyB3aGFja2luZyB0aGVtIHdpdGggYSBzd29yZCBhbmQgaXQgZGlkbid0IHdvcmsuXCIsIFwibWFnXCIsIDgsIDIsIFwiU2xpbWVzIHphcHBlZCwgbWlzc2lvbiBjb21wbGV0ZSFcIiwgXCJUaGUgc2xpbWVzIHNob29rIG9mZiBhbGwgdGhlIHBoeXNpY2FsIGRhbWFnZSB3ZSBjb3VsZCBkbyBzbyB3ZSBzaG92ZWQgdGhlbSBpbnRvIGEgaG9sZSBhbmQgaG9wZWQgZm9yIHRoZSBiZXN0LlwiLCAyLCAyKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJHb2JsaW5zIHdvbid0IHN0b3AgaGVja2xpbmcgbXkgc2hlZXBcIiwgXCJUaGV5J3JlIGdldHRpbmcgdmVyeSBzdHJlc3NlZCBvdXQhIEhlbHAhXCIsIFwic3RyXCIsIDEwLCAzLCBcIlRoZSBzaGVlcCBjYW4gc2hlZXAgaW4gcGVhY2Ugbm93IVwiLCBcIldlIGxvc3QsIGJ1dCBvbiB0aGUgYnJpZ2h0IHNpZGUgSSBkb24ndCB0aGluayBzaGVlcCB1bmRlcnN0YW5kIEVuZ2xpc2guXCIsIDIsIDIpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkkgdGhpbmsgR2VvcmdlIGlzIGEgdmFtcGlyZVwiLCBcIkhlIG5ldmVyIGVhdHMgYW5kIGhpcyBzaGlydHMgYXJlIGFsd2F5cyBzdGFpbmVkIHdpdGggYmxvb2QhXCIsIFwiaW50XCIsIDYsIDEsIFwiR2VvcmdlIGlzLi4uYSBzaHkgd2luZXJ5IHdvcmtlci4gV2UgYm91Z2h0IGhpbSBuZXcgc2hpcnRzLlwiLCBcIkdlb3JnZSBtb3ZlZCBvdXQgYmVmb3JlIHdlIGNvdWxkIHRhbGsgdG8gaGltLi4uXCIsIDIsIDIpKTtcclxuICAgIC8vZGF5IDNcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkFuIHVuZGVhZCBhcm15IGlzIGludmFkaW5nIVwiLCBcIlRIRVknVkUgR09UVEVOIElOVE8gVEhFIE1JTEsgQkFSTlMhIFdFJ1JFIERPT01FRCFcIiwgXCJtYWdcIiwgMTQsIDUsIFwiV2Fzbid0IHRvbyBoYXJkLCB3ZSBqdU1hc0Vkc0FmZ051YklqTnZuY3hHIEZhc2pSZGZPaGdNaGdqZCBkc0xqZklka0ZuZ0Vma2pcIiwgXCJUaGUgY2FsY2l1bS4uaXQgbWFkZSB0aGVtIC4uLi50b28gcG93ZXJmdWxcIiwgMiwgMykpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiVEhFIFNLWSBUVVJORUQgUkVEXCIsIFwiV0hZIElTIElUIFJFRD8/P1wiLCBcImludFwiLCA2LCAxLCBcIkl0Li4ud2UgaGFkIHRvIHNwZW5kIDMgaG91cnMgZXhwbGFpbmluZyB0aGUgc3Vuc2V0IHRvIGEgZmFtaWx5IG9mIDYuIEkgbWVhbiBtb25leSBpcyBtb25leSBidXQgaG93J2QgdGhpcyBtaXNzaW9uIGV2ZW4gZ2V0IG9uIG91ciBsaXN0LlwiLCBcIldlIHN0b3BwZWQgYnkgYW5kIHRoZXkgdWhoaC4uc2FpZCBhIGxvdCBvZiB3b3JkcyBhbmQgYWZ0ZXIgYW4gaG91ciB3ZSBncmFjaW91c2x5IGp1bXBlZCBvdXQgdGhlIHdpbmRvdyB0byBlc2NhcGUuIFwiLCAyLCAzKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJMaWNoIEtpbmcgY2F1c2luZyBhIHJ1Y2t1c1wiLCBcIlVuaG9seSBtYWdpY3MgYW5kIGxvdWQsIGJvb21pbmcgbm9pc2VzIGFyZSBjb21pbmcgZnJvbSB0aGUgbGljaCdzIGtlZXAsIHNlbmQgaGVyIGEgd2FybmluZyFcIiwgXCJtYWdcIiwgMTIsIDQsIFwiT3VyIG1hZ2ljIHdhcyBjb29sZXIgdGhhbiBoZXJzIHNvIHNoZSBhZ3JlZWQgdG8gbW92ZSBoZXIgcGFydHkgZGVlcGVyIHVuZGVyZ3JvdW5kXCIsIFwiTGljaCBcXFwiUGFydHlicm9kdWRlZmVsbGFcXFwiIHdhcyBkZWVwbHkgdW5pbXByZXNzZWQgYnkgdXMgYW5kIHR1cm5lZCB1cCBoZXIgZHVic3RlcCBsb3VkZXJcIiwgMiwgMykpO1xyXG4gICAgLy9kYXkgNFxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQSBmaXNoIGxlYXJuZWQgdG8gd2FsayBvbiBsYW5kIGFuZCBoZXMgdXNpbmcgaGlzIGxlZ3MgZXhjbHVzaXZlbHkgZm9yIGV2aWxcIiwgXCJIZSBjYW4ndCBoYW5kbGUgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIGhhdmluZyBsZWdzISBIZSdzIHJhaXNpbmcgYSB0YWRwb2xlIGFybXkhXCIsIFwic3RyXCIsIDEwLCAzLCBcIkhlIGdvdCBzdXBsZXhlZCBiYWNrIGludG8gdGhlIG9jZWFuIVwiLCBcIkhpcyBldmlsIGNvbnRpbnVlcy4uLi4udGhlIG5lZmVyaW91cyBDYXB0YWluIExlZ2JlYXJkXCIsIDIsIDQpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkZvbGxvdyBteSBjYXQgYXJvdWQgdG8gc2VlIHdoYXQgc2hlIGRvZXMgYWxsIGRheVwiLCBcIkkgbG9zZSBoZXIgZXZlcnkgdGltZSBJIHRyeSwgSSBoYXZlIHRvIGtub3chXCIsIFwiaW50XCIsIDgsIDIsIFwiRGVhciBnb2QgdGhpcyBjYXQgZ2V0cyBzbyBtYW55IHRyZWF0cy4gUGxlYXNlIHN0b3AgZmVlZGluZyBoZXIgc2hlcyB0b28gcG93ZXJmdWwuXCIsIFwiT3V0c21hcnRlZCBieSBhIGNhdC4uLi5qdXN0IGFub3RoZXIgbm9ybWFsIGRheSBob25lc3RseVwiLCAyLCA0KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJTdG9wIHRoZXNlIHdlZWtseSBiYXJmaWdodHMhXCIsIFwiRXZlcnkgV2VkbmVzZGF5IGFuIGVsZiBhbmQgYW4gb3JjIGNvbWUgdG8gbXkgYmFyLCBhbmQgdGhleSBhbHdheXMgZW5kIHVwIGZpZ2h0aW5nISBUaGV5IHJlZnVzZSB0byBjb21lIG9uIGRpZmZlcmVudCBkYXlzIVwiLCBcInN0clwiLCA4LCAyLCBcIlRoZXkgc3RhcnRlZCB0aHJvd2luZyBjaGFpcnMgYWdhaW4gc28gd2UgYWxzbyB0aHJldyBjaGFpcnMgYXQgdGhlbS4gVGhleSB3ZXJlIGZvcmNlZCB0byB0ZWFtIHVwIGFnYWluc3QgdXMgYW5kIGJvbmRlZCBvdmVyIHRoZWlyIHNoYXJlZCBkZWZlYXQuIFRoZWlyIHdlZGRpbmcgaXMgbmV4dCB3ZWVrLCBJIHRoaW5rIHRoZSBwcm9ibGVtIGlzIHNvbHZlZFwiLCBcIldlIGNvdWxkbid0IHN0b3AgdGhlbS4gSSB3b25kZXIgaWYgdGhleSdsbCBzdGlsbCBiZSBhdCBpdCB3aGVuIEkgaGF2ZSBncmFuZGtpZHMuLi5cIiwgMiwgNCkpO1xyXG4gICAgLy9kYXkgNVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiS3Jha2VuIHdvbid0IHN0b3AgcmVhcnJhbmdpbmcgdGhlIGJvYXRzIGF0IHRoZSBkb2NrIGV2ZXJ5IG5pZ2h0IVwiLCBcIldlIGRvbid0IG5lZWQgb3VyIGJvYXRzIG9yZGVyZWQgYnkgY29sb3IhIFdlIG5lZWQgdGhlbSB3aGVyZSB3ZSBwYXJrZWQgdGhlbSFcIiwgXCJtYWdcIiwgMTIsIDQsIFwiVHVybnMgb3V0LCBzaGUganVzdCBuZWVkZWQgYSB0cmFuc2xhdG9yLiBXZSBzZXQgdXAgYSBtYWdpY2FsIG9uZSBhbmQgbm93IHRoZSBLcmFrZW4gZ2V0cyBhIHNhbGFyeSBvZiBmaXNoIHRvIGtlZXAgdHJhY2sgb2YgYWxsIHRoZSBib2F0c1wiLCBcIldlbGwgSSBndWVzcyB0aGV5J2xsIGp1c3QgaGF2ZSB0byBhY2NlcHQgdGhlaXIgbmV3IG9yZ2FuaXphdGlvbmFsIG92ZXJsb3JkXCIsIDIsIDUpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlZFUlkgTEFSR0UgQkVBUiEgVkVSWSBWRVJZIExBUkdFIEJFQVIhIVwiLCBcIkJFQVIgTEFSR0VcIiwgXCJzdHJcIiwgMTAsIDMsIFwiR29vZCBuZXdzLCB3ZSB3b24hIEJhZCBuZXdzLCBpdCB3YXMgYSBkcmFnb24uXCIsIFwiSVQgV0FTIE5PVCBBIEJFQVIhXCIsIDIsIDUpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkEgYmlnIHJvY2sgaXMgZmFsbGluZyBmcm9tIHRoZSBza3kgYnV0IGl0J3MgcHJvYmFibHkgZmluZVwiLCBcIkkgbWVhbiBhIGZpcmV5IGRlYXRoIGRvZXNuJ3Qgc291bmQgbGlrZSB0aGUgd29yc3QgdGhpbmcgaW4gdGhlIHdvcmxkXCIsIFwibWFnXCIsIDE0LCA1LCBcIldlIG1hZGUgYSBiaWcgYmF0IG91dCBvZiBtYWdpYyBhbmQgd2hhY2tlZCBpdCBzb21ld2hlcmUgZWxzZSFcIiwgXCJpdCB3YXMgbm90IGZpbmUhISFcIiwgMiwgNSkpO1xyXG4gICAgLy9kYXkgNlxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiU29tZW9uZSdzIHN0b2xlbiB0aGUgdG93biBmbGFnIVwiLCBcIldlIG5lZWQgb3VyIGZsYWchXCIsIFwiaW50XCIsIDgsIDIsIFwiV2UgZm91bmQgaXQgaW4gYSBzaG9wcGluZyBjYXJ0IDEwIG1pbGVzIGF3YXlcIiwgXCJXZSBjb3VsZG4ndCBmaW5kIGl0IHNvIHdlIHJlcGxhY2VkIHRoZSBmbGFnIHdpdGggYSBjb2F0IHNvbWVvbmUgbGVmdCBvdXQuLnRoZSBtYXlvciBoYXMgbm90IG5vdGljZWQgeWV0LlwiLCAyLCA2KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJHb2xlbSByYW1wYWdpbmcgdGhyb3VnaCB0b3duIVwiLCBcIklUJ1MgREVTVFJPWUlORyBUSEUgRkxPV0VSUyBBTkQgT05MWSBUSEUgRkxPV0VSUyEhXCIsIFwic3RyXCIsIDEyLCA0LCBcIldlIGhhY2tlZCBpdCEgV2l0aCBhbiBheGUuIEJ1dCBzb21laG93IHRoaXMgZml4ZWQgaXQgYW5kIG5vdyBpdHMgYSBub3JtYWwgZ2FyZGVuaW5nIGdvbGVtIVwiLCBcIkl0IGJlYXQgdXMgdXAgYW5kIHJhbiBpbnRvIHRoZSBjb3VudHJ5c2lkZSB0byBjYXN0cmF0ZSBtb3JlIHBsYW50c1wiLCAyLCA2KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBIHRpbnkgZHJhZ29uIHdvbid0IGdldCBvdXQgb2YgbXkgc2lsdmVyd2VhciBjYWJpbmV0IVwiLCBcIk5vdyBub3JtYWxseSB0aGlzIHdvdWxkbid0IGJlIGFuIGlzc3VlIGJ1dCBvdXIgaG91c2UgaXMgdmVyeSBmbGFtbWFibGUhXCIsIFwiaW50XCIsIDEwLCAzLCBcIkxpbCBndXkganVzdCB3YW50cyB0byBob2FyZCBzcG9vbnMuIFdlIG1hZGUgaGltIGEgcGlsZSBvZiBkb25hdGVkIHNwb29ucyBvdXQgaW4gdGhlIHdvb2RzIGFuZCBoZSBzZWVtcyB2ZXJ5IGhhcHB5IVwiLCBcIldlbGwgdGhlIGRyYWdvbidzIG91dCBvZiB0aGUgY2FiaW5ldCwgYnV0IHRoZWlyIGhvdXNlIGlzLi4uc2xpZ2h0bHkuLi4uYWJsYXplLlwiLCAyLCA2KSk7XHJcbiAgICAvL2RheSA3XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJ+U2hhcnJvXCIsIFwiZGpPZm5Ma2doRGpmbmQgRnNsUmprSWdFZmxqTm5EZmtkIGRranNmZ25ramdoQmFzZEVmaGcgV2prRWw7TGpoa2dqTGhmZHNcIiwgXCJpbnRcIiwgMTAwLCAxMCxcInRoaXMgb3V0Y29tZSBpcyBudW1lcmljYWxseSBpbXBvc3NpYmxlLCB3aGF0IGhhdmUgeW91IGRvbmUgbm93IFl1a28uXCIsIFwiV2UgbG9va2VkIGV2ZXJ5d2hlcmUgYnV0IHdlIGNvdWxkbid0IGZpbmQgdGhlbS4uLiBUaGV5IHNhaWQgdGhleSdkIGJlIGJhY2sgYnkgbm93IHJpZ2h0PyAuLmd1ZXNzIHlvdSdsbCBoYXZlIHRvIGxvb2sgYWZ0ZXIgdGhpbmdzIGEgd2hpbGUgbG9uZ2VyLi5cIiwgMiwgNykpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiflNoYXJyb1wiLCBcImRqT2ZuTGtnaERqZm5kIEZzbFJqa0lnRWZsak5uRGZrZCBka2pzZmdua2pnaEJhc2RFZmhnIFdqa0VsO0xqaGtnakxoZmRzXCIsIFwiaW50XCIsIDEwMCwgMTAsXCJ0aGlzIG91dGNvbWUgaXMgbnVtZXJpY2FsbHkgaW1wb3NzaWJsZSwgd2hhdCBoYXZlIHlvdSBkb25lIG5vdyBZdWtvLlwiLCBcIldlIGxvb2tlZCBldmVyeXdoZXJlIGJ1dCB3ZSBjb3VsZG4ndCBmaW5kIHRoZW0uLi4gVGhleSBzYWlkIHRoZXknZCBiZSBiYWNrIGJ5IG5vdyByaWdodD8gLi5ndWVzcyB5b3UnbGwgaGF2ZSB0byBsb29rIGFmdGVyIHRoaW5ncyBhIHdoaWxlIGxvbmdlci4uXCIsIDIsIDcpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIn5TaGFycm9cIiwgXCJkak9mbkxrZ2hEamZuZCBGc2xSamtJZ0VmbGpObkRma2QgZGtqc2ZnbmtqZ2hCYXNkRWZoZyBXamtFbDtMamhrZ2pMaGZkc1wiLCBcImludFwiLCAxMDAsIDEwLFwidGhpcyBvdXRjb21lIGlzIG51bWVyaWNhbGx5IGltcG9zc2libGUsIHdoYXQgaGF2ZSB5b3UgZG9uZSBub3cgWXVrby5cIiwgXCJXZSBsb29rZWQgZXZlcnl3aGVyZSBidXQgd2UgY291bGRuJ3QgZmluZCB0aGVtLi4uIFRoZXkgc2FpZCB0aGV5J2QgYmUgYmFjayBieSBub3cgcmlnaHQ/IC4uZ3Vlc3MgeW91J2xsIGhhdmUgdG8gbG9vayBhZnRlciB0aGluZ3MgYSB3aGlsZSBsb25nZXIuLlwiLCAyLCA3KSk7XHJcbiAgICAvL2RheSA4XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJJIGZvdW5kIGEgc3dvcmQgaW4gdGhlIHdvb2RzIVwiLCBcIml0IGp1c3Qgc2l0cyB0aGVyZS4uLm1lbmFjaW5nbHkuLlwiLCBcImludFwiLCAxMCwgMywgXCJXZSB3ZW50IG9uIGEgZ3JhbmQgYWRlbnR1cmUhIFdlIHNhdmVkIGxpdmVzLCBmZWxsIGluIGxvdmUsIGJ1dCBtb3N0IGltcG9ydGFudGx5Li4uIHdlIHRocmV3IGEgdGFycCBvdmVyIHRoZSBzd29yZCBhbmQgY292ZXJlZCBpdCB3aXRoIGRpcnQuXCIsIFwic2RUYkhmRXNmIGRDallrZkNoc0xnakVrbmRmIGRqT2tnZkZob3IgZmpkU3NrVGZPYXNSZllcIiwgMiwgOCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiTXkgYmFieSBoYXMgZ2xvd2luZyBleWVzLi5cIiwgXCJTaGUncyBvdGhlcndpc2Ugbm9ybWFsLi4gYnV0IHdlJ3JlIHdvcnJpZWQgYWJvdXQgaGVyIHBhcmVudHMgYmVpbmcga2lsbGVkIGZvciBjaGFyYWN0ZXIgZGV2ZWxvcG1lbnRcIiwgXCJtYWdcIiwgMTIsIDQsXCJXZSB0YXVnaHQgaGVyIHBhcmVudHMgaG93IHRvIGNhc3QgbWFnaWMhIEFzIGxvbmcgYXMgdGhleSBkb24ndCBkZWNpZGUgdG8gZ28gb24gYSBqb3VybmV5IGFuZCBkaWUgaW4gYSB3YXIsIGl0IHNob3VsZCBiZSBmaW5lXCIgLFwiU29tZXRpbWVzIGJhYmllcycgZXllcyBqdXN0IGdsb3csIGl0J3Mgbm9ybWFsISBNeSBleWVzIGdsb3dlZCB3aGVuIEkgd2FzIGEga2lkXCIsIDIsIDgpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIldoZXJlJ3MgbXkgbWFpbCFcIiwgXCJNYWlsbWFuIHdvbid0IGRlbGl2ZXIgbXkgbWFpbCEgU29tZXRoaW4nIGFib3V0ICdXb3JrIGhhemFyZHMnLCB3aGF0ZXZlciB0aG9zZSBhcmUuXCIsIFwic3RyXCIsOCwgMiwgXCIgSGVyIG9sZCBtYWlsYm94IHdhcyBhY3R1YWxseSBqdXN0IGEgYmVhciB0cmFwIHdpdGggc29tZSBwYXBlciBpbiBpdCwgc28gd2UgYnVpbHQgaGVyIGEgbmV3IG1haWxib3ghIE9uZSB0aGF0IGRlZmluZXRseSBpc24ndCBhIHJlcHVycG9zZWQgYnVja2V0XCIsIFwiSGVyLi5ob3VzZSBpcyB0b28gb24gZmlyZSBmb3IgdXMgdG8gZmluZCB0aGUgbWFpbGJveFwiLCAyLCA4KSk7XHJcbiAgICAvL2RheSA5XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJIZWxwIG5lZWRlZCFcIiwgXCJkaGpBZmpOZmJkIHNqRWRmaFRna2RFZmpkUmduTmZiQWprTHZkcyBzVGpkUmhmVWdUc0hka1wiLFwiaW50XCIsIDEyLCA0LCBcIndlaXJkIGp1bmsgbWFpbC4uIHRvb2sgdXMgYSBiaXQgdG8gZmlndXJlIGl0IG91dCwgYnV0IGlmIHlvdSBsb29rIGF0IGV2ZXJ5IGNhcGl0YWxpemVkIGxldHRlciwgaXQgc3BlbGxzIG91dCAnQU4gRVRFUk5BTCBUUlVUSCcuIFNlZW1zIGxpa2Ugc29tZXRoaW5nIFNoYXJybyB3b3VsZCBkbywgYnV0IHRoaXMga2luZCBvZiBlbmNvZGluZyBpcyBhIGJpdCBzaW1wbGlzdGljIGZvciB0aGVtLCB0aGV5IGFsd2F5cyBsaWtlZCB0aHJvd2luZyBwdXp6bGVzIGF0IHVzXCIsIFwiaXRzIHNvbWUgc29ydCBvZiBjb2RlLi5idXQgd2UgY291bGRuJ3QgZmlndXJlIGl0IG91dC4gTWlnaHQgaGF2ZSBzb21ldGhpbmcgdG8gZG8gd2l0aCBTaGFycm8/IFRoZXkgYWx3YXlzIGxvdmVkIGNvZGVzXCIsIDIsIDkgKSlcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkZpbmQgbXkgc29uIVwiLCBcIkknZCBmaW5kIGhpbSBidXQgSSdtIHRvbyBidXN5IHVucmF2ZWxpbmcgYSBnb3Zlcm5tZW50IGNvbnNwaXJhY3kgYW5kIHNwZW5kaW5nIDIwMCBob3VycyBtYWtpbmcgYSBnYXJkZW5cIiwgXCJzdHJcIiwgMTAsIDMsIFwiSGUgd2FzIGp1c3QgZ29pbmcgdGhyb3VnaCBnaWFudCBidWcgcHViZXJ0eSBhbmQgbWFkZSBhIGNvY29vbiwgd2UgY2FycmllZCBpdCBiYWNrXCIsIFwiV2UgZm91bmQgaGltIGJ1dC4ud2Ugd2VyZW4ndCBhYmxlIHRvIHB1c2ggaGlzIGNvY29vbiBiYWNrIGhvbWUuXCIsIDIsIDkpKVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiU29tZW9uZSBzdG9sZSB0aGUgdG93bidzIHdlbGwgYnVja2V0IVwiLCBcIlRoZXNlIGJ1Y2tldCBjcmltZXMgY2Fubm90IGdvIHVucHVuaXNoZWQhXCIsIFwiaW50XCIsIDgsIDIsXCJBIGZpcmUgZWxlbWVudGFsIHdhcyB1c2luZyBpdCBhcyBoZXIgbWFpbGJveC4uV2UgaGVscGVkIHRoZW0gc2V0IHVwIGEgdGltZXNoYXJlIG9uIHRoZSBidWNrZXQsIGV2ZXJ5b25lJ3MgaGFwcHlcIiwgXCJEYW50aCBzZWVtcyB0byBrbm93IHdoZXJlIGl0IGlzIGJ1dCBoZSByZWZ1c2VzIHRvIHRlbGwgYW55b25lXCIsIDIsIDkpKVxyXG4gICAgLy9kYXkgMTAgXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJzTm5FVmJFalJiZ0VkTmpEbklmTkcgc0NBaExiQU1za0l0VHJzWWpuXCIsIFwiZ1VzTmR2T2dCc1NmRVJ2VnNFRCBhZFdoRXNiZyBDZ0VrakFmU2hFZ2RmcyBzYWtUaGRPZmtmIGZFa1hqSWdTaFRrZGdcIiwgXCJpbnRcIiwgMTAwLCAxMCwgXCJJdCdzIGFsbCBmYWxsaW5nIGFwYXJ0IG5vd1wiLCBcImRmSWpualNrZHMgZFRrc0hqYUVmblJkakVuZiBkamtBZmFza2pmZ2YgZkxkSWprZ0ZmRWpoZyBmQmRFWWpnT3NORCBmZGpUZ25IZEVqc2ZuZyBzZGtFZ2pOZm5EZ2Zqa2Q/XCIsIDIsIDEwKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJzTkVkVmJFalJiZ0VOa2pEbklORyBzQ2tBaGZMYkFNc2tJdFRyc1lcIiwgXCJnVXNOZHZPZ0JzU2ZFUnZWc0VEIGFkV2hFc2JnIENnRWtqQWZTaEVnZGZzIHNha1RoZE9ma2YgZkVrWGpJZ1NoVGtkZ1wiLCBcImludFwiLCAxMDAsIDEwLCBcIkl0J3MgYWxsIGZhbGxpbmcgYXBhcnQgbm93XCIsIFwiZGZJam5qU2tkcyBkVGtzSGphRWZuUmRqRW5mIGRqa0FmYXNramZnZiBmTGRJamtnRmZFamhnIGZCZEVZamdPc05EIGZkalRnbkhkRWpzZm5nIHNka0Vnak5mbkRnZmprZD9cIiwgMiwgMTApKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcInNObkVWYkVqUmJFZE5rakRJb05HIHNDa0FoTGJBTXNrSXRUcllqZGZcIiwgXCJnVXNOZHZPZ0JzU2ZFUnZWc0VEIGFkV2hFc2JnIENnRWtqQWZTaEVnZGZzIHNha1RoZE9ma2YgZkVrWGpJZ1NoVGtkZ1wiLCBcImludFwiLCAxMDAsIDEwLCBcIkl0J3MgYWxsIGZhbGxpbmcgYXBhcnQgbm93XCIsIFwiZGZJam5qU2tkcyBkVGtzSGphRWZuUmRqRW5mIGRqa0FmYXNramZnZiBmTGRJamtnRmZFamhnIGZCZEVZamdPc05EIGZkalRnbkhkRWpzZm5nIHNka0Vnak5mbkRnZmprZD9cIiwgMiwgMTApKTtcclxuICAgIC8vZGF5IDExXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2ggKG5ldyBNaXNzaW9uKFwiSSBjZmdhbid0IG9wZW5qbmIgdGhpcyBqYXIhXCIsIFwiSSB3aWxsZ2hkIHBheSB5b3Ugb25lIGVudGlyZSBjaGljZGdrZW4gaWYgeW91IGhlbHAgbWUgb3BlbiB0aGlzIGphclwiLCBcInN0clwiLCA2LCAxLCBcIlRoZXJlIHdhcyBhLi4gZGVtb24gaW4gdGhhdCBqYXIgYnV0IGhleSB3ZSBnb3QgaXQgb3BlbiFcIiwgXCJXZSBjb3VsZG4ndCBvcGVuIGl0IHNvIHdlIHNtYXNoZWQgaXQgYW5kIGEgZGVtb24gY2FtZSBvdXQ/XCIsIDIsIDExKSlcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkEgZHJhZGdzaGdvbiBidXJudCBkZGZvd24gbXkgZmFybXMhXCIsIFwiU2hlJ3MgZ290IGEgZmxhbWV0c2dmaGhyb3dlciEhXCIsIFwibWFnXCIsIDEyLCA0LCBcIldlIHN0b2xlIHRoZSBmbGFtZXRocm93ZXIgYW5kIHNoZSByYW4gb2ZmXCIsIFwidHVybnMgb3V0LCBwdW5jaGluZyBhIGZsYW1ldGhyb3dlciBqdXN0IG1ha2VzIGl0IGV4cGxvZGUgYW5kIHNldCBtb3JlIHRoaW5ncyBvbiBmaXJlLi5cIiwgMiwgMTEpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkEgcGxhZ3VlIGhhcyBraWRmaHNsbGVkIG15IHZpbGRmbGFnZVwiLCBcIldlIG5lZWhydGQgdG8gc3RvcCByaGl0IVwiLCBcImludFwiLCAxNCwgNSwgXCJIZSB3YW50ZWQgdXMgdG8ga2lsbCBoaW0gdG8gc3RvcCB0aGUgcGxhZ3VlLCBidXQgd2UgY2xlYW5lZCB1cCB0aGUgd2F0dGVyIHN1cHBseSBpbnN0ZWFkLiBTaG91bGQgYmUgZmluZSBub3chXCIsIFwiV2UgY291bGRuJ3QgZmlndXJlIG91dCB0aGUgY2F1c2Ugc28gd2UganVzdCB3YWxsZWQgb2ZmIHRoZSBwbGFjZS4gSSdtIHN1cmUgdGhhdCdsbCBuZXZlciBnZXQgZGlzY292ZXJlZCBieSBhIG1vcmFsbHkgZ3JleSBuZWNyb21hbmNlciBsYXRlciFcIiwgMiwgMTEpKTtcclxuICAgIC8vZGF5IDEyXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJlRXZlcnl0aGluZyBpc2Ygb24gZmlyZSFcIiwgXCJtWSBiYVVyYmFLY3VPZSFcIiwgXCJtYWdcIiwgMTIsIDQsIFwiV2UgcHV0IGl0IG91dCwgYWx0aG91Z2gsIHNvbWUgb2YgdGhlIGZpcmUgc2VlbWVkIHRvIGJlIG1hZGUgb3V0IG9mIHNuYWtlcz8gV2hvJ3Mgd3JpdGluZyB0aGlzP1wiLCBcIlNOQUtFIEZJUkVcIiwgMiwgMTIpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlRoZmUgY2FzdGxlIGlzIGJlaW5nIGludmFkZWQgYnkgYSBzbWFsbCBjaGlsZCFcIiwgXCJTaGUncyBnb3QgZGlzcmVzcGVjdCBmb3IgYXV0aG9yaXR5IGFuZCB0aGUgbGF3cyBvZiBwaHlzaWNzIVwiLCBcInN0clwiLDEyLCA0LFwidGhFIExBV1MgT0YgUEhZU0lDUyBNRUFOIE5PVEhJTkcgVE8gTVkgUEVDUyB+UHJvYmFibHkgTWluXCIsIFwiSSB0aGluayBzaGUgYWNjaWRlbnRhbGx5IGRlbGV0ZWQgaGVyc2VsZj8/XCIsIDIsIDEyICkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiZFlzT2RVZiBkQ0FOVGYgZ1NoQWpWaEUga1RsSHJFZU0gYUFzTGRMXCIsIFwiV3NkRWZnIGZOZ0VFRCBoQ2pPZE5GTElDVCBkV2hFc2YgTmhFZkVnRCBzRWpZZkVkU2dcIiwgXCJpbnRcIiwgMTAwLCAxMCwgXCJZb3UgY2FuJ3QgYmUgaGVyZVwiLCBcIldhSHNZIGREZk8gWWdPaFUgZERmRU5nWSBmTUVkXCIsIDEsIDEyKSk7XHJcbiAgICAvL2RheSAxM1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiREVnU1RSdU9ZIFRIYUUgQ09NUGhJTEVSXCIsIFwiLi4uXCIsIFwic3RyXCIsIDIwLCA2LCBcInRTaERhRm5rIHlGSm9HdUhcIiwgXCIuLi4uXCIsIDIsIDEzKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2ggKG5ldyBNaXNzaW9uKFwic0RFU1RST2RZIFRlSEUgQ09rTVBJTEVSXCIsIFwiLi4uXCIsIFwibWFnXCIsIDIwLCA2LCBcImdBb0dvSmRiS3llXCIsIFwiLi4uLi5cIiwgMiwgMTMpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaCAobmV3IE1pc3Npb24oXCJERVNUZ1JPWSBUb0hFIENPTXJQSUxyRVJcIiwgXCIuLi5cIiwgXCJpbnRcIiwgMjAsIDYsIFwiSHl1U2tEb1wiLCBcIi4uLi4uLlwiLCAyLCAxMykpO1xyXG4gICAgLy9kYXkgMTRcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbiAoXCJZdWtvIFRoZSBIZXJvXCIsIFwiU3RvaWMsIHBlcmhhcHMgdG8gYSBmYXVsdC4gQW4gYWdncmVzaXZlbHkgdW5pbnRlcmVzdGluZyBwZXJzb24sIHBlcmhhcHMgdGhhdHMgd2h5IHNoZSBiZWNhbWUgeW91LlwiLCBcInN0clwiLCAxLCAzLCBcImEgZnJpZW5kXCIsIFwiYSBicmljayB3YWxsIG9mIGEgZnJpZW5kXCIsIDEwLCAxNCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiU2hhcnJvIFRoZSBNZW50b3JcIiwgXCJMYXJnZXIgdGhhbiBsaWZlLCB0b28gbGFyZ2UgdG8gZml0IGluIHRoaXMgc3RvcnkuIFRoZXkgYXJlIHByb3VkIG9mIHlvdS4gV2hlcmV2ZXIgdGhleSBhcmUuLlwiLCBcIm1hZ1wiLDEsMywgXCJnb29kIG9sIE5CIGJ1ZGR5XCIsIFwiZmx1ZmZ5XCIsIDEwLDE0KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBdmludXMgVGhlIENvbXBpbGVyXCIsIFwiQSB3b3JsZCBtYWRlIG9mIHN0b3JpZXMgbmVlZHMgYSBzdG9yeXRlbGxlci4gQW5kIHlldCBhbiBlbmQgaGFkIHRvIGNvbWUuXCIsIFwiaW50XCIsIDEsIDMsIFwid3JpdGVycyBibG9jayBlbmRlZCB0aGUgd29ybGQgYmFzaWNhbGx5XCIsIFwidHdhcyBhIHNpbGx5IHBsb3QsIGJ1dCBJIGhhZCBmdW5cIiwgMjAsIDE0KSk7XHJcbn1cclxuZnVuY3Rpb24gbG9nX3RleHQoKSB7XHJcbiAgICB2YXIgbGdfdHh0ID0gXCJcIjtcclxuICAgIGZvciAodmFyIGUgaW4gdGV4dF9sb2cpIHtcclxuICAgICAgICBsZ190eHQgKz0gdGV4dF9sb2dbZV0gKyBcIjxicj4gKiAqICogPGJyPlwiO1xyXG4gICAgfVxyXG4gICAgdmFyIGRpdl9sb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKVxyXG5cclxuICAgIGRpdl9sb2cuaW5uZXJIVE1MID0gbGdfdHh0O1xyXG4gICAgZGl2X2xvZy5zY3JvbGxUb3AgPSBkaXZfbG9nLnNjcm9sbEhlaWdodDtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfbG9jYXRpb25zKCkge1xyXG4gICAgdmFyIHN0cl9sb2MgPSBuZXcgTG9jYXRpb24oXCJUcmFpbmluZyBEdW1teVwiLCA0NzAsIDMwMCwgXCJzdHJcIik7XHJcbiAgICB2YXIgbWFnX2xvYyA9IG5ldyBMb2NhdGlvbihcIk1hZ2ljIFRvd2VyXCIsIDc1MCwgMTAwLCBcIm1hZ1wiKTtcclxuICAgIHZhciBpbnRfbG9jID0gbmV3IExvY2F0aW9uKFwiTGlicmFyeVwiLCA2NDAsIDI4MCwgXCJpbnRcIik7XHJcbiAgICB2YXIgYWZmX2xvYyA9IG5ldyBMb2NhdGlvbihcIkdhemVib1wiLCA1MDUsIDEzNSwgXCJhZmZpbml0eVwiKTtcclxuICAgIHZhciBhZmZfbG9jMiA9IG5ldyBMb2NhdGlvbihcIkdhemVib1wiLCA1MzUsIDEzNSwgXCJhZmZpbml0eVwiKTtcclxuICAgIHZhciBzdGFydF9sb2MgPSBuZXcgTG9jYXRpb24oXCJPdXRzaWRlXCIsIDYwMCwgMzE1KTtcclxuICAgIGxvY2F0aW9uc1tcInN0YXJ0XCJdID0gc3RhcnRfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wic3RyXCJdID0gc3RyX2xvYztcclxuICAgIGxvY2F0aW9uc1tcIm1hZ1wiXSA9IG1hZ19sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJpbnRcIl0gPSBpbnRfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wiYWZmaW5pdHkxXCJdID0gYWZmX2xvYztcclxuICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MlwiXSA9IGFmZl9sb2MyO1xyXG5cclxufVxyXG5mdW5jdGlvbiBmaW5kX2luX2xpc3QodHlwZSwgdG9fc2VhcmNoKSB7XHJcbiAgICBpZiAodHlwZSA9PSBcInJvc3RlclwiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3N0ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHJvc3RlcltpXS5uYW1lID09IHRvX3NlYXJjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJtaXNzaW9uXCIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1pc3Npb25fYm9hcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1pc3Npb25fYm9hcmRbaV0udGl0bGUgPT0gdG9fc2VhcmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuZnVuY3Rpb24gZHJhd19jYW52YXMoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImRyYXdpbmcgY2FudmFzXCIpO1xyXG4gICAgbG9nX3RleHQoKTtcclxuICAgIC8vc3R1ZmYgdG8gcmVkcmF3IHdoZW4gcG9wdXAgY2xvc2VzLiBcclxuICAgIC8vIG91dGxpbmVcclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IFwiNlwiO1xyXG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgIGNvbnRleHQucmVjdCgwLCAwLCA4MDAsIDY1MCk7XHJcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhpbWFnZXNbXCJiZ1wiXSk7XHJcbiAgICBpZiAoY3VycmVudF90aW1lID09IFwibW9ybmluZ1wiKSB7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiYmdcIl0sIDAsIDApO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRfdGltZSA9PSBcImV2ZW5pbmdcIikge1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcImJnX2V2ZW5pbmdcIl0sIDAsIDApO1xyXG4gICAgfVxyXG4gICAgLy9jb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJiZ1wiXSwgMCwgMCk7IC8vZHJhdyBiZ1xyXG4gICAgZHJhd19jaGFyYWN0ZXJfYnV0dG9ucygpO1xyXG4gICAgZHJhd19jaGFyYWN0ZXJzKCk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiRGF5IFwiICsgY3VycmVudF9kYXksIDg0MCwgNTc1KTtcclxuICAgIGRyYXdfdGltZSgpO1xyXG4gICAgcHJvZmlsZV90ZXh0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdfdGltZSgpIHtcclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJtb3JuaW5nXCIpIHtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJzdW5cIl0sIDg0MCwgNTIwKTtcclxuICAgIH1cclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJldmVuaW5nXCIpIHtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJtb29uXCJdLCA4NDAsIDUyMCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZHJhd19nYW1lX2RvbmUoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImRvbmVcIik7XHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJnYW1lZG9uZVwiXSwgMCwgMCk7IC8vZHJhdyBkb25lXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgY29udGV4dC5mb250ID0gXCIxNXB4ICdQcmVzcyBTdGFydCAyUCdcIlxyXG4gICAgY29udGV4dC5maWxsVGV4dChcIk1pc3Npb25zIEF0dGVtcHRlZDogXCIgKyBudW1fbWlzc2lvbnMsIDMwMCwgMzYwKTtcclxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJNaXNzaW9ucyBTdWNjZWVkZWQ6IFwiICsgbnVtX3N1Y2Nlc3NmdWwsIDMwMCwgNDAwKTtcclxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJNaXNzaW9ucyBGYWlsZWQ6IFwiICsgbnVtX2ZhaWxlZCwgMzAwLCA0NDApO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZV90aW1lKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGUgdGltZSByZXNldFwiKTtcclxuICAgIHBvcC5pc19vcGVuID0gZmFsc2U7XHJcbiAgICBzZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgIHNlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgLy9wb3AuZGlzbWlzcygpO1xyXG5cclxuICAgIC8vZmlyc3Q6IGhhdmUgY2hhcmFjdGVycyBkbyB0aGVpciBhY3Rpb25zXHJcbiAgICBtb3ZlX2NoYXJhY3RlcnMoKTtcclxuICAgIC8vZm9yIGV2ZXJ5IG1pc3Npb24gYXNzaWduZWQsIHVwZGF0ZWQgdGhlIHRpbWUgc3R1ZmYuIERvaW5nIHRoaXMgYmVmb3JlIHRoZSBjYW52YXMgcmVkcmF3LlxyXG4gICAgZm9yICh2YXIgbSBpbiBtaXNzaW9uX2JvYXJkKSB7XHJcbiAgICAgICAgaWYgKG1pc3Npb25fYm9hcmRbbV0uYXNzaWduZWQpIHtcclxuICAgICAgICAgICAgbWlzc2lvbl9ib2FyZFttXS5kZWNyZWFzZV90aW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9uZXh0LCB1cGRhdGUgdGltZS5cclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJtb3JuaW5nXCIgJiYgY3VycmVudF9kYXkgPCBsYXN0X2RheSkge1xyXG4gICAgICAgIGN1cnJlbnRfdGltZSA9IFwiZXZlbmluZ1wiO1xyXG4gICAgICAgIGRyYXdfY2FudmFzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBjdXJyZW50X2RheSsrO1xyXG4gICAgICAgIGlmIChjdXJyZW50X2RheSA8IGxhc3RfZGF5KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRfdGltZSA9IFwibW9ybmluZ1wiO1xyXG4gICAgICAgICAgICBkYXlfY2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHZhciBpbnR0dklEID0gd2luZG93LnNldFRpbWVvdXQoZGF5X3NjcmVlbl9hY3RpdmVfc2V0LCAxNTAwKTtcclxuICAgICAgICAgICAgdmFyIGludHZJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KGRyYXdfY2FudmFzLCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgIHRleHRfZml4KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8vZHJhd19jYW52YXMoKTsgLy9yZWRyYXcgdGV4dC5cclxuICAgIGlmIChjdXJyZW50X2RheSA9PSBsYXN0X2RheSkge1xyXG4gICAgICAgIHRleHRfbG9nLnB1c2goXCJZb3UgZGlkIGEgZ29vZCBqb2IgWXVrb1wiKTtcclxuICAgICAgICBsb2dfdGV4dCgpO1xyXG4gICAgICAgIGRyYXdfZ2FtZV9kb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRleHRfbG9nLnB1c2goXCJEYXkgXCIgKyBjdXJyZW50X2RheSArIFwiLCBcIiArIGN1cnJlbnRfdGltZSk7XHJcbiAgICB9XHJcbiAgICAvL2NoYXJhY3RlcnMgYWx3YXlzIG1vdmVcclxuXHJcblxyXG59XHJcbmZ1bmN0aW9uIHN0YXJ0X3NjcmVlbigpIHtcclxuICAgIHN0YXJ0X3NjcmVlbl9hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJzdGFydHNjcmVlblwiXSwgMCwgMCk7XHJcblxyXG4gICAvLyBjb250ZXh0LmZvbnQgPSAnNjhweCBcIlByZXNzIFN0YXJ0IDJQXCInO1xyXG4gICAgLy8vY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCJcclxuICAgIC8vY29udGV4dC5maWxsVGV4dChcIlJpbWUgUm95YWxlXCIsIDEwMCwgMzUwKTtcclxuXHJcbiAgICAvKnZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lciAoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzdGFydF9zY3JlZW5fa2lsbCgpO1xyXG4gICAgICAgIGRyYXdfY2FudmFzKCk7XHJcbiAgICAgIH0pOyovXHJcbn1cclxuZnVuY3Rpb24gc3RhcnRfc2NyZWVuX2tpbGwoKSB7XHJcbiAgICBzdGFydF9zY3JlZW5fYWN0aXZlID0gZmFsc2U7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGRheV9zY3JlZW5fYWN0aXZlX3NldCgpIHtcclxuICAgIGRheV9zY3JlZW5fYWN0aXZlID0gZmFsc2VcclxufVxyXG5mdW5jdGlvbiBkYXlfY2hhbmdlKCkge1xyXG4gICAgLy9OZXcgZGF5IHNjcmVlblxyXG4gICAgLy9jb25zb2xlLmxvZyhcImRheSBjaGFuZ2VcIik7XHJcbiAgICAvL2JsYWNrIGlzIGRlZmF1bHQsIGRvbid0IG5lZWQgdG8gc3BlY2lmeVxyXG5cclxuICAgIGRheV9zY3JlZW5fYWN0aXZlID0gdHJ1ZVxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIDkwMCwgNjUwKTtcclxuXHJcbiAgICBjb250ZXh0LmZvbnQgPSAnNjhweCBcIlByZXNzIFN0YXJ0IDJQXCInO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgLy9jb250ZXh0LnRleHRCYXNlbGluZSA9ICd0b3AnOyA8LS0gY2F1c2VkIHRleHQgc2xpZGluZyBidWdcclxuICAgIGNvbnRleHQuZmlsbFRleHQoJ0RheScgKyBjdXJyZW50X2RheSwgMzI1LCAzNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXh0X2ZpeCgpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiXHJcbiAgICBjb250ZXh0LmZvbnQgPSBcIjhweCAnUHJlc3MgU3RhcnQgMlAnXCJcclxufVxyXG5mdW5jdGlvbiBwcm9maWxlX3RleHQoKSB7XHJcbiAgICAvL3ZhciBzID0gLyonTWluIHRoZSBLbmlnaHQnICsgKi8gcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIk1pblwiKV0uZGlzcGxheV9zdGF0cygpXHJcbiAgICAvLyAgdmFyIHN0ciA9IHRoaXMud3JpdGVfdGV4dChzKTtcclxuICAgIGNvbnRleHQuZmlsbFRleHQoJ01pbiB0aGUgS25pZ2h0JywgNzAsIDQwKTtcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIk1pblwiKV0uZGlzcGxheV9zdGF0czEoKSwgNzAsIDY1KVxyXG4gICAgLy9jb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJNaW5cIildLmRpc3BsYXlfc3RhdHMyKCksIDcwLCA2NSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIk1pblwiKV0uZGlzcGxheV9zdGF0czMoKSwgMjAsIDg1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dCgnTGFuZG9sIHRoZSBNYWdlJywgNzAsIDEzMClcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkxhbmRvbFwiKV0uZGlzcGxheV9zdGF0czEoKSwgNzAsIDE1NSlcclxuICAgIC8vY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiTGFuZG9sXCIpXS5kaXNwbGF5X3N0YXRzMigpLCA3MCwgMTU1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiTGFuZG9sXCIpXS5kaXNwbGF5X3N0YXRzMygpLCAyMCwgMTc1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dCgnSG9yc3QgdGhlIEhvcnNlbWFuJywgNzAsIDIyMClcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkhvcnN0XCIpXS5kaXNwbGF5X3N0YXRzMSgpLCA3MCwgMjQ1KVxyXG4gICAgLy9jb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJIb3JzdFwiKV0uZGlzcGxheV9zdGF0czIoKSwgNzAsIDI0NSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkhvcnN0XCIpXS5kaXNwbGF5X3N0YXRzMygpLCAyMCwgMjY1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dCgnUm9yeSB0aGUgU3VtbW9uZXInLCA3MCwgMzEwKVxyXG4gICAgY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiUm9yeVwiKV0uZGlzcGxheV9zdGF0czEoKSwgNzAsIDMzNSlcclxuICAgIC8vY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiUm9yeVwiKV0uZGlzcGxheV9zdGF0czIoKSwgNzAsIDMzNSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIlJvcnlcIildLmRpc3BsYXlfc3RhdHMzKCksIDIwLCAzNTUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KCdEYW50aCB0aGUgU3B5bWFzdGVyJywgNzAsIDQwMClcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkRhbnRoXCIpXS5kaXNwbGF5X3N0YXRzMSgpLCA3MCwgNDI1KVxyXG4gICAgLy9jb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJEYW50aFwiKV0uZGlzcGxheV9zdGF0czIoKSwgNzAsIDQyNSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkRhbnRoXCIpXS5kaXNwbGF5X3N0YXRzMygpLCAyMCwgNDQ1KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3X2NoYXJhY3RlcnMoKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiaW4gZHJhdyBjaGFyYWN0ZXJzXCIpO1xyXG4gICAgZm9yICh2YXIgY2hhciBpbiByb3N0ZXIpIHtcclxuICAgICAgICBpZiAoIXJvc3RlcltjaGFyXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltjaGFyXS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG1vdmVfY2hhcmFjdGVycygpIHtcclxuICAgIC8vcmFuZG9tIHRoZSBjaGFyYWN0ZXIgb3JkZXIgZm9yIHRob3NlIHdobyBhcmVudCBidXN5XHJcbiAgICBjb25zb2xlLmxvZyhcImluIG1vdmUgY2hhclwiKTtcclxuICAgIC8vZ2V0X3JhbmRvbV9jaGFyX2xpc3QoKTtcclxuICAgIC8vTmVlZCB0byBzdG9wIG9uY2UgZXZlcnkgY2hhcmFjdGVyIGlzIGFzc2lnbmVkLiBcclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJtb3JuaW5nXCIpIHtcclxuICAgICAgICBmb3IgKHZhciBjaCBpbiByb3N0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFyb3N0ZXJbY2hdLmlzX29jY3VwaWVkICYmICFyb3N0ZXJbY2hdLmlzX29uX21pc3Npb24pIHsgLy9pZiBjaGFyYWN0ZXIgaXNuJ3Qgb24gYSBtaXNzaW9uIG9yIGFscmVhZHkgb2NjdXBpZWRcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobG9jYXRpb25zKTtcclxuICAgICAgICAgICAgICAgIC8vc2VsZWN0X2FjdGlvbihyb3N0ZXJbY2hdKTtcclxuICAgICAgICAgICAgICAgIGF0dGFjaFRyZWVUb0FnZW50KHJvc3RlcltjaF0ubmFtZSwgc2VsZWN0X2FjdGlvbihyb3N0ZXJbY2hdKSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJvc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd29ybGRUaWNrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vZXZlbmluZywgZXZlcnlvbmUgZ29lcyB0byBzdGFydFxyXG4gICAgICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltjXS5zZXRfbG9jYXRpb24oXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgcm9zdGVyW2NdLmlzX29jY3VwaWVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWxsIGxvY2F0aW9ucyBhcmUgdW5vY2N1cGllZCBcclxuICAgICAgICBsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJpbnRcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbmZ1bmN0aW9uIGRyYXdfY2hhcmFjdGVyX2J1dHRvbnMoKSB7XHJcbiAgICAvL3ZhciB5ID0gNTA7XHJcbiAgICBmb3IgKHZhciBiIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgIGNoYXJfYnV0dG9uc1tiXS5kcmF3KCk7XHJcbiAgICB9XHJcbiAgICBwYXNzLmRyYXcoKTtcclxuICAgIGZvciAodmFyIGIgaW4gbWlzc2lvbl9idXR0b25zKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50X2RheSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhtaXNzaW9uX2JvYXJkW2JdLmRheSlcclxuICAgICAgICBpZiAoY3VycmVudF9kYXkgPT0gbWlzc2lvbl9ib2FyZFtiXS5kYXkgJiYgIW1pc3Npb25fYm9hcmRbYl0uYXNzaWduZWQpIHtcclxuICAgICAgICAgICAgbWlzc2lvbl9idXR0b25zW2JdLmRyYXcoKTtcclxuICAgICAgICAgICAgbWlzc2lvbl9idXR0b25zW2JdLndyaXRlX3RleHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vY29udGV4dC5kcmF3SW1hZ2UoY2hhcl9idXR0b25zWzBdLmltYWdlLCBjaGFyX2J1dHRvbnNbMF0ueCwgY2hhcl9idXR0b25zWzBdLnkpO1xyXG5cclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfYnV0dG9ucygpIHtcclxuICAgIHBvcCA9IG5ldyBQb3B1cCgzMDAsIDIwMCwgXCJwb3B1cFwiKTtcclxuICAgIHZhciB5ID0gMjA7XHJcbiAgICBmb3IgKHZhciBjIGluIHJvc3Rlcikge1xyXG4gICAgICAgIHZhciBjaGFyX25hbWUgPSByb3N0ZXJbY10ubmFtZTtcclxuICAgICAgICB2YXIgYiA9IG5ldyBCdXR0b24oMTAsIHksIGNoYXJfbmFtZSwgY2hhcl9uYW1lLCBjaGFyX25hbWUgKyBcIl9wXCIpO1xyXG4gICAgICAgIHZhciBuID0gXCJ0aW55XCIgKyBjaGFyX25hbWVcclxuICAgICAgICB2YXIgdGlueV9iID0gbmV3IEJ1dHRvbigwLCAwLCBuLCBjaGFyX25hbWUsIG4gKyBcIl9wXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coaW1hZ2VzW24rXCJfcFwiXSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpbWFnZXMpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cobik7XHJcbiAgICAgICAgcG9wdXBfYnV0dG9ucy5wdXNoKHRpbnlfYik7XHJcbiAgICAgICAgY2hhcl9idXR0b25zLnB1c2goYik7XHJcbiAgICAgICAgeSArPSA5MDtcclxuICAgIH1cclxuICAgIHkgKz0gMjA7XHJcbiAgICB2YXIgeCA9IDIwO1xyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuICAgIGZvciAodmFyIGMgaW4gbWlzc2lvbl9ib2FyZCkge1xyXG4gICAgICAgIC8vaGFyZCBjb2RlZCBhbmQgaGFja3ksIDMgbWlzc2lvbnMgcGVyIGRheVxyXG4gICAgICAgIGlmIChjb3VudCA9PSAzKSB7XHJcbiAgICAgICAgICAgIHggPSAyMDtcclxuICAgICAgICAgICAgY291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHgpO1xyXG4gICAgICAgIHZhciBtaXNzaW9uX3RpdGxlID0gbWlzc2lvbl9ib2FyZFtjXS50aXRsZTtcclxuICAgICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgeSwgXCJidXR0b25cIiwgbWlzc2lvbl90aXRsZSk7XHJcbiAgICAgICAgbWlzc2lvbl9idXR0b25zLnB1c2goYik7XHJcbiAgICAgICAgeCArPSAyMjA7XHJcbiAgICAgICAgY291bnQrKztcclxuXHJcblxyXG4gICAgfVxyXG4gICAgcGFzcyA9IG5ldyBCdXR0b24oNzIwLCA1ODAsIFwicGFzc1wiLCBcInBhc3NcIik7XHJcbiAgICBvayA9IG5ldyBCdXR0b24oMCwgMCwgXCJva1wiLCBcIm9rXCIpO1xyXG5cclxufVxyXG5mdW5jdGlvbiBjaGVja0JvdW5kcyhvYmplY3QsIHgsIHkpIHtcclxuICAgIHZhciBtaW5YID0gb2JqZWN0Lng7XHJcbiAgICB2YXIgbWF4WCA9IG9iamVjdC54ICsgb2JqZWN0LmltYWdlLndpZHRoO1xyXG4gICAgdmFyIG1pblkgPSBvYmplY3QueTtcclxuICAgIHZhciBtYXhZID0gb2JqZWN0LnkgKyBvYmplY3QuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgdmFyIG14ID0geDtcclxuICAgIHZhciBteSA9IHk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiRm9yIG9iamVjdCBcIiArIG9iamVjdC50ZXh0KTtcclxuICAgIC8vY29uc29sZS5sb2coXCJidXR0b24geCByYW5nZTpcIiArIG1pblggKyBcIiB0byBcIiArIG1heFgpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImJ1dHRvbiB5IHJhbmdlOlwiICsgbWluWSArIFwiIHRvIFwiICsgbWF4WSk7XHJcblxyXG4gICAgaWYgKG14ID49IG1pblggJiYgbXggPD0gbWF4WCAmJiBteSA+PSBtaW5ZICYmIG15IDw9IG1heFkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNsaWNrZWQoZSkge1xyXG4gICAgaWYgKGN1cnJlbnRfZGF5ID09IGxhc3RfZGF5KSByZXR1cm47XHJcbiAgICBpZiAoZGF5X3NjcmVlbl9hY3RpdmUpIHJldHVybjtcclxuICAgIGlmIChzdGFydF9zY3JlZW5fYWN0aXZlKSByZXR1cm47XHJcbiAgICAvL29ubHkgd2FudCB0byBvcGVuIHBvcHVwIHdoZW4gYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAvL2Nsb3NlIHBvcHVwIHdoZW4gcG9wdXAgaXMgY2xpY2tlZCBvZmYuIFxyXG4gICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgY29uc3QgY2Fudl94ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0XHJcbiAgICBjb25zdCBjYW52X3kgPSBlLmNsaWVudFkgLSByZWN0LnRvcFxyXG4gICAgLy9maWd1cmUgb3V0IHdoYXQgd2FzIGNsaWNrZWQgZmlyc3QuIFxyXG4gICAgLy9jb25zb2xlLmxvZyhcIm1vdWVzIHBvczogXCIgKyBlLmNsaWVudFggKyBcIiwgXCIgKyBlLmNsaWVudFkpOyAvL2RlYnVnZ2luZ1xyXG4gICAgaWYgKCFwb3AuaXNfb3Blbikge1xyXG4gICAgICAgIC8vY2hlY2sgaWYgYSBidXR0b24gd2FzIGNsaWNrZWQgIFxyXG4gICAgICAgIGZvciAodmFyIGJ1dHRvbiBpbiBjaGFyX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgaWYgKGNoZWNrQm91bmRzKGNoYXJfYnV0dG9uc1tidXR0b25dLCBjYW52X3gsIGNhbnZfeSkpIHtcclxuICAgICAgICAgICAgICAgIC8vZHJhdyBwb3B1cFxyXG4gICAgICAgICAgICAgICAgY2hhcl9idXR0b25zW2J1dHRvbl0ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwb3AuaXNfb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBjaGFyX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0uc3RhdHNfdG9zdHIoKSk7XHJcbiAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5zdGF0c190b3N0cigpLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNoYXJhY3RlcjogXCIgKyByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBjaGFyX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0uc3RhdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGJ1dHRvbiBpbiBtaXNzaW9uX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgaWYgKCFtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS5hc3NpZ25lZCAmJiBjaGVja0JvdW5kcyhtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXSwgY2Fudl94LCBjYW52X3kpICYmIGN1cnJlbnRfZGF5ID09IG1pc3Npb25fYm9hcmRbYnV0dG9uXS5kYXkpIHtcclxuICAgICAgICAgICAgICAgIHBvcC5pc19vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkX21pc3Npb24gPSBidXR0b247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiU0VUVElORyBTRUxFQ1RFRCBNSVNTSU9OXCIpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgIC8vZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmaW5kX2luX2xpc3QoXCJtaXNzaW9uXCIsIG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWlzc2lvbl9ib2FyZFswXS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWlzc2lvbl90aXRsZSA9IG1pc3Npb25fYm9hcmRbZmluZF9pbl9saXN0KFwibWlzc2lvblwiLCBtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWlzc2lvbl9kZXNjID0gbWlzc2lvbl9ib2FyZFtmaW5kX2luX2xpc3QoXCJtaXNzaW9uXCIsIG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpXS5nZXRfZGVzYygpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmZpbGxfcG9wdXAobWlzc2lvbl90aXRsZSArIFwiXFxuXCIgKyBtaXNzaW9uX2Rlc2MsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vcG9wLmZpbGxfcG9wdXAoXCJkZXNjXCIsIHRydWUsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgLy9wb3AuZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWNrQm91bmRzKHBhc3MsIGNhbnZfeCwgY2Fudl95KSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicGFzcyBjbGlja2VkXCIpO1xyXG4gICAgICAgICAgICB1cGRhdGVfdGltZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vaWYgcG9wIHVwIGlzIG9wZW4sIHdhbnQgdG8gY2hlY2sgaWYgYW55dGhpbmcgQlVUIGJ1dHRvbnMgd2FzIGNsaWNrZWQgKGZvciBub3cpXHJcbiAgICAgICAgaWYgKGNoZWNrQm91bmRzKHBvcCwgY2Fudl94LCBjYW52X3kpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9wdXAgY2xpY2tlZCFcIik7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZDEgIT0gbnVsbCAmJiBzZWxlY3RlZDIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tCb3VuZHMob2ssIGNhbnZfeCwgY2Fudl95KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tCb3VuZHMob2ssIGNhbnZfeCwgY2Fudl95KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJPayBjbGlja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcC5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGIgaW4gcG9wdXBfYnV0dG9ucykge1xyXG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiB0aG9zZSBidXR0b25zIHdlcmUgY2xpY2tlZC4gXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBvcHVwX2J1dHRvbnNbYl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQm91bmRzKHBvcHVwX2J1dHRvbnNbYl0sIGNhbnZfeCwgY2Fudl95KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBpcyBcIiArIHBvcHVwX2J1dHRvbnNbYl0udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TZWxlY3QgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkMSA9PSBudWxsICYmIHNlbGVjdGVkX21pc3Npb24gIT0gbnVsbCAmJiAhcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBwb3B1cF9idXR0b25zW2JdLnRleHQpXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMSA9IHBvcHVwX2J1dHRvbnNbYl0udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRfbWlzc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVkcmF3IHcgcHJlc3NlZCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtdCA9IG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZCA9IG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uZ2V0X2Rlc2MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmZpbGxfcG9wdXAobXQgKyBcIlxcblwiICsgbWQsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcHVwX2J1dHRvbnNbYl0udGV4dCAhPSBzZWxlY3RlZDEgJiYgIXJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgcG9wdXBfYnV0dG9uc1tiXS50ZXh0KV0uaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBwb3B1cF9idXR0b25zW2JdLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbYl0ucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcnN0OiBcIiArIHNlbGVjdGVkMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWNvbmQ6IFwiICsgc2VsZWN0ZWQyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlR3byBjaGFyYWN0ZXJzIHNlbGVjdGVkLiBBc3NzaWduaW5nIG1pc3Npb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGl0bGU6IFwiKyBtaXNzaW9uX2JvYXJkW3NlbGVjdGVkX21pc3Npb25dLnRpdGxlICsgXCJcXG5EZXNjOiBcIiArIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uZGVzYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Fzc2lnbiBtaXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0uYXNzaWduKHNlbGVjdGVkMSwgc2VsZWN0ZWQyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maWxsIG5ldyB0ZXh0IG9uIHBvcHVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9wLmRpc21pc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5pc19vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInN0aWxsIGluIGlmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChcIlNlbmRpbmcgXCIgKyBzZWxlY3RlZDEgKyBcIiBhbmQgXCIgKyBzZWxlY3RlZDIgKyBcIiBvbiB0aGUgbWlzc2lvbi5cIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiU2VudCBcIiArIHNlbGVjdGVkMSArIFwiIGFuZCBcIiArIHNlbGVjdGVkMiArIFwiIG9uOiBcIiArIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0udGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkMSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcGFzcyB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlX3RpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNsb3NlIHBvcHVwXCIpO1xyXG4gICAgICAgICAgICBwb3AuaXNfb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwb3AuZGlzbWlzcygpO1xyXG4gICAgICAgICAgICAvL3NlbGVjdGVkMSA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vc2VsZWN0ZWQyID0gbnVsbDtcclxuICAgICAgICAgICAgLy9zZWxlY3RlZF9taXNzaW9uID0gbnVsbDtcclxuICAgICAgICAgICAgLy9wb3AucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vY29uc3RydWN0IHBvcHVwLiBNYXliZSBtYWtlIGl0IG9iamVjdD8gXHJcbmZ1bmN0aW9uIHNldHVwKCkge1xyXG4gICAgLy90aGluZ3MgdG8gb25seSBkbyBvbmUgdGltZS5cclxuICAgIHByZWxvYWRfaW1nKCk7XHJcbiAgICBjcmVhdGVfbG9jYXRpb25zKCk7XHJcbiAgICBjcmVhdGVfcm9zdGVyKCk7XHJcbiAgICBjcmVhdGVfbWlzc2lvbnMoKTtcclxuICAgIGNyZWF0ZV9idXR0b25zKCk7XHJcbiAgICBzdGFydF9zY3JlZW4oKTtcclxuICAgIC8vZHJhd19jYW52YXMoKTsgLy9nZXQgcmlkIG9mIHRoaXMgd2hlbiByZWVuYWJsZSBzdGFydCBzY3JlZW5cclxuICAgIHZhciBpbnR0dHZJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KHN0YXJ0X3NjcmVlbl9raWxsLCAxNTAwKTtcclxuICAgIHZhciBpbnR0dHR0dklEID0gd2luZG93LnNldFRpbWVvdXQoZHJhd19jYW52YXMsIDE1MDApO1xyXG4gICAgdGV4dF9maXgoKTtcclxuXHJcbn1cclxuLy92aWxsYW5lbGxlIHN0dWZmXHJcbi8vZnVuY3Rpb24gcmVmZXJlbmNlZCBmcm9tOiBodHRwczovL3d3dy53M3Jlc291cmNlLmNvbS9qYXZhc2NyaXB0LWV4ZXJjaXNlcy9qYXZhc2NyaXB0LWFycmF5LWV4ZXJjaXNlLTE3LnBocFxyXG5mdW5jdGlvbiBnZXRfcmFuZG9tX2NoYXJfbGlzdCgpIHtcclxuICAgIHZhciBsZW4gPSByb3N0ZXIubGVuZ3RoO1xyXG4gICAgdmFyIHRlbXA7XHJcbiAgICB2YXIgaW5kZXg7XHJcblxyXG4gICAgd2hpbGUgKGxlbiA+IDApIHtcclxuICAgICAgICBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlbik7XHJcbiAgICAgICAgbGVuLS07XHJcbiAgICAgICAgdGVtcCA9IHJvc3RlcltsZW5dXHJcbiAgICAgICAgcm9zdGVyW2xlbl0gPSByb3N0ZXJbaW5kZXhdXHJcbiAgICAgICAgcm9zdGVyW2luZGV4XSA9IHRlbXA7XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKHJvc3Rlcik7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiaGlnaGVzdCBhZmY6IFwiICsgZ2V0X2NoYXJfdG9fcmFpc2VfYWZmaW5pdHkocm9zdGVyWzBdKS5uYW1lKTtcclxuICAgIC8vc3RhcnQgYWN0aW9uczpcclxufVxyXG5mdW5jdGlvbiBzZWxlY3RfYWN0aW9uKGMpIHtcclxuICAgIC8vc3dpdGNoIHN0YXRlbWVudFxyXG4gICAgY29uc29sZS5sb2coYy5uYW1lICsgXCIgc2VsZWN0aW5nIGFjdGlvbi4uLlwiKTtcclxuICAgIHN3aXRjaCAoYy5uYW1lKSB7XHJcbiAgICAgICAgY2FzZSBcIk1pblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKTtcclxuICAgICAgICBjYXNlIFwiTGFuZG9sXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKV0pO1xyXG4gICAgICAgIGNhc2UgXCJIb3JzdFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKTtcclxuICAgICAgICBjYXNlIFwiUm9yeVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKTtcclxuICAgICAgICBjYXNlIFwiRGFudGhcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICB9XHJcbiAgICAvL3JldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyksIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKV0pXHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJfdG9fcmFpc2VfYWZmaW5pdHkoYykge1xyXG4gICAgLy9maW5kIHRoZSBjaGFyYWN0ZXIgd2l0aCB0aGUgaGlnaGVzdCBhZmZpbml0eSB0aGF0IGlzIE5PVCAxMCBhbmQgTk9UIG9jY3VwaWVkXHJcbiAgICB2YXIgaGlnaGVzdCA9IG51bGw7XHJcbiAgICB2YXIgaGlnaGVzdF9hZmYgPSAtMTtcclxuICAgIGZvciAodmFyIGNoIGluIHJvc3Rlcikge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbY2hdKTtcclxuICAgICAgICB2YXIgY29tcCA9IHJvc3RlcltjaF07XHJcbiAgICAgICAgaWYgKGNvbXAubmFtZSAhPSBjLm5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCFjb21wLmlzX29jY3VwaWVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYy5hZmZpbml0eVtjb21wLm5hbWVdIDwgMTAgJiYgYy5hZmZpbml0eVtjb21wLm5hbWVdID49IGhpZ2hlc3RfYWZmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVzdCA9IGNvbXA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVzdF9hZmYgPSBjLmFmZmluaXR5W2NvbXAubmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhjLm5hbWUgKyBcIidzIGhpZ2hlc3QgYWZmaW5pdHkgaXMgd2l0aCBcIiArIGhpZ2hlc3QubmFtZSk7XHJcbiAgICByZXR1cm4gaGlnaGVzdDtcclxufVxyXG4vL0NIRUNLIFNQT1QgREVDXHJcbmZ1bmN0aW9uIGdldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpIHtcclxuICAgIGxldCB0cmFpbl9zdHIgPSBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gIWxvY2F0aW9uc1tcInN0clwiXS5hc3NpZ25lZCAmJiBjLnN0YXRzW1wic3RyXCJdIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQgJiYgIWMuaXNfb25fbWlzc2lvbixcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICsgXCIgaXMgdHJhaW5pbmcgc3RyLlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobG9jYXRpb25zW1wic3RyXCJdLmFzc2lnbmVkKTtcclxuICAgICAgICAgICAgbG9jYXRpb25zW1wic3RyXCJdLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYy5pc19vY2N1cGllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vaW5jcmVhc2Ugc3RhdFxyXG4gICAgICAgICAgICBjLmluY3JlYXNlX3N0YXQoXCJzdHJcIiwgMSk7XHJcbiAgICAgICAgICAgIC8vc2V0IGMncyBsb2NhdGlvblxyXG4gICAgICAgICAgICBjLnNldF9sb2NhdGlvbihcInN0clwiKTtcclxuXHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG5cclxuICAgIHJldHVybiB0cmFpbl9zdHI7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYykge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImludCBsb2M6IFwiICsgaW50X2NvbmQpO1xyXG4gICAgbGV0IHRyYWluX2ludCA9IGFjdGlvbihcclxuICAgICAgICAoKSA9PiAhbG9jYXRpb25zW1wiaW50XCJdLmFzc2lnbmVkICYmIGMuc3RhdHNbXCJpbnRcIl0gPCAxMCAmJiAhYy5pc19vY2N1cGllZCAmJiAhYy5pc19vbl9taXNzaW9uLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGV4dF9sb2cucHVzaChjLm5hbWUgKyBcIiBpcyB0cmFpbmluZyBpbnQuXCIpO1xyXG4gICAgICAgICAgICAvL3NldCBsb2NhdGlvbiBhc3NpZ25lZFxyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJpbnRcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy9pbmNyZWFzZSBzdGF0XHJcbiAgICAgICAgICAgIGMuaW5jcmVhc2Vfc3RhdChcImludFwiLCAxKTtcclxuICAgICAgICAgICAgLy9zZXQgYydzIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwiaW50XCIpO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiB0cmFpbl9pbnQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYykge1xyXG4gICAgLy92YXIgbWFnX2NvbmQgPSAhbG9jYXRpb25zW1wibWFnXCJdLmFzc2lnbmVkICYmIGMuc3RhdHNbJ21hZyddIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQ7XHJcbiAgICBsZXQgdHJhaW5fbWFnID0gYWN0aW9uKFxyXG4gICAgICAgICgpID0+ICFsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1tcIm1hZ1wiXSA8IDEwICYmICFjLmlzX29jY3VwaWVkICYmICFjLmlzX29uX21pc3Npb24sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1hZ19jb25kKTsgICAgXHJcbiAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICsgXCIgaXMgdHJhaW5pbmcgbWFnLlwiKTtcclxuICAgICAgICAgICAgLy9zZXQgbG9jYXRpb24gYXNzaWduZWRcclxuICAgICAgICAgICAgbG9jYXRpb25zW1wibWFnXCJdLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYy5pc19vY2N1cGllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vaW5jcmVhc2Ugc3RhdFxyXG4gICAgICAgICAgICBjLmluY3JlYXNlX3N0YXQoXCJtYWdcIiwgMSk7XHJcbiAgICAgICAgICAgIC8vc2V0IGMncyBsb2NhdGlvblxyXG4gICAgICAgICAgICBjLnNldF9sb2NhdGlvbihcIm1hZ1wiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsb2NhdGlvbnNbXCJtYWdcIl0pO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiB0cmFpbl9tYWc7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSB7XHJcbiAgICBsZXQgcmFpc2VfYWZmaW5pdHkgPSBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gIWxvY2F0aW9uc1tcImFmZmluaXR5MVwiXS5hc3NpZ25lZCAmJiAhbG9jYXRpb25zW1wiYWZmaW5pdHkyXCJdLmFzc2lnbmVkICYmICFjLmlzX29jY3VwaWVkLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGMyID0gZ2V0X2NoYXJfdG9fcmFpc2VfYWZmaW5pdHkoYyk7IC8vdGhpcyBpcyBjaGFyYWN0ZXIgb2JqLiBTaG91bGQgYmUgdW5vY2N1cGllZCB3IGxlc3MgdGhhbiAxMCBhZmZcclxuICAgICAgICAgICAgdGV4dF9sb2cucHVzaChjLm5hbWUgKyBcIiBpcyByYWlzaW5nIGFmZmluaXR5IHdpdGggXCIgKyBjMi5uYW1lICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAvL3NldCBsb2NhdGlvbiBhc3NpZ25lZFxyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL2luY3JlYXNlIGFmZmluaXR5IHdpdGggdGhlbVxyXG4gICAgICAgICAgICBjLmluY3JlYXNlX2FmZmluaXR5KGMyKTtcclxuICAgICAgICAgICAgYzIuaW5jcmVhc2VfYWZmaW5pdHkoYyk7XHJcblxyXG4gICAgICAgICAgICAvL3NldCBib3RoIHRvIG9jY3VwaWVkXHJcbiAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjMi5pc19vY2N1cGllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vc2V0IGJvdGgnIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwiYWZmaW5pdHkxXCIpO1xyXG4gICAgICAgICAgICBjMi5zZXRfbG9jYXRpb24oXCJhZmZpbml0eTJcIik7XHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHJhaXNlX2FmZmluaXR5O1xyXG59XHJcbi8vVE9ET1xyXG4vL1t4XSBidXR0b24gb24gcG9wIHVwLlxyXG5cclxuLy9GdXR1cmUgSW1wcm92ZW1lbnRzOlxyXG4vL0ltcHJvdmVkIFVJXHJcbi8vQ2hhcmFjdGVyIGRpYWxvZ3VlXHJcbi8vQ2hhcmFjdGVycyB0cmFpbmluZyB0b2dldGhlclxyXG4vL01pc3Npb25zIGhhdmluZyBhIHdheSB0byB3aW4gd2l0aCBhZmZpbml0eVxyXG4iLCJpbXBvcnQgUXVldWUgZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWVcIjtcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xyXG5cclxuZXhwb3J0IGVudW0gU3RhdHVzIHtcclxuICAgIFJVTk5JTkcsXHJcbiAgICBTVUNDRVNTLFxyXG4gICAgRkFJTFVSRVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xyXG4gICAgZGVsZXRlIGJsYWNrYm9hcmRbaWRdO1xyXG4gICAgcmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRWZmZWN0ID0gKCkgPT4gdm9pZFxyXG5leHBvcnQgdHlwZSBQcmVjb25kaXRpb24gPSAoKSA9PiBib29sZWFuXHJcbmV4cG9ydCB0eXBlIFRpY2sgPSAoKSA9PiBTdGF0dXNcclxuZXhwb3J0IHR5cGUgQWN0aW9uVGljayA9IChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpID0+IFRpY2tcclxuLyoqXHJcbiAqIFRoZSBndWFyZCB0aWNrIGlzIHRvIGFkZCBhIHByZWNvbmRpdGlvbiB0byB0aGUgY29tcG9zaXRlIHRpY2tzXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBHdWFyZFRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcclxuLyoqXHJcbiAqIFNlcXVlbmNlL1NlbGVjdG9yXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBDb21wb3NpdGVUaWNrID0gKGFzdFRpY2tzOiBUaWNrW10pID0+IFRpY2tcclxuXHJcbnZhciBibGFja2JvYXJkID0ge307XHJcblxyXG5mdW5jdGlvbiBnZXRBY3Rpb25UaWNrKGlkOiBudW1iZXIpOiBBY3Rpb25UaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQgPSAxKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByZWNvbmRpdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPSB0aWNrc1JlcXVpcmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLkZBSUxVUkU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEd1YXJkVGljaygpOiBHdWFyZFRpY2sge1xyXG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGFzdFRpY2ssIG5lZ2F0ZSA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb2NlZWQgPSBuZWdhdGUgPyAhcHJlY29uZGl0aW9uKCkgOiBwcmVjb25kaXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2NlZWQgPyBleGVjdXRlKGFzdFRpY2spIDogU3RhdHVzLkZBSUxVUkU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZXF1ZW5jZVRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xyXG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RvclRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xyXG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZShhc3RUaWNrOiBUaWNrKTogU3RhdHVzIHtcclxuICAgIHJldHVybiBhc3RUaWNrKCk7XHJcbn1cclxuXHJcbnZhciBnbG9iYWxJZENvdW50ZXIgPSAwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbihwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRBY3Rpb25UaWNrKGdsb2JhbElkQ291bnRlcisrKShwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGd1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5lZ19ndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljaywgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIHN1Y2Nlc3Mgb2YgYSBjaGlsZFxyXG4gKiBTdWNjZWVkcyBpZiBhbGwgc3VjY2VlZCwgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVuY2UoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlcXVlbmNlVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBmYWlsdXJlIG9mIGEgY2hpbGQodGhpbmsgb2YgaXQgYXMgaWYtZWxzZSBibG9ja3MpXHJcbiAqIFN1Y2NlZWRzIGlmIGV2ZW4gb25lIHN1Y2NlZWRzLCBlbHNlIGZhaWxzXHJcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xyXG4gKiBAcmV0dXJucyB7VGlja31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rvcihhc3RUaWNrczogVGlja1tdKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0U2VsZWN0b3JUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XHJcbn1cclxuXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLSBBUElzIC0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLy8wLiB1dGlsaXRpZXNcclxuLy8gbWluIGFuZCBtYXggYXJlIGluY2x1c2l2ZVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZE51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbi8vMS4gc3RvcnkgaW5zdGFuY2VcclxuXHJcbi8vMS4xIGxvY2F0aW9uc1xyXG52YXIgbG9jYXRpb25HcmFwaCA9IHt9O1xyXG5cclxuLy9hZGQgdG8gYm90aCBzaWRlc1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9jYXRpb24obG9jYXRpb25OYW1lOiBzdHJpbmcsIGFkamFjZW50TG9jYXRpb25zOiBzdHJpbmdbXSkge1xyXG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gW107XHJcbiAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0uY29uY2F0KGFkamFjZW50TG9jYXRpb25zKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50TG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPSBbXTtcclxuXHJcbiAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0ucHVzaChsb2NhdGlvbk5hbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXJlQWRqYWNlbnQobG9jYXRpb24xOiBzdHJpbmcsIGxvY2F0aW9uMjogc3RyaW5nKTpib29sZWFuIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQXJlIGFkamFjZW50OiBcIiArIGxvY2F0aW9uMSArIFwiLCBcIitsb2NhdGlvbjIpO1xyXG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXSA9PSB1bmRlZmluZWQgfHwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjJdID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFaXRoZXIgb25lL2JvdGggbG9jYXRpb25zIHVuZGVmaW5lZFwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdW2ldID09IGxvY2F0aW9uMil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLy9wYXRoZmluZGluZyBwcmltaXRpdmVzXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0TG9jYXRpb24oc3RhcnQ6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICB2YXIgdmlzaXRlZCA9IHt9O1xyXG4gICAgdmFyIHByZXZpb3VzID0ge307XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gbG9jYXRpb25HcmFwaCkge1xyXG4gICAgICAgIHZpc2l0ZWRba2V5XSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmlzaXRlZFtzdGFydF0gPSB0cnVlO1xyXG5cclxuICAgIHZhciBteVF1ZXVlID0gbmV3IFF1ZXVlPHN0cmluZz4oKTtcclxuICAgIG15UXVldWUuZW5xdWV1ZShzdGFydCk7XHJcblxyXG4gICAgd2hpbGUgKCFteVF1ZXVlLmlzRW1wdHkoKSkge1xyXG4gICAgICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBteVF1ZXVlLmRlcXVldWUoKTtcclxuICAgICAgICBpZiAoY3VycmVudCA9PT0gZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBsb2NhdGlvbkdyYXBoW2N1cnJlbnRdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXZpc2l0ZWRbbmVpZ2hib3JzW2ldXSkge1xyXG4gICAgICAgICAgICAgICAgbXlRdWV1ZS5lbnF1ZXVlKG5laWdoYm9yc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB2aXNpdGVkW25laWdoYm9yc1tpXV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNbbmVpZ2hib3JzW2ldXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IGRlc3RpbmF0aW9uO1xyXG4gICAgaWYgKGN1cnJlbnQgPT0gc3RhcnQpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICB3aGlsZSAocHJldmlvdXNbY3VycmVudF0gIT0gc3RhcnQpIHtcclxuICAgICAgICBjdXJyZW50ID0gcHJldmlvdXNbY3VycmVudF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcbi8vMS4yIGFnZW50c1xyXG52YXIgYWdlbnRzID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQWdlbnQoYWdlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgIGFnZW50cy5wdXNoKGFnZW50TmFtZSk7XHJcbiAgICByZXR1cm4gYWdlbnROYW1lO1xyXG59XHJcblxyXG4vLzEuMyBpdGVtc1xyXG52YXIgaXRlbXMgPSBbXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGl0ZW1OYW1lOiBzdHJpbmcpIHtcclxuICAgIGl0ZW1zLnB1c2goaXRlbU5hbWUpO1xyXG4gICAgcmV0dXJuIGl0ZW1OYW1lO1xyXG59XHJcblxyXG4vLzEuNCB2YXJpYWJsZXNcclxudmFyIHZhcmlhYmxlcyA9IHt9O1xyXG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcclxudmFyIGl0ZW1WYXJpYWJsZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIHZhcmlhYmxlc1t2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhck5hbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXHJcbiAgICAgICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdID0ge307XHJcblxyXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGFnZW50IFwiICsgYWdlbnQgKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhcmlhYmxlTm90U2V0KHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbVZhcmlhYmxlKGl0ZW06IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkpXHJcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtXSA9IHt9O1xyXG5cclxuICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pIHx8IGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xyXG59XHJcblxyXG5cclxuLy8yXHJcbi8vYWdlbnQtYmVoYXZpb3IgdHJlZSBtYXBwaW5nXHJcbnZhciBhZ2VudFRyZWVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoVHJlZVRvQWdlbnQoYWdlbnQ6IHN0cmluZywgdHJlZTogVGljaykge1xyXG4gICAgYWdlbnRUcmVlc1thZ2VudF0gPSB0cmVlO1xyXG59XHJcblxyXG4vLzMuMVxyXG4vL3VzZXIgYWN0aW9uc1xyXG4vL1RPRE8gYWRkIHZhcmlhYmxlcyB0byB1c2VyIGFjdGlvbiB0ZXh0c1xyXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0ge1xyXG4gICAgdGV4dDogXCJcIixcclxuICAgIHVzZXJBY3Rpb25zVGV4dDogW10sXHJcbiAgICBhY3Rpb25FZmZlY3RzVGV4dDogXCJcIlxyXG59XHJcbnZhciB1c2VySW50ZXJhY3Rpb25UcmVlcyA9IFtdO1xyXG52YXIgdXNlckFjdGlvbnMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCkge1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgPSBcIlwiO1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dCA9IFtdO1xyXG4gICAgdXNlckFjdGlvbnMgPSB7fTsvL3tcIkdvIHRvIGxvY2F0aW9uIFhcIiA6IGVmZmVjdFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25UcmVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGV4ZWN1dGUodXNlckludGVyYWN0aW9uVHJlZXNbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcpID0+XHJcbiAgICBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gdHJ1ZSxcclxuICAgICAgICAoKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCArPSBcIlxcblwiICsgdGV4dCwgMFxyXG4gICAgKTtcclxuZXhwb3J0IGxldCBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dCA9ICh0ZXh0OiBzdHJpbmcpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCArPSBcIlxcblwiICsgdGV4dDtcclxuXHJcbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvblRyZWUgPSAodGV4dDogc3RyaW5nLCBlZmZlY3RUcmVlOiBUaWNrKSA9PiBhY3Rpb24oXHJcbiAgICAoKSA9PiB0cnVlLFxyXG4gICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBlZmZlY3RUcmVlKSwgMFxyXG4pO1xyXG5cclxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uID0gKHRleHQ6IHN0cmluZywgZWZmZWN0OiAoKSA9PiBhbnkpID0+XHJcbiAgICBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gdHJ1ZSxcclxuICAgICAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGFjdGlvbigoKT0+dHJ1ZSwgZWZmZWN0LCAwKSksIDBcclxuICAgICk7XHJcblxyXG5mdW5jdGlvbiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQ6IHN0cmluZywgdHJlZTogVGljaykge1xyXG4gICAgdXNlckFjdGlvbnNbdGV4dF0gPSB0cmVlO1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5wdXNoKHRleHQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlckludGVyYWN0aW9uVHJlZSh0aWNrOiBUaWNrKSB7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25UcmVlcy5wdXNoKHRpY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVVzZXJBY3Rpb24odGV4dDogc3RyaW5nKSB7XHJcbiAgICAvL2V4ZWN1dGUgdGhlIHVzZXIgYWN0aW9uXHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHVzZXJBY3Rpb25FZmZlY3RUcmVlID0gdXNlckFjdGlvbnNbdGV4dF07XHJcbiAgICBleGVjdXRlKHVzZXJBY3Rpb25FZmZlY3RUcmVlKTtcclxufVxyXG5cclxuLy80LlxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKSB7XHJcbiAgICByZXR1cm4gdXNlckludGVyYWN0aW9uT2JqZWN0O1xyXG59XHJcbmZ1bmN0aW9uIGdldF9yYW5kb21fYWdlbnRfbGlzdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicmFuZG9taXppbmdcIik7XHJcbiAgICB2YXIgbGVuID0gYWdlbnRzLmxlbmd0aDtcclxuICAgIHZhciB0ZW1wO1xyXG4gICAgdmFyIGluZGV4O1xyXG5cclxuICAgIHdoaWxlIChsZW4gPiAwKSB7XHJcbiAgICAgICAgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZW4pO1xyXG4gICAgICAgIGxlbi0tO1xyXG4gICAgICAgIHRlbXAgPSBhZ2VudHNbbGVuXVxyXG4gICAgICAgIGFnZW50c1tsZW5dID0gYWdlbnRzW2luZGV4XVxyXG4gICAgICAgIGFnZW50c1tpbmRleF0gPSB0ZW1wO1xyXG4gICAgfVxyXG4gICAgLy9jb25zb2xlLmxvZyhyb3N0ZXIpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImhpZ2hlc3QgYWZmOiBcIiArIGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KHJvc3RlclswXSkubmFtZSk7XHJcbiAgICAvL3N0YXJ0IGFjdGlvbnM6XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkVGljaygpIHtcclxuICAgIC8vYWxsIGFnZW50IHRpY2tzXHJcbiAgICAvL2NvbnNvbGUubG9nKFwiSW4gd29ybGQgdGlja1wiKTtcclxuICAgIC8vcmFuZG9taXplIGFnZW50c1xyXG4gICAgZ2V0X3JhbmRvbV9hZ2VudF9saXN0KCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0cmVlID0gYWdlbnRUcmVlc1thZ2VudHNbaV1dO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codHJlZSk7XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0cmVlKSkge1xyXG4gICAgICAgICAgICBzZXRWYXJpYWJsZShcImV4ZWN1dGluZ0FnZW50XCIsIGFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcclxufSJdfQ==
