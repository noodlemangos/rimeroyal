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
var day_screen_active = false;
var last_day = 7;
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
var text_log = ["Log:", "Yuko!! My very old and very best friend! How’ve you been? I know you’re retired, but could you look after the ol’ guild for about a week? I gotta go <strike>fishing</strike> run a very important errand!<br>All you gotta do is assign missions to the squad based off of what they’re good at and who they work best with! We use the buddy system around here, so two people have to be assigned to each mission! If you don't want to assign anyone on a mission during the day, that's fine too! You can just use the [NEXT] button to wait around. Unassigned adventurers will just be hanging out and training at the guild hall.Have fun! Thanks in advance!<br> ~Sharro "];
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
    mission_board.push(new Mission("An antimagic rat has taken over my attic and may be building a small nation state", "I can't get to my grandparent's old photos anymore!", "str", 5, 1, "I flexed at the rat and it left!", "The rat king rains supreme and wishes to be paid reparations via corn.", 2, 1));
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
    mission_board.push(new Mission("A tiny dragon won't get out of my silverwear cabinet!", "Now normally this wouldn't be an issue but our house is very flammable!", "int", 10, 3, "Lil guy just wants to hoard spoons. We made him a pile of donated spoons out in the woods and he seems very happy!", "Well the dragon's out of the cabinet, but their house is...slightly....ablaze.", 2, 6));
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
    context.drawImage(images["bg"], 0, 0); //draw bg
    draw_character_buttons();
    draw_characters();
    context.fillText("Day " + current_day + ", " + current_time, 740, 575);
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
        text_log.push("Whew! Looks like everyone’s still in once piece! Thanks for taking care of things while I was out. Being a Guildmaster is tough work, you did great! I’ll take over from here, but hey, when I retire for real you got a real solid shot at taking my position! See you around!");
        log_text();
        draw_game_done();
    }
    else {
        text_log.push("Day " + current_day + ", " + current_time);
    }
    //characters always move
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
    context.textBaseline = 'top';
    context.fillText('Day' + current_day, 325, 300);
}
function text_fix() {
    context.fillStyle = "black";
    context.font = "8px 'Press Start 2P'";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2d1aWxkLmpzIiwic3JjL3NjcmlwdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENB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O1FBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztLQUN4QjtJQUNELHNCQUFzQjtJQUN0Qiw0RUFBNEU7SUFDNUUsZ0JBQWdCO0FBQ3BCLENBQUM7QUFDRDtJQUNJLGlCQUFpQjtJQUNqQiwrQkFBK0I7SUFDL0Isa0JBQWtCO0lBQ2xCLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixXQUFXLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO0tBQ0o7SUFDRCx1QkFBdUIsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFkRCw4QkFjQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxudmFyIGFycmF5cyA9IHJlcXVpcmUoXCIuL2FycmF5c1wiKTtcclxudmFyIExpbmtlZExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICogQ3JlYXRlcyBhbiBlbXB0eSBMaW5rZWQgTGlzdC5cclxuICAgICogQGNsYXNzIEEgbGlua2VkIGxpc3QgaXMgYSBkYXRhIHN0cnVjdHVyZSBjb25zaXN0aW5nIG9mIGEgZ3JvdXAgb2Ygbm9kZXNcclxuICAgICogd2hpY2ggdG9nZXRoZXIgcmVwcmVzZW50IGEgc2VxdWVuY2UuXHJcbiAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBGaXJzdCBub2RlIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIExhc3Qgbm9kZSBpbiB0aGUgbGlzdFxyXG4gICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIE51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbGlzdFxyXG4gICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQWRkcyBhbiBlbGVtZW50IHRvIHRoaXMgbGlzdC5cclxuICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSBhZGRlZC5cclxuICAgICogQHBhcmFtIHtudW1iZXI9fSBpbmRleCBvcHRpb25hbCBpbmRleCB0byBhZGQgdGhlIGVsZW1lbnQuIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZFxyXG4gICAgKiB0aGUgZWxlbWVudCBpcyBhZGRlZCB0byB0aGUgZW5kIG9mIHRoaXMgbGlzdC5cclxuICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgYWRkZWQgb3IgZmFsc2UgaWYgdGhlIGluZGV4IGlzIGludmFsaWRcclxuICAgICogb3IgaWYgdGhlIGVsZW1lbnQgaXMgdW5kZWZpbmVkLlxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGluZGV4KSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMubkVsZW1lbnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5uRWxlbWVudHMgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXdOb2RlID0gdGhpcy5jcmVhdGVOb2RlKGl0ZW0pO1xyXG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLm5FbGVtZW50cykge1xyXG4gICAgICAgICAgICAvLyBJbnNlcnQgYXQgdGhlIGVuZC5cclxuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZS5uZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIENoYW5nZSBmaXJzdCBub2RlLlxyXG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHByZXYgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4IC0gMSk7XHJcbiAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSBwcmV2Lm5leHQ7XHJcbiAgICAgICAgICAgIHByZXYubmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzKys7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxyXG4gICAgKiBAcmV0dXJuIHsqfSB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcclxuICAgICogZW1wdHkuXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlyc3ROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxyXG4gICAgKiBAcmV0dXJuIHsqfSB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xyXG4gICAgKiBlbXB0eS5cclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3ROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGRlc2lyZWQgaW5kZXguXHJcbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpc1xyXG4gICAgICogb3V0IG9mIGJvdW5kcy5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlLmVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlXHJcbiAgICAgKiBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhlIExpc3QgZG9lcyBub3QgY29udGFpbiB0aGlzIGVsZW1lbnQuXHJcbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgbGlzdCBhcmVcclxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXHJcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAqXHJcbiAgICAgKiA8cHJlPlxyXG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xyXG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAqIH1cclxuICAgICAqIDwvcHJlPlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcclxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZVxyXG4gICAgICogb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGlzIGxpc3QgZG9lcyBub3QgY29udGFpbiB0aGVcclxuICAgICAqIGVsZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gICAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxyXG4gICAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxyXG4gICAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXHJcbiAgICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICAgKlxyXG4gICAgICAgKiA8cHJlPlxyXG4gICAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XHJcbiAgICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgICAqIH1cclxuICAgICAgICogPC9wcmU+XHJcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cclxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcclxuICAgICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIGZhbHNlXHJcbiAgICAgICAqIG90aGVyd2lzZS5cclxuICAgICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5pbmRleE9mKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGluIHRoaXMgbGlzdC5cclxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXHJcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxyXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgKlxyXG4gICAgICogPHByZT5cclxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcclxuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgKiB9XHJcbiAgICAgKiA8L3ByZT5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoaXMgbGlzdCwgaWYgcHJlc2VudC5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGxpc3QgY29udGFpbmVkIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzIDwgMSB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5sYXN0Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5sYXN0Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudE5vZGU7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBsaXN0LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cclxuICAgICAqIFR3byBsaXN0cyBhcmUgZXF1YWwgaWYgdGhleSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtMaW5rZWRMaXN0fSBvdGhlciB0aGUgb3RoZXIgbGlzdC5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXHJcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuIElmIHRoZSBlbGVtZW50cyBpbiB0aGUgbGlzdHNcclxuICAgICAqIGFyZSBjdXN0b20gb2JqZWN0cyB5b3Ugc2hvdWxkIHByb3ZpZGUgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlXHJcbiAgICAgKiB0aGUgPT09IG9wZXJhdG9yIGlzIHVzZWQgdG8gY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiBlbGVtZW50cy5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIsIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGVxRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIExpbmtlZExpc3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsIG90aGVyLmZpcnN0Tm9kZSwgZXFGKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lcXVhbHNBdXggPSBmdW5jdGlvbiAobjEsIG4yLCBlcUYpIHtcclxuICAgICAgICB3aGlsZSAobjEgIT09IG51bGwgJiYgbjIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKCFlcUYobjEuZWxlbWVudCwgbjIuZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuMSA9IG4xLm5leHQ7XHJcbiAgICAgICAgICAgIG4yID0gbjIubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGdpdmVuIGluZGV4LlxyXG4gICAgICogQHJldHVybiB7Kn0gcmVtb3ZlZCBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXMgb3V0IG9mIGJvdW5kcy5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmVtb3ZlRWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzIHx8IHRoaXMuZmlyc3ROb2RlID09PSBudWxsIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAxKSB7XHJcbiAgICAgICAgICAgIC8vRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cclxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcHJldmlvdXMgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4IC0gMSk7XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMuZmlyc3ROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocHJldmlvdXMubmV4dCA9PT0gdGhpcy5sYXN0Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMubGFzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXMgIT09IG51bGwgJiYgcHJldmlvdXMubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHByZXZpb3VzLm5leHQuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBwcmV2aW91cy5uZXh0Lm5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIGxpc3QgaW4gb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcclxuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cclxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhjdXJyZW50Tm9kZS5lbGVtZW50KSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXZlcnNlcyB0aGUgb3JkZXIgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlua2VkIGxpc3QgKG1ha2VzIHRoZSBsYXN0XHJcbiAgICAgKiBlbGVtZW50IGZpcnN0LCBhbmQgdGhlIGZpcnN0IGVsZW1lbnQgbGFzdCkuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcclxuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHZhciB0ZW1wID0gbnVsbDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0ZW1wID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBwcmV2aW91cztcclxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtcCA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5sYXN0Tm9kZTtcclxuICAgICAgICB0aGlzLmxhc3ROb2RlID0gdGVtcDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCBpbiBwcm9wZXJcclxuICAgICAqIHNlcXVlbmNlLlxyXG4gICAgICogQHJldHVybiB7QXJyYXkuPCo+fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0LFxyXG4gICAgICogaW4gcHJvcGVyIHNlcXVlbmNlLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGN1cnJlbnROb2RlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPD0gMDtcclxuICAgIH07XHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gYXJyYXlzLnRvU3RyaW5nKHRoaXMudG9BcnJheSgpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLm5vZGVBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAodGhpcy5uRWxlbWVudHMgLSAxKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGV4ICYmIG5vZGUgIT0gbnVsbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY3JlYXRlTm9kZSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZWxlbWVudDogaXRlbSxcclxuICAgICAgICAgICAgbmV4dDogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIExpbmtlZExpc3Q7XHJcbn0oKSk7IC8vIEVuZCBvZiBsaW5rZWQgbGlzdFxyXG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWRMaXN0O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5rZWRMaXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKFwiLi9MaW5rZWRMaXN0XCIpO1xyXG52YXIgUXVldWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgcXVldWUuXHJcbiAgICAgKiBAY2xhc3MgQSBxdWV1ZSBpcyBhIEZpcnN0LUluLUZpcnN0LU91dCAoRklGTykgZGF0YSBzdHJ1Y3R1cmUsIHRoZSBmaXJzdFxyXG4gICAgICogZWxlbWVudCBhZGRlZCB0byB0aGUgcXVldWUgd2lsbCBiZSB0aGUgZmlyc3Qgb25lIHRvIGJlIHJlbW92ZWQuIFRoaXNcclxuICAgICAqIGltcGxlbWVudGF0aW9uIHVzZXMgYSBsaW5rZWQgbGlzdCBhcyBhIGNvbnRhaW5lci5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBRdWV1ZSgpIHtcclxuICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlua2VkTGlzdF8xLmRlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIGFuZCByZW1vdmVzIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcclxuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5saXN0LmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5yZW1vdmVFbGVtZW50QXRJbmRleCgwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzLCBidXQgZG9lcyBub3QgcmVtb3ZlLCB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3QuZmlyc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIHN0YWNrIGFyZVxyXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yLCBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXHJcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAqXHJcbiAgICAgKiA8cHJlPlxyXG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lIChwZXQxLCBwZXQyKSB7XHJcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICogfVxyXG4gICAgICogPC9wcmU+XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxyXG4gICAgICogZnVuY3Rpb24gdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsXHJcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuY29udGFpbnMoZWxlbSwgZXF1YWxzRnVuY3Rpb24pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGFuZCBvbmx5IGlmIHRoaXMgcXVldWUgY29udGFpbnMgbm8gaXRlbXM7IGZhbHNlXHJcbiAgICAgKiBvdGhlcndpc2UuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpIDw9IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIHF1ZXVlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBxdWV1ZSBpblxyXG4gICAgICogRklGTyBvcmRlci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xyXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goY2FsbGJhY2spO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBRdWV1ZTtcclxufSgpKTsgLy8gRW5kIG9mIHF1ZXVlXHJcbmV4cG9ydHMuZGVmYXVsdCA9IFF1ZXVlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGl0ZW1cclxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuNFxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSwgb3IgLTEgaWYgbm90IGZvdW5kLlxyXG4gKi9cclxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufVxyXG5leHBvcnRzLmluZGV4T2YgPSBpbmRleE9mO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcclxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcclxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkgb3IgLTEgaWYgbm90IGZvdW5kLlxyXG4gKi9cclxuZnVuY3Rpb24gbGFzdEluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAtMTtcclxufVxyXG5leHBvcnRzLmxhc3RJbmRleE9mID0gbGFzdEluZGV4T2Y7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMDtcclxufVxyXG5leHBvcnRzLmNvbnRhaW5zID0gY29udGFpbnM7XHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBmaXJzdCBvY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGZyb20gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBjaGFuZ2VkIGFmdGVyIHRoaXMgY2FsbC5cclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZShhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBpbmRleCA9IGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKTtcclxuICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmUgPSByZW1vdmU7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheSBlcXVhbFxyXG4gKiB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIGRldGVybWluZSB0aGUgZnJlcXVlbmN5IG9mIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB3aG9zZSBmcmVxdWVuY3kgaXMgdG8gYmUgZGV0ZXJtaW5lZC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5XHJcbiAqIGVxdWFsIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24gZnJlcXVlbmN5KGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcbiAgICB2YXIgZnJlcSA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgZnJlcSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmcmVxO1xyXG59XHJcbmV4cG9ydHMuZnJlcXVlbmN5ID0gZnJlcXVlbmN5O1xyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gc3BlY2lmaWVkIGFycmF5cyBhcmUgZXF1YWwgdG8gb25lIGFub3RoZXIuXHJcbiAqIFR3byBhcnJheXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgaWYgYm90aCBhcnJheXMgY29udGFpbiB0aGUgc2FtZSBudW1iZXJcclxuICogb2YgZWxlbWVudHMsIGFuZCBhbGwgY29ycmVzcG9uZGluZyBwYWlycyBvZiBlbGVtZW50cyBpbiB0aGUgdHdvXHJcbiAqIGFycmF5cyBhcmUgZXF1YWwgYW5kIGFyZSBpbiB0aGUgc2FtZSBvcmRlci5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIG9uZSBhcnJheSB0byBiZSB0ZXN0ZWQgZm9yIGVxdWFsaXR5LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgdGhlIG90aGVyIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiBlbGVtZW1lbnRzIGluIHRoZSBhcnJheXMuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIGVxdWFsXHJcbiAqL1xyXG5mdW5jdGlvbiBlcXVhbHMoYXJyYXkxLCBhcnJheTIsIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkxLmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWVxdWFscyhhcnJheTFbaV0sIGFycmF5MltpXSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydHMuZXF1YWxzID0gZXF1YWxzO1xyXG4vKipcclxuICogUmV0dXJucyBzaGFsbG93IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSB0byBjb3B5LlxyXG4gKiBAcmV0dXJuIHtBcnJheX0gYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXlcclxuICovXHJcbmZ1bmN0aW9uIGNvcHkoYXJyYXkpIHtcclxuICAgIHJldHVybiBhcnJheS5jb25jYXQoKTtcclxufVxyXG5leHBvcnRzLmNvcHkgPSBjb3B5O1xyXG4vKipcclxuICogU3dhcHMgdGhlIGVsZW1lbnRzIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb25zIGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBzd2FwIGVsZW1lbnRzLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaSB0aGUgaW5kZXggb2Ygb25lIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGogdGhlIGluZGV4IG9mIHRoZSBvdGhlciBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGlzIGRlZmluZWQgYW5kIHRoZSBpbmRleGVzIGFyZSB2YWxpZC5cclxuICovXHJcbmZ1bmN0aW9uIHN3YXAoYXJyYXksIGksIGopIHtcclxuICAgIGlmIChpIDwgMCB8fCBpID49IGFycmF5Lmxlbmd0aCB8fCBqIDwgMCB8fCBqID49IGFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XHJcbiAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xyXG4gICAgYXJyYXlbal0gPSB0ZW1wO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0cy5zd2FwID0gc3dhcDtcclxuZnVuY3Rpb24gdG9TdHJpbmcoYXJyYXkpIHtcclxuICAgIHJldHVybiAnWycgKyBhcnJheS50b1N0cmluZygpICsgJ10nO1xyXG59XHJcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcclxuLyoqXHJcbiAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIGFycmF5XHJcbiAqIHN0YXJ0aW5nIGZyb20gaW5kZXggMCB0byBsZW5ndGggLSAxLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gaXRlcmF0ZS5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXHJcbiAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cclxuICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBhcnJheV8xID0gYXJyYXk7IF9pIDwgYXJyYXlfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIgZWxlID0gYXJyYXlfMVtfaV07XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKGVsZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5mb3JFYWNoID0gZm9yRWFjaDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcclxuICAgIHJldHVybiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xyXG59O1xyXG4vKipcclxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb21wYXJlIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmUoYSwgYikge1xyXG4gICAgaWYgKGEgPCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYSA9PT0gYikge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0Q29tcGFyZSA9IGRlZmF1bHRDb21wYXJlO1xyXG4vKipcclxuICogRGVmYXVsdCBmdW5jdGlvbiB0byB0ZXN0IGVxdWFsaXR5LlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRFcXVhbHMoYSwgYikge1xyXG4gICAgcmV0dXJuIGEgPT09IGI7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0RXF1YWxzID0gZGVmYXVsdEVxdWFscztcclxuLyoqXHJcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gZGVmYXVsdFRvU3RyaW5nKGl0ZW0pIHtcclxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuICckcycgKyBpdGVtO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICckbycgKyBpdGVtLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0VG9TdHJpbmcgPSBkZWZhdWx0VG9TdHJpbmc7XHJcbi8qKlxyXG4qIEpvaW5zIGFsbCB0aGUgcHJvcGVyaWVzIG9mIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGpvaW4gc3RyaW5nXHJcbiovXHJcbmZ1bmN0aW9uIG1ha2VTdHJpbmcoaXRlbSwgam9pbikge1xyXG4gICAgaWYgKGpvaW4gPT09IHZvaWQgMCkgeyBqb2luID0gJywnOyB9XHJcbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgdG9yZXQgPSAneyc7XHJcbiAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKGV4cG9ydHMuaGFzKGl0ZW0sIHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIGpvaW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgcHJvcCArICc6JyArIGl0ZW1bcHJvcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvcmV0ICsgJ30nO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubWFrZVN0cmluZyA9IG1ha2VTdHJpbmc7XHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24uXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jKSB7XHJcbiAgICByZXR1cm4gKHR5cGVvZiBmdW5jKSA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyB1bmRlZmluZWQuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICByZXR1cm4gKHR5cGVvZiBvYmopID09PSAndW5kZWZpbmVkJztcclxufVxyXG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgc3RyaW5nLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xyXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcclxufVxyXG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XHJcbi8qKlxyXG4gKiBSZXZlcnNlcyBhIGNvbXBhcmUgZnVuY3Rpb24uXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChjb21wYXJlRnVuY3Rpb24pIHx8ICFpc0Z1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgaWYgKGEgPCBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhID09PSBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIHYpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihkLCB2KSAqIC0xO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yZXZlcnNlQ29tcGFyZUZ1bmN0aW9uID0gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbjtcclxuLyoqXHJcbiAqIFJldHVybnMgYW4gZXF1YWwgZnVuY3Rpb24gZ2l2ZW4gYSBjb21wYXJlIGZ1bmN0aW9uLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVUb0VxdWFscyhjb21wYXJlRnVuY3Rpb24pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYikgPT09IDA7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZVRvRXF1YWxzID0gY29tcGFyZVRvRXF1YWxzO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsImltcG9ydCB7XHJcbiAgICBhZGRBZ2VudCwgc2V0QWdlbnRWYXJpYWJsZSwgYWRkSXRlbSwgYWRkTG9jYXRpb24sIHNldFZhcmlhYmxlLCBnZXROZXh0TG9jYXRpb24sIGFjdGlvbixcclxuICAgIGdldFJhbmROdW1iZXIsIGdldFZhcmlhYmxlLCBzZXF1ZW5jZSwgc2VsZWN0b3IsIGV4ZWN1dGUsIFByZWNvbmRpdGlvbiwgZ2V0QWdlbnRWYXJpYWJsZSwgbmVnX2d1YXJkLCBndWFyZCxcclxuICAgIGlzVmFyaWFibGVOb3RTZXQsIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiwgYWRkVXNlckFjdGlvbiwgYWRkVXNlckludGVyYWN0aW9uVHJlZSwgaW5pdGlhbGl6ZSxcclxuICAgIGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCwgZXhlY3V0ZVVzZXJBY3Rpb24sIHdvcmxkVGljaywgYXR0YWNoVHJlZVRvQWdlbnQsIHNldEl0ZW1WYXJpYWJsZSwgZ2V0SXRlbVZhcmlhYmxlLFxyXG4gICAgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQsIGFyZUFkamFjZW50LCBhZGRVc2VyQWN0aW9uVHJlZVxyXG59IGZyb20gXCIuL3NjcmlwdGluZ1wiO1xyXG4vL3JlcXVpcmUoXCIuL3NjcmlwdGluZy50c1wiKTtcclxuXHJcbnZhciBkYXlfc2NyZWVuX2FjdGl2ZSA9IGZhbHNlO1xyXG5jb25zdCBsYXN0X2RheSA9IDdcclxudmFyIHJvc3RlciA9IFtdOyAvL2xpc3Qgb2YgY2hhcmFjdGVyc1xyXG52YXIgbWlzc2lvbl9ib2FyZCA9IFtdOyAvL2xpc3Qgb2YgbWlzc2lvbnNcclxudmFyIGltYWdlcyA9IHt9OyAvL2RpY3Rpb25hcnkgb2YgSW1hZ2Ugb2JqZWN0cy4gXHJcbnZhciBjaGFyX2J1dHRvbnMgPSBbXTsvL2xpc3Qgb2YgYnV0dG9uc1xyXG52YXIgbWlzc2lvbl9idXR0b25zID0gW107IC8vbGlzdCBvZiBtaXNzaW9uIGJ1dHRvbnNcclxudmFyIHBvcHVwX2J1dHRvbnMgPSBbXTsgLy9saXN0IG9mIGJ1dHRvbnMgZGlzcGxheWVkIG9uIHBvcHVwXHJcbnZhciBsb2NhdGlvbnMgPSB7fTsgLy9kaWN0IG9mIGxvY2F0aW9uc1xyXG5cclxudmFyIG51bV9taXNzaW9ucyA9IDA7XHJcbnZhciBudW1fc3VjY2Vzc2Z1bCA9IDA7XHJcbnZhciBudW1fZmFpbGVkID0gMDtcclxuXHJcbi8vaHR0cHM6Ly9pbWd1ci5jb20vYS9qblE4MHE5IGJ1dHRvbiBzb3VyY2VcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZcIik7XHJcbnZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbmNvbnRleHQuZm9udCA9IFwiOHB4ICdQcmVzcyBTdGFydCAyUCdcIlxyXG4vL2NvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuXHJcbnZhciBERUZBVUxUX0NIQVJfWCA9IDEwMFxyXG52YXIgREVGQVVMVF9DSEFSX1kgPSAxMDBcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtzZXR1cCgpfTtcclxuLy9ldmVudHNcclxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja2VkKTtcclxuLy9wb3B1cFxyXG52YXIgcG9wO1xyXG4vL3Bhc3MgYnV0dG9uXHJcbnZhciBwYXNzO1xyXG4vL29rIGJ1dHRvblxyXG52YXIgb2s7XHJcbi8vdGljazogNyBkYXlzIHRvdGFsLiAyIHRpY2tzIHBlciBkYXkgKG1vcm4vZXZlKS4gRXZlbiB0aWNrcyBhcmUgbW9ybmluZyA9IG5ldyBkYXlcclxudmFyIGN1cnJlbnRfdGltZSA9IFwibW9ybmluZ1wiO1xyXG52YXIgY3VycmVudF9kYXkgPSAxO1xyXG5cclxudmFyIG1heF9zdGF0ID0gMTA7XHJcbnZhciBtYXhfYWZmaW5pdHkgPSAxMDtcclxuXHJcbnZhciB0ZXh0X2xvZyA9IFtcIkxvZzpcIiwgXCJZdWtvISEgTXkgdmVyeSBvbGQgYW5kIHZlcnkgYmVzdCBmcmllbmQhIEhvd+KAmXZlIHlvdSBiZWVuPyBJIGtub3cgeW914oCZcmUgcmV0aXJlZCwgYnV0IGNvdWxkIHlvdSBsb29rIGFmdGVyIHRoZSBvbOKAmSBndWlsZCBmb3IgYWJvdXQgYSB3ZWVrPyBJIGdvdHRhIGdvIDxzdHJpa2U+ZmlzaGluZzwvc3RyaWtlPiBydW4gYSB2ZXJ5IGltcG9ydGFudCBlcnJhbmQhPGJyPkFsbCB5b3UgZ290dGEgZG8gaXMgYXNzaWduIG1pc3Npb25zIHRvIHRoZSBzcXVhZCBiYXNlZCBvZmYgb2Ygd2hhdCB0aGV54oCZcmUgZ29vZCBhdCBhbmQgd2hvIHRoZXkgd29yayBiZXN0IHdpdGghIFdlIHVzZSB0aGUgYnVkZHkgc3lzdGVtIGFyb3VuZCBoZXJlLCBzbyB0d28gcGVvcGxlIGhhdmUgdG8gYmUgYXNzaWduZWQgdG8gZWFjaCBtaXNzaW9uISBJZiB5b3UgZG9uJ3Qgd2FudCB0byBhc3NpZ24gYW55b25lIG9uIGEgbWlzc2lvbiBkdXJpbmcgdGhlIGRheSwgdGhhdCdzIGZpbmUgdG9vISBZb3UgY2FuIGp1c3QgdXNlIHRoZSBbTkVYVF0gYnV0dG9uIHRvIHdhaXQgYXJvdW5kLiBVbmFzc2lnbmVkIGFkdmVudHVyZXJzIHdpbGwganVzdCBiZSBoYW5naW5nIG91dCBhbmQgdHJhaW5pbmcgYXQgdGhlIGd1aWxkIGhhbGwuSGF2ZSBmdW4hIFRoYW5rcyBpbiBhZHZhbmNlITxicj4gflNoYXJybyBcIl07XHJcblxyXG52YXIgc2VsZWN0ZWQxO1xyXG52YXIgc2VsZWN0ZWQyOyAvL2ZvciB0ZXN0aW5nIG1pc3Npb24gYXNzaWdubWVudC5cclxudmFyIHNlbGVjdGVkX21pc3Npb247XHJcblxyXG5jbGFzcyBDaGFyYWN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc3RhdHMsIHNwcikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IHsnc3RyJzpzdGF0c1snc3RyJ10sICdpbnQnOnN0YXRzWydpbnQnXSwgJ21hZyc6c3RhdHNbJ21hZyddfVxyXG4gICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7fTtcclxuICAgICAgICB0aGlzLmlzX29jY3VwaWVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uc1tcInN0YXJ0XCJdO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5sb2NhdGlvbik7XHJcbiAgICAgICAgLy90aGlzLnggPSBERUZBVUxUX0NIQVJfWDtcclxuICAgICAgICAvL3RoaXMueSA9IERFRkFVTFRfQ0hBUl9ZO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gaW1hZ2VzW3Nwcl07XHJcbiAgICAgICAgLy90aGlzLmNoYXJfaWNvbiA9IGNoYXJfaWNvbnNbbmFtZV07XHJcbiAgICB9XHJcbiAgICBjcmVhdGVfYWZmaW5pdHkoKSB7XHJcbiAgICAgICAgLy8gZm9yICh2YXIgY2hhciBpbiByb3N0ZXIpIHtcclxuICAgICAgICAvLyAgICAgLy9jb25zb2xlLmxvZygpO1xyXG4gICAgICAgIC8vICAgICBpZiAocm9zdGVyW2NoYXJdLm5hbWUgIT0gdGhpcy5uYW1lKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmFmZmluaXR5W3Jvc3RlcltjaGFyXS5uYW1lXSA9IDQ7IC8vZXZlcnlvbmUgc3RhcnRzIHdpdGggNCBhZmZpbml0eVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vbWF5YmUgZG8gcmFuZG9tIGV2ZW50dWFsbHlcclxuICAgICAgICBzd2l0Y2godGhpcy5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNaW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7XCJMYW5kb2xcIjogMSwgXCJIb3JzdFwiOiA1LCBcIlJvcnlcIiA6IDQsIFwiRGFudGhcIiA6IDJ9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMYW5kb2xcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZmaW5pdHkgPSB7XCJNaW5cIjogMSwgXCJIb3JzdFwiOiAzLCBcIlJvcnlcIiA6IDIsIFwiRGFudGhcIiA6IDV9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJIb3JzdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHtcIk1pblwiOiA1LCBcIkxhbmRvbFwiOiAzLCBcIlJvcnlcIiA6IDUsIFwiRGFudGhcIiA6IDF9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJSb3J5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmZmluaXR5ID0ge1wiTWluXCI6IDQsIFwiSG9yc3RcIjogNSwgXCJMYW5kb2xcIiA6IDIsIFwiRGFudGhcIiA6IDN9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYW50aFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZmZpbml0eSA9IHtcIk1pblwiOiAyLCBcIkhvcnN0XCI6IDEsIFwiUm9yeVwiIDogMywgXCJMYW5kb2xcIiA6IDV9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBpbmNyZWFzZV9hZmZpbml0eShjaGFyKSB7XHJcbiAgICAgICAgLy9maW5kIGNoYXJhY3RlciwgaW5jcmVtZW50IG51bWJlci4gXHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBjaGFyLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkZWNyZWFzZV9hZmZpbml0eShjaGFyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBjaGFyLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZmZpbml0eVtjaGFyLm5hbWVdLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFmZmluaXR5W2NoYXIubmFtZV0gPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaW5pdHlbY2hhci5uYW1lXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5jcmVhc2Vfc3RhdChzdGF0LCBhbW91bnQpIHtcclxuICAgICAgICB0aGlzLnN0YXRzW3N0YXRdICs9IGFtb3VudDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0c1tzdGF0XSA+IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHNbc3RhdF0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtb3ZlKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jaGFyX2ljb24sIHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuICAgIHN0YXRzX3Rvc3RyKCkge1xyXG4gICAgICAgIHZhciBzdCA9IHRoaXMubmFtZSArIFwiXFxuU3RyOiBcIiArIHRoaXMuc3RhdHNbXCJzdHJcIl0gKyBcIlxcbk1hZzogXCIgKyB0aGlzLnN0YXRzW1wibWFnXCJdICsgXCJcXG5JbnQ6IFwiICsgdGhpcy5zdGF0c1tcImludFwiXStcIlxcblN0YXR1czpcIjtcclxuICAgICAgICBpZih0aGlzLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgc3QrPVwiIE91dCBvbiBNaXNzaW9uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3QrPVwiIEF2YWlsYWJsZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdDtcclxuICAgIH1cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNwcml0ZSk7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5zcHJpdGUsIHRoaXMubG9jYXRpb24ueCwgdGhpcy5sb2NhdGlvbi55KTtcclxuICAgIH1cclxuICAgIHNldF9sb2NhdGlvbih3aGVyZSkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbnNbd2hlcmVdO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIE1pc3Npb24ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIHJlcV9zdGF0LCByZXFfdG90YWwsIHJld2FyZCwgd2luX3R4dCwgbG9zZV90eHQsIHRpY2tzLCBkYXkpIHtcclxuICAgICAgICAvL2Fsd2F5cyBnYWluICsxIGFmZmluaXR5IG9uIHN1Y2Nlc3MuIFxyXG4gICAgICAgIC8vYWx3YXlzIGxvc2UgLTEgYWZmaW5pdHkgb24gZmFpbHVyZVxyXG4gICAgICAgIC8vbWF5YmUgYWRkIHR5cGVcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzYztcclxuICAgICAgICB0aGlzLnJlcV9zdGF0ID0gcmVxX3N0YXQ7IC8vbWF5YmUgbWFrZSB0aGlzIGFuIGFycmF5XHJcbiAgICAgICAgdGhpcy5yZXFfdG90YWwgPSByZXFfdG90YWw7IC8vdGhpcyB0b28gXHJcbiAgICAgICAgdGhpcy5yZXdhcmQgPSByZXdhcmQ7XHJcbiAgICAgICAgdGhpcy53aW5fdHh0ID0gd2luX3R4dDtcclxuICAgICAgICB0aGlzLmxvc2VfdHh0ID0gbG9zZV90eHQ7XHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vcHJvYmFibHkgYWRkIHN0YXJ0X2RheSAod2hlbiBpdCBzaG93cyB1cCkgYW5kIGxlbmd0aCAoaG93IG1hbnkgZGF5cyBpdCB0YWtlcylcclxuICAgICAgICB0aGlzLmMxID0gbnVsbDsgLy90aGlzIGlzIHRoZSBjaGFyYWN0ZXIgbmFtZS5cclxuICAgICAgICB0aGlzLmMyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSAtMTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSAtMTtcclxuICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgICAgICAgdGhpcy5kYXkgPSBkYXk7XHJcbiAgICAgICAgLy9yZXdhcmQgPT0gZGlmZmljdWx0eSBmb3Igbm93XHJcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gcmV3YXJkXHJcbiAgICB9XHJcbiAgICBhc3NpZ24oY2hhcjEsIGNoYXIyKSB7IC8vcGFzcyBpbiB0aGUgbmFtZS5cclxuICAgICAgICB0aGlzLmFzc2lnbmVkID0gdHJ1ZTsgXHJcbiAgICAgICAgdGhpcy5jMSA9IGNoYXIxO1xyXG4gICAgICAgIHRoaXMuYzIgPSBjaGFyMjtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmlzX29uX21pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgIC8vY2hhcjEuaXNfb2NjdXBpZWQgPSB0cnVlOyAvL21heWJlIGdldCBmcm9tIGxpc3RcclxuICAgICAgICAvL2NoYXIyLmlzX29jY3VwaWVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRvX21pc3Npb24oKSB7XHJcbiAgICAgICAgbnVtX21pc3Npb25zKys7XHJcbiAgICAgICAgdGhpcy5jaGFyMV9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzEpO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlcV9zdGF0ICtcIiBvZiBtb3JlIHRoYW4gXCIgKyB0aGlzLnJlcV90b3RhbCk7XHJcbiAgICAgICAgdmFyIGNvbWJpbmVkX3N0YXQgPSByb3N0ZXJbdGhpcy5jaGFyMV9pXS5zdGF0c1t0aGlzLnJlcV9zdGF0XSArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLnN0YXRzW3RoaXMucmVxX3N0YXRdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG90YWwgcG9pbnRzOiBcIiArIGNvbWJpbmVkX3N0YXQpO1xyXG4gICAgICAgIGlmKGNvbWJpbmVkX3N0YXQgPj0gdGhpcy5yZXFfdG90YWwpIHsgLy9tYWtlIGNoZWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vcGFzc1xyXG4gICAgICAgICAgICB0aGlzLnZpY3RvcnkoKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mYWlsdXJlKClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZpY3RvcnkoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgbnVtX3N1Y2Nlc3NmdWwrKztcclxuICAgICAgICB0ZXh0X2xvZy5wdXNoKFwiTWlzc2lvbjogXCIgKyB0aGlzLnRpdGxlICsgXCIgd2FzIHN1Y2Nlc3NmdWwhPGJyPlwiICsgcm9zdGVyW3RoaXMuY2hhcjFfaV0ubmFtZSArIFwiIGFuZCBcIiArIHJvc3Rlclt0aGlzLmNoYXIyX2ldLm5hbWUgKyBcIiBoYXZlIHJldHVybmVkITxicj5UaGVpciBzdGF0ZW1lbnQ6IFwiICsgdGhpcy53aW5fdHh0KTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMSk7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuYzIpO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaChyb3N0ZXJbdGhpcy5jaGFyMV9pXS5uYW1lICsgXCIgYW5kIFwiICsgcm9zdGVyW3RoaXMuY2hhcjJfaV0ubmFtZSArIFwiIGhhdmUgcmV0dXJuZWQhPGJyPlRoZWlyIHN0YXRlbWVudDogXCIgKyB0aGlzLndpbl90eHQpO1xyXG4gICAgICAgIC8vaW5jcmVhc2Ugc3RhdCBieSByZXdhcmQgYW10XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnJlcV9zdGF0LCB0aGlzLnJld2FyZCk7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnJlcV9zdGF0LCB0aGlzLnJld2FyZCk7XHJcbiAgICAgICAgLy9pbmNyZWFzZSBhZmZpbml0eVxyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIxX2ldLmluY3JlYXNlX2FmZmluaXR5KHJvc3Rlclt0aGlzLmNoYXIyX2ldKTtcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMl9pXS5pbmNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMV9pXSk7XHJcbiAgICAgICAgLy90ZXh0X2xvZy5wdXNoKHRoaXMud2luX3R4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTsgXHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjFfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHJvc3Rlclt0aGlzLmNoYXIyX2ldLmlzX29uX21pc3Npb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYXIxX2kgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hhcjJfaSA9IG51bGw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgZmFpbHVyZSgpIHtcclxuICAgICAgICBudW1fZmFpbGVkKys7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImZhaWx1cmVcIik7XHJcbiAgICAgICAgdGV4dF9sb2cucHVzaChcIk1pc3Npb246IFwiICsgdGhpcy50aXRsZSArIFwiIGZhaWxlZCE8YnI+XCIrIHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMubG9zZV90eHQpO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IGZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmMxKTtcclxuICAgICAgICB0aGlzLmNoYXIyX2kgPSBmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jMik7XHJcbiAgICAgICAgLy90ZXh0X2xvZy5wdXNoKHJvc3Rlclt0aGlzLmNoYXIxX2ldLm5hbWUgKyBcIiBhbmQgXCIgKyByb3N0ZXJbdGhpcy5jaGFyMl9pXS5uYW1lICsgXCIgaGF2ZSByZXR1cm5lZCE8YnI+VGhlaXIgc3RhdGVtZW50OiBcIiArIHRoaXMubG9zZV90eHQpO1xyXG4gICAgICAgIC8vZGVjcmVhc2UgYWZmaW5pdHlcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5kZWNyZWFzZV9hZmZpbml0eShyb3N0ZXJbdGhpcy5jaGFyMl9pXSk7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uZGVjcmVhc2VfYWZmaW5pdHkocm9zdGVyW3RoaXMuY2hhcjFfaV0pO1xyXG4gICAgICAgIC8vdGV4dF9sb2cucHVzaCh0aGlzLmxvc2VfdHh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5hc3NpZ25lZCA9IGZhbHNlOyBcclxuICAgICAgICByb3N0ZXJbdGhpcy5jaGFyMV9pXS5pc19vbl9taXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgcm9zdGVyW3RoaXMuY2hhcjJfaV0uaXNfb25fbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hhcjFfaSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMl9pID0gbnVsbDtcclxuICAgIH1cclxuICAgIGRlY3JlYXNlX3RpbWUoKSB7XHJcbiAgICAgICAgdGhpcy50aWNrcy0tO1xyXG4gICAgICAgIGlmICh0aGlzLnRpY2tzID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kb19taXNzaW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlmZmljdWx0eV90b3N0cigpIHtcclxuICAgICAgICB2YXIgc3RyID0gXCJkaWZmaWN1bHR5OiBcIlxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kaWZmaWN1bHR5OyBpKyspIHtcclxuICAgICAgICAgICAgc3RyKz0gXCIqXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuICAgIGdldF9kZXNjKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBmdWxsIGRlc2NcIik7XHJcbiAgICAgICAgdmFyIGZ1bGxfZGVzYyA9IFwiLS0tXFxuXCIgKyB0aGlzLmRlc2MgKyBcIlxcbnJlcXVpcmVzIFwiICsgdGhpcy5yZXFfc3RhdCArIFwiLCBcIiArIHRoaXMuZGlmZmljdWx0eV90b3N0cigpO1xyXG4gICAgICAgIHJldHVybiBmdWxsX2Rlc2M7XHJcbiAgICB9XHJcblxyXG59XHJcbi8vU3RhcnQgcG9zaXRpb24gaXMgNTcwLCAzNDVcclxuY2xhc3MgTG9jYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgeCwgeSwgc3RhdCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSBmYWxzZTsgXHJcbiAgICAgICAgdGhpcy5jaGFyMSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGFyMiA9IG51bGw7IC8vZm9yIGFmZmluaXR5IE9OTFlcclxuICAgICAgICB0aGlzLnN0YXQgPSBudWxsO1xyXG4gICAgICAgIGlmIChzdGF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdCA9IHN0YXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgYXNzaWduKG5hbWUsIG5hbWUyID0gMCkge1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXQgPT0gXCJhZmZpbml0eVwiKSB7XHJcbiAgICAgICAgICAgIC8vdHdvIGNoYXJhY3RlcnNcclxuICAgICAgICAgICAgdGhpcy5jaGFyMSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcjIgPSBuYW1lMjtcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0ubW92ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMildLm1vdmUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vc3RhbmRhcmQgc3RhdCwgMSBjaGFyXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcjEgPSBuYW1lO1xyXG4gICAgICAgICAgICByb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHRoaXMuY2hhcjEpXS5tb3ZlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBlbmhhbmNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXQgPT0gXCJhZmZpbml0eVwiKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgdGhpcy5jaGFyMSldLmluY3JlYXNlX2FmZmluaXR5KHRoaXMuY2hhcjIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vb25seSBvbmVcclxuICAgICAgICAgICAgcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCB0aGlzLmNoYXIxKV0uaW5jcmVhc2Vfc3RhdCh0aGlzLnN0YXQsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbi8vdXNlZnVsIHRoaW5nc1xyXG5jbGFzcyBQb3B1cCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoeCwgeSwgdHlwZSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2VzW3R5cGVdO1xyXG4gICAgICAgIHRoaXMuaXNfb3BlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnRleHRfcG9zID0gdGhpcy55ICsgMzA7XHJcblxyXG4gICAgfVxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcbiAgICBkaXNtaXNzKCkge1xyXG4gICAgICAgIHRoaXMuaXNfb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICBkcmF3X2NhbnZhcygpO1xyXG4gICAgICAgIC8vY2hlY2sgZm9yIG1pc3Npb24gc3R1ZmYgaW4gaGVyZSAuTWFrZSBzdXJlIDIgY2hhcnMgc2VsZWN0ZWQgZXRjXHJcbiAgICAgICAgaWYoc2VsZWN0ZWQxICE9IG51bGwgJiYgc2VsZWN0ZWQyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXBkYXRlX3RpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldHRpbmcgaW4gcG9wdXAgZGlzbWlzc1wiKTtcclxuICAgICAgICBzZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgIHNlbGVjdGVkMiA9IG51bGw7XHJcbiAgICAgICAgc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCAyIGlzIG5vdyBcIiArIHNlbGVjdGVkMik7XHJcbiAgICAgICAgZm9yKHZhciBiIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgICAgICBjaGFyX2J1dHRvbnNbYl0ucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciB4IGluIHBvcHVwX2J1dHRvbnMpIHtcclxuICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1t4XS5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyYXdfY2FudmFzKCk7XHJcbiAgICB9XHJcbiAgICB3cml0ZV90ZXh0KHRleHQpIHtcclxuICAgICAgICAvL3kgPSBzdGFydGluZyB5IHBvc2l0aW9uLiBcclxuICAgICAgICB2YXIgdHh0ID0gdGhpcy53cmFwX3BhcmFncmFwaF90ZXh0KHRleHQpO1xyXG4gICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgdHh0Lmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQodHh0W2xdLCB0aGlzLnggKyAxNSwgdGhpcy50ZXh0X3Bvcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9wb3MgKz0gMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy50ZXh0X3BvcyA9IHRoaXMueSArIDIwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy50ZXh0X3ggKz0yMDtcclxuICAgICAgICAvL3RoaXMudGV4dF95ICs9MjA7XHJcbiAgICB9XHJcbiAgICAvL3R3byBiZWxvdyBmdW5jdGlvbnMgbW9kaWZpZWQgZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjkzNjExMi90ZXh0LXdyYXAtaW4tYS1jYW52YXMtZWxlbWVudFxyXG4gICAgd3JhcF9wYXJhZ3JhcGhfdGV4dCh0ZXh0KSB7IFxyXG4gICAgICAgIHJldHVybiB0ZXh0LnNwbGl0KFwiXFxuXCIpLm1hcChwYXJhID0+IHRoaXMud3JhcF90ZXh0KHBhcmEpKS5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKTsgXHJcbiAgICB9XHJcbiAgICB3cmFwX3RleHQodGV4dCkgeyBcclxuICAgICAgICB2YXIgd29yZHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICB2YXIgbGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgY3VycmVudExpbmUgPSB3b3Jkc1swXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuaW1hZ2UueCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgd29yZCA9IHdvcmRzW2ldO1xyXG4gICAgICAgICAgICB2YXIgdyA9IGNvbnRleHQubWVhc3VyZVRleHQoY3VycmVudExpbmUgKyBcIiBcIiArIHdvcmQpLndpZHRoO1xyXG4gICAgICAgICAgICBpZiAodyA8IHRoaXMuaW1hZ2Uud2lkdGggLSA1MCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgKz0gXCIgXCIgKyB3b3JkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChjdXJyZW50TGluZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSA9IHdvcmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGluZXMucHVzaChjdXJyZW50TGluZSk7XHJcbiAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0X3BvcyA9IHRoaXMueSArIDMwO1xyXG4gICAgfVxyXG4gICAgZHJhd19wb3B1cF9idXR0b25zKCkge1xyXG4gICAgICAgIHZhciB0aW55X3ggPSAyNTA7XHJcbiAgICAgICAgZm9yICh2YXIgYiBpbiBwb3B1cF9idXR0b25zKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFyID0gZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHBvcHVwX2J1dHRvbnNbYl0udGV4dCk7XHJcbiAgICAgICAgICAgIGlmKCFyb3N0ZXJbY2hhcl0uaXNfb25fbWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbnlfeCA+PSB0aGlzLmltYWdlLndpZHRoICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlueV94ID0gNDUwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0X3Bvcys9NDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbnlfeCs9ODA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnggPSB0aW55X3g7XHJcbiAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnkgPSB0aGlzLnRleHRfcG9zO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwb3B1cF9idXR0b25zW2JdLnggKyBcIiAsIFwiKyBwb3B1cF9idXR0b25zW2JdLnkpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS5kcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxuICAgIGRyYXdfb2tfYnV0dG9uKCkge1xyXG4gICAgICAgIG9rLnggPSA0NTU7XHJcbiAgICAgICAgb2sueSA9IHRoaXMudGV4dF9wb3M7XHJcbiAgICAgICAgb2suZHJhdygpO1xyXG4gICAgfVxyXG4gICAgZmlsbF9wb3B1cCh0ZXh0LCBidXR0b25zLCBvaykge1xyXG4gICAgICAgIHRoaXMud3JpdGVfdGV4dCh0ZXh0KTtcclxuICAgICAgICBpZihidXR0b25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd19wb3B1cF9idXR0b25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9rKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd19va19idXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQnV0dG9uIHsgLy9leGlzdGluZyBmcmFtZXdvcmtzP1xyXG4gICAgY29uc3RydWN0b3IgKHgsIHksIHR5cGUsIHRleHQsIHByZXNzZWRfdHlwZT0wKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZXNbdHlwZV07XHJcbiAgICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmVzc2VkX2ltYWdlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJfdGV4dF9wb3MgPSB0aGlzLnkgKyAyMDtcclxuICAgICAgICBpZiAocHJlc3NlZF90eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZF9pbWFnZSA9IGltYWdlc1twcmVzc2VkX3R5cGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldF9hY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICB9XHJcbiAgICBkb19zb21ldGhpbmcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzZXRfdGV4dF9wb3MoKSB7XHJcbiAgICAgICAgdGhpcy5iX3RleHRfcG9zID0gdGhpcy55ICsgMjA7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wcmVzc2VkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucHJlc3NlZF9pbWFnZSk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJlc3NlZCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLnByZXNzZWRfaW1hZ2UsIHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRyYXdpbmcgcHJlc3NlZFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMueCArIDE1MCwgdGhpcy55ICsgNDUpO1xyXG4gICAgfVxyXG4gICAgLy90d28gYmVsb3cgZnVuY3Rpb25zIG1vZGlmaWVkIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5MzYxMTIvdGV4dC13cmFwLWluLWEtY2FudmFzLWVsZW1lbnRcclxuICAgIHdyYXBfcGFyYWdyYXBoX3RleHQodGV4dCkgeyBcclxuICAgICAgICByZXR1cm4gdGV4dC5zcGxpdChcIlxcblwiKS5tYXAocGFyYSA9PiB0aGlzLndyYXBfdGV4dChwYXJhKSkucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSk7IFxyXG4gICAgfVxyXG4gICAgd3JhcF90ZXh0KHRleHQpIHsgXHJcbiAgICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnRMaW5lID0gd29yZHNbMF07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmltYWdlLngpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXTtcclxuICAgICAgICAgICAgdmFyIHcgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KGN1cnJlbnRMaW5lICsgXCIgXCIgKyB3b3JkKS53aWR0aDtcclxuICAgICAgICAgICAgaWYgKHcgPCB0aGlzLmltYWdlLndpZHRoIC0gMjApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lICs9IFwiIFwiICsgd29yZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudExpbmUgPSB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUpO1xyXG4gICAgICAgIHJldHVybiBsaW5lcztcclxuICAgIH1cclxuICAgIHdyaXRlX3RleHQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIndyaXRpbmdcIik7XHJcbiAgICAgICAgdmFyIHR4dCA9IHRoaXMud3JhcF9wYXJhZ3JhcGhfdGV4dChcIk1pc3Npb246XFxuXCIgKyB0aGlzLnRleHQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codHh0KTtcclxuICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHR4dC5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHR4dFtsXSwgdGhpcy54ICsgMjAsIHRoaXMuYl90ZXh0X3Bvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYl90ZXh0X3BvcyArPSAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldF90ZXh0X3BvcygpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHByZWxvYWRfaW1nKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGltYWdlc1wiKTtcclxuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvblwiKVxyXG4gICAgLy92YXIgcG9wdXAgPSBuZXcgSW1hZ2UoKTtcclxuICAgIC8vYnV0dG9uLnNyYyA9IFwiaHR0cDovL2k2My50aW55cGljLmNvbS9yN25kNDQuanBnXCI7XHJcbiAgICAvL3BvcHVwLnNyYyA9IFwiaHR0cDovL2k2NC50aW55cGljLmNvbS8ydzVpdWo2LmpwZ1wiO1xyXG4gICAgaW1hZ2VzW1wiYnV0dG9uXCJdID0gYnV0dG9uO1xyXG4gICAgaW1hZ2VzW1wiTWluXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5cIik7XHJcbiAgICBpbWFnZXNbXCJNaW5fcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluX3BcIik7XHJcbiAgICBpbWFnZXNbXCJMYW5kb2xcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmRvbFwiKTtcclxuICAgIGltYWdlc1tcIkxhbmRvbF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5kb2xfcFwiKTtcclxuICAgIGltYWdlc1tcIlJvcnlcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlcIik7XHJcbiAgICBpbWFnZXNbXCJSb3J5X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlfcFwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3JzdFwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0X3BcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvcnN0X3BcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFudGhcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aF9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW50aF9wXCIpO1xyXG4gICAgaW1hZ2VzW1wiYmdcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJnXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueU1pblwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueW1pblwiKTtcclxuICAgIGltYWdlc1tcInRpbnlNaW5fcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueW1pbl9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUxhbmRvbFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWxhbmRvbFwiKTtcclxuICAgIGltYWdlc1tcInRpbnlMYW5kb2xfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWxhbmRvbF9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueUhvcnN0XCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55aG9yc3RcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55SG9yc3RfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWhvcnN0X3BcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55Um9yeVwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueXJvcnlcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55Um9yeV9wXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55cm9yeV9wXCIpO1xyXG4gICAgaW1hZ2VzW1widGlueURhbnRoXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW55ZGFudGhcIik7XHJcbiAgICBpbWFnZXNbXCJ0aW55RGFudGhfcFwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlueWRhbnRoX3BcIik7XHJcbiAgICBpbWFnZXNbXCJwYXNzXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzXCIpO1xyXG4gICAgaW1hZ2VzW1wiTWluc3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5zcHJcIik7XHJcbiAgICBpbWFnZXNbXCJMYW5kb2xzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmRvbHNwclwiKTtcclxuICAgIGltYWdlc1tcIkhvcnN0c3ByXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3JzdHNwclwiKTtcclxuICAgIGltYWdlc1tcIlJvcnlzcHJcIl0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvcnlzcHJcIik7XHJcbiAgICBpbWFnZXNbXCJEYW50aHNwclwiXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFudGhzcHJcIik7XHJcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlc1tcImJnXCJdKTtcclxuICAgIGltYWdlc1tcInBvcHVwXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cFwiKTtcclxuICAgIGltYWdlc1tcIm9rXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJva1wiKTtcclxuICAgIGltYWdlc1tcImdhbWVkb25lXCJdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lb3ZlclwiKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfcm9zdGVyKCkge1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIk1pblwiLHsnc3RyJzo3LCAnbWFnJzowLCAnaW50JzogM30sIFwiTWluc3ByXCIgKSk7IC8vbWFrZSBhIGRpY3Rpb25hcnkvbGFiZWwgaXRcclxuICAgIHJvc3Rlci5wdXNoKG5ldyBDaGFyYWN0ZXIoXCJMYW5kb2xcIix7J3N0cic6MCwgJ21hZyc6NiwgJ2ludCc6IDR9LCBcIkxhbmRvbHNwclwiKSk7XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiSG9yc3RcIiwgeydzdHInOjgsICdtYWcnOjAsICdpbnQnOiAyfSwgXCJIb3JzdHNwclwiKSk7XHJcbiAgICByb3N0ZXIucHVzaChuZXcgQ2hhcmFjdGVyKFwiUm9yeVwiLCB7J3N0cic6MiwgJ21hZyc6NiwgJ2ludCc6IDJ9LCBcIlJvcnlzcHJcIikpO1xyXG4gICAgcm9zdGVyLnB1c2gobmV3IENoYXJhY3RlcihcIkRhbnRoXCIsIHsnc3RyJzoyLCAnbWFnJzoyLCAnaW50JzogNn0sIFwiRGFudGhzcHJcIikpO1xyXG4gICAgZm9yICh2YXIgYyBpbiByb3N0ZXIpIHtcclxuICAgICAgICByb3N0ZXJbY10uY3JlYXRlX2FmZmluaXR5KCk7IC8vc3RhcnQgYXQgMj9cclxuICAgICAgICBhZGRBZ2VudChyb3N0ZXJbY10ubmFtZSk7IC8vYWRkIGFnZW50IGZvciBiZWhhdmlvciB0cmVlXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbY10pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZV9taXNzaW9ucygpIHtcclxuICAgIC8vdGVtcGxhdGU6IFxyXG4gICAgLy9taXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJ0aXRsZVwiLCBcImRlc2NcIiwgXCJzdGF0XCIsIDx0b3RhbHB0cz4sIDxkaWZmaWN1bHR5PiwgXCJ3aW5cIiwgXCJsb3NlXCIsIDxsZW4qMj4sIDxhcHBlYXJkYXk+KSk7XHJcbiAgICAvL2RheSAxXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBbiBhbnRpbWFnaWMgcmF0IGhhcyB0YWtlbiBvdmVyIG15IGF0dGljIGFuZCBtYXkgYmUgYnVpbGRpbmcgYSBzbWFsbCBuYXRpb24gc3RhdGVcIiwgXCJJIGNhbid0IGdldCB0byBteSBncmFuZHBhcmVudCdzIG9sZCBwaG90b3MgYW55bW9yZSFcIiwgXCJzdHJcIiwgNSwgMSwgXCJJIGZsZXhlZCBhdCB0aGUgcmF0IGFuZCBpdCBsZWZ0IVwiLCBcIlRoZSByYXQga2luZyByYWlucyBzdXByZW1lIGFuZCB3aXNoZXMgdG8gYmUgcGFpZCByZXBhcmF0aW9ucyB2aWEgY29ybi5cIiwgMiwgMSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiTG9zdCBjYXRcIiwgXCJTbmVha3kgb2wnIGZsdWZmZXIgZXNjYXBlZCFcIiwgXCJpbnRcIiwgNSwgMSwgXCJXZSBmb3VuZCB0aGUgY2F0IGJlaGluZCBhIGR1bXBzdGVyLiBUaGUgb3duZXIgc2FpZCB0aGF0IHRoZSBnbG93aW5nIHJlZCBleWVzIGFyZSBub3JtYWwuLj9cIiwgXCJXaGF0IGNhdD9cIiwgNCwgMSkpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiTXkgc2hlZXAga2VlcCBvbiBnb2luZyBtaXNzaW5nXCIsIFwiV2hlcmUgYXJlIHRoZXkgZ29pbmc/IFdoYXQgYXJlIHRoZXkgZG9pbmc/IEFyZSB0aGV5IHRhbGtpbmcgYWJvdXQgbWU/Pz8gSSBoYXZlIHRvIGtub3chXCIsIFwibWFnXCIsIDgsIDIsIFwiVGhleSB3ZXJlIGJlaW5nIHVzZWQgYnkgdGhlIGdvYmxpbnMgZm9yIGZhbnRhc3kgZm9vdGJhbGwuIFRoZXkgd2VyZSByZXR1cm5lZCwgc2xpZ2h0bHkgbW9yZSBhcm1vcmVkLiBcIiwgXCJTaGVlcCBhcmVuJ3QgcmVhbC5cIiwgNiwgMSkpO1xyXG4gICAgLy9kYXkgMlxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiU2xpbWVzIGFyZSBlYXRpbmcgbXkgcG90YXRvZXMhXCIsIFwiSSBoYWQgb25lIHBsYW4gYW5kIHRoYXQgcGxhbiB3YXMgd2hhY2tpbmcgdGhlbSB3aXRoIGEgc3dvcmQgYW5kIGl0IGRpZG4ndCB3b3JrLlwiLCBcIm1hZ1wiLCA4LCAyLCBcIlNsaW1lcyB6YXBwZWQsIG1pc3Npb24gY29tcGxldGUhXCIsIFwiVGhlIHNsaW1lcyBzaG9vayBvZmYgYWxsIHRoZSBwaHlzaWNhbCBkYW1hZ2Ugd2UgY291bGQgZG8gc28gd2Ugc2hvdmVkIHRoZW0gaW50byBhIGhvbGUgYW5kIGhvcGVkIGZvciB0aGUgYmVzdC5cIiwgMiwgMikpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiR29ibGlucyB3b24ndCBzdG9wIGhlY2tsaW5nIG15IHNoZWVwXCIsIFwiVGhleSdyZSBnZXR0aW5nIHZlcnkgc3RyZXNzZWQgb3V0ISBIZWxwIVwiLCBcInN0clwiLCAxMCwgMywgXCJUaGUgc2hlZXAgY2FuIHNoZWVwIGluIHBlYWNlIG5vdyFcIiwgXCJXZSBsb3N0LCBidXQgb24gdGhlIGJyaWdodCBzaWRlIEkgZG9uJ3QgdGhpbmsgc2hlZXAgdW5kZXJzdGFuZCBFbmdsaXNoLlwiLCA2LCAyKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJJIHRoaW5rIEdlb3JnZSBpcyBhIHZhbXBpcmVcIiwgXCJIZSBuZXZlciBlYXRzIGFuZCBoaXMgc2hpcnRzIGFyZSBhbHdheXMgc3RhaW5lZCB3aXRoIGJsb29kIVwiLCBcImludFwiLCA2LCAxLCBcIkdlb3JnZSBpcy4uLmEgc2h5IHdpbmVyeSB3b3JrZXIuIFdlIGJvdWdodCBoaW0gbmV3IHNoaXJ0cy5cIiwgXCJHZW9yZ2UgbW92ZWQgb3V0IGJlZm9yZSB3ZSBjb3VsZCB0YWxrIHRvIGhpbS4uLlwiLCAyLCAyKSk7XHJcbiAgICAvL2RheSAzXHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJBbiB1bmRlYWQgYXJteSBpcyBpbnZhZGluZyFcIiwgXCJUSEVZJ1ZFIEdPVFRFTiBJTlRPIFRIRSBNSUxLIEJBUk5TISBXRSdSRSBET09NRUQhXCIsIFwibWFnXCIsIDE0LCA1LCBcIndpblwiLCBcImxvc2VcIiwgNiwgMykpO1xyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiVEhFIFNLWSBUVVJORUQgUkVEXCIsIFwiV0hZIElTIElUIFJFRD8/P1wiLCBcImludFwiLCA2LCAxLCBcIkl0Li4ud2UgaGFkIHRvIHNwZW5kIDMgaG91cnMgZXhwbGFpbmluZyB0aGUgc3Vuc2V0IHRvIGEgZmFtaWx5IG9mIDYuIEkgbWVhbiBtb25leSBpcyBtb25leSBidXQgaG93J2QgdGhpcyBtaXNzaW9uIGV2ZW4gZ2V0IG9uIG91ciBsaXN0LlwiLCBcIldlIHN0b3BwZWQgYnkgYW5kIHRoZXkgdWhoaC4uc2FpZCBhIGxvdCBvZiB3b3JkcyBhbmQgYWZ0ZXIgYW4gaG91ciB3ZSBncmFjaW91c2x5IGp1bXBlZCBvdXQgdGhlIHdpbmRvdyB0byBlc2NhcGUuIFwiLCAyLCAzKSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJMaWNoIEtpbmcgY2F1c2luZyBhIHJ1Y2t1c1wiLCBcIlVuaG9seSBtYWdpY3MgYW5kIGxvdWQsIGJvb21pbmcgbm9pc2VzIGFyZSBjb21pbmcgZnJvbSB0aGUgbGljaCdzIGtlZXAsIHNlbmQgaGVyIGEgd2FybmluZyFcIiwgXCJtYWdcIiwgMTIsIDQsIFwiT3VyIG1hZ2ljIHdhcyBjb29sZXIgdGhhbiBoZXJzIHNvIHNoZSBhZ3JlZWQgdG8gbW92ZSBoZXIgcGFydHkgZGVlcGVyIHVuZGVyZ3JvdW5kXCIsIFwiTGljaCBcXFwiUGFydHlicm9kdWRlZmVsbGFcXFwiIHdhcyBkZWVwbHkgdW5pbXByZXNzZWQgYnkgdXMgYW5kIHR1cm5lZCB1cCBoZXIgZHVic3RlcCBsb3VkZXJcIiwgNiwgMykpO1xyXG4gICAgLy9kYXkgNFxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiQSBmaXNoIGxlYXJuZWQgdG8gd2FsayBvbiBsYW5kIGFuZCBoZXMgdXNpbmcgaGlzIGxlZ3MgZXhjbHVzaXZlbHkgZm9yIGV2aWxcIiwgXCJIZSBjYW4ndCBoYW5kbGUgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIGhhdmluZyBsZWdzISBIZSdzIHJhaXNpbmcgYSB0YWRwb2xlIGFybXkhXCIsIFwic3RyXCIsIDEwLCAzLCBcIkhlIGdvdCBzdXBsZXhlZCBiYWNrIGludG8gdGhlIG9jZWFuIVwiLCBcIkhpcyBldmlsIGNvbnRpbnVlcy4uLi4udGhlIG5lZmVyaW91cyBDYXB0YWluIExlZ2JlYXJkXCIsIDIsIDQpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkZvbGxvdyBteSBjYXQgYXJvdWQgdG8gc2VlIHdoYXQgc2hlIGRvZXMgYWxsIGRheVwiLCBcIkkgbG9zZSBoZXIgZXZlcnkgdGltZSBJIHRyeSwgSSBoYXZlIHRvIGtub3chXCIsIFwiaW50XCIsIDgsIDIsIFwiRGVhciBnb2QgdGhpcyBjYXQgZ2V0cyBzbyBtYW55IHRyZWF0cy4gUGxlYXNlIHN0b3AgZmVlZGluZyBoZXIgc2hlcyB0b28gcG93ZXJmdWwuXCIsIFwiT3V0c21hcnRlZCBieSBhIGNhdC4uLi5qdXN0IGFub3RoZXIgbm9ybWFsIGRheSBob25lc3RseVwiLCAyLCA0KSk7XHJcbiAgICBtaXNzaW9uX2JvYXJkLnB1c2gobmV3IE1pc3Npb24oXCJTdG9wIHRoZXNlIHdlZWtseSBiYXJmaWdodHMhXCIsIFwiRXZlcnkgV2VkbmVzZGF5IGFuIGVsZiBhbmQgYW4gb3JjIGNvbWUgdG8gbXkgYmFyLCBhbmQgdGhleSBhbHdheXMgZW5kIHVwIGZpZ2h0aW5nISBJIGRvbid0IHVuZGVyc3RhbmQgd2h5IHRoZXkgZG9uJ3QganVzdCBjb21lIG9uIGRpZmZlcmVudCBkYXlzIVwiLCBcInN0clwiLCA4LCAyLCBcIlRoZXkgc3RhcnRlZCB0aHJvd2luZyBjaGFpcnMgYWdhaW4gc28gd2UgYWxzbyB0aHJldyBjaGFpcnMgYXQgdGhlbS4gVGhleSB3ZXJlIGZvcmNlZCB0byB0ZWFtIHVwIGFnYWluc3QgdXMgYW5kIGJvbmRlZCBvdmVyIHRoZWlyIHNoYXJlZCBkZWZlYXQuIFRoZWlyIHdlZGRpbmcgaXMgbmV4dCB3ZWVrLCBJIHRoaW5rIHRoZSBwcm9ibGVtIGlzIHNvbHZlZFwiLCBcIldlIGNvdWxkbid0IHN0b3AgdGhlbS4gSSB3b25kZXIgaWYgdGhleSdsbCBzdGlsbCBiZSBhdCBpdCB3aGVuIEkgaGF2ZSBncmFuZGtpZHMuLi5cIiwgNCwgNCkpO1xyXG4gICAgLy9kYXkgNVxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiS3Jha2VuIHdvbid0IHN0b3AgcmVhcnJhbmdpbmcgdGhlIGJvYXRzIGF0IHRoZSBkb2NrIGV2ZXJ5IG5pZ2h0IVwiLCBcIldlIGRvbid0IG5lZWQgb3VyIGJvYXRzIG9yZGVyZWQgYnkgY29sb3IhIFdlIG5lZWQgdGhlbSB3aGVyZSB3ZSBwYXJrZWQgdGhlbSFcIiwgXCJtYWdcIiwgMTIsIDQsIFwiVHVybnMgb3V0LCBzaGUganVzdCBuZWVkZWQgYSB0cmFuc2xhdG9yLiBXZSBzZXQgdXAgYSBtYWdpY2FsIG9uZSBhbmQgbm93IHRoZSBLcmFrZW4gZ2V0cyBhIHNhbGFyeSBvZiBmaXNoIHRvIGtlZXAgdHJhY2sgb2YgYWxsIHRoZSBib2F0c1wiLCBcIldlbGwgSSBndWVzcyB0aGV5J2xsIGp1c3QgaGF2ZSB0byBhY2NlcHQgdGhlaXIgbmV3IG9yZ2FuaXphdGlvbmFsIG92ZXJsb3JkXCIsIDQsIDUpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIlZFUlkgTEFSR0UgQkVBUiEgVkVSWSBWRVJZIExBUkdFIEJFQVIhIVwiLCBcIkJFQVIgTEFSR0VcIiwgXCJzdHJcIiwgMTAsIDMsIFwiR29vZCBuZXdzLCB3ZSB3b24hIEJhZCBuZXdzLCBpdCB3YXMgYSBkcmFnb24uXCIsIFwiSVQgV0FTIE5PVCBBIEJFQVIhXCIsIDIsIDUpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkEgYmlnIHJvY2sgaXMgZmFsbGluZyBmcm9tIHRoZSBza3kgYnV0IGl0J3MgcHJvYmFibHkgZmluZVwiLCBcIkkgbWVhbiBhIGZpcmV5IGRlYXRoIGRvZXNuJ3Qgc291bmQgbGlrZSB0aGUgd29yc3QgdGhpbmcgaW4gdGhlIHdvcmxkXCIsIFwibWFnXCIsIDE0LCA1LCBcIldlIG1hZGUgYSBiaWcgYmF0IG91dCBvZiBtYWdpYyBhbmQgd2hhY2tlZCBpdCBzb21ld2hlcmUgZWxzZSFcIiwgXCJpdCB3YXMgbm90IGZpbmUhISFcIiwgNCwgNSkpO1xyXG4gICAgLy9kYXkgNlxyXG4gICAgbWlzc2lvbl9ib2FyZC5wdXNoKG5ldyBNaXNzaW9uKFwiU29tZW9uZSdzIHN0b2xlbiB0aGUgdG93biBmbGFnIVwiLCBcIldlIG5lZWQgb3VyIGZsYWchXCIsIFwiaW50XCIsIDgsIDIsIFwiV2UgZm91bmQgaXQgaW4gYSBzaG9wcGluZyBjYXJ0IDEwIG1pbGVzIGF3YXlcIiwgXCJXZSBjb3VsZG4ndCBmaW5kIGl0IHNvIHdlIHJlcGxhY2VkIHRoZSBmbGFnIHdpdGggYSBjb2F0IHNvbWVvbmUgbGVmdCBvdXQ/XCIsIDIsIDYpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkdvbGVtIHJhbXBhZ2luZyB0aHJvdWdoIHRvd24hXCIsIFwiSVQnUyBERVNUUk9ZSU5HIFRIRSBGTE9XRVJTIEFORCBPTkxZIFRIRSBGTE9XRVJTISFcIiwgXCJzdHJcIiwgMTIsIDQsIFwiV2UgaGFja2VkIGl0ISBXaXRoIGFuIGF4ZS4gQnV0IHNvbWVob3cgdGhpcyBmaXhlZCBpdCBhbmQgbm93IGl0cyBhIG5vcm1hbCBnYXJkZW5pbmcgZ29sZW0hXCIsIFwiSXQgYmVhdCB1cyB1cCBhbmQgcmFuIGludG8gdGhlIGNvdW50cnlzaWRlIHRvIGNhc3RyYXRlIG1vcmUgcGxhbnRzXCIsIDIsIDYpKTtcclxuICAgIG1pc3Npb25fYm9hcmQucHVzaChuZXcgTWlzc2lvbihcIkEgdGlueSBkcmFnb24gd29uJ3QgZ2V0IG91dCBvZiBteSBzaWx2ZXJ3ZWFyIGNhYmluZXQhXCIsIFwiTm93IG5vcm1hbGx5IHRoaXMgd291bGRuJ3QgYmUgYW4gaXNzdWUgYnV0IG91ciBob3VzZSBpcyB2ZXJ5IGZsYW1tYWJsZSFcIiwgXCJpbnRcIiwgMTAsIDMsIFwiTGlsIGd1eSBqdXN0IHdhbnRzIHRvIGhvYXJkIHNwb29ucy4gV2UgbWFkZSBoaW0gYSBwaWxlIG9mIGRvbmF0ZWQgc3Bvb25zIG91dCBpbiB0aGUgd29vZHMgYW5kIGhlIHNlZW1zIHZlcnkgaGFwcHkhXCIsIFwiV2VsbCB0aGUgZHJhZ29uJ3Mgb3V0IG9mIHRoZSBjYWJpbmV0LCBidXQgdGhlaXIgaG91c2UgaXMuLi5zbGlnaHRseS4uLi5hYmxhemUuXCIsIDIsIDYpKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gbG9nX3RleHQoKSB7XHJcbiAgICB2YXIgbGdfdHh0ID0gXCJcIjtcclxuICAgIGZvciAodmFyIGUgaW4gdGV4dF9sb2cpIHtcclxuICAgICAgICBsZ190eHQgKz0gdGV4dF9sb2dbZV0gKyBcIjxicj4gKiAqICogPGJyPlwiO1xyXG4gICAgfVxyXG4gICAgdmFyIGRpdl9sb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKVxyXG4gICAgXHJcbiAgICBkaXZfbG9nLmlubmVySFRNTCA9IGxnX3R4dDtcclxuICAgIGRpdl9sb2cuc2Nyb2xsVG9wID0gZGl2X2xvZy5zY3JvbGxIZWlnaHQ7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX2xvY2F0aW9ucygpIHtcclxuICAgIHZhciBzdHJfbG9jID0gbmV3IExvY2F0aW9uKFwiVHJhaW5pbmcgRHVtbXlcIiwgNDcwLCAzMDAsIFwic3RyXCIpO1xyXG4gICAgdmFyIG1hZ19sb2MgPSBuZXcgTG9jYXRpb24oXCJNYWdpYyBUb3dlclwiLCA3NTAsIDEwMCwgXCJtYWdcIik7XHJcbiAgICB2YXIgaW50X2xvYyA9IG5ldyBMb2NhdGlvbihcIkxpYnJhcnlcIiwgNjQwLCAyODAsIFwiaW50XCIpO1xyXG4gICAgdmFyIGFmZl9sb2MgPSBuZXcgTG9jYXRpb24oXCJHYXplYm9cIiwgNTA1LCAxMzUsIFwiYWZmaW5pdHlcIik7XHJcbiAgICB2YXIgYWZmX2xvYzIgPSBuZXcgTG9jYXRpb24oXCJHYXplYm9cIiwgNTM1LCAxMzUsIFwiYWZmaW5pdHlcIik7XHJcbiAgICB2YXIgc3RhcnRfbG9jID0gbmV3IExvY2F0aW9uKFwiT3V0c2lkZVwiLCA2MDAsIDMxNSk7XHJcbiAgICBsb2NhdGlvbnNbXCJzdGFydFwiXSA9IHN0YXJ0X2xvYztcclxuICAgIGxvY2F0aW9uc1tcInN0clwiXSA9IHN0cl9sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJtYWdcIl0gPSBtYWdfbG9jO1xyXG4gICAgbG9jYXRpb25zW1wiaW50XCJdID0gaW50X2xvYztcclxuICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MVwiXSA9IGFmZl9sb2M7XHJcbiAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0gPSBhZmZfbG9jMjtcclxuXHJcbn1cclxuZnVuY3Rpb24gZmluZF9pbl9saXN0KHR5cGUsIHRvX3NlYXJjaCkge1xyXG4gICAgaWYgKHR5cGUgPT0gXCJyb3N0ZXJcIikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9zdGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyb3N0ZXJbaV0ubmFtZSA9PSB0b19zZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwibWlzc2lvblwiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXNzaW9uX2JvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtaXNzaW9uX2JvYXJkW2ldLnRpdGxlID09IHRvX3NlYXJjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5mdW5jdGlvbiBkcmF3X2NhbnZhcygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZHJhd2luZyBjYW52YXNcIik7XHJcbiAgICBsb2dfdGV4dCgpO1xyXG4gICAgLy9zdHVmZiB0byByZWRyYXcgd2hlbiBwb3B1cCBjbG9zZXMuIFxyXG4gICAgLy8gb3V0bGluZVxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQubGluZVdpZHRoID0gXCI2XCI7XHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgY29udGV4dC5yZWN0KDAsIDAsIDgwMCwgNjUwKTtcclxuICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlc1tcImJnXCJdKTtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tcImJnXCJdLCAwLCAwKTsgLy9kcmF3IGJnXHJcbiAgICBkcmF3X2NoYXJhY3Rlcl9idXR0b25zKCk7XHJcbiAgICBkcmF3X2NoYXJhY3RlcnMoKTtcclxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJEYXkgXCIgKyBjdXJyZW50X2RheSArIFwiLCBcIiArIGN1cnJlbnRfdGltZSwgNzQwLCA1NzUpO1xyXG59XHJcblxyXG4gICAgXHJcbmZ1bmN0aW9uIGRyYXdfZ2FtZV9kb25lKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJkb25lXCIpO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW1wiZ2FtZWRvbmVcIl0sIDAsIDApOyAvL2RyYXcgZG9uZVxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgIGNvbnRleHQuZm9udCA9IFwiMTVweCAnUHJlc3MgU3RhcnQgMlAnXCJcclxuICAgIGNvbnRleHQuZmlsbFRleHQoXCJNaXNzaW9ucyBBdHRlbXB0ZWQ6IFwiICsgbnVtX21pc3Npb25zLCAzMDAsIDM2MCk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTWlzc2lvbnMgU3VjY2VlZGVkOiBcIiArIG51bV9zdWNjZXNzZnVsLCAzMDAsIDQwMCk7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KFwiTWlzc2lvbnMgRmFpbGVkOiBcIiArIG51bV9mYWlsZWQsIDMwMCwgNDQwKTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVfdGltZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidXBkYXRlIHRpbWUgcmVzZXRcIik7XHJcbiAgICBwb3AuaXNfb3BlbiA9IGZhbHNlO1xyXG4gICAgc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgIHNlbGVjdGVkMiA9IG51bGw7XHJcbiAgICBzZWxlY3RlZF9taXNzaW9uID0gbnVsbDtcclxuICAgIC8vcG9wLmRpc21pc3MoKTtcclxuXHJcbiAgICAvL2ZpcnN0OiBoYXZlIGNoYXJhY3RlcnMgZG8gdGhlaXIgYWN0aW9uc1xyXG4gICAgbW92ZV9jaGFyYWN0ZXJzKCk7XHJcblx0Ly9mb3IgZXZlcnkgbWlzc2lvbiBhc3NpZ25lZCwgdXBkYXRlZCB0aGUgdGltZSBzdHVmZi4gRG9pbmcgdGhpcyBiZWZvcmUgdGhlIGNhbnZhcyByZWRyYXcuXHJcbiAgICBmb3IgKHZhciBtIGluIG1pc3Npb25fYm9hcmQpIHtcclxuICAgICAgICBpZiAobWlzc2lvbl9ib2FyZFttXS5hc3NpZ25lZCkge1xyXG4gICAgICAgICAgICBtaXNzaW9uX2JvYXJkW21dLmRlY3JlYXNlX3RpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL25leHQsIHVwZGF0ZSB0aW1lLlxyXG4gICAgaWYgKGN1cnJlbnRfdGltZSA9PSBcIm1vcm5pbmdcIiAmJiBjdXJyZW50X2RheSA8IGxhc3RfZGF5KSB7XHJcbiAgICAgICAgY3VycmVudF90aW1lID0gIFwiZXZlbmluZ1wiO1xyXG5cdFx0ZHJhd19jYW52YXMoKTtcclxuICAgIH0gZWxzZSAgIHtcclxuICAgICAgICBcclxuICAgICAgICBjdXJyZW50X2RheSsrO1xyXG4gICAgICAgIGlmIChjdXJyZW50X2RheSA8IGxhc3RfZGF5KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRfdGltZSA9IFwibW9ybmluZ1wiO1xyXG4gICAgICAgICAgICBkYXlfY2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHZhciBpbnR0dklEID0gd2luZG93LnNldFRpbWVvdXQoZGF5X3NjcmVlbl9hY3RpdmVfc2V0LCAxNTAwKTtcclxuICAgICAgICAgICAgdmFyIGludHZJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KGRyYXdfY2FudmFzLCAxNTAwKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICB0ZXh0X2ZpeCgpO31cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8vZHJhd19jYW52YXMoKTsgLy9yZWRyYXcgdGV4dC5cclxuICAgIGlmIChjdXJyZW50X2RheSA9PSBsYXN0X2RheSkge1xyXG4gICAgICAgIHRleHRfbG9nLnB1c2goXCJXaGV3ISBMb29rcyBsaWtlIGV2ZXJ5b25l4oCZcyBzdGlsbCBpbiBvbmNlIHBpZWNlISBUaGFua3MgZm9yIHRha2luZyBjYXJlIG9mIHRoaW5ncyB3aGlsZSBJIHdhcyBvdXQuIEJlaW5nIGEgR3VpbGRtYXN0ZXIgaXMgdG91Z2ggd29yaywgeW91IGRpZCBncmVhdCEgSeKAmWxsIHRha2Ugb3ZlciBmcm9tIGhlcmUsIGJ1dCBoZXksIHdoZW4gSSByZXRpcmUgZm9yIHJlYWwgeW91IGdvdCBhIHJlYWwgc29saWQgc2hvdCBhdCB0YWtpbmcgbXkgcG9zaXRpb24hIFNlZSB5b3UgYXJvdW5kIVwiKTtcclxuICAgICAgICBsb2dfdGV4dCgpO1xyXG4gICAgICAgIGRyYXdfZ2FtZV9kb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRleHRfbG9nLnB1c2goXCJEYXkgXCIgKyBjdXJyZW50X2RheSArIFwiLCBcIiArIGN1cnJlbnRfdGltZSk7XHJcbiAgICB9XHJcbiAgICAvL2NoYXJhY3RlcnMgYWx3YXlzIG1vdmVcclxuXHJcbiAgICBcclxufVxyXG5mdW5jdGlvbiBkYXlfc2NyZWVuX2FjdGl2ZV9zZXQoKXtcclxuICAgIGRheV9zY3JlZW5fYWN0aXZlID0gZmFsc2VcclxufVxyXG5mdW5jdGlvbiBkYXlfY2hhbmdlKCl7XHJcbiAgICAvL05ldyBkYXkgc2NyZWVuXHJcblx0Ly9jb25zb2xlLmxvZyhcImRheSBjaGFuZ2VcIik7XHJcbiAgICAvL2JsYWNrIGlzIGRlZmF1bHQsIGRvbid0IG5lZWQgdG8gc3BlY2lmeVxyXG5cclxuICAgIGRheV9zY3JlZW5fYWN0aXZlID0gdHJ1ZVxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcImJsYWNrXCI7IFxyXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCA5MDAsIDY1MCwpO1xyXG4gICBcclxuXHJcbiAgICBjb250ZXh0LmZvbnQgPSAnNjhweCBcIlByZXNzIFN0YXJ0IDJQXCInO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSAndG9wJztcclxuICAgIGNvbnRleHQuZmlsbFRleHQgICgnRGF5JysgY3VycmVudF9kYXksIDMyNSwgMzAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGV4dF9maXgoKXtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiXHJcbiAgICBjb250ZXh0LmZvbnQgPSBcIjhweCAnUHJlc3MgU3RhcnQgMlAnXCJcclxuXHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd19jaGFyYWN0ZXJzKCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImluIGRyYXcgY2hhcmFjdGVyc1wiKTtcclxuICAgIGZvciAodmFyIGNoYXIgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgaWYoIXJvc3RlcltjaGFyXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltjaGFyXS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG1vdmVfY2hhcmFjdGVycygpIHtcclxuICAgIC8vcmFuZG9tIHRoZSBjaGFyYWN0ZXIgb3JkZXIgZm9yIHRob3NlIHdobyBhcmVudCBidXN5XHJcbiAgICBjb25zb2xlLmxvZyhcImluIG1vdmUgY2hhclwiKTtcclxuICAgIC8vZ2V0X3JhbmRvbV9jaGFyX2xpc3QoKTtcclxuICAgIC8vTmVlZCB0byBzdG9wIG9uY2UgZXZlcnkgY2hhcmFjdGVyIGlzIGFzc2lnbmVkLiBcclxuICAgIGlmIChjdXJyZW50X3RpbWUgPT0gXCJtb3JuaW5nXCIpIHtcclxuICAgICAgICBmb3IgKHZhciBjaCBpbiByb3N0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFyb3N0ZXJbY2hdLmlzX29jY3VwaWVkICYmICFyb3N0ZXJbY2hdLmlzX29uX21pc3Npb24pIHsgLy9pZiBjaGFyYWN0ZXIgaXNuJ3Qgb24gYSBtaXNzaW9uIG9yIGFscmVhZHkgb2NjdXBpZWRcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobG9jYXRpb25zKTtcclxuICAgICAgICAgICAgICAgIC8vc2VsZWN0X2FjdGlvbihyb3N0ZXJbY2hdKTtcclxuICAgICAgICAgICAgICAgIGF0dGFjaFRyZWVUb0FnZW50KHJvc3RlcltjaF0ubmFtZSwgc2VsZWN0X2FjdGlvbihyb3N0ZXJbY2hdKSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJvc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd29ybGRUaWNrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vZXZlbmluZywgZXZlcnlvbmUgZ29lcyB0byBzdGFydFxyXG4gICAgICAgIGZvciAodmFyIGMgaW4gcm9zdGVyKSB7XHJcbiAgICAgICAgICAgIHJvc3RlcltjXS5zZXRfbG9jYXRpb24oXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgcm9zdGVyW2NdLmlzX29jY3VwaWVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWxsIGxvY2F0aW9ucyBhcmUgdW5vY2N1cGllZCBcclxuICAgICAgICBsb2NhdGlvbnNbXCJzdHJcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJpbnRcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTFcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0uYXNzaWduZWQgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbmZ1bmN0aW9uIGRyYXdfY2hhcmFjdGVyX2J1dHRvbnMoKSB7XHJcbiAgICAvL3ZhciB5ID0gNTA7XHJcbiAgICBmb3IgKHZhciBiIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgIGNoYXJfYnV0dG9uc1tiXS5kcmF3KCk7XHJcbiAgICB9XHJcbiAgICBwYXNzLmRyYXcoKTtcclxuICAgIGZvciAodmFyIGIgaW4gbWlzc2lvbl9idXR0b25zKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50X2RheSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhtaXNzaW9uX2JvYXJkW2JdLmRheSlcclxuICAgICAgICBpZihjdXJyZW50X2RheSA9PSBtaXNzaW9uX2JvYXJkW2JdLmRheSAmJiAhbWlzc2lvbl9ib2FyZFtiXS5hc3NpZ25lZCkge1xyXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbnNbYl0uZHJhdygpO1xyXG4gICAgICAgICAgICBtaXNzaW9uX2J1dHRvbnNbYl0ud3JpdGVfdGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vY29udGV4dC5kcmF3SW1hZ2UoY2hhcl9idXR0b25zWzBdLmltYWdlLCBjaGFyX2J1dHRvbnNbMF0ueCwgY2hhcl9idXR0b25zWzBdLnkpO1xyXG4gICAgXHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlX2J1dHRvbnMoKSB7XHJcbiAgICBwb3AgPSBuZXcgUG9wdXAoMzAwLCAyMDAsIFwicG9wdXBcIik7XHJcbiAgICB2YXIgeSA9IDIwO1xyXG4gICAgZm9yICh2YXIgYyBpbiByb3N0ZXIpIHtcclxuICAgICAgICB2YXIgY2hhcl9uYW1lID0gcm9zdGVyW2NdLm5hbWU7XHJcbiAgICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKDEwLCB5LCBjaGFyX25hbWUsIGNoYXJfbmFtZSwgY2hhcl9uYW1lK1wiX3BcIik7XHJcbiAgICAgICAgdmFyIG4gPSBcInRpbnlcIitjaGFyX25hbWVcclxuICAgICAgICB2YXIgdGlueV9iID0gbmV3IEJ1dHRvbigwLCAwLCBuLCBjaGFyX25hbWUsIG4rXCJfcFwiKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGltYWdlc1tuK1wiX3BcIl0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coaW1hZ2VzKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKG4pO1xyXG4gICAgICAgIHBvcHVwX2J1dHRvbnMucHVzaCh0aW55X2IpO1xyXG4gICAgICAgIGNoYXJfYnV0dG9ucy5wdXNoKGIpO1xyXG4gICAgICAgIHkrPTYwO1xyXG4gICAgfVxyXG4gICAgeSs9MTMwO1xyXG4gICAgdmFyIHg9IDIwO1xyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuICAgIGZvciAodmFyIGMgaW4gbWlzc2lvbl9ib2FyZCkge1xyXG4gICAgICAgIC8vaGFyZCBjb2RlZCBhbmQgaGFja3ksIDMgbWlzc2lvbnMgcGVyIGRheVxyXG4gICAgICAgIGlmIChjb3VudCA9PSAzKSB7XHJcbiAgICAgICAgICAgIHggPSAyMDtcclxuICAgICAgICAgICAgY291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHgpO1xyXG4gICAgICAgIHZhciBtaXNzaW9uX3RpdGxlID0gbWlzc2lvbl9ib2FyZFtjXS50aXRsZTtcclxuICAgICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgeSwgXCJidXR0b25cIiwgbWlzc2lvbl90aXRsZSk7XHJcbiAgICAgICAgbWlzc2lvbl9idXR0b25zLnB1c2goYik7XHJcbiAgICAgICAgeCs9MjIwO1xyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG4gICAgcGFzcyA9IG5ldyBCdXR0b24oNzIwLCA1ODAsIFwicGFzc1wiLCBcInBhc3NcIik7XHJcbiAgICBvayA9IG5ldyBCdXR0b24oMCwwLFwib2tcIiwgXCJva1wiKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gY2hlY2tCb3VuZHMob2JqZWN0LCB4LCB5KSB7XHJcbiAgICB2YXIgbWluWCA9IG9iamVjdC54O1xyXG4gICAgdmFyIG1heFggPSBvYmplY3QueCArIG9iamVjdC5pbWFnZS53aWR0aDtcclxuICAgIHZhciBtaW5ZID0gb2JqZWN0Lnk7XHJcbiAgICB2YXIgbWF4WSA9IG9iamVjdC55ICsgb2JqZWN0LmltYWdlLmhlaWdodDtcclxuICAgIHZhciBteCA9IHg7XHJcbiAgICB2YXIgbXkgPSB5O1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIkZvciBvYmplY3QgXCIgKyBvYmplY3QudGV4dCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiYnV0dG9uIHggcmFuZ2U6XCIgKyBtaW5YICsgXCIgdG8gXCIgKyBtYXhYKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJidXR0b24geSByYW5nZTpcIiArIG1pblkgKyBcIiB0byBcIiArIG1heFkpO1xyXG5cclxuICAgIGlmIChteCA+PSBtaW5YICYmIG14IDw9IG1heFggJiYgbXkgPj0gbWluWSAmJiBteSA8PSBtYXhZKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gY2xpY2tlZChlKSB7XHJcbiAgICBpZiAoY3VycmVudF9kYXkgPT0gbGFzdF9kYXkpIHJldHVybjtcclxuICAgIGlmIChkYXlfc2NyZWVuX2FjdGl2ZSkgcmV0dXJuO1xyXG4gICAgLy9vbmx5IHdhbnQgdG8gb3BlbiBwb3B1cCB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgLy9jbG9zZSBwb3B1cCB3aGVuIHBvcHVwIGlzIGNsaWNrZWQgb2ZmLiBcclxuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgIGNvbnN0IGNhbnZfeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdFxyXG4gICAgY29uc3QgY2Fudl95ID0gZS5jbGllbnRZIC0gcmVjdC50b3BcclxuICAgIC8vZmlndXJlIG91dCB3aGF0IHdhcyBjbGlja2VkIGZpcnN0LiBcclxuICAgIC8vY29uc29sZS5sb2coXCJtb3VlcyBwb3M6IFwiICsgZS5jbGllbnRYICsgXCIsIFwiICsgZS5jbGllbnRZKTsgLy9kZWJ1Z2dpbmdcclxuICAgIGlmKCFwb3AuaXNfb3Blbil7XHJcbiAgICAgICAgLy9jaGVjayBpZiBhIGJ1dHRvbiB3YXMgY2xpY2tlZCAgXHJcbiAgICAgICAgZm9yICh2YXIgYnV0dG9uIGluIGNoYXJfYnV0dG9ucykge1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tCb3VuZHMoY2hhcl9idXR0b25zW2J1dHRvbl0sIGNhbnZfeCwgY2Fudl95KSkge1xyXG4gICAgICAgICAgICAgICAgLy9kcmF3IHBvcHVwXHJcbiAgICAgICAgICAgICAgICBjaGFyX2J1dHRvbnNbYnV0dG9uXS5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBvcC5pc19vcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRyYXdfY2FudmFzKCk7XHJcbiAgICAgICAgICAgICAgICBwb3AuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5zdGF0c190b3N0cigpKTtcclxuICAgICAgICAgICAgICAgIHBvcC5maWxsX3BvcHVwKHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgY2hhcl9idXR0b25zW2J1dHRvbl0udGV4dCldLnN0YXRzX3Rvc3RyKCksIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2hhcmFjdGVyOiBcIiArIHJvc3RlcltmaW5kX2luX2xpc3QoXCJyb3N0ZXJcIiwgY2hhcl9idXR0b25zW2J1dHRvbl0udGV4dCldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIGNoYXJfYnV0dG9uc1tidXR0b25dLnRleHQpXS5zdGF0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgYnV0dG9uIGluIG1pc3Npb25fYnV0dG9ucykge1xyXG4gICAgICAgICAgICBpZiAoIW1pc3Npb25fYnV0dG9uc1tidXR0b25dLmFzc2lnbmVkICYmIGNoZWNrQm91bmRzKG1pc3Npb25fYnV0dG9uc1tidXR0b25dLCBjYW52X3gsIGNhbnZfeSkgJiYgY3VycmVudF9kYXkgPT0gbWlzc2lvbl9ib2FyZFtidXR0b25dLmRheSkge1xyXG4gICAgICAgICAgICAgICAgcG9wLmlzX29wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfbWlzc2lvbiA9IGJ1dHRvbjtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJTRVRUSU5HIFNFTEVDVEVEIE1JU1NJT05cIik7XHJcbiAgICAgICAgICAgICAgICBwb3AuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgLy9kcmF3X3BvcHVwX2J1dHRvbnMoKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWlzc2lvbl9idXR0b25zW2J1dHRvbl0udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGZpbmRfaW5fbGlzdChcIm1pc3Npb25cIiwgbWlzc2lvbl9idXR0b25zW2J1dHRvbl0udGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhtaXNzaW9uX2JvYXJkWzBdLnRpdGxlKTtcclxuICAgICAgICAgICAgICAgIHZhciBtaXNzaW9uX3RpdGxlID0gbWlzc2lvbl9ib2FyZFtmaW5kX2luX2xpc3QoXCJtaXNzaW9uXCIsIG1pc3Npb25fYnV0dG9uc1tidXR0b25dLnRleHQpXS50aXRsZTtcclxuICAgICAgICAgICAgICAgIHZhciBtaXNzaW9uX2Rlc2MgPSBtaXNzaW9uX2JvYXJkW2ZpbmRfaW5fbGlzdChcIm1pc3Npb25cIiwgbWlzc2lvbl9idXR0b25zW2J1dHRvbl0udGV4dCldLmdldF9kZXNjKCk7XHJcbiAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChtaXNzaW9uX3RpdGxlICsgXCJcXG5cIiArIG1pc3Npb25fZGVzYywgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9wb3AuZmlsbF9wb3B1cChcImRlc2NcIiwgdHJ1ZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAvL3BvcC5kcmF3X3BvcHVwX2J1dHRvbnMoKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWNrQm91bmRzKHBhc3MsIGNhbnZfeCwgY2Fudl95KSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicGFzcyBjbGlja2VkXCIpO1xyXG4gICAgICAgICAgICB1cGRhdGVfdGltZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vaWYgcG9wIHVwIGlzIG9wZW4sIHdhbnQgdG8gY2hlY2sgaWYgYW55dGhpbmcgQlVUIGJ1dHRvbnMgd2FzIGNsaWNrZWQgKGZvciBub3cpXHJcbiAgICAgICAgaWYgKGNoZWNrQm91bmRzKHBvcCwgY2Fudl94LCBjYW52X3kpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9wdXAgY2xpY2tlZCFcIik7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZDEgIT0gbnVsbCAmJiBzZWxlY3RlZDIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tCb3VuZHMob2ssICBjYW52X3gsIGNhbnZfeSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQm91bmRzKG9rLCAgY2Fudl94LCBjYW52X3kpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk9rIGNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wLmRpc21pc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkMSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgYiBpbiBwb3B1cF9idXR0b25zKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRob3NlIGJ1dHRvbnMgd2VyZSBjbGlja2VkLiBcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocG9wdXBfYnV0dG9uc1tiXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tCb3VuZHMocG9wdXBfYnV0dG9uc1tiXSwgY2Fudl94LCBjYW52X3kpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkIGlzIFwiICsgcG9wdXBfYnV0dG9uc1tiXS50ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL1NlbGVjdCBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQxID09IG51bGwgJiYgc2VsZWN0ZWRfbWlzc2lvbiAhPSBudWxsICYmICFyb3N0ZXJbZmluZF9pbl9saXN0KFwicm9zdGVyXCIsIHBvcHVwX2J1dHRvbnNbYl0udGV4dCldLmlzX29uX21pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQxID0gcG9wdXBfYnV0dG9uc1tiXS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cF9idXR0b25zW2JdLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZF9taXNzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZWRyYXcgdyBwcmVzc2VkIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG10ID0gbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1kID0gbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS5nZXRfZGVzYygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZmlsbF9wb3B1cChtdCArIFwiXFxuXCIgKyBtZCwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9wdXBfYnV0dG9uc1tiXS50ZXh0ICE9IHNlbGVjdGVkMSAmJiAhcm9zdGVyW2ZpbmRfaW5fbGlzdChcInJvc3RlclwiLCBwb3B1cF9idXR0b25zW2JdLnRleHQpXS5pc19vbl9taXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMiA9IHBvcHVwX2J1dHRvbnNbYl0udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBfYnV0dG9uc1tiXS5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyc3Q6IFwiICsgc2VsZWN0ZWQxKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlY29uZDogXCIgKyBzZWxlY3RlZDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZDEgIT0gbnVsbCAmJiBzZWxlY3RlZDIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVHdvIGNoYXJhY3RlcnMgc2VsZWN0ZWQuIEFzc3NpZ25pbmcgbWlzc2lvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUaXRsZTogXCIrIG1pc3Npb25fYm9hcmRbc2VsZWN0ZWRfbWlzc2lvbl0udGl0bGUgKyBcIlxcbkRlc2M6IFwiICsgbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS5kZXNjKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYXNzaWduIG1pc3Npb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS5hc3NpZ24oc2VsZWN0ZWQxLCBzZWxlY3RlZDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZpbGwgbmV3IHRleHQgb24gcG9wdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wb3AuZGlzbWlzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wLmlzX29wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3AuZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic3RpbGwgaW4gaWZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcC5maWxsX3BvcHVwKFwiU2VuZGluZyBcIisgc2VsZWN0ZWQxICtcIiBhbmQgXCIrIHNlbGVjdGVkMiArIFwiIG9uIHRoZSBtaXNzaW9uLlwiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRfbG9nLnB1c2goXCJTZW50IFwiICsgc2VsZWN0ZWQxICsgXCIgYW5kIFwiICsgc2VsZWN0ZWQyICsgXCIgb246IFwiICsgbWlzc2lvbl9ib2FyZFtzZWxlY3RlZF9taXNzaW9uXS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQxID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF9taXNzaW9uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wYXNzIHRpbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGVfdGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjbG9zZSBwb3B1cFwiKTtcclxuICAgICAgICAgICAgcG9wLmlzX29wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgcG9wLmRpc21pc3MoKTtcclxuICAgICAgICAgICAgLy9zZWxlY3RlZDEgPSBudWxsO1xyXG4gICAgICAgICAgICAvL3NlbGVjdGVkMiA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vc2VsZWN0ZWRfbWlzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vcG9wLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NvbnN0cnVjdCBwb3B1cC4gTWF5YmUgbWFrZSBpdCBvYmplY3Q/IFxyXG5mdW5jdGlvbiBzZXR1cCgpIHtcclxuICAgIC8vdGhpbmdzIHRvIG9ubHkgZG8gb25lIHRpbWUuIFxyXG4gICAgcHJlbG9hZF9pbWcoKTtcclxuICAgIGNyZWF0ZV9sb2NhdGlvbnMoKTtcclxuICAgIGNyZWF0ZV9yb3N0ZXIoKTtcclxuICAgIGNyZWF0ZV9taXNzaW9ucygpO1xyXG4gICAgY3JlYXRlX2J1dHRvbnMoKTtcclxuICAgIGRyYXdfY2FudmFzKCk7XHJcblxyXG59XHJcbi8vdmlsbGFuZWxsZSBzdHVmZlxyXG4vL2Z1bmN0aW9uIHJlZmVyZW5jZWQgZnJvbTogaHR0cHM6Ly93d3cudzNyZXNvdXJjZS5jb20vamF2YXNjcmlwdC1leGVyY2lzZXMvamF2YXNjcmlwdC1hcnJheS1leGVyY2lzZS0xNy5waHBcclxuZnVuY3Rpb24gZ2V0X3JhbmRvbV9jaGFyX2xpc3QoKSB7XHJcbiAgICB2YXIgbGVuID0gcm9zdGVyLmxlbmd0aDtcclxuICAgIHZhciB0ZW1wO1xyXG4gICAgdmFyIGluZGV4O1xyXG5cclxuICAgIHdoaWxlIChsZW4gPiAwKSB7XHJcbiAgICAgICAgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZW4pO1xyXG4gICAgICAgIGxlbi0tO1xyXG4gICAgICAgIHRlbXAgPSByb3N0ZXJbbGVuXVxyXG4gICAgICAgIHJvc3RlcltsZW5dID0gcm9zdGVyW2luZGV4XVxyXG4gICAgICAgIHJvc3RlcltpbmRleF0gPSB0ZW1wO1xyXG4gICAgfVxyXG4gICAgLy9jb25zb2xlLmxvZyhyb3N0ZXIpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImhpZ2hlc3QgYWZmOiBcIiArIGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KHJvc3RlclswXSkubmFtZSk7XHJcbiAgICAvL3N0YXJ0IGFjdGlvbnM6XHJcbn1cclxuZnVuY3Rpb24gc2VsZWN0X2FjdGlvbihjKSB7XHJcbiAgICAvL3N3aXRjaCBzdGF0ZW1lbnRcclxuICAgIGNvbnNvbGUubG9nKGMubmFtZSArIFwiIHNlbGVjdGluZyBhY3Rpb24uLi5cIik7XHJcbiAgICBzd2l0Y2goYy5uYW1lKSB7XHJcbiAgICAgICAgY2FzZSBcIk1pblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKTtcclxuICAgICAgICBjYXNlIFwiTGFuZG9sXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKV0pO1xyXG4gICAgICAgIGNhc2UgXCJIb3JzdFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKTtcclxuICAgICAgICBjYXNlIFwiUm9yeVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IoW2dldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpLCBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX2ludChjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9tYWcoYyldKTtcclxuICAgICAgICBjYXNlIFwiRGFudGhcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKFtnZXRfY2hhcmFjdGVyX3RyYWluX3N0cihjKSwgZ2V0X2NoYXJhY3Rlcl9yYWlzZV9hZmZpbml0eShjKSwgZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5fbWFnKGMpXSk7XHJcbiAgICB9XHJcbiAgICAvL3JldHVybiBzZWxlY3RvcihbZ2V0X2NoYXJhY3Rlcl90cmFpbl9zdHIoYyksIGdldF9jaGFyYWN0ZXJfcmFpc2VfYWZmaW5pdHkoYyksIGdldF9jaGFyYWN0ZXJfdHJhaW5faW50KGMpLCBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKV0pXHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJfdG9fcmFpc2VfYWZmaW5pdHkoYykge1xyXG4gICAgLy9maW5kIHRoZSBjaGFyYWN0ZXIgd2l0aCB0aGUgaGlnaGVzdCBhZmZpbml0eSB0aGF0IGlzIE5PVCAxMCBhbmQgTk9UIG9jY3VwaWVkXHJcbiAgICB2YXIgaGlnaGVzdCA9IG51bGw7XHJcbiAgICB2YXIgaGlnaGVzdF9hZmYgPSAtMTtcclxuICAgIGZvciAodmFyIGNoIGluIHJvc3Rlcikge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyb3N0ZXJbY2hdKTtcclxuICAgICAgICB2YXIgY29tcCA9IHJvc3RlcltjaF07XHJcbiAgICAgICAgaWYoY29tcC5uYW1lICE9IGMubmFtZSkge1xyXG4gICAgICAgICAgICBpZighY29tcC5pc19vY2N1cGllZCkge1xyXG4gICAgICAgICAgICAgICAgaWYoYy5hZmZpbml0eVtjb21wLm5hbWVdIDwgMTAgJiYgYy5hZmZpbml0eVtjb21wLm5hbWVdID49IGhpZ2hlc3RfYWZmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVzdCA9IGNvbXA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVzdF9hZmYgPSBjLmFmZmluaXR5W2NvbXAubmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhjLm5hbWUgKyBcIidzIGhpZ2hlc3QgYWZmaW5pdHkgaXMgd2l0aCBcIiArIGhpZ2hlc3QubmFtZSk7XHJcbiAgICByZXR1cm4gaGlnaGVzdDtcclxufVxyXG4vL0NIRUNLIFNQT1QgREVDXHJcbmZ1bmN0aW9uIGdldF9jaGFyYWN0ZXJfdHJhaW5fc3RyKGMpIHtcclxuICAgIGxldCB0cmFpbl9zdHIgPSBhY3Rpb24oIFxyXG4gICAgKCkgPT4gIWxvY2F0aW9uc1tcInN0clwiXS5hc3NpZ25lZCAmJiBjLnN0YXRzW1wic3RyXCJdIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQgJiYgIWMuaXNfb25fbWlzc2lvbixcclxuICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGV4dF9sb2cucHVzaChjLm5hbWUgK1wiIGlzIHRyYWluaW5nIHN0ci5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uc1tcInN0clwiXS5hc3NpZ25lZCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcInN0clwiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlOyBcclxuICAgICAgICAgICAgLy9pbmNyZWFzZSBzdGF0XHJcbiAgICAgICAgICAgIGMuaW5jcmVhc2Vfc3RhdChcInN0clwiLCAxKTtcclxuICAgICAgICAgICAgLy9zZXQgYydzIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwic3RyXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LCAwXHJcbiAgICApXHJcbiAgICBcclxuICAgIHJldHVybiB0cmFpbl9zdHI7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2NoYXJhY3Rlcl90cmFpbl9pbnQoYykge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImludCBsb2M6IFwiICsgaW50X2NvbmQpO1xyXG4gICAgbGV0IHRyYWluX2ludCA9IGFjdGlvbiggXHJcbiAgICAoKSA9PiAhbG9jYXRpb25zW1wiaW50XCJdLmFzc2lnbmVkICYmIGMuc3RhdHNbXCJpbnRcIl0gPCAxMCAmJiAhYy5pc19vY2N1cGllZCAmJiAhYy5pc19vbl9taXNzaW9uLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXh0X2xvZy5wdXNoKGMubmFtZSArXCIgaXMgdHJhaW5pbmcgaW50LlwiKTtcclxuICAgICAgICAgICAgLy9zZXQgbG9jYXRpb24gYXNzaWduZWRcclxuICAgICAgICAgICAgbG9jYXRpb25zW1wiaW50XCJdLmFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYy5pc19vY2N1cGllZCA9IHRydWU7IFxyXG4gICAgICAgICAgICAvL2luY3JlYXNlIHN0YXRcclxuICAgICAgICAgICAgYy5pbmNyZWFzZV9zdGF0KFwiaW50XCIsIDEpO1xyXG4gICAgICAgICAgICAvL3NldCBjJ3MgbG9jYXRpb25cclxuICAgICAgICAgICAgYy5zZXRfbG9jYXRpb24oXCJpbnRcIik7XHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHRyYWluX2ludDtcclxufVxyXG5mdW5jdGlvbiBnZXRfY2hhcmFjdGVyX3RyYWluX21hZyhjKSB7XHJcbiAgICAvL3ZhciBtYWdfY29uZCA9ICFsb2NhdGlvbnNbXCJtYWdcIl0uYXNzaWduZWQgJiYgYy5zdGF0c1snbWFnJ10gPCAxMCAmJiAhYy5pc19vY2N1cGllZDtcclxuICAgIGxldCB0cmFpbl9tYWcgPSBhY3Rpb24oIFxyXG4gICAgKCkgPT4gIWxvY2F0aW9uc1tcIm1hZ1wiXS5hc3NpZ25lZCAmJiBjLnN0YXRzW1wibWFnXCJdIDwgMTAgJiYgIWMuaXNfb2NjdXBpZWQgJiYgIWMuaXNfb25fbWlzc2lvbixcclxuICAgICgpID0+IHsgXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWFnX2NvbmQpOyAgICBcclxuICAgICAgICAgICAgdGV4dF9sb2cucHVzaChjLm5hbWUgK1wiIGlzIHRyYWluaW5nIG1hZy5cIik7XHJcbiAgICAgICAgICAgIC8vc2V0IGxvY2F0aW9uIGFzc2lnbmVkXHJcbiAgICAgICAgICAgIGxvY2F0aW9uc1tcIm1hZ1wiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGMuaXNfb2NjdXBpZWQgPSB0cnVlOyBcclxuICAgICAgICAgICAgLy9pbmNyZWFzZSBzdGF0XHJcbiAgICAgICAgICAgIGMuaW5jcmVhc2Vfc3RhdChcIm1hZ1wiLCAxKTtcclxuICAgICAgICAgICAgLy9zZXQgYydzIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGMuc2V0X2xvY2F0aW9uKFwibWFnXCIpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGMpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGxvY2F0aW9uc1tcIm1hZ1wiXSk7XHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHRyYWluX21hZztcclxufVxyXG5mdW5jdGlvbiBnZXRfY2hhcmFjdGVyX3JhaXNlX2FmZmluaXR5KGMpIHtcclxuICAgIGxldCByYWlzZV9hZmZpbml0eSA9IGFjdGlvbihcclxuICAgICAgICAoKSA9PiAhbG9jYXRpb25zW1wiYWZmaW5pdHkxXCJdLmFzc2lnbmVkICYmICFsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0uYXNzaWduZWQgJiYgIWMuaXNfb2NjdXBpZWQsXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGMyID0gZ2V0X2NoYXJfdG9fcmFpc2VfYWZmaW5pdHkoYyk7IC8vdGhpcyBpcyBjaGFyYWN0ZXIgb2JqLiBTaG91bGQgYmUgdW5vY2N1cGllZCB3IGxlc3MgdGhhbiAxMCBhZmZcclxuICAgICAgICAgICAgICAgIHRleHRfbG9nLnB1c2goYy5uYW1lICtcIiBpcyByYWlzaW5nIGFmZmluaXR5IHdpdGggXCIgKyBjMi5uYW1lICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9zZXQgbG9jYXRpb24gYXNzaWduZWRcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uc1tcImFmZmluaXR5MVwiXS5hc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbnNbXCJhZmZpbml0eTJcIl0uYXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy9pbmNyZWFzZSBhZmZpbml0eSB3aXRoIHRoZW1cclxuICAgICAgICAgICAgICAgIGMuaW5jcmVhc2VfYWZmaW5pdHkoYzIubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjMi5pbmNyZWFzZV9hZmZpbml0eShjLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy9zZXQgYm90aCB0byBvY2N1cGllZFxyXG4gICAgICAgICAgICAgICAgYy5pc19vY2N1cGllZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjMi5pc19vY2N1cGllZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvL3NldCBib3RoJyBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgYy5zZXRfbG9jYXRpb24oXCJhZmZpbml0eTFcIik7XHJcbiAgICAgICAgICAgICAgICBjMi5zZXRfbG9jYXRpb24oXCJhZmZpbml0eTJcIik7XHJcbiAgICAgICAgfSwgMFxyXG4gICAgKVxyXG4gICAgcmV0dXJuIHJhaXNlX2FmZmluaXR5O1xyXG59XHJcbi8vVE9ET1xyXG4vL1t4XSBidXR0b24gb24gcG9wIHVwLlxyXG5cclxuLy9GdXR1cmUgSW1wcm92ZW1lbnRzOlxyXG4vL0ltcHJvdmVkIFVJXHJcbi8vQ2hhcmFjdGVyIGRpYWxvZ3VlXHJcbi8vQ2hhcmFjdGVycyB0cmFpbmluZyB0b2dldGhlclxyXG4vL01pc3Npb25zIGhhdmluZyBhIHdheSB0byB3aW4gd2l0aCBhZmZpbml0eVxyXG4iLCJpbXBvcnQgUXVldWUgZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWVcIjtcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xyXG5cclxuZXhwb3J0IGVudW0gU3RhdHVzIHtcclxuICAgIFJVTk5JTkcsXHJcbiAgICBTVUNDRVNTLFxyXG4gICAgRkFJTFVSRVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xyXG4gICAgZGVsZXRlIGJsYWNrYm9hcmRbaWRdO1xyXG4gICAgcmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRWZmZWN0ID0gKCkgPT4gdm9pZFxyXG5leHBvcnQgdHlwZSBQcmVjb25kaXRpb24gPSAoKSA9PiBib29sZWFuXHJcbmV4cG9ydCB0eXBlIFRpY2sgPSAoKSA9PiBTdGF0dXNcclxuZXhwb3J0IHR5cGUgQWN0aW9uVGljayA9IChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpID0+IFRpY2tcclxuLyoqXHJcbiAqIFRoZSBndWFyZCB0aWNrIGlzIHRvIGFkZCBhIHByZWNvbmRpdGlvbiB0byB0aGUgY29tcG9zaXRlIHRpY2tzXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBHdWFyZFRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcclxuLyoqXHJcbiAqIFNlcXVlbmNlL1NlbGVjdG9yXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBDb21wb3NpdGVUaWNrID0gKGFzdFRpY2tzOiBUaWNrW10pID0+IFRpY2tcclxuXHJcbnZhciBibGFja2JvYXJkID0ge307XHJcblxyXG5mdW5jdGlvbiBnZXRBY3Rpb25UaWNrKGlkOiBudW1iZXIpOiBBY3Rpb25UaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQgPSAxKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByZWNvbmRpdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPSB0aWNrc1JlcXVpcmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLkZBSUxVUkU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEd1YXJkVGljaygpOiBHdWFyZFRpY2sge1xyXG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGFzdFRpY2ssIG5lZ2F0ZSA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb2NlZWQgPSBuZWdhdGUgPyAhcHJlY29uZGl0aW9uKCkgOiBwcmVjb25kaXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2NlZWQgPyBleGVjdXRlKGFzdFRpY2spIDogU3RhdHVzLkZBSUxVUkU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZXF1ZW5jZVRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xyXG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RvclRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xyXG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZShhc3RUaWNrOiBUaWNrKTogU3RhdHVzIHtcclxuICAgIHJldHVybiBhc3RUaWNrKCk7XHJcbn1cclxuXHJcbnZhciBnbG9iYWxJZENvdW50ZXIgPSAwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbihwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRBY3Rpb25UaWNrKGdsb2JhbElkQ291bnRlcisrKShwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGd1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5lZ19ndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljaywgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIHN1Y2Nlc3Mgb2YgYSBjaGlsZFxyXG4gKiBTdWNjZWVkcyBpZiBhbGwgc3VjY2VlZCwgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVuY2UoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlcXVlbmNlVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBmYWlsdXJlIG9mIGEgY2hpbGQodGhpbmsgb2YgaXQgYXMgaWYtZWxzZSBibG9ja3MpXHJcbiAqIFN1Y2NlZWRzIGlmIGV2ZW4gb25lIHN1Y2NlZWRzLCBlbHNlIGZhaWxzXHJcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xyXG4gKiBAcmV0dXJucyB7VGlja31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rvcihhc3RUaWNrczogVGlja1tdKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0U2VsZWN0b3JUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XHJcbn1cclxuXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLSBBUElzIC0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLy8wLiB1dGlsaXRpZXNcclxuLy8gbWluIGFuZCBtYXggYXJlIGluY2x1c2l2ZVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZE51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbi8vMS4gc3RvcnkgaW5zdGFuY2VcclxuXHJcbi8vMS4xIGxvY2F0aW9uc1xyXG52YXIgbG9jYXRpb25HcmFwaCA9IHt9O1xyXG5cclxuLy9hZGQgdG8gYm90aCBzaWRlc1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9jYXRpb24obG9jYXRpb25OYW1lOiBzdHJpbmcsIGFkamFjZW50TG9jYXRpb25zOiBzdHJpbmdbXSkge1xyXG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gW107XHJcbiAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0uY29uY2F0KGFkamFjZW50TG9jYXRpb25zKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50TG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPSBbXTtcclxuXHJcbiAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0ucHVzaChsb2NhdGlvbk5hbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXJlQWRqYWNlbnQobG9jYXRpb24xOiBzdHJpbmcsIGxvY2F0aW9uMjogc3RyaW5nKTpib29sZWFuIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQXJlIGFkamFjZW50OiBcIiArIGxvY2F0aW9uMSArIFwiLCBcIitsb2NhdGlvbjIpO1xyXG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXSA9PSB1bmRlZmluZWQgfHwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjJdID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFaXRoZXIgb25lL2JvdGggbG9jYXRpb25zIHVuZGVmaW5lZFwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdW2ldID09IGxvY2F0aW9uMil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLy9wYXRoZmluZGluZyBwcmltaXRpdmVzXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0TG9jYXRpb24oc3RhcnQ6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICB2YXIgdmlzaXRlZCA9IHt9O1xyXG4gICAgdmFyIHByZXZpb3VzID0ge307XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gbG9jYXRpb25HcmFwaCkge1xyXG4gICAgICAgIHZpc2l0ZWRba2V5XSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmlzaXRlZFtzdGFydF0gPSB0cnVlO1xyXG5cclxuICAgIHZhciBteVF1ZXVlID0gbmV3IFF1ZXVlPHN0cmluZz4oKTtcclxuICAgIG15UXVldWUuZW5xdWV1ZShzdGFydCk7XHJcblxyXG4gICAgd2hpbGUgKCFteVF1ZXVlLmlzRW1wdHkoKSkge1xyXG4gICAgICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBteVF1ZXVlLmRlcXVldWUoKTtcclxuICAgICAgICBpZiAoY3VycmVudCA9PT0gZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBsb2NhdGlvbkdyYXBoW2N1cnJlbnRdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXZpc2l0ZWRbbmVpZ2hib3JzW2ldXSkge1xyXG4gICAgICAgICAgICAgICAgbXlRdWV1ZS5lbnF1ZXVlKG5laWdoYm9yc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB2aXNpdGVkW25laWdoYm9yc1tpXV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNbbmVpZ2hib3JzW2ldXSA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IGRlc3RpbmF0aW9uO1xyXG4gICAgaWYgKGN1cnJlbnQgPT0gc3RhcnQpXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICB3aGlsZSAocHJldmlvdXNbY3VycmVudF0gIT0gc3RhcnQpIHtcclxuICAgICAgICBjdXJyZW50ID0gcHJldmlvdXNbY3VycmVudF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcbi8vMS4yIGFnZW50c1xyXG52YXIgYWdlbnRzID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQWdlbnQoYWdlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgIGFnZW50cy5wdXNoKGFnZW50TmFtZSk7XHJcbiAgICByZXR1cm4gYWdlbnROYW1lO1xyXG59XHJcblxyXG4vLzEuMyBpdGVtc1xyXG52YXIgaXRlbXMgPSBbXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGl0ZW1OYW1lOiBzdHJpbmcpIHtcclxuICAgIGl0ZW1zLnB1c2goaXRlbU5hbWUpO1xyXG4gICAgcmV0dXJuIGl0ZW1OYW1lO1xyXG59XHJcblxyXG4vLzEuNCB2YXJpYWJsZXNcclxudmFyIHZhcmlhYmxlcyA9IHt9O1xyXG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcclxudmFyIGl0ZW1WYXJpYWJsZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIHZhcmlhYmxlc1t2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhck5hbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXHJcbiAgICAgICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdID0ge307XHJcblxyXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGFnZW50IFwiICsgYWdlbnQgKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhcmlhYmxlTm90U2V0KHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbVZhcmlhYmxlKGl0ZW06IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkpXHJcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtXSA9IHt9O1xyXG5cclxuICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pIHx8IGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xyXG59XHJcblxyXG5cclxuLy8yXHJcbi8vYWdlbnQtYmVoYXZpb3IgdHJlZSBtYXBwaW5nXHJcbnZhciBhZ2VudFRyZWVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoVHJlZVRvQWdlbnQoYWdlbnQ6IHN0cmluZywgdHJlZTogVGljaykge1xyXG4gICAgYWdlbnRUcmVlc1thZ2VudF0gPSB0cmVlO1xyXG59XHJcblxyXG4vLzMuMVxyXG4vL3VzZXIgYWN0aW9uc1xyXG4vL1RPRE8gYWRkIHZhcmlhYmxlcyB0byB1c2VyIGFjdGlvbiB0ZXh0c1xyXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0ge1xyXG4gICAgdGV4dDogXCJcIixcclxuICAgIHVzZXJBY3Rpb25zVGV4dDogW10sXHJcbiAgICBhY3Rpb25FZmZlY3RzVGV4dDogXCJcIlxyXG59XHJcbnZhciB1c2VySW50ZXJhY3Rpb25UcmVlcyA9IFtdO1xyXG52YXIgdXNlckFjdGlvbnMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCkge1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgPSBcIlwiO1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dCA9IFtdO1xyXG4gICAgdXNlckFjdGlvbnMgPSB7fTsvL3tcIkdvIHRvIGxvY2F0aW9uIFhcIiA6IGVmZmVjdFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25UcmVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGV4ZWN1dGUodXNlckludGVyYWN0aW9uVHJlZXNbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcpID0+XHJcbiAgICBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gdHJ1ZSxcclxuICAgICAgICAoKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCArPSBcIlxcblwiICsgdGV4dCwgMFxyXG4gICAgKTtcclxuZXhwb3J0IGxldCBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dCA9ICh0ZXh0OiBzdHJpbmcpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCArPSBcIlxcblwiICsgdGV4dDtcclxuXHJcbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvblRyZWUgPSAodGV4dDogc3RyaW5nLCBlZmZlY3RUcmVlOiBUaWNrKSA9PiBhY3Rpb24oXHJcbiAgICAoKSA9PiB0cnVlLFxyXG4gICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBlZmZlY3RUcmVlKSwgMFxyXG4pO1xyXG5cclxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uID0gKHRleHQ6IHN0cmluZywgZWZmZWN0OiAoKSA9PiBhbnkpID0+XHJcbiAgICBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gdHJ1ZSxcclxuICAgICAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGFjdGlvbigoKT0+dHJ1ZSwgZWZmZWN0LCAwKSksIDBcclxuICAgICk7XHJcblxyXG5mdW5jdGlvbiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQ6IHN0cmluZywgdHJlZTogVGljaykge1xyXG4gICAgdXNlckFjdGlvbnNbdGV4dF0gPSB0cmVlO1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5wdXNoKHRleHQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlckludGVyYWN0aW9uVHJlZSh0aWNrOiBUaWNrKSB7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25UcmVlcy5wdXNoKHRpY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVVzZXJBY3Rpb24odGV4dDogc3RyaW5nKSB7XHJcbiAgICAvL2V4ZWN1dGUgdGhlIHVzZXIgYWN0aW9uXHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHVzZXJBY3Rpb25FZmZlY3RUcmVlID0gdXNlckFjdGlvbnNbdGV4dF07XHJcbiAgICBleGVjdXRlKHVzZXJBY3Rpb25FZmZlY3RUcmVlKTtcclxufVxyXG5cclxuLy80LlxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKSB7XHJcbiAgICByZXR1cm4gdXNlckludGVyYWN0aW9uT2JqZWN0O1xyXG59XHJcbmZ1bmN0aW9uIGdldF9yYW5kb21fYWdlbnRfbGlzdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicmFuZG9taXppbmdcIik7XHJcbiAgICB2YXIgbGVuID0gYWdlbnRzLmxlbmd0aDtcclxuICAgIHZhciB0ZW1wO1xyXG4gICAgdmFyIGluZGV4O1xyXG5cclxuICAgIHdoaWxlIChsZW4gPiAwKSB7XHJcbiAgICAgICAgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZW4pO1xyXG4gICAgICAgIGxlbi0tO1xyXG4gICAgICAgIHRlbXAgPSBhZ2VudHNbbGVuXVxyXG4gICAgICAgIGFnZW50c1tsZW5dID0gYWdlbnRzW2luZGV4XVxyXG4gICAgICAgIGFnZW50c1tpbmRleF0gPSB0ZW1wO1xyXG4gICAgfVxyXG4gICAgLy9jb25zb2xlLmxvZyhyb3N0ZXIpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImhpZ2hlc3QgYWZmOiBcIiArIGdldF9jaGFyX3RvX3JhaXNlX2FmZmluaXR5KHJvc3RlclswXSkubmFtZSk7XHJcbiAgICAvL3N0YXJ0IGFjdGlvbnM6XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkVGljaygpIHtcclxuICAgIC8vYWxsIGFnZW50IHRpY2tzXHJcbiAgICAvL2NvbnNvbGUubG9nKFwiSW4gd29ybGQgdGlja1wiKTtcclxuICAgIC8vcmFuZG9taXplIGFnZW50c1xyXG4gICAgZ2V0X3JhbmRvbV9hZ2VudF9saXN0KCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0cmVlID0gYWdlbnRUcmVlc1thZ2VudHNbaV1dO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codHJlZSk7XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0cmVlKSkge1xyXG4gICAgICAgICAgICBzZXRWYXJpYWJsZShcImV4ZWN1dGluZ0FnZW50XCIsIGFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcclxufSJdfQ==
