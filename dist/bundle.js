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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2d1aWxkLmpzIiwic3JjL3NjcmlwdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUlBLHlDQU1xQjtBQUNyQiw0QkFBNEI7QUFDNUIsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDOUIsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO0FBQ25CLElBQUksTUFBTSxH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QUNuRCxtREFBbUQ7SUFDbkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcs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SyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN4QyxHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ3hCO0lBQ0Qsc0JBQXNCO0lBQ3RCLDRFQUE0RTtJQUM1RSxnQkFBZ0I7QUFDcEIsQ0FBQztBQUNEO0lBQ0ksaUJBQWlCO0lBQ2pCLCtCQUErQjtJQUMvQixrQkFBa0I7SUFDbEIscUJBQXFCLEVBQUUsQ0FBQztJQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxrQkFBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQWRELDhCQWNDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xyXG52YXIgTGlua2VkTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxyXG4gICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xyXG4gICAgKiB3aGljaCB0b2dldGhlciByZXByZXNlbnQgYSBzZXF1ZW5jZS5cclxuICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTGFzdCBub2RlIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBBZGRzIGFuIGVsZW1lbnQgdG8gdGhpcyBsaXN0LlxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxyXG4gICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXHJcbiAgICAqIHRoZSBlbGVtZW50IGlzIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhpcyBsaXN0LlxyXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxyXG4gICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5uRWxlbWVudHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLm5FbGVtZW50cyB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoaXRlbSk7XHJcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAwIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIC8vIEluc2VydCBhdCB0aGUgZW5kLlxyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXHJcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgaWYgKHByZXYgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHByZXYubmV4dDtcclxuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMrKztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xyXG4gICAgKiBlbXB0eS5cclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4geyp9IHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXHJcbiAgICAqIGVtcHR5LlxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZGVzaXJlZCBpbmRleC5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzXHJcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XHJcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGVcclxuICAgICAqIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGUgTGlzdCBkb2VzIG5vdCBjb250YWluIHRoaXMgZWxlbWVudC5cclxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxyXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XHJcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICogfVxyXG4gICAgICogPC9wcmU+XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxyXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXHJcbiAgICAgKiBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoaXMgbGlzdCBkb2VzIG5vdCBjb250YWluIHRoZVxyXG4gICAgICogZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXHJcbiAgICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgICAqXHJcbiAgICAgICAqIDxwcmU+XHJcbiAgICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcclxuICAgICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAgICogfVxyXG4gICAgICAgKiA8L3ByZT5cclxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxyXG4gICAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcclxuICAgICAgICogb3RoZXJ3aXNlLlxyXG4gICAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxyXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcclxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXHJcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAqXHJcbiAgICAgKiA8cHJlPlxyXG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xyXG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAqIH1cclxuICAgICAqIDwvcHJlPlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPCAxIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxyXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3R9IG90aGVyIHRoZSBvdGhlciBsaXN0LlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcclxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xyXG4gICAgICogYXJlIGN1c3RvbSBvYmplY3RzIHlvdSBzaG91bGQgcHJvdmlkZSBhIGZ1bmN0aW9uLCBvdGhlcndpc2VcclxuICAgICAqIHRoZSA9PT0gb3BlcmF0b3IgaXMgdXNlZCB0byBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbnRzLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlciwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTGlua2VkTGlzdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVyLnNpemUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsc0F1eCh0aGlzLmZpcnN0Tm9kZSwgb3RoZXIuZmlyc3ROb2RlLCBlcUYpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xyXG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoIWVxRihuMS5lbGVtZW50LCBuMi5lbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG4xID0gbjEubmV4dDtcclxuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXHJcbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxlbWVudDtcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDEpIHtcclxuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwcmV2aW91cy5uZXh0ID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IHByZXZpb3VzLm5leHQubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xyXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGN1cnJlbnROb2RlLmVsZW1lbnQpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcclxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmxhc3ROb2RlO1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxyXG4gICAgICogc2VxdWVuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheS48Kj59IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QsXHJcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cyA8PSAwO1xyXG4gICAgfTtcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBhcnJheXMudG9TdHJpbmcodGhpcy50b0FycmF5KCkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT09ICh0aGlzLm5FbGVtZW50cyAtIDEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jcmVhdGVOb2RlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbGVtZW50OiBpdGVtLFxyXG4gICAgICAgICAgICBuZXh0OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTGlua2VkTGlzdDtcclxufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XHJcbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtlZExpc3Q7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZExpc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoXCIuL0xpbmtlZExpc3RcIik7XHJcbnZhciBRdWV1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cclxuICAgICAqIEBjbGFzcyBBIHF1ZXVlIGlzIGEgRmlyc3QtSW4tRmlyc3QtT3V0IChGSUZPKSBkYXRhIHN0cnVjdHVyZSwgdGhlIGZpcnN0XHJcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xyXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xyXG4gICAgICAgIHRoaXMubGlzdCA9IG5ldyBMaW5rZWRMaXN0XzEuZGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmxpc3QuZmlyc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5maXJzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXHJcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcclxuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgKiB9XHJcbiAgICAgKiA8L3ByZT5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXHJcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcclxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5jb250YWlucyhlbGVtLCBlcXVhbHNGdW5jdGlvbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcclxuICAgICAqIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXHJcbiAgICAgKiBGSUZPIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXHJcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChjYWxsYmFjayk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFF1ZXVlO1xyXG59KCkpOyAvLyBFbmQgb2YgcXVldWVcclxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgaXRlbVxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiBsYXN0SW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwO1xyXG59XHJcbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGNoYW5nZWQgYWZ0ZXIgdGhpcyBjYWxsLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLnJlbW92ZSA9IHJlbW92ZTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5IGVxdWFsXHJcbiAqIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHdob3NlIGZyZXF1ZW5jeSBpcyB0byBiZSBkZXRlcm1pbmVkLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcclxuICogZXF1YWwgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBmcmVxdWVuY3koYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIHZhciBmcmVxID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICBmcmVxKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZyZXE7XHJcbn1cclxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBzcGVjaWZpZWQgYXJyYXlzIGFyZSBlcXVhbCB0byBvbmUgYW5vdGhlci5cclxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxyXG4gKiBvZiBlbGVtZW50cywgYW5kIGFsbCBjb3JyZXNwb25kaW5nIHBhaXJzIG9mIGVsZW1lbnRzIGluIHRoZSB0d29cclxuICogYXJyYXlzIGFyZSBlcXVhbCBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiB0aGUgb3RoZXIgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWxcclxuICovXHJcbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBsZW5ndGggPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZXF1YWxzKGFycmF5MVtpXSwgYXJyYXkyW2ldKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0cy5lcXVhbHMgPSBlcXVhbHM7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IHRvIGNvcHkuXHJcbiAqIEByZXR1cm4ge0FycmF5fSBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheVxyXG4gKi9cclxuZnVuY3Rpb24gY29weShhcnJheSkge1xyXG4gICAgcmV0dXJuIGFycmF5LmNvbmNhdCgpO1xyXG59XHJcbmV4cG9ydHMuY29weSA9IGNvcHk7XHJcbi8qKlxyXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIHN3YXAgZWxlbWVudHMuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIHRoZSBpbmRleCBvZiBvbmUgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgZGVmaW5lZCBhbmQgdGhlIGluZGV4ZXMgYXJlIHZhbGlkLlxyXG4gKi9cclxuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xyXG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gYXJyYXkubGVuZ3RoIHx8IGogPCAwIHx8IGogPj0gYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcclxuICAgIGFycmF5W2ldID0gYXJyYXlbal07XHJcbiAgICBhcnJheVtqXSA9IHRlbXA7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLnN3YXAgPSBzd2FwO1xyXG5mdW5jdGlvbiB0b1N0cmluZyhhcnJheSkge1xyXG4gICAgcmV0dXJuICdbJyArIGFycmF5LnRvU3RyaW5nKCkgKyAnXSc7XHJcbn1cclxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xyXG4vKipcclxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcclxuICogc3RhcnRpbmcgZnJvbSBpbmRleCAwIHRvIGxlbmd0aCAtIDEuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBpdGVyYXRlLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcclxuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICovXHJcbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIGFycmF5XzEgPSBhcnJheTsgX2kgPCBhcnJheV8xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcclxuICAgICAgICBpZiAoY2FsbGJhY2soZWxlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbmV4cG9ydHMuaGFzID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xyXG4gICAgcmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XHJcbn07XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbXBhcmUgZWxlbWVudCBvcmRlci5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XHJcbiAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhID09PSBiKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHRDb21wYXJlID0gZGVmYXVsdENvbXBhcmU7XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XHJcbiAgICByZXR1cm4gYSA9PT0gYjtcclxufVxyXG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xyXG4vKipcclxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0VG9TdHJpbmcoaXRlbSkge1xyXG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJyRzJyArIGl0ZW07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHRUb1N0cmluZyA9IGRlZmF1bHRUb1N0cmluZztcclxuLyoqXHJcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcclxuKi9cclxuZnVuY3Rpb24gbWFrZVN0cmluZyhpdGVtLCBqb2luKSB7XHJcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cclxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciB0b3JldCA9ICd7JztcclxuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5oYXMoaXRlbSwgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMpIHtcclxuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xyXG59XHJcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgIHJldHVybiAodHlwZW9mIG9iaikgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG59XHJcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcclxuLyoqXHJcbiAqIFJldmVyc2VzIGEgY29tcGFyZSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgdikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xyXG4vKipcclxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKSA9PT0gMDtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlVG9FcXVhbHMgPSBjb21wYXJlVG9FcXVhbHM7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiaW1wb3J0IHtcclxuICAgIGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxyXG4gICAgZ2V0UmFuZE51bWJlciwgZ2V0VmFyaWFibGUsIHNlcXVlbmNlLCBzZWxlY3RvciwgZXhlY3V0ZSwgUHJlY29uZGl0aW9uLCBnZXRBZ2VudFZhcmlhYmxlLCBuZWdfZ3VhcmQsIGd1YXJkLFxyXG4gICAgaXNWYXJpYWJsZU5vdFNldCwgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uLCBhZGRVc2VyQWN0aW9uLCBhZGRVc2VySW50ZXJhY3Rpb25UcmVlLCBpbml0aWFsaXplLFxyXG4gICAgZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXHJcbiAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dCwgYXJlQWRqYWNlbnQsIGFkZFVzZXJBY3Rpb25UcmVlXHJcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XHJcbi8vcmVxdWlyZShcIi4vc2NyaXB0aW5nLnRzXCIpO1xyXG52YXIgc3RhcnRfc2NyZWVuX2FjdGl2ZSA9IGZhbHNlO1xyXG52YXIgZGF5X3NjcmVlbl9hY3RpdmUgPSBmYWxzZTtcclxuY29uc3QgbGFzdF9kYXkgPSAxNVxyXG52YXIgcm9zdGVyID0gW107IC8vbGlzdCBvZiBjaGFyYWN0ZXJzXHJcbnZhciBtaXNzaW9uX2JvYXJkID0gW107IC8vbGlzdCBvZiBtaXNzaW9uc1xyXG52YXIgaW1hZ2VzID0ge307IC8vZGljdGlvbmFyeSBvZiBJbWFnZSBvYmplY3RzLiBcclxudmFyIGNoYXJfYnV0dG9ucyA9IFtdOy8vbGlzdCBvZiBidXR0b25zXHJcbnZhciBtaXNzaW9uX2J1dHRvbnMgPSBbXTsgLy9saXN0IG9mIG1pc3Npb24gYnV0dG9uc1xyXG52YXIgcG9wdXBfYnV0dG9ucyA9IFtdOyAvL2xpc3Qgb2YgYnV0dG9ucyBkaXNwbGF5ZWQgb24gcG9wdXBcclxudmFyIGxvY2F0aW9ucyA9IHt9OyAvL2RpY3Qgb2YgbG9jYXRpb25zXHJcblxyXG52YXIgbnVtX21pc3Npb25zID0gMDtcclxudmFyIG51bV9zdWNjZXNzZnVsID0gMDtcclxudmFyIG51bV9mYWlsZWQgPSAwO1xyXG5cclxuLy9odHRwczovL2ltZ3VyLmNvbS9hL2puUTgwcTkgYnV0dG9uIHNvdXJjZVxyXG5cclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudlwiKTtcclxudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuY29udGV4dC5mb250ID0gXCI4cHggJ1ByZXNzIFN0YXJ0IDJQJ1wiXHJcbi8vY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG5cclxudmFyIERFRkFVTFRfQ0hBUl9YID0gMTAwXHJcbnZhciBERUZBVUxUX0NIQVJfWSA9IDEwMFxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHsgc2V0dXAoKSB9O1xyXG4vL2V2ZW50c1xyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrZWQpO1xyXG4vL3BvcHVwXHJcbnZhciBwb3A7XHJcbi8vcGFzcyBidXR0b25cclxudmFyIHBhc3M7XHJcbi8vb2sgYnV0dG9uXHJcbnZhciBvaztcclxuLy90aWNrOiA3IGRheXMgdG90YWwuIDIgdGlja3MgcGVyIGRheSAobW9ybi9ldmUpLiBFdmVuIHRpY2tzIGFyZSBtb3JuaW5nID0gbmV3IGRheVxyXG52YXIgY3VycmVudF90aW1lID0gXCJtb3JuaW5nXCI7XHJcbnZhciBjdXJyZW50X2RheSA9IDE7XHJcblxyXG52YXIgbWF4X3N0YXQgPSAxMDtcclxudmFyIG1heF9hZmZpbml0eSA9IDEwO1xyXG5cclxudmFyIHRleHRfbG9nID0gW1wiTG9nOlwiLCBcIll1a28hISBNeSB2ZXJ5IG9sZCBhbmQgdmVyeSBiZXN0IGZyaWVuZCEgSG934oCZdmUgeW91IGJlZW4/IEkga25vdyB5b3XigJlyZSByZXRpcmVkLCBidXQgY291bGQgeW91IGxvb2sgYWZ0ZXIgdGhlIG9s4oCZIGd1aWxkIGZvciBhYm91dCBhIHdlZWs/IEkgZ290dGEgZ28gcnVuIGEgdmVyeSBpbXBvcnRhbnQgZXJyYW5kISBBbGwgeW91IGdvdCB0byBkbyBpcyBhc3NpZ24gbWlzc2lvbnMgYmFzZWQgb2ZmIG9mIHdoYXTigJlzIG5lZWRlZCBbU1RSRU5HVEgsIE1BR0lDLCBvciBJTlRFTExJR0VOQ0VdISBXZSB1c2UgdGhlIGJ1ZGR5IHN5c3RlbSBhcm91bmQgaGVyZSwgc28gdHdvIHBlb3BsZSBoYXZlIHRvIGJlIGFzc2lnbmVkIHRvIGVhY2ggbWlzc2lvbiwgY2hlY2sgd2hvIGdldHMgYWxvbmcgd2l0aCB3aG8gYnkgY2xpY2tpbmcgb24gdGhlaXIgcHJvZmlsZXMhIEFmdGVyIHRoYXQsIHlvdSBjYW4ganVzdCB1c2UgdGhlIFtORVhUXSBidXR0b24gdG8gbW92ZSBvbiB3aXRoIHRoZSBkYXkuIFVuYXNzaWduZWQgYWR2ZW50dXJlcnMgd2lsbCBqdXN0IGJlIGhhbmdpbmcgb3V0IGFuZCB0cmFpbmluZyBhdCB0aGUgZ3VpbGQgaGFsbC4gSGF2ZSBmdW4hIFRoYW5rcyBpbiBhZHZhbmNlITxicj4gflNoYXJybyBcIl07XHJcblxyXG52YXIgc2VsZWN0ZWQxO1xyXG52YXIgc2VsZWN0ZWQyOyAvL2ZvciB0ZXN0aW5nIG1pc3Npb24gYXNzaWdubWVudC5cclxudmFyIHNlbGVjdGVkX21pc3Npb247XHJcblxyXG5jbGFzcyBDaGFyYWN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc3RhdHMsIHNwcikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IHsgJ3N0cic6IHN0YXRzWydzdHInXSwgJ2ludCc6IHN0YXRzWydpbnQnXSwgJ21hZyc6IHN0YXRzWydtYWcnXSB9XHJcbiAgICAgICAgdGhpcy5hZmZpbml0eSA9IHt9O1xyXG4gICAgICAgIHRoaXMuaXNfb2NjdXBpZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25zW1wic3RhcnRcIl07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmxvY2F0aW9uKTtcclxuICAgICAgICAvL3RoaXMueCA9IERFRkFVTFRfQ0hBUl9YO1xyXG4gICAgICAgIC8vdGhpcy55ID0gREVGQVVMVF9DSEFSX1k7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBpbWFnZXNbc3ByXTtcclxuICAgICAgICAvL3RoaXMuY2hhcl9pY29uID0gY2hhcl9pY29uc1tuYW1lXTtcclxuICAgIH1cclxuICAgIGNyZWF0ZV9hZmZpbml0eSgpIHtcclxuICAgICAgICAvLyBmb3IgKHZhciBjaGFyIGluIHJvc3Rlcikge1xyXG4gICAgICAgIC8vICAgICAvL2NvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgLy8gICAgIGlmIChyb3N0ZXJbY2hhcl0ubmFtZSAhPSB0aGlzLm5hbWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYWZmaW5pdHlbcm9zdGVyW2NoYXJdLm5hbWVdID0gNDsgLy9ldmVyeW9uZSBzdGFydHMgd2l0aCA0IGFmZmluaXR5XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9tYXliZSBkbyByYW5kb20gZXZlbnR1YWxseVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNaW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7IFwiTGFuZG9sXCI6IDEsIFwiSG9yc3RcIjogNSwgXCJSb3J5XCI6IDQsIFwiRGFudGhcIjogMiB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMYW5kb2xcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7IFwiTWluXCI6IDEsIFwiSG9yc3RcIjogMywgXCJSb3J5XCI6IDIsIFwiRGFudGhcIjogNSB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJIb3JzdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHsgXCJNaW5cIjogNSwgXCJMYW5kb2xcIjogMywgXCJSb3J5XCI6IDUsIFwiRGFudGhcIjogMSB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJSb3J5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmZmluaXR5ID0geyBcIk1pblwiOiA0LCBcIkhvcnN0XCI6IDUsIFwiTGFuZG9sXCI6IDIsIFwiRGFudGhcIjogMyB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYW50aFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHsgXCJNaW5cIjogMiwgXCJIb3JzdFwiOiAxLCBcIlJvcnlcIjogMywgXCJMYW5kb2xcIjogNSB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBpbmNyZWFzZV9hZmZpbml0eShjaGFyKSB7XHJcbiAgICAgICAgLy9maW5kIGNoYXJhY3RlciwgaW5jcmVtZW50IG51bWJlci4gXHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBjaGFyLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkZWNyZWFzZV9hZmZpbml0eShjaGFyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBjaGFyLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5jcmVhc2Vfc3RhdChzdGF0LCBhbW91bnQpIHtcclxuICAgICAgICB0aGlzLnN0YXRzW3N0YXRdICs9IGFtb3VudDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0c1tzdGF0XSA+IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHNbc3RhdF0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtb3ZlKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jaGFyX2ljb24sIHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuICAgIHN0YXRzX3Rvc3RyKCkge1xyXG4gICAgICAgIHZhciBhZmZfc3QgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmFmZmluaXR5KVxyXG4gICAgICAgIHZhciBzdCA9IHRoaXMubmFtZSArIFwiXFxuU3RyOiBcIiArIHRoaXMuc3RhdHNbXCJzdHJcIl0gKyBcIlxcbk1hZzogXCIgKyB0aGlzLnN0YXRzW1wibWFnXCJdICsgXCJcXG5JbnQ6IFwiICsgdGhpcy5zdGF0c1tcImludFwiXSArIFwiXFxuQWZmaW5pdHk6XCIgKyBcIlxcblwiICsgYWZmX3N0ICsgXCJcXG5TdGF0dXM6XCI7XHJcbiAgICAgICAgLy9XSVBcclxuICAgICAgICBpZiAodGhpcy5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHN0ICs9IFwiT3V0IG9uIE1pc3Npb25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdCArPSBcIkF2YWlsYWJsZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdDtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5X3N0YXRzMSgpIHtcclxuXHJcbiAgICAgICAgdmFyIHN0ID0gXCJTdHI6XCIgKyB0aGlzLnN0YXRzW1wic3RyXCJdICsgXCIgTWFnOlwiICsgdGhpcy5zdGF0c1tcIm1hZ1wiXSArIFwiIEludDpcIiArIHRoaXMuc3RhdHNbXCJpbnRcIl07XHJcbiAgICAgICAgLy9XSVBcclxuICAgICAgICByZXR1cm4gc3Q7XHJcblxyXG4gICAgfVxyXG4gICAgZGlzcGxheV9zdGF0czIoKSB7XHJcbiAgICAgICAgLy92YXIgYWZmX3N0ID0gXCJBZmZpbml0eTpcIiArIFwiIFwiK0pTT04uc3RyaW5naWZ5KHRoaXMuYWZmaW5pdHkpXHJcbiAgICAgICAgLy9yZXR1cm4gYWZmX3N0XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlfc3RhdHMzKCkge1xyXG4gICAgICAgIHZhciBzdCA9IFwiU3RhdHVzOiBcIlxyXG4gICAgICAgIGlmICh0aGlzLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgc3QgKz0gXCJPdXQgb24gTWlzc2lvblwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0ICs9IFwiQXZhaWxhYmxlXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zcHJpdGUpO1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuc3ByaXRlLCB0aGlzLmxvY2F0aW9uLngsIHRoaXMubG9jYXRpb24ueSk7XHJcbiAgICB9XHJcbiAgICBzZXRfbG9jYXRpb24od2hlcmUpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25zW3doZXJlXTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBNaXNzaW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCByZXFfc3RhdCwgLypyZXFfYWZmaW5pdHksKi8gcmVxX3RvdGFsLCByZXdhcmQsIHdpbl90eHQsIGxvc2VfdHh0LCB0aWNrcywgZGF5KSB7XHJcbiAgICAgICAgLy9hbHdheXMgZ2FpbiArMSBhZmZpbml0eSBvbiBzdWNjZXNzLiBcclxuICAgICAgICAvL2Fsd2F5cyBsb3NlIC0xIGFmZmluaXR5IG9uIGZhaWx1cmVcclxuICAgICAgICAvL21heWJlIGFkZCB0eXBlXHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2M7XHJcbiAgICAgICAgdGhpcy5yZXFfc3RhdCA9IHJlcV9zdGF0OyAvL21heWJlIG1ha2UgdGhpcyBhbiBhcnJheVxyXG4gICAgICAgIC8vdGhpcy5yZXFfYWZmaW5pdHkgPSByZXFfYWZmaW5pdHk7Ly9hZmZpbml0eVxyXG4gICAgICAgIHRoaXMucmVxX3RvdGFsID0gcmVxX3RvdGFsOyAvL3RoaXMgdG9vIFxyXG4gICAgICAgIHRoaXMucmV3YXJkID0gcmV3YXJkO1xyXG4gICAgICAgIHRoaXMud2luX3R4dCA9IHdpbl90eHQ7XHJcbiAgICAgICAgdGhpcy5sb3NlX3R4dCA9IGxvc2VfdHh0O1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICAvL3Byb2JhYmx5IGFkZCBzdGFydF9kYXkgKHdoZW4gaXQgc2hvd3MgdXApIGFuZCBsZW5ndGggKGhvdyBtYW55IGRheXMgaXQgdGFrZXMpXHJcbiAgICAgICAgdGhpcy5jMSA9IG51bGw7IC8vdGhpcyBpcyB0aGUgY2hhcmFjdGVyIG5hbWUuXHJcbiAgICAgICAgdGhpcy5jMiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gLTE7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gLTE7XHJcbiAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4gICAgICAgIC8vcmV3YXJkID09IGRpZmZpY3VsdHkgZm9yIG5vd1xyXG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IHJld2FyZFxyXG4gICAgfVxyXG4gICAgYXNzaWduKGNoYXIxLCBjaGFyMikgeyAvL3Bhc3MgaW4gdGhlIG5hbWUuXHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jMSA9IGNoYXIxO1xyXG4gICAgICAgIHRoaXMuYzIgPSBjaGFyMjtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmlzX29uX21pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIC8vY2hhcjEuaXNfb2NjdXBpZWQgPSB0cnVlOyAvL21heWJlIGdldCBmcm9tIGxpc3RcclxuICAgICAgICAvL2NoYXIyLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRvX21pc3Npb24oKSB7XHJcbiAgICAgICAgbnVtX21pc3Npb25zKys7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzEpO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlcV9zdGF0ICsgXCIgb2YgbW9yZSB0aGFuIFwiICsgdGhpcy5yZXFfdG90YWwpO1xyXG4gICAgICAgIHZhciBjb21iaW5lZF9zdGF0ID0gcm9zdGVyW3RoaXMuY2hhcjFfaV0uc3RhdHNbdGhpcy5yZXFfc3RhdF0gKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5zdGF0c1t0aGlzLnJlcV9zdGF0XTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRvdGFsIHBvaW50czogXCIgKyBjb21iaW5lZF9zdGF0KTtcclxuICAgICAgICAvL3B1dCBpbiBhZmZpbml0eSB3aW4vbG9zZVxyXG4gICAgICAgIGlmIChjb21iaW5lZF9zdGF0ID49IHRoaXMucmVxX3RvdGFsKSB7IC8vbWFrZSBjaGVjayBmdW5jdGlvblxyXG4gICAgICAgICAgICAvL3Bhc3NcclxuICAgICAgICAgICAgdGhpcy52aWN0b3J5KClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2Vsc2UgaWYgKCBcclxuICAgICAgICAvLyAgdGhpcy5hZmZpbml0eSBbdGhpcy5jMl0gPj0gdGhpcy5yZXFfYWZmaW5pdHkpIHtcclxuICAgICAgICAvL3RoaXMudmljdG9yeSgpXHJcbiAgICAgICAgLy9yZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvL31cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mYWlsdXJlKClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZpY3RvcnkoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgbnVtX3N1Y2Nlc3NmdWwrKztcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiTWlzc2lvbjogXCIgKyB0aGlzLnRpdGxlICsgXCIgd2FzIHN1Y2Nlc3NmdWwhPGJyPlwiICsgcm9zdGVyW3RoaXMuY2hhcjFfaV0ubmFtZSArIFwiIGFuZCBcIiArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLm5hbWUgKyBcIiBoYXZlIHJldHVybmVkITxicj5UaGVpciBzdGF0ZW1lbnQ6IFwiICsgdGhpcy53aW5fdHh0KTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaChyb3N0ZXJbdGhpcy5jaGFyMV9pXS5uYW1lICsgXCIgYW5kIFwiICsgcm9zdGVyW3RoaXMuY2hhcjJfaV0ubmFtZSArIFwiIGhhdmUgcmV0dXJuZWQhPGJyPlRoZWlyIHN0YXRlbWVudDogXCIgKyB0aGlzLndpbl90eHQpO1xyXG4gICAgICAgIC8vaW5jcmVhc2Ugc3RhdCBieSByZXdhcmQgYW10XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnJlcV9zdGF0LCB0aGlzLnJld2FyZCk7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnJlcV9zdGF0LCB0aGlzLnJld2FyZCk7XHJcbiAgICAgICAgLy9pbmNyZWFzZSBhZmZpbml0eVxyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmluY3JlYXNlX2FmZmluaXR5KHJvc3Rlclt0aGlzLmNoYXIyX2ldKTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5pbmNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMV9pXSk7XHJcbiAgICAgICAgLy90ZXh0X2xvZy5wdXNoKHRoaXMud2luX3R4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gbnVsbDtcclxuXHJcbiAgICB9XHJcbiAgICBmYWlsdXJlKCkge1xyXG4gICAgICAgIG51bV9mYWlsZWQrKztcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZmFpbHVyZVwiKTtcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiTWlzc2lvbjogXCIgKyB0aGlzLnRpdGxlICsgXCIgZmFpbGVkITxicj5cIiArIHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMubG9zZV90eHQpO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMxKTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMik7XHJcbiAgICAgICAgLy90ZXh0X2xvZy5wdXNoKHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMubG9zZV90eHQpO1xyXG4gICAgICAgIC8vZGVjcmVhc2UgYWZmaW5pdHlcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5kZWNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMl9pXSk7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uZGVjcmVhc2VfYWZmaW5pdHkocm9zdGVyW3RoaXMuY2hhcjFfaV0pO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaCh0aGlzLmxvc2VfdHh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgZGVjcmVhc2VfdGltZSgpIHtcclxuICAgICAgICB0aGlzLnRpY2tzLS07XHJcbiAgICAgICAgaWYgKHRoaXMudGlja3MgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvX21pc3Npb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkaWZmaWN1bHR5X3Rvc3RyKCkge1xyXG4gICAgICAgIHZhciBzdHIgPSBcImRpZmZpY3VsdHk6IFwiXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRpZmZpY3VsdHk7IGkrKykge1xyXG4gICAgICAgICAgICBzdHIgKz0gXCIqXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuICAgIGdldF9kZXNjKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBmdWxsIGRlc2NcIik7XHJcbiAgICAgICAgdmFyIGZ1bGxfZGVzYyA9IFwiLS0tXFxuXCIgKyB0aGlzLmRlc2MgKyBcIlxcbnJlcXVpcmVzIFwiICsgdGhpcy5yZXFfc3RhdCArIFwiLCBcIiArIHRoaXMuZGlmZmljdWx0eV90b3N0cigpO1xyXG4gICAgICAgIHJldHVybiBmdWxsX2Rlc2M7XHJcbiAgICB9XHJcblxyXG59XHJcbi8vU3RhcnQgcG9zaXRpb24gaXMgNTcwLCAzNDVcclxuY2xhc3MgTG9jYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgeCwgeSwgc3RhdCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYXIxID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoYXIyID0gbnVsbDsgLy9mb3IgYWZmaW5pdHkgT05MWVxyXG4gICAgICAgIHRoaXMuc3RhdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHN0YXQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ID0gc3RhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgYXNzaWduKG5hbWUsIG5hbWUyID0gMCkge1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXQgPT0gXCJhZmZpbml0eVwiKSB7XHJcbiAgICAgICAgICAgIC8vdHdvIGNoYXJhY3RlcnNcclxuICAgICAgICAgICAgdGhpcy5jaGFyMSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcjIgPSBuYW1lMjtcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0ubW92ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMildLm1vdmUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vc3RhbmRhcmQgc3RhdCwgMSBjaGFyXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcjEgPSBuYW1lO1xyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjEpXS5tb3ZlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgZW5oYW5jZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ID09IFwiYWZmaW5pdHlcIikge1xyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjEpXS5pbmNyZWFzZV9hZmZpbml0eSh0aGlzLmNoYXIyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL29ubHkgb25lXHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMSldLmluY3JlYXNlX3N0YXQodGhpcy5zdGF0LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4vL3VzZWZ1bCB0aGluZ3NcclxuY2xhc3MgUG9wdXAge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdHlwZSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2VzW3R5cGVdO1xyXG4gICAgICAgIHRoaXMuaXNfb3BlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnRleHRfcG9zID0gdGhpcy55ICsgMzA7XHJcblxyXG4gICAgfVxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcbiAgICBkaXNtaXNzKCkge1xyXG4gICAgICAgIHRoaXMuaXNfb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgICAgIC8vY2hlY2sgZm9yIG1pc3Npb24gc3R1ZmYgaW4gaGVyZSAuTWFrZSBzdXJlIDIgY2hhcnMgc2VsZWN0ZWQgZXRjXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkMSAhPSBudWxsICYmIHNlbGVjdGVkMiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vdXBkYXRlX3RpbWUoKTsgdGhpcyBpcyB3aGF0IHVwZGF0ZXMgdGltZSBhZnRlciBtaXNzaW9ucyBhcmUgc2VsZWN0ZWQgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nIGluIHBvcHVwIGRpc21pc3NcIik7XHJcbiAgICAgICAgc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgICAgICBzZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgIHNlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWQgMiBpcyBub3cgXCIgKyBzZWxlY3RlZDIpO1xyXG4gICAgICAgIGZvciAodmFyIGIgaW4gY2hhcl9idXR0b25zKSB7XHJcbiAgICAgICAgICAgIGNoYXJfYnV0dG9uc1tiXS5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIHggaW4gcG9wdXBfYnV0dG9ucykge1xyXG4gICAgICAgICAgICBwb3B1cF9idXR0b25zW3hdLnByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJhd19jYW52YXMoKTtcclxuICAgIH1cclxuICAgIHdyaXRlX3RleHQodGV4dCkge1xyXG4gICAgICAgIC8veSA9IHN0YXJ0aW5nIHkgcG9zaXRpb24uIFxyXG4gICAgICAgIHZhciB0eHQgPSB0aGlzLndyYXBfcGFyYWdyYXBoX3RleHQodGV4dCk7XHJcbiAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCB0eHQubGVuZ3RoOyBsKyspIHtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0eHRbbF0sIHRoaXMueCArIDE1LCB0aGlzLnRleHRfcG9zKTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0X3BvcyArPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnRleHRfcG9zID0gdGhpcy55ICsgMjA7XHJcblxyXG4gICAgICAgIC8vdGhpcy50ZXh0X3ggKz0yMDtcclxuICAgICAgICAvL3RoaXMudGV4dF95ICs9MjA7XHJcbiAgICB9XHJcbiAgICAvL3R3byBiZWxvdyBmdW5jdGlvbnMgbW9kaWZpZWQgZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjkzNjExMi90ZXh0LXdyYXAtaW4tYS1jYW52YXMtZWxlbWVudFxyXG4gICAgd3JhcF9wYXJhZ3JhcGhfdGV4dCh0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRleHQuc3BsaXQoXCJcXG5cIikubWFwKHBhcmEgPT4gdGhpcy53cmFwX3RleHQocGFyYSkpLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpO1xyXG4gICAgfVxyXG4gICAgd3JhcF90ZXh0KHRleHQpIHtcclxuICAgICAgICB2YXIgd29yZHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICB2YXIgbGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgY3VycmVudExpbmUgPSB3b3Jkc1swXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuaW1hZ2UueCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgd29yZCA9IHdvcmRzW2ldO1xyXG4gICAgICAgICAgICB2YXIgdyA9IGNvbnRleHQubWVhc3VyZVRleHQoY3VycmVudExpbmUgKyBcIiBcIiArIHdvcmQpLndpZHRoO1xyXG4gICAgICAgICAgICBpZiAodyA8IHRoaXMuaW1hZ2Uud2lkdGggLSA1MCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgKz0gXCIgXCIgKyB3b3JkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChjdXJyZW50TGluZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSA9IHdvcmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGluZXMucHVzaChjdXJyZW50TGluZSk7XHJcbiAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0X3BvcyA9IHRoaXMueSArIDMwO1xyXG4gICAgfVxyXG4gICAgZHJhd19wb3B1cF9idXR0b25zKCkge1xyXG4gICAgICAgIHZhciB0aW55X3ggPSAyNTA7XHJcbiAgICAgICAgZm9yICh2YXIgYiBpbiBwb3B1cF9idXR0b25zKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFyID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHBvcHVwX2J1dHRvbnNbYl0udGV4dCk7XHJcbiAgICAgICAgICAgIGlmICghcm9zdGVyW2NoYXJdLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aW55X3ggPj0gdGhpcy5pbWFnZS53aWR0aCArIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbnlfeCA9IDQ1MFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dF9wb3MgKz0gNDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbnlfeCArPSA4MDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbYl0ueCA9IHRpbnlfeDtcclxuICAgICAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbYl0ueSA9IHRoaXMudGV4dF9wb3M7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBvcHVwX2J1dHRvbnNbYl0ueCArIFwiICwgXCIrIHBvcHVwX2J1dHRvbnNbYl0ueSk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLmRyYXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBkcmF3X29rX2J1dHRvbigpIHtcclxuICAgICAgICBvay54ID0gNDU1O1xyXG4gICAgICAgIG9rLnkgPSB0aGlzLnRleHRfcG9zO1xyXG4gICAgICAgIG9rLmRyYXcoKTtcclxuICAgIH1cclxuICAgIGZpbGxfcG9wdXAodGV4dCwgYnV0dG9ucywgb2spIHtcclxuICAgICAgICB0aGlzLndyaXRlX3RleHQodGV4dCk7XHJcbiAgICAgICAgaWYgKGJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3X3BvcHVwX2J1dHRvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd19va19idXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQnV0dG9uIHsgLy9leGlzdGluZyBmcmFtZXdvcmtzP1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdHlwZSwgdGV4dCwgcHJlc3NlZF90eXBlID0gMCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2VzW3R5cGVdO1xyXG4gICAgICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJlc3NlZF9pbWFnZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iX3RleHRfcG9zID0gdGhpcy55ICsgMjA7XHJcbiAgICAgICAgaWYgKHByZXNzZWRfdHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzZWRfaW1hZ2UgPSBpbWFnZXNbcHJlc3NlZF90eXBlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLmFjdGlvbiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRfYWN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgfVxyXG4gICAgZG9fc29tZXRoaW5nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc2V0X3RleHRfcG9zKCkge1xyXG4gICAgICAgIHRoaXMuYl90ZXh0X3BvcyA9IHRoaXMueSArIDIwO1xyXG4gICAgfVxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucHJlc3NlZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnByZXNzZWRfaW1hZ2UpO1xyXG4gICAgICAgIGlmICh0aGlzLnByZXNzZWQpIHtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5wcmVzc2VkX2ltYWdlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkcmF3aW5nIHByZXNzZWRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdGhpcy54ICsgMTUwLCB0aGlzLnkgKyA0NSk7XHJcbiAgICB9XHJcbiAgICAvL3R3byBiZWxvdyBmdW5jdGlvbnMgbW9kaWZpZWQgZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjkzNjExMi90ZXh0LXdyYXAtaW4tYS1jYW52YXMtZWxlbWVudFxyXG4gICAgd3JhcF9wYXJhZ3JhcGhfdGV4dCh0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRleHQuc3BsaXQoXCJcXG5cIikubWFwKHBhcmEgPT4gdGhpcy53cmFwX3RleHQocGFyYSkpLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpO1xyXG4gICAgfVxyXG4gICAgd3JhcF90ZXh0KHRleHQpIHtcclxuICAgICAgICB2YXIgd29yZHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICB2YXIgbGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgY3VycmVudExpbmUgPSB3b3Jkc1swXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuaW1hZ2UueCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgd29yZCA9IHdvcmRzW2ldO1xyXG4gICAgICAgICAgICB2YXIgdyA9IGNvbnRleHQubWVhc3VyZVRleHQoY3VycmVudExpbmUgKyBcIiBcIiArIHdvcmQpLndpZHRoO1xyXG4gICAgICAgICAgICBpZiAodyA8IHRoaXMuaW1hZ2Uud2lkdGggLSAyMCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgKz0gXCIgXCIgKyB3b3JkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChjdXJyZW50TGluZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSA9IHdvcmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGluZXMucHVzaChjdXJyZW50TGluZSk7XHJcbiAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgfVxyXG4gICAgd3JpdGVfdGV4dCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwid3JpdGluZ1wiKTtcclxuICAgICAgICB2YXIgdHh0ID0gdGhpcy53cmFwX3BhcmFncmFwaF90ZXh0KFwiTWlzc2lvbjpcXG5cIiArIHRoaXMudGV4dCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0eHQpO1xyXG4gICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgdHh0Lmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQodHh0W2xdLCB0aGlzLnggKyAyMCwgdGhpcy5iX3RleHRfcG9zKTtcclxuICAgICAgICAgICAgdGhpcy5iX3RleHRfcG9zICs9IDIwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2V0X3RleHRfcG9zKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcHJlbG9hZF9pbWcoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImxvYWRpbmcgaW1hZ2VzXCIpO1xyXG4gICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uXCIpXHJcbiAgICAvL3ZhciBwb3B1cCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgLy9idXR0b24uc3JjID0gXCJodHRwOi8vaTYzLnRpbnlwaWMuY29tL3I3bmQ0NC5qcGdcIjtcclxuICAgIC8vcG9wdXAuc3JjID0gXCJodHRwOi8vaTY0LnRpbnlwaWMuY29tLzJ3NWl1ajYuanBnXCI7XHJcbiAgICBpbWFnZXNbXCJidXR0b25cIl0gPSBidXR0b247XHJcbiAgICBpbWFnZXNbXCJNaW5cIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pblwiKTtcclxuICAgIGltYWdlc1tcIk1pbl9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5fcFwiKTtcclxuICAgIGltYWdlc1tcIkxhbmRvbFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZG9sXCIpO1xyXG4gICAgaW1hZ2VzW1wiTGFuZG9sX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmRvbF9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiUm9yeVwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9yeVwiKTtcclxuICAgIGltYWdlc1tcIlJvcnlfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9yeV9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiSG9yc3RcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvcnN0XCIpO1xyXG4gICAgaW1hZ2VzW1wiSG9yc3RfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9yc3RfcFwiKTtcclxuICAgIGltYWdlc1tcIkRhbnRoXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW50aFwiKTtcclxuICAgIGltYWdlc1tcIkRhbnRoX3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbnRoX3BcIik7XHJcbiAgICBpbWFnZXNbXCJiZ1wiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmdcIik7XHJcbiAgICBpbWFnZXNbXCJiZ19ldmVuaW5nXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiZ19ldmVuaW5nXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueU1pblwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueW1pblwiKTtcclxuICAgIGltYWdlc1tcInRpbnlNaW5fcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueW1pbl9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUxhbmRvbFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWxhbmRvbFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlMYW5kb2xfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWxhbmRvbF9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUhvcnN0XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55aG9yc3RcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55SG9yc3RfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWhvcnN0X3BcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55Um9yeVwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueXJvcnlcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55Um9yeV9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55cm9yeV9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueURhbnRoXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55ZGFudGhcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55RGFudGhfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWRhbnRoX3BcIik7XHJcbiAgICBpbWFnZXNbXCJwYXNzXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzXCIpO1xyXG4gICAgaW1hZ2VzW1wiTWluc3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5zcHJcIik7XHJcbiAgICBpbWFnZXNbXCJMYW5kb2xzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmRvbHNwclwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0c3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3JzdHNwclwiKTtcclxuICAgIGltYWdlc1tcIlJvcnlzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlzcHJcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aHNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFudGhzcHJcIik7XHJcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlc1tcImJnXCJdKTtcclxuICAgIGltYWdlc1tcInBvcHVwXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cFwiKTtcclxuICAgIGltYWdlc1tcIm9rXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJva1wiKTtcclxuICAgIGltYWdlc1tcImdhbWVkb25lXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lb3ZlclwiKTtcclxuICAgIGltYWdlc1tcIm1vb25cIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vb25cIik7XHJcbiAgICBpbWFnZXNbXCJzdW5cIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1blwiKTtcclxuICAgIGltYWdlc1tcImRpYWxvZ2JveFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlhbG9nYm94XCIpO1xyXG4gICAgaW1hZ2VzW1wic3RhcnRzY3JlZW5cIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0c2NyZWVuXCIpXHJcbn1cclxuZnVuY3Rpb24gZGlhbG9nKCkge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIDkwMCwgNjUwKTtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcImRpYWxvZ2JveFwiXSwgMCwgMzUwKTtcclxuICAgIGNvbnRleHQuZm9udCA9ICcxMHB4IFwiUHJlc3MgU3RhcnQgMlBcIic7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICAvL3RoaXMgaXMgbWUgc3RhcnRpbmcgdG8gdHJ5IGFuZCBtYWtlIHRoZSBkaWFsb2cgc2NyZWVuLCBJJ20gbGVhdmluZyBpdCBhbG9uZSBmb3Igbm93IFxyXG4gICAgLy9idXQgaSB0aGluayB0aGF0IGV2ZW50dWFseWwgc2V0dGluZyBpdCB1cCBpbiBhIHdheSBzaW1pbGFyIHRvIE1pc3Npb25zIHdvdWxkIGJlIGdvb2QgXHJcbiAgICAvL3Rob3VnaCBJIHdvbmRlciBob3cgSSdkIGhhbmRsZSBhdmF0YXJzIGFuZCBzdWNoLCBkdW5ubyBpZiBpdGQgYmUgYSBzZXBlcmF0ZSB0aGluZyBvciBhIGRpY3Rpb25hcnkgXHJcbiAgICAvL3doYXQgZXZlbiBpcyBhIGRpY3Rpb25hcnkgXHJcblxyXG5cclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfcm9zdGVyKCkge1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIk1pblwiLCB7ICdzdHInOiA3LCAnbWFnJzogMCwgJ2ludCc6IDMgfSwgXCJNaW5zcHJcIikpOyAvL21ha2UgYSBkaWN0aW9uYXJ5L2xhYmVsIGl0XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiTGFuZG9sXCIsIHsgJ3N0cic6IDAsICdtYWcnOiA2LCAnaW50JzogNCB9LCBcIkxhbmRvbHNwclwiKSk7XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiSG9yc3RcIiwgeyAnc3RyJzogOCwgJ21hZyc6IDAsICdpbnQnOiAyIH0sIFwiSG9yc3RzcHJcIikpO1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIlJvcnlcIiwgeyAnc3RyJzogMiwgJ21hZyc6IDYsICdpbnQnOiAyIH0sIFwiUm9yeXNwclwiKSk7XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiRGFudGhcIiwgeyAnc3RyJzogMiwgJ21hZyc6IDIsICdpbnQnOiA2IH0sIFwiRGFudGhzcHJcIikpO1xyXG4gICAgZm9yICh2YXIgYyBpbiByb3N0ZXIpIHtcclxuICAgICAgICByb3N0ZXJbY10uY3JlYXRlX2FmZmluaXR5KCk7IC8vc3RhcnQgYXQgMj9cclxuICAgICAgICBhZGRBZ2VudChyb3N0ZXJbY10ubmFtZSk7IC8vYWRkIGFnZW50IGZvciBiZWhhdmlvciB0cmVlXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbY10pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZV9taXNzaW9ucygpIHtcclxuICAgIC8vdGVtcGxhdGU6IFxyXG4gICAgLy9taXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJ0aXRsZVwiLCBcImRlc2NcIiwgXCJzdGF0XCIsIDx0b3RhbHB0cz4sIDxkaWZmaWN1bHR5PiwgXCJ3aW5cIiwgXCJsb3NlXCIsIDxsZW4qMj4sIDxhcHBlYXJkYXk+KSk7XHJcbiAgICAvL2RheSAxXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBbiBhbnRpbWFnaWMgcmF0IGhhcyB0YWtlbiBvdmVyIG15IGF0dGljIGFuZCBtYXkgYmUgYnVpbGRpbmcgYSBzbWFsbCBuYXRpb24gc3RhdGVcIiwgXCJJIGNhbid0IGdldCB0byBteSBncmFuZHBhcmVudCdzIG9sZCBwaG90b3MgYW55bW9yZSFcIiwgXCJzdHJcIiwgNSwgMSwgXCJJIGZsZXhlZCBhdCB0aGUgcmF0IGFuZCBpdCBsZWZ0IVwiLCBcIlRoZSByYXQga2luZyByYWlucyBzdXByZW1lIGFuZCB3aXNoZXMgdG8gYmUgcGFpZCByZXBhcmF0aW9ucyB2aWEgY29ybi5cIiwgMiwgMSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiTG9zdCBjYXRcIiwgXCJTbmVha3kgb2wnIGZsdWZmZXIgZXNjYXBlZCFcIiwgXCJpbnRcIiwgNSwgMSwgXCJXZSBmb3VuZCB0aGUgY2F0IGJlaGluZCBhIGR1bXBzdGVyLiBJdCBoYWQgYSBub3RlIGluIGl0cyBjb2xsYXIgdGhhdCBzYWlkICdzaExkSWZnc2RGc2pkRWFkbmYgZEZqZmtzUmdqT2JNbmYgZHNNamFFZkFuZ05rZG5JYk5rRydcIiwgXCJXaGF0IGNhdD9cIiwgMiwgMSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiTXkgc2hlZXAga2VlcCBvbiBnb2luZyBtaXNzaW5nXCIsIFwiV2hlcmUgYXJlIHRoZXkgZ29pbmc/IFdoYXQgYXJlIHRoZXkgZG9pbmc/IEFyZSB0aGV5IHRhbGtpbmcgYWJvdXQgbWU/Pz8gSSBoYXZlIHRvIGtub3chXCIsIFwibWFnXCIsIDgsIDIsIFwiVGhleSB3ZXJlIGJlaW5nIHVzZWQgYnkgdGhlIGdvYmxpbnMgZm9yIGZhbnRhc3kgZm9vdGJhbGwuIFRoZXkgd2VyZSByZXR1cm5lZCwgc2xpZ2h0bHkgbW9yZSBhcm1vcmVkLiBcIiwgXCJTaGVlcCBhcmVuJ3QgcmVhbC5cIiwgMiwgMSkpO1xyXG4gICAgLy9kYXkgMlxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiU2xpbWVzIGFyZSBlYXRpbmcgbXkgcG90YXRvZXMhXCIsIFwiSSBoYWQgb25lIHBsYW4gYW5kIHRoYXQgcGxhbiB3YXMgd2hhY2tpbmcgdGhlbSB3aXRoIGEgc3dvcmQgYW5kIGl0IGRpZG4ndCB3b3JrLlwiLCBcIm1hZ1wiLCA4LCAyLCBcIlNsaW1lcyB6YXBwZWQsIG1pc3Npb24gY29tcGxldGUhXCIsIFwiVGhlIHNsaW1lcyBzaG9vayBvZmYgYWxsIHRoZSBwaHlzaWNhbCBkYW1hZ2Ugd2UgY291bGQgZG8gc28gd2Ugc2hvdmVkIHRoZW0gaW50byBhIGhvbGUgYW5kIGhvcGVkIGZvciB0aGUgYmVzdC5cIiwgMiwgMikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiR29ibGlucyB3b24ndCBzdG9wIGhlY2tsaW5nIG15IHNoZWVwXCIsIFwiVGhleSdyZSBnZXR0aW5nIHZlcnkgc3RyZXNzZWQgb3V0ISBIZWxwIVwiLCBcInN0clwiLCAxMCwgMywgXCJUaGUgc2hlZXAgY2FuIHNoZWVwIGluIHBlYWNlIG5vdyFcIiwgXCJXZSBsb3N0LCBidXQgb24gdGhlIGJyaWdodCBzaWRlIEkgZG9uJ3QgdGhpbmsgc2hlZXAgdW5kZXJzdGFuZCBFbmdsaXNoLlwiLCAyLCAyKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJJIHRoaW5rIEdlb3JnZSBpcyBhIHZhbXBpcmVcIiwgXCJIZSBuZXZlciBlYXRzIGFuZCBoaXMgc2hpcnRzIGFyZSBhbHdheXMgc3RhaW5lZCB3aXRoIGJsb29kIVwiLCBcImludFwiLCA2LCAxLCBcIkdlb3JnZSBpcy4uLmEgc2h5IHdpbmVyeSB3b3JrZXIuIFdlIGJvdWdodCBoaW0gbmV3IHNoaXJ0cy5cIiwgXCJHZW9yZ2UgbW92ZWQgb3V0IGJlZm9yZSB3ZSBjb3VsZCB0YWxrIHRvIGhpbS4uLlwiLCAyLCAyKSk7XHJcbiAgICAvL2RheSAzXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBbiB1bmRlYWQgYXJteSBpcyBpbnZhZGluZyFcIiwgXCJUSEVZJ1ZFIEdPVFRFTiBJTlRPIFRIRSBNSUxLIEJBUk5TISBXRSdSRSBET09NRUQhXCIsIFwibWFnXCIsIDE0LCA1LCBcIldhc24ndCB0b28gaGFyZCwgd2UganVNYXNFZHNBZmdOdWJJak52bmN4RyBGYXNqUmRmT2hnTWhnamQgZHNMamZJZGtGbmdFZmtqXCIsIFwiVGhlIGNhbGNpdW0uLml0IG1hZGUgdGhlbSAuLi4udG9vIHBvd2VyZnVsXCIsIDIsIDMpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlRIRSBTS1kgVFVSTkVEIFJFRFwiLCBcIldIWSBJUyBJVCBSRUQ/Pz9cIiwgXCJpbnRcIiwgNiwgMSwgXCJJdC4uLndlIGhhZCB0byBzcGVuZCAzIGhvdXJzIGV4cGxhaW5pbmcgdGhlIHN1bnNldCB0byBhIGZhbWlseSBvZiA2LiBJIG1lYW4gbW9uZXkgaXMgbW9uZXkgYnV0IGhvdydkIHRoaXMgbWlzc2lvbiBldmVuIGdldCBvbiBvdXIgbGlzdC5cIiwgXCJXZSBzdG9wcGVkIGJ5IGFuZCB0aGV5IHVoaGguLnNhaWQgYSBsb3Qgb2Ygd29yZHMgYW5kIGFmdGVyIGFuIGhvdXIgd2UgZ3JhY2lvdXNseSBqdW1wZWQgb3V0IHRoZSB3aW5kb3cgdG8gZXNjYXBlLiBcIiwgMiwgMykpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiTGljaCBLaW5nIGNhdXNpbmcgYSBydWNrdXNcIiwgXCJVbmhvbHkgbWFnaWNzIGFuZCBsb3VkLCBib29taW5nIG5vaXNlcyBhcmUgY29taW5nIGZyb20gdGhlIGxpY2gncyBrZWVwLCBzZW5kIGhlciBhIHdhcm5pbmchXCIsIFwibWFnXCIsIDEyLCA0LCBcIk91ciBtYWdpYyB3YXMgY29vbGVyIHRoYW4gaGVycyBzbyBzaGUgYWdyZWVkIHRvIG1vdmUgaGVyIHBhcnR5IGRlZXBlciB1bmRlcmdyb3VuZFwiLCBcIkxpY2ggXFxcIlBhcnR5YnJvZHVkZWZlbGxhXFxcIiB3YXMgZGVlcGx5IHVuaW1wcmVzc2VkIGJ5IHVzIGFuZCB0dXJuZWQgdXAgaGVyIGR1YnN0ZXAgbG91ZGVyXCIsIDIsIDMpKTtcclxuICAgIC8vZGF5IDRcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkEgZmlzaCBsZWFybmVkIHRvIHdhbGsgb24gbGFuZCBhbmQgaGVzIHVzaW5nIGhpcyBsZWdzIGV4Y2x1c2l2ZWx5IGZvciBldmlsXCIsIFwiSGUgY2FuJ3QgaGFuZGxlIHRoZSByZXNwb25zaWJpbGl0eSBvZiBoYXZpbmcgbGVncyEgSGUncyByYWlzaW5nIGEgdGFkcG9sZSBhcm15IVwiLCBcInN0clwiLCAxMCwgMywgXCJIZSBnb3Qgc3VwbGV4ZWQgYmFjayBpbnRvIHRoZSBvY2VhbiFcIiwgXCJIaXMgZXZpbCBjb250aW51ZXMuLi4uLnRoZSBuZWZlcmlvdXMgQ2FwdGFpbiBMZWdiZWFyZFwiLCAyLCA0KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJGb2xsb3cgbXkgY2F0IGFyb3VkIHRvIHNlZSB3aGF0IHNoZSBkb2VzIGFsbCBkYXlcIiwgXCJJIGxvc2UgaGVyIGV2ZXJ5IHRpbWUgSSB0cnksIEkgaGF2ZSB0byBrbm93IVwiLCBcImludFwiLCA4LCAyLCBcIkRlYXIgZ29kIHRoaXMgY2F0IGdldHMgc28gbWFueSB0cmVhdHMuIFBsZWFzZSBzdG9wIGZlZWRpbmcgaGVyIHNoZXMgdG9vIHBvd2VyZnVsLlwiLCBcIk91dHNtYXJ0ZWQgYnkgYSBjYXQuLi4uanVzdCBhbm90aGVyIG5vcm1hbCBkYXkgaG9uZXN0bHlcIiwgMiwgNCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiU3RvcCB0aGVzZSB3ZWVrbHkgYmFyZmlnaHRzIVwiLCBcIkV2ZXJ5IFdlZG5lc2RheSBhbiBlbGYgYW5kIGFuIG9yYyBjb21lIHRvIG15IGJhciwgYW5kIHRoZXkgYWx3YXlzIGVuZCB1cCBmaWdodGluZyEgVGhleSByZWZ1c2UgdG8gY29tZSBvbiBkaWZmZXJlbnQgZGF5cyFcIiwgXCJzdHJcIiwgOCwgMiwgXCJUaGV5IHN0YXJ0ZWQgdGhyb3dpbmcgY2hhaXJzIGFnYWluIHNvIHdlIGFsc28gdGhyZXcgY2hhaXJzIGF0IHRoZW0uIFRoZXkgd2VyZSBmb3JjZWQgdG8gdGVhbSB1cCBhZ2FpbnN0IHVzIGFuZCBib25kZWQgb3ZlciB0aGVpciBzaGFyZWQgZGVmZWF0LiBUaGVpciB3ZWRkaW5nIGlzIG5leHQgd2VlaywgSSB0aGluayB0aGUgcHJvYmxlbSBpcyBzb2x2ZWRcIiwgXCJXZSBjb3VsZG4ndCBzdG9wIHRoZW0uIEkgd29uZGVyIGlmIHRoZXknbGwgc3RpbGwgYmUgYXQgaXQgd2hlbiBJIGhhdmUgZ3JhbmRraWRzLi4uXCIsIDIsIDQpKTtcclxuICAgIC8vZGF5IDVcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIktyYWtlbiB3b24ndCBzdG9wIHJlYXJyYW5naW5nIHRoZSBib2F0cyBhdCB0aGUgZG9jayBldmVyeSBuaWdodCFcIiwgXCJXZSBkb24ndCBuZWVkIG91ciBib2F0cyBvcmRlcmVkIGJ5IGNvbG9yISBXZSBuZWVkIHRoZW0gd2hlcmUgd2UgcGFya2VkIHRoZW0hXCIsIFwibWFnXCIsIDEyLCA0LCBcIlR1cm5zIG91dCwgc2hlIGp1c3QgbmVlZGVkIGEgdHJhbnNsYXRvci4gV2Ugc2V0IHVwIGEgbWFnaWNhbCBvbmUgYW5kIG5vdyB0aGUgS3Jha2VuIGdldHMgYSBzYWxhcnkgb2YgZmlzaCB0byBrZWVwIHRyYWNrIG9mIGFsbCB0aGUgYm9hdHNcIiwgXCJXZWxsIEkgZ3Vlc3MgdGhleSdsbCBqdXN0IGhhdmUgdG8gYWNjZXB0IHRoZWlyIG5ldyBvcmdhbml6YXRpb25hbCBvdmVybG9yZFwiLCAyLCA1KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJWRVJZIExBUkdFIEJFQVIhIFZFUlkgVkVSWSBMQVJHRSBCRUFSISFcIiwgXCJCRUFSIExBUkdFXCIsIFwic3RyXCIsIDEwLCAzLCBcIkdvb2QgbmV3cywgd2Ugd29uISBCYWQgbmV3cywgaXQgd2FzIGEgZHJhZ29uLlwiLCBcIklUIFdBUyBOT1QgQSBCRUFSIVwiLCAyLCA1KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBIGJpZyByb2NrIGlzIGZhbGxpbmcgZnJvbSB0aGUgc2t5IGJ1dCBpdCdzIHByb2JhYmx5IGZpbmVcIiwgXCJJIG1lYW4gYSBmaXJleSBkZWF0aCBkb2Vzbid0IHNvdW5kIGxpa2UgdGhlIHdvcnN0IHRoaW5nIGluIHRoZSB3b3JsZFwiLCBcIm1hZ1wiLCAxNCwgNSwgXCJXZSBtYWRlIGEgYmlnIGJhdCBvdXQgb2YgbWFnaWMgYW5kIHdoYWNrZWQgaXQgc29tZXdoZXJlIGVsc2UhXCIsIFwiaXQgd2FzIG5vdCBmaW5lISEhXCIsIDIsIDUpKTtcclxuICAgIC8vZGF5IDZcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlNvbWVvbmUncyBzdG9sZW4gdGhlIHRvd24gZmxhZyFcIiwgXCJXZSBuZWVkIG91ciBmbGFnIVwiLCBcImludFwiLCA4LCAyLCBcIldlIGZvdW5kIGl0IGluIGEgc2hvcHBpbmcgY2FydCAxMCBtaWxlcyBhd2F5XCIsIFwiV2UgY291bGRuJ3QgZmluZCBpdCBzbyB3ZSByZXBsYWNlZCB0aGUgZmxhZyB3aXRoIGEgY29hdCBzb21lb25lIGxlZnQgb3V0Li50aGUgbWF5b3IgaGFzIG5vdCBub3RpY2VkIHlldC5cIiwgMiwgNikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiR29sZW0gcmFtcGFnaW5nIHRocm91Z2ggdG93biFcIiwgXCJJVCdTIERFU1RST1lJTkcgVEhFIEZMT1dFUlMgQU5EIE9OTFkgVEhFIEZMT1dFUlMhIVwiLCBcInN0clwiLCAxMiwgNCwgXCJXZSBoYWNrZWQgaXQhIFdpdGggYW4gYXhlLiBCdXQgc29tZWhvdyB0aGlzIGZpeGVkIGl0IGFuZCBub3cgaXRzIGEgbm9ybWFsIGdhcmRlbmluZyBnb2xlbSFcIiwgXCJJdCBiZWF0IHVzIHVwIGFuZCByYW4gaW50byB0aGUgY291bnRyeXNpZGUgdG8gY2FzdHJhdGUgbW9yZSBwbGFudHNcIiwgMiwgNikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQSB0aW55IGRyYWdvbiB3b24ndCBnZXQgb3V0IG9mIG15IHNpbHZlcndlYXIgY2FiaW5ldCFcIiwgXCJOb3cgbm9ybWFsbHkgdGhpcyB3b3VsZG4ndCBiZSBhbiBpc3N1ZSBidXQgb3VyIGhvdXNlIGlzIHZlcnkgZmxhbW1hYmxlIVwiLCBcImludFwiLCAxMCwgMywgXCJMaWwgZ3V5IGp1c3Qgd2FudHMgdG8gaG9hcmQgc3Bvb25zLiBXZSBtYWRlIGhpbSBhIHBpbGUgb2YgZG9uYXRlZCBzcG9vbnMgb3V0IGluIHRoZSB3b29kcyBhbmQgaGUgc2VlbXMgdmVyeSBoYXBweSFcIiwgXCJXZWxsIHRoZSBkcmFnb24ncyBvdXQgb2YgdGhlIGNhYmluZXQsIGJ1dCB0aGVpciBob3VzZSBpcy4uLnNsaWdodGx5Li4uLmFibGF6ZS5cIiwgMiwgNikpO1xyXG4gICAgLy9kYXkgN1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiflNoYXJyb1wiLCBcImRqT2ZuTGtnaERqZm5kIEZzbFJqa0lnRWZsak5uRGZrZCBka2pzZmdua2pnaEJhc2RFZmhnIFdqa0VsO0xqaGtnakxoZmRzXCIsIFwiaW50XCIsIDEwMCwgMTAsXCJ0aGlzIG91dGNvbWUgaXMgbnVtZXJpY2FsbHkgaW1wb3NzaWJsZSwgd2hhdCBoYXZlIHlvdSBkb25lIG5vdyBZdWtvLlwiLCBcIldlIGxvb2tlZCBldmVyeXdoZXJlIGJ1dCB3ZSBjb3VsZG4ndCBmaW5kIHRoZW0uLi4gVGhleSBzYWlkIHRoZXknZCBiZSBiYWNrIGJ5IG5vdyByaWdodD8gLi5ndWVzcyB5b3UnbGwgaGF2ZSB0byBsb29rIGFmdGVyIHRoaW5ncyBhIHdoaWxlIGxvbmdlci4uXCIsIDIsIDcpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIn5TaGFycm9cIiwgXCJkak9mbkxrZ2hEamZuZCBGc2xSamtJZ0VmbGpObkRma2QgZGtqc2ZnbmtqZ2hCYXNkRWZoZyBXamtFbDtMamhrZ2pMaGZkc1wiLCBcImludFwiLCAxMDAsIDEwLFwidGhpcyBvdXRjb21lIGlzIG51bWVyaWNhbGx5IGltcG9zc2libGUsIHdoYXQgaGF2ZSB5b3UgZG9uZSBub3cgWXVrby5cIiwgXCJXZSBsb29rZWQgZXZlcnl3aGVyZSBidXQgd2UgY291bGRuJ3QgZmluZCB0aGVtLi4uIFRoZXkgc2FpZCB0aGV5J2QgYmUgYmFjayBieSBub3cgcmlnaHQ/IC4uZ3Vlc3MgeW91J2xsIGhhdmUgdG8gbG9vayBhZnRlciB0aGluZ3MgYSB3aGlsZSBsb25nZXIuLlwiLCAyLCA3KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJ+U2hhcnJvXCIsIFwiZGpPZm5Ma2doRGpmbmQgRnNsUmprSWdFZmxqTm5EZmtkIGRranNmZ25ramdoQmFzZEVmaGcgV2prRWw7TGpoa2dqTGhmZHNcIiwgXCJpbnRcIiwgMTAwLCAxMCxcInRoaXMgb3V0Y29tZSBpcyBudW1lcmljYWxseSBpbXBvc3NpYmxlLCB3aGF0IGhhdmUgeW91IGRvbmUgbm93IFl1a28uXCIsIFwiV2UgbG9va2VkIGV2ZXJ5d2hlcmUgYnV0IHdlIGNvdWxkbid0IGZpbmQgdGhlbS4uLiBUaGV5IHNhaWQgdGhleSdkIGJlIGJhY2sgYnkgbm93IHJpZ2h0PyAuLmd1ZXNzIHlvdSdsbCBoYXZlIHRvIGxvb2sgYWZ0ZXIgdGhpbmdzIGEgd2hpbGUgbG9uZ2VyLi5cIiwgMiwgNykpO1xyXG4gICAgLy9kYXkgOFxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiSSBmb3VuZCBhIHN3b3JkIGluIHRoZSB3b29kcyFcIiwgXCJpdCBqdXN0IHNpdHMgdGhlcmUuLi5tZW5hY2luZ2x5Li5cIiwgXCJpbnRcIiwgMTAsIDMsIFwiV2Ugd2VudCBvbiBhIGdyYW5kIGFkZW50dXJlISBXZSBzYXZlZCBsaXZlcywgZmVsbCBpbiBsb3ZlLCBidXQgbW9zdCBpbXBvcnRhbnRseS4uLiB3ZSB0aHJldyBhIHRhcnAgb3ZlciB0aGUgc3dvcmQgYW5kIGNvdmVyZWQgaXQgd2l0aCBkaXJ0LlwiLCBcInNkVGJIZkVzZiBkQ2pZa2ZDaHNMZ2pFa25kZiBkak9rZ2ZGaG9yIGZqZFNza1RmT2FzUmZZXCIsIDIsIDgpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIk15IGJhYnkgaGFzIGdsb3dpbmcgZXllcy4uXCIsIFwiU2hlJ3Mgb3RoZXJ3aXNlIG5vcm1hbC4uIGJ1dCB3ZSdyZSB3b3JyaWVkIGFib3V0IGhlciBwYXJlbnRzIGJlaW5nIGtpbGxlZCBmb3IgY2hhcmFjdGVyIGRldmVsb3BtZW50XCIsIFwibWFnXCIsIDEyLCA0LFwiV2UgdGF1Z2h0IGhlciBwYXJlbnRzIGhvdyB0byBjYXN0IG1hZ2ljISBBcyBsb25nIGFzIHRoZXkgZG9uJ3QgZGVjaWRlIHRvIGdvIG9uIGEgam91cm5leSBhbmQgZGllIGluIGEgd2FyLCBpdCBzaG91bGQgYmUgZmluZVwiICxcIlNvbWV0aW1lcyBiYWJpZXMnIGV5ZXMganVzdCBnbG93LCBpdCdzIG5vcm1hbCEgTXkgZXllcyBnbG93ZWQgd2hlbiBJIHdhcyBhIGtpZFwiLCAyLCA4KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJXaGVyZSdzIG15IG1haWwhXCIsIFwiTWFpbG1hbiB3b24ndCBkZWxpdmVyIG15IG1haWwhIFNvbWV0aGluJyBhYm91dCAnV29yayBoYXphcmRzJywgd2hhdGV2ZXIgdGhvc2UgYXJlLlwiLCBcInN0clwiLDgsIDIsIFwiIEhlciBvbGQgbWFpbGJveCB3YXMgYWN0dWFsbHkganVzdCBhIGJlYXIgdHJhcCB3aXRoIHNvbWUgcGFwZXIgaW4gaXQsIHNvIHdlIGJ1aWx0IGhlciBhIG5ldyBtYWlsYm94ISBPbmUgdGhhdCBkZWZpbmV0bHkgaXNuJ3QgYSByZXB1cnBvc2VkIGJ1Y2tldFwiLCBcIkhlci4uaG91c2UgaXMgdG9vIG9uIGZpcmUgZm9yIHVzIHRvIGZpbmQgdGhlIG1haWxib3hcIiwgMiwgOCkpO1xyXG4gICAgLy9kYXkgOVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiSGVscCBuZWVkZWQhXCIsIFwiZGhqQWZqTmZiZCBzakVkZmhUZ2tkRWZqZFJnbk5mYkFqa0x2ZHMgc1RqZFJoZlVnVHNIZGtcIixcImludFwiLCAxMiwgNCwgXCJ3ZWlyZCBqdW5rIG1haWwuLiB0b29rIHVzIGEgYml0IHRvIGZpZ3VyZSBpdCBvdXQsIGJ1dCBpZiB5b3UgbG9vayBhdCBldmVyeSBjYXBpdGFsaXplZCBsZXR0ZXIsIGl0IHNwZWxscyBvdXQgJ0FOIEVURVJOQUwgVFJVVEgnLiBTZWVtcyBsaWtlIHNvbWV0aGluZyBTaGFycm8gd291bGQgZG8sIGJ1dCB0aGlzIGtpbmQgb2YgZW5jb2RpbmcgaXMgYSBiaXQgc2ltcGxpc3RpYyBmb3IgdGhlbSwgdGhleSBhbHdheXMgbGlrZWQgdGhyb3dpbmcgcHV6emxlcyBhdCB1c1wiLCBcIml0cyBzb21lIHNvcnQgb2YgY29kZS4uYnV0IHdlIGNvdWxkbid0IGZpZ3VyZSBpdCBvdXQuIE1pZ2h0IGhhdmUgc29tZXRoaW5nIHRvIGRvIHdpdGggU2hhcnJvPyBUaGV5IGFsd2F5cyBsb3ZlZCBjb2Rlc1wiLCAyLCA5ICkpXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJGaW5kIG15IHNvbiFcIiwgXCJJJ2QgZmluZCBoaW0gYnV0IEknbSB0b28gYnVzeSB1bnJhdmVsaW5nIGEgZ292ZXJubWVudCBjb25zcGlyYWN5IGFuZCBzcGVuZGluZyAyMDAgaG91cnMgbWFraW5nIGEgZ2FyZGVuXCIsIFwic3RyXCIsIDEwLCAzLCBcIkhlIHdhcyBqdXN0IGdvaW5nIHRocm91Z2ggZ2lhbnQgYnVnIHB1YmVydHkgYW5kIG1hZGUgYSBjb2Nvb24sIHdlIGNhcnJpZWQgaXQgYmFja1wiLCBcIldlIGZvdW5kIGhpbSBidXQuLndlIHdlcmVuJ3QgYWJsZSB0byBwdXNoIGhpcyBjb2Nvb24gYmFjayBob21lLlwiLCAyLCA5KSlcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlNvbWVvbmUgc3RvbGUgdGhlIHRvd24ncyB3ZWxsIGJ1Y2tldCFcIiwgXCJUaGVzZSBidWNrZXQgY3JpbWVzIGNhbm5vdCBnbyB1bnB1bmlzaGVkIVwiLCBcImludFwiLCA4LCAyLFwiQSBmaXJlIGVsZW1lbnRhbCB3YXMgdXNpbmcgaXQgYXMgaGVyIG1haWxib3guLldlIGhlbHBlZCB0aGVtIHNldCB1cCBhIHRpbWVzaGFyZSBvbiB0aGUgYnVja2V0LCBldmVyeW9uZSdzIGhhcHB5XCIsIFwiRGFudGggc2VlbXMgdG8ga25vdyB3aGVyZSBpdCBpcyBidXQgaGUgcmVmdXNlcyB0byB0ZWxsIGFueW9uZVwiLCAyLCA5KSlcclxuICAgIC8vZGF5IDEwIFxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwic05uRVZiRWpSYmdFZE5qRG5JZk5HIHNDQWhMYkFNc2tJdFRyc1lqblwiLCBcImdVc05kdk9nQnNTZkVSdlZzRUQgYWRXaEVzYmcgQ2dFa2pBZlNoRWdkZnMgc2FrVGhkT2ZrZiBmRWtYaklnU2hUa2RnXCIsIFwiaW50XCIsIDEwMCwgMTAsIFwiSXQncyBhbGwgZmFsbGluZyBhcGFydCBub3dcIiwgXCJkZklqbmpTa2RzIGRUa3NIamFFZm5SZGpFbmYgZGprQWZhc2tqZmdmIGZMZElqa2dGZkVqaGcgZkJkRVlqZ09zTkQgZmRqVGduSGRFanNmbmcgc2RrRWdqTmZuRGdmamtkP1wiLCAyLCAxMCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwic05FZFZiRWpSYmdFTmtqRG5JTkcgc0NrQWhmTGJBTXNrSXRUcnNZXCIsIFwiZ1VzTmR2T2dCc1NmRVJ2VnNFRCBhZFdoRXNiZyBDZ0VrakFmU2hFZ2RmcyBzYWtUaGRPZmtmIGZFa1hqSWdTaFRrZGdcIiwgXCJpbnRcIiwgMTAwLCAxMCwgXCJJdCdzIGFsbCBmYWxsaW5nIGFwYXJ0IG5vd1wiLCBcImRmSWpualNrZHMgZFRrc0hqYUVmblJkakVuZiBkamtBZmFza2pmZ2YgZkxkSWprZ0ZmRWpoZyBmQmRFWWpnT3NORCBmZGpUZ25IZEVqc2ZuZyBzZGtFZ2pOZm5EZ2Zqa2Q/XCIsIDIsIDEwKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJzTm5FVmJFalJiRWROa2pESW9ORyBzQ2tBaExiQU1za0l0VHJZamRmXCIsIFwiZ1VzTmR2T2dCc1NmRVJ2VnNFRCBhZFdoRXNiZyBDZ0VrakFmU2hFZ2RmcyBzYWtUaGRPZmtmIGZFa1hqSWdTaFRrZGdcIiwgXCJpbnRcIiwgMTAwLCAxMCwgXCJJdCdzIGFsbCBmYWxsaW5nIGFwYXJ0IG5vd1wiLCBcImRmSWpualNrZHMgZFRrc0hqYUVmblJkakVuZiBkamtBZmFza2pmZ2YgZkxkSWprZ0ZmRWpoZyBmQmRFWWpnT3NORCBmZGpUZ25IZEVqc2ZuZyBzZGtFZ2pOZm5EZ2Zqa2Q/XCIsIDIsIDEwKSk7XHJcbiAgICAvL2RheSAxMVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoIChuZXcgTWlzc2lvbihcIkkgY2ZnYW4ndCBvcGVuam5iIHRoaXMgamFyIVwiLCBcIkkgd2lsbGdoZCBwYXkgeW91IG9uZSBlbnRpcmUgY2hpY2Rna2VuIGlmIHlvdSBoZWxwIG1lIG9wZW4gdGhpcyBqYXJcIiwgXCJzdHJcIiwgNiwgMSwgXCJUaGVyZSB3YXMgYS4uIGRlbW9uIGluIHRoYXQgamFyIGJ1dCBoZXkgd2UgZ290IGl0IG9wZW4hXCIsIFwiV2UgY291bGRuJ3Qgb3BlbiBpdCBzbyB3ZSBzbWFzaGVkIGl0IGFuZCBhIGRlbW9uIGNhbWUgb3V0P1wiLCAyLCAxMSkpXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBIGRyYWRnc2hnb24gYnVybnQgZGRmb3duIG15IGZhcm1zIVwiLCBcIlNoZSdzIGdvdCBhIGZsYW1ldHNnZmhocm93ZXIhIVwiLCBcIm1hZ1wiLCAxMiwgNCwgXCJXZSBzdG9sZSB0aGUgZmxhbWV0aHJvd2VyIGFuZCBzaGUgcmFuIG9mZlwiLCBcInR1cm5zIG91dCwgcHVuY2hpbmcgYSBmbGFtZXRocm93ZXIganVzdCBtYWtlcyBpdCBleHBsb2RlIGFuZCBzZXQgbW9yZSB0aGluZ3Mgb24gZmlyZS4uXCIsIDIsIDExKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBIHBsYWd1ZSBoYXMga2lkZmhzbGxlZCBteSB2aWxkZmxhZ2VcIiwgXCJXZSBuZWVocnRkIHRvIHN0b3AgcmhpdCFcIiwgXCJpbnRcIiwgMTQsIDUsIFwiSGUgd2FudGVkIHVzIHRvIGtpbGwgaGltIHRvIHN0b3AgdGhlIHBsYWd1ZSwgYnV0IHdlIGNsZWFuZWQgdXAgdGhlIHdhdHRlciBzdXBwbHkgaW5zdGVhZC4gU2hvdWxkIGJlIGZpbmUgbm93IVwiLCBcIldlIGNvdWxkbid0IGZpZ3VyZSBvdXQgdGhlIGNhdXNlIHNvIHdlIGp1c3Qgd2FsbGVkIG9mZiB0aGUgcGxhY2UuIEknbSBzdXJlIHRoYXQnbGwgbmV2ZXIgZ2V0IGRpc2NvdmVyZWQgYnkgYSBtb3JhbGx5IGdyZXkgbmVjcm9tYW5jZXIgbGF0ZXIhXCIsIDIsIDExKSk7XHJcbiAgICAvL2RheSAxMlxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiZUV2ZXJ5dGhpbmcgaXNmIG9uIGZpcmUhXCIsIFwibVkgYmFVcmJhS2N1T2UhXCIsIFwibWFnXCIsIDEyLCA0LCBcIldlIHB1dCBpdCBvdXQsIGFsdGhvdWdoLCBzb21lIG9mIHRoZSBmaXJlIHNlZW1lZCB0byBiZSBtYWRlIG91dCBvZiBzbmFrZXM/IFdobydzIHdyaXRpbmcgdGhpcz9cIiwgXCJTTkFLRSBGSVJFXCIsIDIsIDEyKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJUaGZlIGNhc3RsZSBpcyBiZWluZyBpbnZhZGVkIGJ5IGEgc21hbGwgY2hpbGQhXCIsIFwiU2hlJ3MgZ290IGRpc3Jlc3BlY3QgZm9yIGF1dGhvcml0eSBhbmQgdGhlIGxhd3Mgb2YgcGh5c2ljcyFcIiwgXCJzdHJcIiwxMiwgNCxcInRoRSBMQVdTIE9GIFBIWVNJQ1MgTUVBTiBOT1RISU5HIFRPIE1ZIFBFQ1MgflByb2JhYmx5IE1pblwiLCBcIkkgdGhpbmsgc2hlIGFjY2lkZW50YWxseSBkZWxldGVkIGhlcnNlbGY/P1wiLCAyLCAxMiApKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcImRZc09kVWYgZENBTlRmIGdTaEFqVmhFIGtUbEhyRWVNIGFBc0xkTFwiLCBcIldzZEVmZyBmTmdFRUQgaENqT2RORkxJQ1QgZFdoRXNmIE5oRWZFZ0Qgc0VqWWZFZFNnXCIsIFwiaW50XCIsIDEwMCwgMTAsIFwiWW91IGNhbid0IGJlIGhlcmVcIiwgXCJXYUhzWSBkRGZPIFlnT2hVIGREZkVOZ1kgZk1FZFwiLCAxLCAxMikpO1xyXG4gICAgLy9kYXkgMTNcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkRFZ1NUUnVPWSBUSGFFIENPTVBoSUxFUlwiLCBcIi4uLlwiLCBcInN0clwiLCAyMCwgNiwgXCJ0U2hEYUZuayB5RkpvR3VIXCIsIFwiLi4uLlwiLCAyLCAxMykpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoIChuZXcgTWlzc2lvbihcInNERVNUUk9kWSBUZUhFIENPa01QSUxFUlwiLCBcIi4uLlwiLCBcIm1hZ1wiLCAyMCwgNiwgXCJnQW9Hb0pkYkt5ZVwiLCBcIi4uLi4uXCIsIDIsIDEzKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2ggKG5ldyBNaXNzaW9uKFwiREVTVGdST1kgVG9IRSBDT01yUElMckVSXCIsIFwiLi4uXCIsIFwiaW50XCIsIDIwLCA2LCBcIkh5dVNrRG9cIiwgXCIuLi4uLi5cIiwgMiwgMTMpKTtcclxuICAgIC8vZGF5IDE0XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24gKFwiWXVrbyBUaGUgSGVyb1wiLCBcIlN0b2ljLCBwZXJoYXBzIHRvIGEgZmF1bHQuIEFuIGFnZ3Jlc2l2ZWx5IHVuaW50ZXJlc3RpbmcgcGVyc29uLCBwZXJoYXBzIHRoYXRzIHdoeSBzaGUgYmVjYW1lIHlvdS5cIiwgXCJzdHJcIiwgMSwgMywgXCJhIGZyaWVuZFwiLCBcImEgYnJpY2sgd2FsbCBvZiBhIGZyaWVuZFwiLCAxMCwgMTQpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlNoYXJybyBUaGUgTWVudG9yXCIsIFwiTGFyZ2VyIHRoYW4gbGlmZSwgdG9vIGxhcmdlIHRvIGZpdCBpbiB0aGlzIHN0b3J5LiBUaGV5IGFyZSBwcm91ZCBvZiB5b3UuIFdoZXJldmVyIHRoZXkgYXJlLi5cIiwgXCJtYWdcIiwxLDMsIFwiZ29vZCBvbCBOQiBidWRkeVwiLCBcImZsdWZmeVwiLCAxMCwxNCkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQXZpbnVzIFRoZSBDb21waWxlclwiLCBcIkEgd29ybGQgbWFkZSBvZiBzdG9yaWVzIG5lZWRzIGEgc3Rvcnl0ZWxsZXIuIEFuZCB5ZXQgYW4gZW5kIGhhZCB0byBjb21lLlwiLCBcImludFwiLCAxLCAzLCBcIndyaXRlcnMgYmxvY2sgZW5kZWQgdGhlIHdvcmxkIGJhc2ljYWxseVwiLCBcInR3YXMgYSBzaWxseSBwbG90LCBidXQgSSBoYWQgZnVuXCIsIDIwLCAxNCkpO1xyXG59XHJcbmZ1bmN0aW9uIGxvZ190ZXh0KCkge1xyXG4gICAgdmFyIGxnX3R4dCA9IFwiXCI7XHJcbiAgICBmb3IgKHZhciBlIGluIHRleHRfbG9nKSB7XHJcbiAgICAgICAgbGdfdHh0ICs9IHRleHRfbG9nW2VdICsgXCI8YnI+ICogKiAqIDxicj5cIjtcclxuICAgIH1cclxuICAgIHZhciBkaXZfbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dcIilcclxuXHJcbiAgICBkaXZfbG9nLmlubmVySFRNTCA9IGxnX3R4dDtcclxuICAgIGRpdl9sb2cuc2Nyb2xsVG9wID0gZGl2X2xvZy5zY3JvbGxIZWlnaHQ7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX2xvY2F0aW9ucygpIHtcclxuICAgIHZhciBzdHJfbG9jID0gbmV3IExvY2F0aW9uKFwiVHJhaW5pbmcgRHVtbXlcIiwgNDcwLCAzMDAsIFwic3RyXCIpO1xyXG4gICAgdmFyIG1hZ19sb2MgPSBuZXcgTG9jYXRpb24oXCJNYWdpYyBUb3dlclwiLCA3NTAsIDEwMCwgXCJtYWdcIik7XHJcbiAgICB2YXIgaW50X2xvYyA9IG5ldyBMb2NhdGlvbihcIkxpYnJhcnlcIiwgNjQwLCAyODAsIFwiaW50XCIpO1xyXG4gICAgdmFyIGFmZl9sb2MgPSBuZXcgTG9jYXRpb24oXCJHYXplYm9cIiwgNTA1LCAxMzUsIFwiYWZmaW5pdHlcIik7XHJcbiAgICB2YXIgYWZmX2xvYzIgPSBuZXcgTG9jYXRpb24oXCJHYXplYm9cIiwgNTM1LCAxMzUsIFwiYWZmaW5pdHlcIik7XHJcbiAgICB2YXIgc3RhcnRfbG9jID0gbmV3IExvY2F0aW9uKFwiT3V0c2lkZVwiLCA2MDAsIDMxNSk7XHJcbiAgICBsb2NhdGlvbnNbXCJzdGFydFwiXSA9IHN0YXJ0X2xvYztcclxuICAgIGxvY2F0aW9uc1tcInN0clwiXSA9IHN0cl9sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJtYWdcIl0gPSBtYWdfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wiaW50XCJdID0gaW50X2xvYztcclxuICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MVwiXSA9IGFmZl9sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0gPSBhZmZfbG9jMjtcclxuXHJcbn1cclxuZnVuY3Rpb24gZmluZF9pbl9saXN0KHR5cGUsIHRvX3NlYXJjaCkge1xyXG4gICAgaWYgKHR5cGUgPT0gXCJyb3N0ZXJcIikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9zdGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyb3N0ZXJbaV0ubmFtZSA9PSB0b19zZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwibWlzc2lvblwiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXNzaW9uX2JvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtaXNzaW9uX2JvYXJkW2ldLnRpdGxlID09IHRvX3NlYXJjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbmZ1bmN0aW9uIGRyYXdfY2FudmFzKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJkcmF3aW5nIGNhbnZhc1wiKTtcclxuICAgIGxvZ190ZXh0KCk7XHJcbiAgICAvL3N0dWZmIHRvIHJlZHJhdyB3aGVuIHBvcHVwIGNsb3Nlcy4gXHJcbiAgICAvLyBvdXRsaW5lXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5saW5lV2lkdGggPSBcIjZcIjtcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICBjb250ZXh0LnJlY3QoMCwgMCwgODAwLCA2NTApO1xyXG4gICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgIC8vY29uc29sZS5sb2coaW1hZ2VzW1wiYmdcIl0pO1xyXG4gICAgaWYgKGN1cnJlbnRfdGltZSA9PSBcIm1vcm5pbmdcIikge1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcImJnXCJdLCAwLCAwKTtcclxuICAgIH1cclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJldmVuaW5nXCIpIHtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZXNbXCJiZ19ldmVuaW5nXCJdLCAwLCAwKTtcclxuICAgIH1cclxuICAgIC8vY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiYmdcIl0sIDAsIDApOyAvL2RyYXcgYmdcclxuICAgIGRyYXdfY2hhcmFjdGVyX2J1dHRvbnMoKTtcclxuICAgIGRyYXdfY2hhcmFjdGVycygpO1xyXG4gICAgY29udGV4dC5maWxsVGV4dChcIkRheSBcIiArIGN1cnJlbnRfZGF5LCA4NDAsIDU3NSk7XHJcbiAgICBkcmF3X3RpbWUoKTtcclxuICAgIHByb2ZpbGVfdGV4dCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3X3RpbWUoKSB7XHJcbiAgICBpZiAoY3VycmVudF90aW1lID09IFwibW9ybmluZ1wiKSB7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wic3VuXCJdLCA4NDAsIDUyMCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY3VycmVudF90aW1lID09IFwiZXZlbmluZ1wiKSB7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wibW9vblwiXSwgODQwLCA1MjApO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGRyYXdfZ2FtZV9kb25lKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJkb25lXCIpO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiZ2FtZWRvbmVcIl0sIDAsIDApOyAvL2RyYXcgZG9uZVxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgIGNvbnRleHQuZm9udCA9IFwiMTVweCAnUHJlc3MgU3RhcnQgMlAnXCJcclxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJNaXNzaW9ucyBBdHRlbXB0ZWQ6IFwiICsgbnVtX21pc3Npb25zLCAzMDAsIDM2MCk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTWlzc2lvbnMgU3VjY2VlZGVkOiBcIiArIG51bV9zdWNjZXNzZnVsLCAzMDAsIDQwMCk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTWlzc2lvbnMgRmFpbGVkOiBcIiArIG51bV9mYWlsZWQsIDMwMCwgNDQwKTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVfdGltZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidXBkYXRlIHRpbWUgcmVzZXRcIik7XHJcbiAgICBwb3AuaXNfb3BlbiA9IGZhbHNlO1xyXG4gICAgc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgIHNlbGVjdGVkMiA9IG51bGw7XHJcbiAgICBzZWxlY3RlZF9taXNzaW9uID0gbnVsbDtcclxuICAgIC8vcG9wLmRpc21pc3MoKTtcclxuXHJcbiAgICAvL2ZpcnN0OiBoYXZlIGNoYXJhY3RlcnMgZG8gdGhlaXIgYWN0aW9uc1xyXG4gICAgbW92ZV9jaGFyYWN0ZXJzKCk7XHJcbiAgICAvL2ZvciBldmVyeSBtaXNzaW9uIGFzc2lnbmVkLCB1cGRhdGVkIHRoZSB0aW1lIHN0dWZmLiBEb2luZyB0aGlzIGJlZm9yZSB0aGUgY2FudmFzIHJlZHJhdy5cclxuICAgIGZvciAodmFyIG0gaW4gbWlzc2lvbl9ib2FyZCkge1xyXG4gICAgICAgIGlmIChtaXNzaW9uX2JvYXJkW21dLmFzc2lnbmVkKSB7XHJcbiAgICAgICAgICAgIG1pc3Npb25fYm9hcmRbbV0uZGVjcmVhc2VfdGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vbmV4dCwgdXBkYXRlIHRpbWUuXHJcbiAgICBpZiAoY3VycmVudF90aW1lID09IFwibW9ybmluZ1wiICYmIGN1cnJlbnRfZGF5IDwgbGFzdF9kYXkpIHtcclxuICAgICAgICBjdXJyZW50X3RpbWUgPSBcImV2ZW5pbmdcIjtcclxuICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgY3VycmVudF9kYXkrKztcclxuICAgICAgICBpZiAoY3VycmVudF9kYXkgPCBsYXN0X2RheSkge1xyXG4gICAgICAgICAgICBjdXJyZW50X3RpbWUgPSBcIm1vcm5pbmdcIjtcclxuICAgICAgICAgICAgZGF5X2NoYW5nZSgpO1xyXG4gICAgICAgICAgICB2YXIgaW50dHZJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KGRheV9zY3JlZW5fYWN0aXZlX3NldCwgMTUwMCk7XHJcbiAgICAgICAgICAgIHZhciBpbnR2SUQgPSB3aW5kb3cuc2V0VGltZW91dChkcmF3X2NhbnZhcywgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB0ZXh0X2ZpeCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvL2RyYXdfY2FudmFzKCk7IC8vcmVkcmF3IHRleHQuXHJcbiAgICBpZiAoY3VycmVudF9kYXkgPT0gbGFzdF9kYXkpIHtcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiWW91IGRpZCBhIGdvb2Qgam9iIFl1a29cIik7XHJcbiAgICAgICAgbG9nX3RleHQoKTtcclxuICAgICAgICBkcmF3X2dhbWVfZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiRGF5IFwiICsgY3VycmVudF9kYXkgKyBcIiwgXCIgKyBjdXJyZW50X3RpbWUpO1xyXG4gICAgfVxyXG4gICAgLy9jaGFyYWN0ZXJzIGFsd2F5cyBtb3ZlXHJcblxyXG5cclxufVxyXG5mdW5jdGlvbiBzdGFydF9zY3JlZW4oKSB7XHJcbiAgICBzdGFydF9zY3JlZW5fYWN0aXZlID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wic3RhcnRzY3JlZW5cIl0sIDAsIDApO1xyXG5cclxuICAgLy8gY29udGV4dC5mb250ID0gJzY4cHggXCJQcmVzcyBTdGFydCAyUFwiJztcclxuICAgIC8vL2NvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiXHJcbiAgICAvL2NvbnRleHQuZmlsbFRleHQoXCJSaW1lIFJveWFsZVwiLCAxMDAsIDM1MCk7XHJcblxyXG4gICAgLyp2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdO1xyXG4gICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIgKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3RhcnRfc2NyZWVuX2tpbGwoKTtcclxuICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgICB9KTsqL1xyXG59XHJcbmZ1bmN0aW9uIHN0YXJ0X3NjcmVlbl9raWxsKCkge1xyXG4gICAgc3RhcnRfc2NyZWVuX2FjdGl2ZSA9IGZhbHNlO1xyXG5cclxufVxyXG5mdW5jdGlvbiBkYXlfc2NyZWVuX2FjdGl2ZV9zZXQoKSB7XHJcbiAgICBkYXlfc2NyZWVuX2FjdGl2ZSA9IGZhbHNlXHJcbn1cclxuZnVuY3Rpb24gZGF5X2NoYW5nZSgpIHtcclxuICAgIC8vTmV3IGRheSBzY3JlZW5cclxuICAgIC8vY29uc29sZS5sb2coXCJkYXkgY2hhbmdlXCIpO1xyXG4gICAgLy9ibGFjayBpcyBkZWZhdWx0LCBkb24ndCBuZWVkIHRvIHNwZWNpZnlcclxuXHJcbiAgICBkYXlfc2NyZWVuX2FjdGl2ZSA9IHRydWVcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCA5MDAsIDY1MCk7XHJcblxyXG4gICAgY29udGV4dC5mb250ID0gJzY4cHggXCJQcmVzcyBTdGFydCAyUFwiJztcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIC8vY29udGV4dC50ZXh0QmFzZWxpbmUgPSAndG9wJzsgPC0tIGNhdXNlZCB0ZXh0IHNsaWRpbmcgYnVnXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KCdEYXknICsgY3VycmVudF9kYXksIDMyNSwgMzUwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGV4dF9maXgoKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIlxyXG4gICAgY29udGV4dC5mb250ID0gXCI4cHggJ1ByZXNzIFN0YXJ0IDJQJ1wiXHJcbn1cclxuZnVuY3Rpb24gcHJvZmlsZV90ZXh0KCkge1xyXG4gICAgLy92YXIgcyA9IC8qJ01pbiB0aGUgS25pZ2h0JyArICovIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJNaW5cIildLmRpc3BsYXlfc3RhdHMoKVxyXG4gICAgLy8gIHZhciBzdHIgPSB0aGlzLndyaXRlX3RleHQocyk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KCdNaW4gdGhlIEtuaWdodCcsIDcwLCA0MCk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJNaW5cIildLmRpc3BsYXlfc3RhdHMxKCksIDcwLCA2NSlcclxuICAgIC8vY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiTWluXCIpXS5kaXNwbGF5X3N0YXRzMigpLCA3MCwgNjUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJNaW5cIildLmRpc3BsYXlfc3RhdHMzKCksIDIwLCA4NSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQoJ0xhbmRvbCB0aGUgTWFnZScsIDcwLCAxMzApXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJMYW5kb2xcIildLmRpc3BsYXlfc3RhdHMxKCksIDcwLCAxNTUpXHJcbiAgICAvL2NvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkxhbmRvbFwiKV0uZGlzcGxheV9zdGF0czIoKSwgNzAsIDE1NSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIkxhbmRvbFwiKV0uZGlzcGxheV9zdGF0czMoKSwgMjAsIDE3NSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQoJ0hvcnN0IHRoZSBIb3JzZW1hbicsIDcwLCAyMjApXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJIb3JzdFwiKV0uZGlzcGxheV9zdGF0czEoKSwgNzAsIDI0NSlcclxuICAgIC8vY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiSG9yc3RcIildLmRpc3BsYXlfc3RhdHMyKCksIDcwLCAyNDUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJIb3JzdFwiKV0uZGlzcGxheV9zdGF0czMoKSwgMjAsIDI2NSlcclxuICAgIGNvbnRleHQuZmlsbFRleHQoJ1JvcnkgdGhlIFN1bW1vbmVyJywgNzAsIDMxMClcclxuICAgIGNvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIlJvcnlcIildLmRpc3BsYXlfc3RhdHMxKCksIDcwLCAzMzUpXHJcbiAgICAvL2NvbnRleHQuZmlsbFRleHQocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBcIlJvcnlcIildLmRpc3BsYXlfc3RhdHMyKCksIDcwLCAzMzUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJSb3J5XCIpXS5kaXNwbGF5X3N0YXRzMygpLCAyMCwgMzU1KVxyXG4gICAgY29udGV4dC5maWxsVGV4dCgnRGFudGggdGhlIFNweW1hc3RlcicsIDcwLCA0MDApXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJEYW50aFwiKV0uZGlzcGxheV9zdGF0czEoKSwgNzAsIDQyNSlcclxuICAgIC8vY29udGV4dC5maWxsVGV4dChyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIFwiRGFudGhcIildLmRpc3BsYXlfc3RhdHMyKCksIDcwLCA0MjUpXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgXCJEYW50aFwiKV0uZGlzcGxheV9zdGF0czMoKSwgMjAsIDQ0NSlcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd19jaGFyYWN0ZXJzKCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImluIGRyYXcgY2hhcmFjdGVyc1wiKTtcclxuICAgIGZvciAodmFyIGNoYXIgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgaWYgKCFyb3N0ZXJbY2hhcl0uaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICByb3N0ZXJbY2hhcl0uZHJhdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBtb3ZlX2NoYXJhY3RlcnMoKSB7XHJcbiAgICAvL3JhbmRvbSB0aGUgY2hhcmFjdGVyIG9yZGVyIGZvciB0aG9zZSB3aG8gYXJlbnQgYnVzeVxyXG4gICAgY29uc29sZS5sb2coXCJpbiBtb3ZlIGNoYXJcIik7XHJcbiAgICAvL2dldF9yYW5kb21fY2hhcl9saXN0KCk7XHJcbiAgICAvL05lZWQgdG8gc3RvcCBvbmNlIGV2ZXJ5IGNoYXJhY3RlciBpcyBhc3NpZ25lZC4gXHJcbiAgICBpZiAoY3VycmVudF90aW1lID09IFwibW9ybmluZ1wiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgY2ggaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghcm9zdGVyW2NoXS5pc19vY2N1cGllZCAmJiAhcm9zdGVyW2NoXS5pc19vbl9taXNzaW9uKSB7IC8vaWYgY2hhcmFjdGVyIGlzbid0IG9uIGEgbWlzc2lvbiBvciBhbHJlYWR5IG9jY3VwaWVkXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGxvY2F0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAvL3NlbGVjdF9hY3Rpb24ocm9zdGVyW2NoXSk7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2hUcmVlVG9BZ2VudChyb3N0ZXJbY2hdLm5hbWUsIHNlbGVjdF9hY3Rpb24ocm9zdGVyW2NoXSkpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdvcmxkVGljaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL2V2ZW5pbmcsIGV2ZXJ5b25lIGdvZXMgdG8gc3RhcnRcclxuICAgICAgICBmb3IgKHZhciBjIGluIHJvc3Rlcikge1xyXG4gICAgICAgICAgICByb3N0ZXJbY10uc2V0X2xvY2F0aW9uKFwic3RhcnRcIik7XHJcbiAgICAgICAgICAgIHJvc3RlcltjXS5pc19vY2N1cGllZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FsbCBsb2NhdGlvbnMgYXJlIHVub2NjdXBpZWQgXHJcbiAgICAgICAgbG9jYXRpb25zW1wic3RyXCJdLmFzc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgbG9jYXRpb25zW1wiaW50XCJdLmFzc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgbG9jYXRpb25zW1wibWFnXCJdLmFzc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgbG9jYXRpb25zW1wiYWZmaW5pdHkxXCJdLmFzc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgbG9jYXRpb25zW1wiYWZmaW5pdHkyXCJdLmFzc2lnbmVkID0gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBkcmF3X2NoYXJhY3Rlcl9idXR0b25zKCkge1xyXG4gICAgLy92YXIgeSA9IDUwO1xyXG4gICAgZm9yICh2YXIgYiBpbiBjaGFyX2J1dHRvbnMpIHtcclxuICAgICAgICBjaGFyX2J1dHRvbnNbYl0uZHJhdygpO1xyXG4gICAgfVxyXG4gICAgcGFzcy5kcmF3KCk7XHJcbiAgICBmb3IgKHZhciBiIGluIG1pc3Npb25fYnV0dG9ucykge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coY3VycmVudF9kYXkpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cobWlzc2lvbl9ib2FyZFtiXS5kYXkpXHJcbiAgICAgICAgaWYgKGN1cnJlbnRfZGF5ID09IG1pc3Npb25fYm9hcmRbYl0uZGF5ICYmICFtaXNzaW9uX2JvYXJkW2JdLmFzc2lnbmVkKSB7XHJcbiAgICAgICAgICAgIG1pc3Npb25fYnV0dG9uc1tiXS5kcmF3KCk7XHJcbiAgICAgICAgICAgIG1pc3Npb25fYnV0dG9uc1tiXS53cml0ZV90ZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL2NvbnRleHQuZHJhd0ltYWdlKGNoYXJfYnV0dG9uc1swXS5pbWFnZSwgY2hhcl9idXR0b25zWzBdLngsIGNoYXJfYnV0dG9uc1swXS55KTtcclxuXHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX2J1dHRvbnMoKSB7XHJcbiAgICBwb3AgPSBuZXcgUG9wdXAoMzAwLCAyMDAsIFwicG9wdXBcIik7XHJcbiAgICB2YXIgeSA9IDIwO1xyXG4gICAgZm9yICh2YXIgYyBpbiByb3N0ZXIpIHtcclxuICAgICAgICB2YXIgY2hhcl9uYW1lID0gcm9zdGVyW2NdLm5hbWU7XHJcbiAgICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKDEwLCB5LCBjaGFyX25hbWUsIGNoYXJfbmFtZSwgY2hhcl9uYW1lICsgXCJfcFwiKTtcclxuICAgICAgICB2YXIgbiA9IFwidGlueVwiICsgY2hhcl9uYW1lXHJcbiAgICAgICAgdmFyIHRpbnlfYiA9IG5ldyBCdXR0b24oMCwgMCwgbiwgY2hhcl9uYW1lLCBuICsgXCJfcFwiKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGltYWdlc1tuK1wiX3BcIl0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coaW1hZ2VzKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKG4pO1xyXG4gICAgICAgIHBvcHVwX2J1dHRvbnMucHVzaCh0aW55X2IpO1xyXG4gICAgICAgIGNoYXJfYnV0dG9ucy5wdXNoKGIpO1xyXG4gICAgICAgIHkgKz0gOTA7XHJcbiAgICB9XHJcbiAgICB5ICs9IDIwO1xyXG4gICAgdmFyIHggPSAyMDtcclxuICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICBmb3IgKHZhciBjIGluIG1pc3Npb25fYm9hcmQpIHtcclxuICAgICAgICAvL2hhcmQgY29kZWQgYW5kIGhhY2t5LCAzIG1pc3Npb25zIHBlciBkYXlcclxuICAgICAgICBpZiAoY291bnQgPT0gMykge1xyXG4gICAgICAgICAgICB4ID0gMjA7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh4KTtcclxuICAgICAgICB2YXIgbWlzc2lvbl90aXRsZSA9IG1pc3Npb25fYm9hcmRbY10udGl0bGU7XHJcbiAgICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIHksIFwiYnV0dG9uXCIsIG1pc3Npb25fdGl0bGUpO1xyXG4gICAgICAgIG1pc3Npb25fYnV0dG9ucy5wdXNoKGIpO1xyXG4gICAgICAgIHggKz0gMjIwO1xyXG4gICAgICAgIGNvdW50Kys7XHJcblxyXG5cclxuICAgIH1cclxuICAgIHBhc3MgPSBuZXcgQnV0dG9uKDcyMCwgNTgwLCBcInBhc3NcIiwgXCJwYXNzXCIpO1xyXG4gICAgb2sgPSBuZXcgQnV0dG9uKDAsIDAsIFwib2tcIiwgXCJva1wiKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gY2hlY2tCb3VuZHMob2JqZWN0LCB4LCB5KSB7XHJcbiAgICB2YXIgbWluWCA9IG9iamVjdC54O1xyXG4gICAgdmFyIG1heFggPSBvYmplY3QueCArIG9iamVjdC5pbWFnZS53aWR0aDtcclxuICAgIHZhciBtaW5ZID0gb2JqZWN0Lnk7XHJcbiAgICB2YXIgbWF4WSA9IG9iamVjdC55ICsgb2JqZWN0LmltYWdlLmhlaWdodDtcclxuICAgIHZhciBteCA9IHg7XHJcbiAgICB2YXIgbXkgPSB5O1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIkZvciBvYmplY3QgXCIgKyBvYmplY3QudGV4dCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiYnV0dG9uIHggcmFuZ2U6XCIgKyBtaW5YICsgXCIgdG8gXCIgKyBtYXhYKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJidXR0b24geSByYW5nZTpcIiArIG1pblkgKyBcIiB0byBcIiArIG1heFkpO1xyXG5cclxuICAgIGlmIChteCA+PSBtaW5YICYmIG14IDw9IG1heFggJiYgbXkgPj0gbWluWSAmJiBteSA8PSBtYXhZKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjbGlja2VkKGUpIHtcclxuICAgIGlmIChjdXJyZW50X2RheSA9PSBsYXN0X2RheSkgcmV0dXJuO1xyXG4gICAgaWYgKGRheV9zY3JlZW5fYWN0aXZlKSByZXR1cm47XHJcbiAgICBpZiAoc3RhcnRfc2NyZWVuX2FjdGl2ZSkgcmV0dXJuO1xyXG4gICAgLy9vbmx5IHdhbnQgdG8gb3BlbiBwb3B1cCB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgLy9jbG9zZSBwb3B1cCB3aGVuIHBvcHVwIGlzIGNsaWNrZWQgb2ZmLiBcclxuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgIGNvbnN0IGNhbnZfeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdFxyXG4gICAgY29uc3QgY2Fudl95ID0gZS5jbGllbnRZIC0gcmVjdC50b3BcclxuICAgIC8vZmlndXJlIG91dCB3aGF0IHdhcyBjbGlja2VkIGZpcnN0LiBcclxuICAgIC8vY29uc29sZS5sb2coXCJtb3VlcyBwb3M6IFwiICsgZS5jbGllbnRYICsgXCIsIFwiICsgZS5jbGllbnRZKTsgLy9kZWJ1Z2dpbmdcclxuICAgIGlmICghcG9wLmlzX29wZW4pIHtcclxuICAgICAgICAvL2NoZWNrIGlmIGEgYnV0dG9uIHdhcyBjbGlja2VkICBcclxuICAgICAgICBmb3IgKHZhciBidXR0b24gaW4gY2hhcl9idXR0b25zKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGVja0JvdW5kcyhjaGFyX2J1dHRvbnNbYnV0dG9uXSwgY2Fudl94LCBjYW52X3kpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RyYXcgcG9wdXBcclxuICAgICAgICAgICAgICAgIGNoYXJfYnV0dG9uc1tidXR0b25dLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcG9wLmlzX29wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZHJhd19jYW52YXMoKTtcclxuICAgICAgICAgICAgICAgIHBvcC5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgY2hhcl9idXR0b25zW2J1dHRvbl0udGV4dCldLnN0YXRzX3Rvc3RyKCkpO1xyXG4gICAgICAgICAgICAgICAgcG9wLmZpbGxfcG9wdXAocm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBjaGFyX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0uc3RhdHNfdG9zdHIoKSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDaGFyYWN0ZXI6IFwiICsgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBjaGFyX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgY2hhcl9idXR0b25zW2J1dHRvbl0udGV4dCldLnN0YXRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBidXR0b24gaW4gbWlzc2lvbl9idXR0b25zKSB7XHJcbiAgICAgICAgICAgIGlmICghbWlzc2lvbl9idXR0b25zW2J1dHRvbl0uYXNzaWduZWQgJiYgY2hlY2tCb3VuZHMobWlzc2lvbl9idXR0b25zW2J1dHRvbl0sIGNhbnZfeCwgY2Fudl95KSAmJiBjdXJyZW50X2RheSA9PSBtaXNzaW9uX2JvYXJkW2J1dHRvbl0uZGF5KSB7XHJcbiAgICAgICAgICAgICAgICBwb3AuaXNfb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZF9taXNzaW9uID0gYnV0dG9uO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlNFVFRJTkcgU0VMRUNURUQgTUlTU0lPTlwiKTtcclxuICAgICAgICAgICAgICAgIHBvcC5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAvL2RyYXdfcG9wdXBfYnV0dG9ucygpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS50ZXh0KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZmluZF9pbl9saXN0KFwibWlzc2lvblwiLCBtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS50ZXh0KSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1pc3Npb25fYm9hcmRbMF0udGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1pc3Npb25fdGl0bGUgPSBtaXNzaW9uX2JvYXJkW2ZpbmRfaW5fbGlzdChcIm1pc3Npb25cIiwgbWlzc2lvbl9idXR0b25zW2J1dHRvbl0udGV4dCldLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1pc3Npb25fZGVzYyA9IG1pc3Npb25fYm9hcmRbZmluZF9pbl9saXN0KFwibWlzc2lvblwiLCBtaXNzaW9uX2J1dHRvbnNbYnV0dG9uXS50ZXh0KV0uZ2V0X2Rlc2MoKTtcclxuICAgICAgICAgICAgICAgIHBvcC5maWxsX3BvcHVwKG1pc3Npb25fdGl0bGUgKyBcIlxcblwiICsgbWlzc2lvbl9kZXNjLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvL3BvcC5maWxsX3BvcHVwKFwiZGVzY1wiLCB0cnVlLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIC8vcG9wLmRyYXdfcG9wdXBfYnV0dG9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGVja0JvdW5kcyhwYXNzLCBjYW52X3gsIGNhbnZfeSkpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBhc3MgY2xpY2tlZFwiKTtcclxuICAgICAgICAgICAgdXBkYXRlX3RpbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL2lmIHBvcCB1cCBpcyBvcGVuLCB3YW50IHRvIGNoZWNrIGlmIGFueXRoaW5nIEJVVCBidXR0b25zIHdhcyBjbGlja2VkIChmb3Igbm93KVxyXG4gICAgICAgIGlmIChjaGVja0JvdW5kcyhwb3AsIGNhbnZfeCwgY2Fudl95KSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvcHVwIGNsaWNrZWQhXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoZWNrQm91bmRzKG9rLCBjYW52X3gsIGNhbnZfeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQm91bmRzKG9rLCBjYW52X3gsIGNhbnZfeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiT2sgY2xpY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3AuZGlzbWlzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkMiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZF9taXNzaW9uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBiIGluIHBvcHVwX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgdGhvc2UgYnV0dG9ucyB3ZXJlIGNsaWNrZWQuIFxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwb3B1cF9idXR0b25zW2JdKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0JvdW5kcyhwb3B1cF9idXR0b25zW2JdLCBjYW52X3gsIGNhbnZfeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrZWQgaXMgXCIgKyBwb3B1cF9idXR0b25zW2JdLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2VsZWN0IGNoYXJhY3RlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZDEgPT0gbnVsbCAmJiBzZWxlY3RlZF9taXNzaW9uICE9IG51bGwgJiYgIXJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgcG9wdXBfYnV0dG9uc1tiXS50ZXh0KV0uaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDEgPSBwb3B1cF9idXR0b25zW2JdLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwX2J1dHRvbnNbYl0ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkX21pc3Npb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlZHJhdyB3IHByZXNzZWQgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXQgPSBtaXNzaW9uX2JvYXJkW3NlbGVjdGVkX21pc3Npb25dLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWQgPSBtaXNzaW9uX2JvYXJkW3NlbGVjdGVkX21pc3Npb25dLmdldF9kZXNjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5maWxsX3BvcHVwKG10ICsgXCJcXG5cIiArIG1kLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3B1cF9idXR0b25zW2JdLnRleHQgIT0gc2VsZWN0ZWQxICYmICFyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHBvcHVwX2J1dHRvbnNbYl0udGV4dCldLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gcG9wdXBfYnV0dG9uc1tiXS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJzdDogXCIgKyBzZWxlY3RlZDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2Vjb25kOiBcIiArIHNlbGVjdGVkMik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkMSAhPSBudWxsICYmIHNlbGVjdGVkMiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUd28gY2hhcmFjdGVycyBzZWxlY3RlZC4gQXNzc2lnbmluZyBtaXNzaW9uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRpdGxlOiBcIisgbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS50aXRsZSArIFwiXFxuRGVzYzogXCIgKyBtaXNzaW9uX2JvYXJkW3NlbGVjdGVkX21pc3Npb25dLmRlc2MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hc3NpZ24gbWlzc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaXNzaW9uX2JvYXJkW3NlbGVjdGVkX21pc3Npb25dLmFzc2lnbihzZWxlY3RlZDEsIHNlbGVjdGVkMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmlsbCBuZXcgdGV4dCBvbiBwb3B1cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3BvcC5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuaXNfb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5kcmF3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzdGlsbCBpbiBpZlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmZpbGxfcG9wdXAoXCJTZW5kaW5nIFwiICsgc2VsZWN0ZWQxICsgXCIgYW5kIFwiICsgc2VsZWN0ZWQyICsgXCIgb24gdGhlIG1pc3Npb24uXCIsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dF9sb2cucHVzaChcIlNlbnQgXCIgKyBzZWxlY3RlZDEgKyBcIiBhbmQgXCIgKyBzZWxlY3RlZDIgKyBcIiBvbjogXCIgKyBtaXNzaW9uX2JvYXJkW3NlbGVjdGVkX21pc3Npb25dLnRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkMiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkX21pc3Npb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Bhc3MgdGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZV90aW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjbG9zZSBwb3B1cFwiKTtcclxuICAgICAgICAgICAgcG9wLmlzX29wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgcG9wLmRpc21pc3MoKTtcclxuICAgICAgICAgICAgLy9zZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgICAgICAvL3NlbGVjdGVkMiA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vcG9wLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NvbnN0cnVjdCBwb3B1cC4gTWF5YmUgbWFrZSBpdCBvYmplY3Q/IFxyXG5mdW5jdGlvbiBzZXR1cCgpIHtcclxuICAgIC8vdGhpbmdzIHRvIG9ubHkgZG8gb25lIHRpbWUuXHJcbiAgICBwcmVsb2FkX2ltZygpO1xyXG4gICAgY3JlYXRlX2xvY2F0aW9ucygpO1xyXG4gICAgY3JlYXRlX3Jvc3RlcigpO1xyXG4gICAgY3JlYXRlX21pc3Npb25zKCk7XHJcbiAgICBjcmVhdGVfYnV0dG9ucygpO1xyXG4gICAgc3RhcnRfc2NyZWVuKCk7XHJcbiAgICAvL2RyYXdfY2FudmFzKCk7IC8vZ2V0IHJpZCBvZiB0aGlzIHdoZW4gcmVlbmFibGUgc3RhcnQgc2NyZWVuXHJcbiAgICB2YXIgaW50dHR2SUQgPSB3aW5kb3cuc2V0VGltZW91dChzdGFydF9zY3JlZW5fa2lsbCwgMTUwMCk7XHJcbiAgICB2YXIgaW50dHR0dHZJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KGRyYXdfY2FudmFzLCAxNTAwKTtcclxuICAgIHRleHRfZml4KCk7XHJcblxyXG59XHJcbi8vdmlsbGFuZWxsZSBzdHVmZlxyXG4vL2Z1bmN0aW9uIHJlZmVyZW5jZWQgZnJvbTogaHR0cHM6Ly93d3cudzNyZXNvdXJjZS5jb20vamF2YXNjcmlwdC1leGVyY2lzZXMvamF2YXNjcmlwdC1hcnJheS1leGVyY2lzZS0xNy5waHBcclxuZnVuY3Rpb24gZ2V0X3JhbmRvbV9jaGFyX2xpc3QoKSB7XHJcbiAgICB2YXIgbGVuID0gcm9zdGVyLmxlbmd0aDtcclxuICAgIHZhciB0ZW1wO1xyXG4gICAgdmFyIGluZGV4O1xyXG5cclxuICAgIHdoaWxlIChsZW4gPiAwKSB7XHJcbiAgICAgICAgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZW4pO1xyXG4gICAgICAgIGxlbi0tO1xyXG4gICAgICAgIHRlbXAgPSByb3N0ZXJbbGVuXVxyXG4gICAgICAgIHJvc3RlcltsZW5dID0gcm9zdGVyW2luZGV4XVxyXG4gICAgICAgIHJvc3RlcltpbmRleF0gPSB0ZW1wO1xyXG4gICAgfVxyXG4gICAgLy9jb25zb2xlLmxvZyhyb3N0ZXIpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImhpZ2hlc3QgYWZmOiBcIiArIGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KHJvc3RlclswXSkubmFtZSk7XHJcbiAgICAvL3N0YXJ0IGFjdGlvbnM6XHJcbn1cclxuZnVuY3Rpb24gc2VsZWN0X2FjdGlvbihjKSB7XHJcbiAgICAvL3N3aXRjaCBzdGF0ZW1lbnRcclxuICAgIGNvbnNvbGUubG9nKGMubmFtZSArIFwiIHNlbGVjdGluZyBhY3Rpb24uLi5cIik7XHJcbiAgICBzd2l0Y2ggKGMubmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJNaW5cIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIkxhbmRvbFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyldKTtcclxuICAgICAgICBjYXNlIFwiSG9yc3RcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIlJvcnlcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICAgICAgY2FzZSBcIkRhbnRoXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyksIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKV0pO1xyXG4gICAgfVxyXG4gICAgLy9yZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKVxyXG59XHJcbmZ1bmN0aW9uIGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KGMpIHtcclxuICAgIC8vZmluZCB0aGUgY2hhcmFjdGVyIHdpdGggdGhlIGhpZ2hlc3QgYWZmaW5pdHkgdGhhdCBpcyBOT1QgMTAgYW5kIE5PVCBvY2N1cGllZFxyXG4gICAgdmFyIGhpZ2hlc3QgPSBudWxsO1xyXG4gICAgdmFyIGhpZ2hlc3RfYWZmID0gLTE7XHJcbiAgICBmb3IgKHZhciBjaCBpbiByb3N0ZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGMpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocm9zdGVyW2NoXSk7XHJcbiAgICAgICAgdmFyIGNvbXAgPSByb3N0ZXJbY2hdO1xyXG4gICAgICAgIGlmIChjb21wLm5hbWUgIT0gYy5uYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghY29tcC5pc19vY2N1cGllZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGMuYWZmaW5pdHlbY29tcC5uYW1lXSA8IDEwICYmIGMuYWZmaW5pdHlbY29tcC5uYW1lXSA+PSBoaWdoZXN0X2FmZikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3QgPSBjb21wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RfYWZmID0gYy5hZmZpbml0eVtjb21wLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYy5uYW1lICsgXCIncyBoaWdoZXN0IGFmZmluaXR5IGlzIHdpdGggXCIgKyBoaWdoZXN0Lm5hbWUpO1xyXG4gICAgcmV0dXJuIGhpZ2hlc3Q7XHJcbn1cclxuLy9DSEVDSyBTUE9UIERFQ1xyXG5mdW5jdGlvbiBnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSB7XHJcbiAgICBsZXQgdHJhaW5fc3RyID0gYWN0aW9uKFxyXG4gICAgICAgICgpID0+ICFsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1tcInN0clwiXSA8IDEwICYmICFjLmlzX29jY3VwaWVkICYmICFjLmlzX29uX21pc3Npb24sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKGMubmFtZSArIFwiIGlzIHRyYWluaW5nIHN0ci5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uc1tcInN0clwiXS5hc3NpZ25lZCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcInN0clwiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL2luY3JlYXNlIHN0YXRcclxuICAgICAgICAgICAgYy5pbmNyZWFzZV9zdGF0KFwic3RyXCIsIDEpO1xyXG4gICAgICAgICAgICAvL3NldCBjJ3MgbG9jYXRpb25cclxuICAgICAgICAgICAgYy5zZXRfbG9jYXRpb24oXCJzdHJcIik7XHJcblxyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuXHJcbiAgICByZXR1cm4gdHJhaW5fc3RyO1xyXG59XHJcbmZ1bmN0aW9uIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJpbnQgbG9jOiBcIiArIGludF9jb25kKTtcclxuICAgIGxldCB0cmFpbl9pbnQgPSBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gIWxvY2F0aW9uc1tcImludFwiXS5hc3NpZ25lZCAmJiBjLnN0YXRzW1wiaW50XCJdIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQgJiYgIWMuaXNfb25fbWlzc2lvbixcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICsgXCIgaXMgdHJhaW5pbmcgaW50LlwiKTtcclxuICAgICAgICAgICAgLy9zZXQgbG9jYXRpb24gYXNzaWduZWRcclxuICAgICAgICAgICAgbG9jYXRpb25zW1wiaW50XCJdLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYy5pc19vY2N1cGllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vaW5jcmVhc2Ugc3RhdFxyXG4gICAgICAgICAgICBjLmluY3JlYXNlX3N0YXQoXCJpbnRcIiwgMSk7XHJcbiAgICAgICAgICAgIC8vc2V0IGMncyBsb2NhdGlvblxyXG4gICAgICAgICAgICBjLnNldF9sb2NhdGlvbihcImludFwiKTtcclxuICAgICAgICB9LCAwXHJcbiAgICApXHJcbiAgICByZXR1cm4gdHJhaW5faW50O1xyXG59XHJcbmZ1bmN0aW9uIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpIHtcclxuICAgIC8vdmFyIG1hZ19jb25kID0gIWxvY2F0aW9uc1tcIm1hZ1wiXS5hc3NpZ25lZCAmJiBjLnN0YXRzWydtYWcnXSA8IDEwICYmICFjLmlzX29jY3VwaWVkO1xyXG4gICAgbGV0IHRyYWluX21hZyA9IGFjdGlvbihcclxuICAgICAgICAoKSA9PiAhbG9jYXRpb25zW1wibWFnXCJdLmFzc2lnbmVkICYmIGMuc3RhdHNbXCJtYWdcIl0gPCAxMCAmJiAhYy5pc19vY2N1cGllZCAmJiAhYy5pc19vbl9taXNzaW9uLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhtYWdfY29uZCk7ICAgIFxyXG4gICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKGMubmFtZSArIFwiIGlzIHRyYWluaW5nIG1hZy5cIik7XHJcbiAgICAgICAgICAgIC8vc2V0IGxvY2F0aW9uIGFzc2lnbmVkXHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcIm1hZ1wiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL2luY3JlYXNlIHN0YXRcclxuICAgICAgICAgICAgYy5pbmNyZWFzZV9zdGF0KFwibWFnXCIsIDEpO1xyXG4gICAgICAgICAgICAvL3NldCBjJ3MgbG9jYXRpb25cclxuICAgICAgICAgICAgYy5zZXRfbG9jYXRpb24oXCJtYWdcIik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYyk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobG9jYXRpb25zW1wibWFnXCJdKTtcclxuICAgICAgICB9LCAwXHJcbiAgICApXHJcbiAgICByZXR1cm4gdHJhaW5fbWFnO1xyXG59XHJcbmZ1bmN0aW9uIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYykge1xyXG4gICAgbGV0IHJhaXNlX2FmZmluaXR5ID0gYWN0aW9uKFxyXG4gICAgICAgICgpID0+ICFsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0uYXNzaWduZWQgJiYgIWxvY2F0aW9uc1tcImFmZmluaXR5MlwiXS5hc3NpZ25lZCAmJiAhYy5pc19vY2N1cGllZCxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjMiA9IGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KGMpOyAvL3RoaXMgaXMgY2hhcmFjdGVyIG9iai4gU2hvdWxkIGJlIHVub2NjdXBpZWQgdyBsZXNzIHRoYW4gMTAgYWZmXHJcbiAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICsgXCIgaXMgcmFpc2luZyBhZmZpbml0eSB3aXRoIFwiICsgYzIubmFtZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgLy9zZXQgbG9jYXRpb24gYXNzaWduZWRcclxuICAgICAgICAgICAgbG9jYXRpb25zW1wiYWZmaW5pdHkxXCJdLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbG9jYXRpb25zW1wiYWZmaW5pdHkyXCJdLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy9pbmNyZWFzZSBhZmZpbml0eSB3aXRoIHRoZW1cclxuICAgICAgICAgICAgYy5pbmNyZWFzZV9hZmZpbml0eShjMik7XHJcbiAgICAgICAgICAgIGMyLmluY3JlYXNlX2FmZmluaXR5KGMpO1xyXG5cclxuICAgICAgICAgICAgLy9zZXQgYm90aCB0byBvY2N1cGllZFxyXG4gICAgICAgICAgICBjLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYzIuaXNfb2NjdXBpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL3NldCBib3RoJyBsb2NhdGlvblxyXG4gICAgICAgICAgICBjLnNldF9sb2NhdGlvbihcImFmZmluaXR5MVwiKTtcclxuICAgICAgICAgICAgYzIuc2V0X2xvY2F0aW9uKFwiYWZmaW5pdHkyXCIpO1xyXG4gICAgICAgIH0sIDBcclxuICAgIClcclxuICAgIHJldHVybiByYWlzZV9hZmZpbml0eTtcclxufVxyXG4vL1RPRE9cclxuLy9beF0gYnV0dG9uIG9uIHBvcCB1cC5cclxuXHJcbi8vRnV0dXJlIEltcHJvdmVtZW50czpcclxuLy9JbXByb3ZlZCBVSVxyXG4vL0NoYXJhY3RlciBkaWFsb2d1ZVxyXG4vL0NoYXJhY3RlcnMgdHJhaW5pbmcgdG9nZXRoZXJcclxuLy9NaXNzaW9ucyBoYXZpbmcgYSB3YXkgdG8gd2luIHdpdGggYWZmaW5pdHlcclxuIiwiaW1wb3J0IFF1ZXVlIGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1F1ZXVlXCI7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0YXR1cyB7XHJcbiAgICBSVU5OSU5HLFxyXG4gICAgU1VDQ0VTUyxcclxuICAgIEZBSUxVUkVcclxufVxyXG5cclxuZnVuY3Rpb24gdGVybWluYXRlQW5kUmV0dXJuKGlkOiBudW1iZXIsIGJsYWNrYm9hcmQ6IGFueSwgc3RhdHVzOiBTdGF0dXMpIHtcclxuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcclxuICAgIHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcclxuZXhwb3J0IHR5cGUgUHJlY29uZGl0aW9uID0gKCkgPT4gYm9vbGVhblxyXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXHJcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgR3VhcmRUaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrLCBuZWdhdGU/OiBib29sZWFuKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXHJcblxyXG52YXIgYmxhY2tib2FyZCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XHJcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkID0gMSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcmVjb25kaXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lID0gdGlja3NSZXF1aXJlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmxhY2tib2FyZFtpZF0udGlja3NEb25lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBhc3RUaWNrLCBuZWdhdGUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZWVkID8gZXhlY3V0ZShhc3RUaWNrKSA6IFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0b3JUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XHJcbiAgICByZXR1cm4gYXN0VGljaygpO1xyXG59XHJcblxyXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0QWN0aW9uVGljayhnbG9iYWxJZENvdW50ZXIrKykocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcclxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcclxuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXHJcbiAqIEByZXR1cm5zIHtUaWNrfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxyXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8vMC4gdXRpbGl0aWVzXHJcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmROdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG4vLzEuIHN0b3J5IGluc3RhbmNlXHJcblxyXG4vLzEuMSBsb2NhdGlvbnNcclxudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcclxuXHJcbi8vYWRkIHRvIGJvdGggc2lkZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xyXG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XHJcblxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcclxuICAgIHZhciBwcmV2aW91cyA9IHt9O1xyXG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcclxuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XHJcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xyXG5cclxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcclxuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcclxuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XHJcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG4vLzEuMiBhZ2VudHNcclxudmFyIGFnZW50cyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFnZW50KGFnZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICBhZ2VudHMucHVzaChhZ2VudE5hbWUpO1xyXG4gICAgcmV0dXJuIGFnZW50TmFtZTtcclxufVxyXG5cclxuLy8xLjMgaXRlbXNcclxudmFyIGl0ZW1zID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XHJcbiAgICBpdGVtcy5wdXNoKGl0ZW1OYW1lKTtcclxuICAgIHJldHVybiBpdGVtTmFtZTtcclxufVxyXG5cclxuLy8xLjQgdmFyaWFibGVzXHJcbnZhciB2YXJpYWJsZXMgPSB7fTtcclxudmFyIGFnZW50VmFyaWFibGVzID0ge307XHJcbnZhciBpdGVtVmFyaWFibGVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YXJOYW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pKVxyXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xyXG5cclxuICAgIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIGlmIChpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBub3Qgc2V0IVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFyaWFibGVzW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBhZ2VudCBcIiArIGFnZW50ICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYXJpYWJsZU5vdFNldCh2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2VudFZhcmlhYmxlTm90U2V0KGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pKVxyXG4gICAgICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV0gPSB7fTtcclxuXHJcbiAgICBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSB8fCBpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGl0ZW0gXCIgKyBpdGVtICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXTtcclxufVxyXG5cclxuXHJcbi8vMlxyXG4vL2FnZW50LWJlaGF2aW9yIHRyZWUgbWFwcGluZ1xyXG52YXIgYWdlbnRUcmVlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRyZWVUb0FnZW50KGFnZW50OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIGFnZW50VHJlZXNbYWdlbnRdID0gdHJlZTtcclxufVxyXG5cclxuLy8zLjFcclxuLy91c2VyIGFjdGlvbnNcclxuLy9UT0RPIGFkZCB2YXJpYWJsZXMgdG8gdXNlciBhY3Rpb24gdGV4dHNcclxudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcclxuICAgIHRleHQ6IFwiXCIsXHJcbiAgICB1c2VyQWN0aW9uc1RleHQ6IFtdLFxyXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcclxufVxyXG52YXIgdXNlckludGVyYWN0aW9uVHJlZXMgPSBbXTtcclxudmFyIHVzZXJBY3Rpb25zID0ge307XHJcblxyXG5mdW5jdGlvbiBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpIHtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcclxuICAgIHVzZXJBY3Rpb25zID0ge307Ly97XCJHbyB0byBsb2NhdGlvbiBYXCIgOiBlZmZlY3RcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24gPSAodGV4dDogc3RyaW5nKSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHQsIDBcclxuICAgICk7XHJcbmV4cG9ydCBsZXQgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQgPSAodGV4dDogc3RyaW5nKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgKz0gXCJcXG5cIiArIHRleHQ7XHJcblxyXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxyXG4gICAgKCkgPT4gdHJ1ZSxcclxuICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgZWZmZWN0VHJlZSksIDBcclxuKTtcclxuXHJcbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdDogKCkgPT4gYW55KSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBhY3Rpb24oKCk9PnRydWUsIGVmZmVjdCwgMCkpLCAwXHJcbiAgICApO1xyXG5cclxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIHVzZXJBY3Rpb25zW3RleHRdID0gdHJlZTtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xyXG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xyXG4gICAgLy9leGVjdXRlIHRoZSB1c2VyIGFjdGlvblxyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcclxuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xyXG4gICAgZXhlY3V0ZSh1c2VyQWN0aW9uRWZmZWN0VHJlZSk7XHJcbn1cclxuXHJcbi8vNC5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIHVzZXJJbnRlcmFjdGlvbk9iamVjdDtcclxufVxyXG5mdW5jdGlvbiBnZXRfcmFuZG9tX2FnZW50X2xpc3QoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInJhbmRvbWl6aW5nXCIpO1xyXG4gICAgdmFyIGxlbiA9IGFnZW50cy5sZW5ndGg7XHJcbiAgICB2YXIgdGVtcDtcclxuICAgIHZhciBpbmRleDtcclxuXHJcbiAgICB3aGlsZSAobGVuID4gMCkge1xyXG4gICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKTtcclxuICAgICAgICBsZW4tLTtcclxuICAgICAgICB0ZW1wID0gYWdlbnRzW2xlbl1cclxuICAgICAgICBhZ2VudHNbbGVuXSA9IGFnZW50c1tpbmRleF1cclxuICAgICAgICBhZ2VudHNbaW5kZXhdID0gdGVtcDtcclxuICAgIH1cclxuICAgIC8vY29uc29sZS5sb2cocm9zdGVyKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJoaWdoZXN0IGFmZjogXCIgKyBnZXRfY2hhcl90b19yYWlzZV9hZmZpbml0eShyb3N0ZXJbMF0pLm5hbWUpO1xyXG4gICAgLy9zdGFydCBhY3Rpb25zOlxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB3b3JsZFRpY2soKSB7XHJcbiAgICAvL2FsbCBhZ2VudCB0aWNrc1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIkluIHdvcmxkIHRpY2tcIik7XHJcbiAgICAvL3JhbmRvbWl6ZSBhZ2VudHNcclxuICAgIGdldF9yYW5kb21fYWdlbnRfbGlzdCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRyZWUpO1xyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodHJlZSkpIHtcclxuICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJleGVjdXRpbmdBZ2VudFwiLCBhZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XHJcbn0iXX0=
