//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  $throw(new NoSuchMethodException(this, "operator []", [i]));
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  $throw(new NoSuchMethodException(this, "operator []=", [i, value]));
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $add$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'string') {
    var str = (y == null) ? 'null' : y.toString();
    if (typeof(str) != 'string') {
      throw new Error("calling toString() on right hand operand of operator " +
      "+ did not return a String");
    }
    return x + str;
  } else if (typeof(x) == 'object') {
    return x.$add(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator +", [y]));
  }
}

function $add$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x + y;
  return $add$complex$(x, y);
}
function $eq$(x, y) {
  if (x == null) return y == null;
  return (typeof(x) != 'object') ? x === y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $ne$(x, y) {
  if (x == null) return y != null;
  return (typeof(x) != 'object') ? x !== y : !x.$eq(y);
}
function $truncdiv$(x, y) {
  if (typeof(x) == 'number') {
    if (typeof(y) == 'number') {
      if (y == 0) $throw(new IntegerDivisionByZeroException());
      var tmp = x / y;
      return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
    } else {
      $throw(new IllegalArgumentException(y));
    }
  } else if (typeof(x) == 'object') {
    return x.$truncdiv(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator ~/", [y]));
  }
}
// ********** Code for Object **************
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "clear$0", function() {
  return this.noSuchMethod("clear", []);
});
$defProp(Object.prototype, "contains$1", function($0) {
  return this.noSuchMethod("contains", [$0]);
});
$defProp(Object.prototype, "is$Collection", function() {
  return false;
});
$defProp(Object.prototype, "is$List", function() {
  return false;
});
$defProp(Object.prototype, "is$Map", function() {
  return false;
});
$defProp(Object.prototype, "is$RegExp", function() {
  return false;
});
$defProp(Object.prototype, "is$html_Element", function() {
  return false;
});
$defProp(Object.prototype, "remove$0", function() {
  return this.noSuchMethod("remove", []);
});
$defProp(Object.prototype, "remove$1", function($0) {
  return this.noSuchMethod("remove", [$0]);
});
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for IllegalAccessException **************
function IllegalAccessException() {

}
IllegalAccessException.prototype.toString = function() {
  return "Attempt to modify an immutable object";
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments, _existingArgumentNames) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
  this._existingArgumentNames = _existingArgumentNames;
}
NoSuchMethodException.prototype.is$NoSuchMethodException = function(){return true};
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  if (null == this._existingArgumentNames) {
    return (("NoSuchMethodException : method not found: '" + this._functionName + "'\n") + ("Receiver: " + this._receiver + "\n") + ("Arguments: [" + sb + "]"));
  }
  else {
    var actualParameters = sb.toString();
    sb = new StringBufferImpl("");
    for (var i = (0);
     i < this._existingArgumentNames.get$length(); i++) {
      if (i > (0)) {
        sb.add(", ");
      }
      sb.add(this._existingArgumentNames.$index(i));
    }
    var formalParameters = sb.toString();
    return ("NoSuchMethodException: incorrect number of arguments passed to " + ("method named '" + this._functionName + "'\nReceiver: " + this._receiver + "\n") + ("Tried calling: " + this._functionName + "(" + actualParameters + ")\n") + ("Found: " + this._functionName + "(" + formalParameters + ")"));
  }
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
// ********** Code for BadNumberFormatException **************
function BadNumberFormatException(_s) {
  this._s = _s;
}
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
// ********** Code for FutureNotCompleteException **************
function FutureNotCompleteException() {

}
FutureNotCompleteException.prototype.toString = function() {
  return "Exception: future has not been completed";
}
// ********** Code for FutureAlreadyCompleteException **************
function FutureAlreadyCompleteException() {

}
FutureAlreadyCompleteException.prototype.toString = function() {
  return "Exception: future already completed";
}
// ********** Code for Math **************
Math.parseDouble = function(str) {
  var ret = parseFloat(str);
    if (isNaN(ret) && str != 'NaN') $throw(new BadNumberFormatException(str));
    return ret;
}
Math.max = function(a, b) {
  return (a >= b) ? a : b;
}
// ********** Code for Strings **************
function Strings() {}
Strings.String$fromCharCodes$factory = function(charCodes) {
  return StringBase.createFromCharCodes(charCodes);
}
Strings.join = function(strings, separator) {
  return StringBase.join(strings, separator);
}
// ********** Code for top level **************
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
$defProp(ListFactory.prototype, "is$List", function(){return true});
$defProp(ListFactory.prototype, "is$Collection", function(){return true});
ListFactory.ListFactory$from$factory = function(other) {
  var list = [];
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    list.add$1(e);
  }
  return list;
}
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "addAll", function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    this.add(item);
  }
});
$defProp(ListFactory.prototype, "clear$_", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "removeLast", function() {
  return this.pop();
});
$defProp(ListFactory.prototype, "last", function() {
  return this.$index(this.get$length() - (1));
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "toString", function() {
  return Collections.collectionToString(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
$defProp(ListFactory.prototype, "clear$0", ListFactory.prototype.clear$_);
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._array.$index(this._pos++);
}
// ********** Code for ImmutableList **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(ImmutableList, ListFactory);
function ImmutableList(length) {
  Array.call(this, length);
}
ImmutableList.ImmutableList$from$factory = function(other) {
  return _constList(other);
}
ImmutableList.prototype.get$length = function() {
  return this.length;
}
ImmutableList.prototype.set$length = function(length) {
  $throw(const$0006);
}
ImmutableList.prototype.$setindex = function(index, value) {
  $throw(const$0006);
}
ImmutableList.prototype.add = function(element) {
  $throw(const$0006);
}
ImmutableList.prototype.addAll = function(elements) {
  $throw(const$0006);
}
ImmutableList.prototype.clear$_ = function() {
  $throw(const$0006);
}
ImmutableList.prototype.removeLast = function() {
  $throw(const$0006);
}
ImmutableList.prototype.toString = function() {
  return Collections.collectionToString(this);
}
ImmutableList.prototype.add$1 = ImmutableList.prototype.add;
ImmutableList.prototype.clear$0 = ImmutableList.prototype.clear$_;
// ********** Code for ImmutableMap **************
function ImmutableMap(keyValuePairs) {
  this._internal = _map(keyValuePairs);
}
ImmutableMap.prototype.is$Map = function(){return true};
ImmutableMap.prototype.$index = function(key) {
  return this._internal.$index(key);
}
ImmutableMap.prototype.get$length = function() {
  return this._internal.get$length();
}
ImmutableMap.prototype.forEach = function(f) {
  this._internal.forEach(f);
}
ImmutableMap.prototype.containsKey = function(key) {
  return this._internal.containsKey(key);
}
ImmutableMap.prototype.$setindex = function(key, value) {
  $throw(const$0006);
}
ImmutableMap.prototype.clear$_ = function() {
  $throw(const$0006);
}
ImmutableMap.prototype.remove = function(key) {
  $throw(const$0006);
}
ImmutableMap.prototype.toString = function() {
  return Maps.mapToString(this);
}
ImmutableMap.prototype.clear$0 = ImmutableMap.prototype.clear$_;
ImmutableMap.prototype.remove$1 = ImmutableMap.prototype.remove;
// ********** Code for JSSyntaxRegExp **************
function JSSyntaxRegExp(pattern, multiLine, ignoreCase) {
  JSSyntaxRegExp._create$ctor.call(this, pattern, $add$(($eq$(multiLine, true) ? "m" : ""), ($eq$(ignoreCase, true) ? "i" : "")));
}
JSSyntaxRegExp._create$ctor = function(pattern, flags) {
  this.re = new RegExp(pattern, flags);
      this.pattern = pattern;
      this.multiLine = this.re.multiline;
      this.ignoreCase = this.re.ignoreCase;
}
JSSyntaxRegExp._create$ctor.prototype = JSSyntaxRegExp.prototype;
JSSyntaxRegExp.prototype.is$RegExp = function(){return true};
JSSyntaxRegExp.prototype.firstMatch = function(str) {
  var m = this._exec(str);
  return m == null ? null : new MatchImplementation(this.pattern, str, this._matchStart(m), this.get$_lastIndex(), m);
}
JSSyntaxRegExp.prototype._exec = function(str) {
  return this.re.exec(str);
}
JSSyntaxRegExp.prototype._matchStart = function(m) {
  return m.index;
}
JSSyntaxRegExp.prototype.get$_lastIndex = function() {
  return this.re.lastIndex;
}
JSSyntaxRegExp.prototype.hasMatch = function(str) {
  return this.re.test(str);
}
// ********** Code for MatchImplementation **************
function MatchImplementation(pattern, str, _start, _end, _groups) {
  this.pattern = pattern;
  this.str = str;
  this._start = _start;
  this._end = _end;
  this._groups = _groups;
}
MatchImplementation.prototype.group = function(groupIndex) {
  return this._groups.$index(groupIndex);
}
MatchImplementation.prototype.$index = function(groupIndex) {
  return this._groups.$index(groupIndex);
}
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
NumImplementation.prototype.toStringAsFixed = function(fractionDigits) {
  'use strict'; return this.toFixed(fractionDigits);
}
// ********** Code for Collections **************
function Collections() {}
Collections.collectionToString = function(c) {
  var result = new StringBufferImpl("");
  Collections._emitCollection(c, result, new Array());
  return result.toString();
}
Collections._emitCollection = function(c, result, visiting) {
  visiting.add(c);
  var isList = !!(c && c.is$List());
  result.add(isList ? "[" : "{");
  var first = true;
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(e, result, visiting);
  }
  result.add(isList ? "]" : "}");
  visiting.removeLast();
}
Collections._emitObject = function(o, result, visiting) {
  if (!!(o && o.is$Collection())) {
    if (Collections._containsRef(visiting, o)) {
      result.add(!!(o && o.is$List()) ? "[...]" : "{...}");
    }
    else {
      Collections._emitCollection(o, result, visiting);
    }
  }
  else if (!!(o && o.is$Map())) {
    if (Collections._containsRef(visiting, o)) {
      result.add("{...}");
    }
    else {
      Maps._emitMap(o, result, visiting);
    }
  }
  else {
    result.add($eq$(o) ? "null" : o);
  }
}
Collections._containsRef = function(c, ref) {
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if ((null == e ? null == (ref) : e === ref)) return true;
  }
  return false;
}
// ********** Code for FutureImpl **************
function FutureImpl() {
  this._listeners = new Array();
  this._exceptionHandlers = new Array();
  this._isComplete = false;
  this._exceptionHandled = false;
}
FutureImpl.prototype.get$value = function() {
  if (!this.get$isComplete()) {
    $throw(new FutureNotCompleteException());
  }
  if (null != this._exception) {
    $throw(this._exception);
  }
  return this._value;
}
FutureImpl.prototype.get$isComplete = function() {
  return this._isComplete;
}
FutureImpl.prototype.get$hasValue = function() {
  return this.get$isComplete() && null == this._exception;
}
FutureImpl.prototype.then = function(onComplete) {
  if (this.get$hasValue()) {
    onComplete(this.get$value());
  }
  else if (!this.get$isComplete()) {
    this._listeners.add(onComplete);
  }
  else if (!this._exceptionHandled) {
    $throw(this._exception);
  }
}
FutureImpl.prototype._complete = function() {
  this._isComplete = true;
  if (null != this._exception) {
    var $$list = this._exceptionHandlers;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var handler = $$i.next();
      if (handler.call$1(this._exception)) {
        this._exceptionHandled = true;
        break;
      }
    }
  }
  if (this.get$hasValue()) {
    var $$list = this._listeners;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var listener = $$i.next();
      listener.call$1(this.get$value());
    }
  }
  else {
    if (!this._exceptionHandled && this._listeners.get$length() > (0)) {
      $throw(this._exception);
    }
  }
}
FutureImpl.prototype._setValue = function(value) {
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._value = value;
  this._complete();
}
FutureImpl.prototype._setException = function(exception) {
  if (null == exception) {
    $throw(new IllegalArgumentException(null));
  }
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._exception = exception;
  this._complete();
}
// ********** Code for CompleterImpl **************
function CompleterImpl() {}
CompleterImpl.prototype.get$future = function() {
  return this._futureImpl;
}
CompleterImpl.prototype.complete = function(value) {
  this._futureImpl._setValue(value);
}
CompleterImpl.prototype.completeException = function(exception) {
  this._futureImpl._setException(exception);
}
// ********** Code for CompleterImpl_ElementRect **************
$inherits(CompleterImpl_ElementRect, CompleterImpl);
function CompleterImpl_ElementRect() {
  this._futureImpl = new FutureImpl();
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation.prototype.is$Map = function(){return true};
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv$((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq$(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0000 ? null == (existingKey) : const$0000 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq$(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0000) : key === const$0000)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.clear$_ = function() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    this._keys.$setindex(i);
    this._values.$setindex(i);
  }
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0000) : $0 === const$0000))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.remove = function(key) {
  var index = this._probeForLookup(key);
  if (index >= (0)) {
    this._numberOfEntries--;
    var value = this._values.$index(index);
    this._values.$setindex(index);
    this._keys.$setindex(index, const$0000);
    this._numberOfDeleted++;
    return value;
  }
  return null;
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0000) : key !== const$0000))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.containsKey = function(key) {
  return (this._probeForLookup(key) != (-1));
}
HashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
HashMapImplementation.prototype.clear$0 = HashMapImplementation.prototype.clear$_;
HashMapImplementation.prototype.remove$1 = HashMapImplementation.prototype.remove;
// ********** Code for HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair, HashMapImplementation);
function HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.clear$0 = HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.clear$_;
HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.remove$1 = HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.remove;
// ********** Code for HashMapImplementation_dart_core_String$Object **************
$inherits(HashMapImplementation_dart_core_String$Object, HashMapImplementation);
function HashMapImplementation_dart_core_String$Object() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$Object.prototype.clear$0 = HashMapImplementation_dart_core_String$Object.prototype.clear$_;
HashMapImplementation_dart_core_String$Object.prototype.remove$1 = HashMapImplementation_dart_core_String$Object.prototype.remove;
// ********** Code for HashMapImplementation_dart_core_String$dart_core_String **************
$inherits(HashMapImplementation_dart_core_String$dart_core_String, HashMapImplementation);
function HashMapImplementation_dart_core_String$dart_core_String() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$dart_core_String.prototype.clear$0 = HashMapImplementation_dart_core_String$dart_core_String.prototype.clear$_;
HashMapImplementation_dart_core_String$dart_core_String.prototype.remove$1 = HashMapImplementation_dart_core_String$dart_core_String.prototype.remove;
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {
  this._backingMap = new HashMapImplementation();
}
HashSetImplementation.prototype.is$Collection = function(){return true};
HashSetImplementation.HashSetImplementation$from$factory = function(other) {
  var set = new HashSetImplementation();
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    set.add(e);
  }
  return set;
}
HashSetImplementation.prototype.clear$_ = function() {
  this._backingMap.clear$_();
}
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.contains = function(value) {
  return this._backingMap.containsKey(value);
}
HashSetImplementation.prototype.remove = function(value) {
  if (!this._backingMap.containsKey(value)) return false;
  this._backingMap.remove(value);
  return true;
}
HashSetImplementation.prototype.addAll = function(collection) {
  var $this = this; // closure support
  collection.forEach(function _(value) {
    $this.add(value);
  }
  );
}
HashSetImplementation.prototype.forEach = function(f) {
  this._backingMap.forEach(function _(key, value) {
    f(key);
  }
  );
}
HashSetImplementation.prototype.filter = function(f) {
  var result = new HashSetImplementation();
  this._backingMap.forEach(function _(key, value) {
    if (f(key)) result.add(key);
  }
  );
  return result;
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.toString = function() {
  return Collections.collectionToString(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
HashSetImplementation.prototype.clear$0 = HashSetImplementation.prototype.clear$_;
HashSetImplementation.prototype.contains$1 = HashSetImplementation.prototype.contains;
HashSetImplementation.prototype.remove$1 = HashSetImplementation.prototype.remove;
// ********** Code for HashSetImplementation_dart_core_String **************
$inherits(HashSetImplementation_dart_core_String, HashSetImplementation);
function HashSetImplementation_dart_core_String() {
  this._backingMap = new HashMapImplementation_dart_core_String$dart_core_String();
}
HashSetImplementation_dart_core_String.prototype.add$1 = HashSetImplementation_dart_core_String.prototype.add;
HashSetImplementation_dart_core_String.prototype.remove$1 = HashSetImplementation_dart_core_String.prototype.remove;
// ********** Code for HashSetIterator **************
function HashSetIterator(set_) {
  this._nextValidIndex = (-1);
  this._entries = set_._backingMap._keys;
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  var $0;
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0000) : $0 === const$0000)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0000;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((null == entry) || ((null == entry ? null == (deletedKey) : entry === deletedKey)))
}
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for KeyValuePair **************
function KeyValuePair(key, value) {
  this.key$_ = key;
  this.value = value;
}
KeyValuePair.prototype.get$value = function() { return this.value; };
KeyValuePair.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for LinkedHashMapImplementation **************
function LinkedHashMapImplementation() {
  this._map = new HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair();
  this._list = new DoubleLinkedQueue_KeyValuePair();
}
LinkedHashMapImplementation.prototype.is$Map = function(){return true};
LinkedHashMapImplementation.prototype.$setindex = function(key, value) {
  if (this._map.containsKey(key)) {
    this._map.$index(key).get$element().set$value(value);
  }
  else {
    this._list.addLast(new KeyValuePair(key, value));
    this._map.$setindex(key, this._list.lastEntry());
  }
}
LinkedHashMapImplementation.prototype.$index = function(key) {
  var entry = this._map.$index(key);
  if (null == entry) return null;
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.remove = function(key) {
  var entry = this._map.remove(key);
  if (null == entry) return null;
  entry.remove();
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.forEach = function(f) {
  this._list.forEach(function _(entry) {
    f(entry.key$_, entry.value);
  }
  );
}
LinkedHashMapImplementation.prototype.containsKey = function(key) {
  return this._map.containsKey(key);
}
LinkedHashMapImplementation.prototype.get$length = function() {
  return this._map.get$length();
}
LinkedHashMapImplementation.prototype.clear$_ = function() {
  this._map.clear$_();
  this._list.clear$_();
}
LinkedHashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
LinkedHashMapImplementation.prototype.clear$0 = LinkedHashMapImplementation.prototype.clear$_;
LinkedHashMapImplementation.prototype.remove$1 = LinkedHashMapImplementation.prototype.remove;
// ********** Code for Maps **************
function Maps() {}
Maps.mapToString = function(m) {
  var result = new StringBufferImpl("");
  Maps._emitMap(m, result, new Array());
  return result.toString();
}
Maps._emitMap = function(m, result, visiting) {
  visiting.add(m);
  result.add("{");
  var first = true;
  m.forEach((function (k, v) {
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(k, result, visiting);
    result.add(": ");
    Collections._emitObject(v, result, visiting);
  })
  );
  result.add("}");
  visiting.removeLast();
}
// ********** Code for DoubleLinkedQueueEntry **************
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.remove = function() {
  this._previous._next = this._next;
  this._next._previous = this._previous;
  this._next = null;
  this._previous = null;
  return this._element;
}
DoubleLinkedQueueEntry.prototype._asNonSentinelEntry = function() {
  return this;
}
DoubleLinkedQueueEntry.prototype.previousEntry = function() {
  return this._previous._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
DoubleLinkedQueueEntry.prototype.remove$0 = DoubleLinkedQueueEntry.prototype.remove;
// ********** Code for DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(DoubleLinkedQueueEntry_KeyValuePair, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_KeyValuePair(e) {
  this._element = e;
}
DoubleLinkedQueueEntry_KeyValuePair.prototype.remove$0 = DoubleLinkedQueueEntry_KeyValuePair.prototype.remove;
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {
  DoubleLinkedQueueEntry.call(this, null);
  this._link(this, this);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove = function() {
  $throw(const$0004);
}
_DoubleLinkedQueueEntrySentinel.prototype._asNonSentinelEntry = function() {
  return null;
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0004);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove$0 = _DoubleLinkedQueueEntrySentinel.prototype.remove;
// ********** Code for _DoubleLinkedQueueEntrySentinel_KeyValuePair **************
$inherits(_DoubleLinkedQueueEntrySentinel_KeyValuePair, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_KeyValuePair() {
  DoubleLinkedQueueEntry_KeyValuePair.call(this, null);
  this._link(this, this);
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel();
}
DoubleLinkedQueue.prototype.is$Collection = function(){return true};
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    this.add(e);
  }
}
DoubleLinkedQueue.prototype.lastEntry = function() {
  return this._sentinel.previousEntry();
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.clear$_ = function() {
  this._sentinel._next = this._sentinel;
  this._sentinel._previous = this._sentinel;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.filter = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._element)) other.addLast(entry._element);
    entry = nextEntry;
  }
  return other;
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.toString = function() {
  return Collections.collectionToString(this);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
DoubleLinkedQueue.prototype.clear$0 = DoubleLinkedQueue.prototype.clear$_;
// ********** Code for DoubleLinkedQueue_KeyValuePair **************
$inherits(DoubleLinkedQueue_KeyValuePair, DoubleLinkedQueue);
function DoubleLinkedQueue_KeyValuePair() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_KeyValuePair();
}
DoubleLinkedQueue_KeyValuePair.prototype.clear$0 = DoubleLinkedQueue_KeyValuePair.prototype.clear$_;
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear$_();
  this.add(content);
}
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.addAll = function(objects) {
  for (var $$i = objects.iterator(); $$i.hasNext(); ) {
    var obj = $$i.next();
    this.add(obj);
  }
  return this;
}
StringBufferImpl.prototype.clear$_ = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear$_();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
StringBufferImpl.prototype.clear$0 = StringBufferImpl.prototype.clear$_;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.createFromCharCodes = function(charCodes) {
  if (Object.getPrototypeOf(charCodes) !== Array.prototype) {
    charCodes = new ListFactory.ListFactory$from$factory(charCodes);
  }
  return String.fromCharCode.apply(null, charCodes);
}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add$($add$(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.contains = function(pattern, startIndex) {
  'use strict'; return this.indexOf(pattern, startIndex) >= 0;
}
StringImplementation.prototype.split$_ = function(pattern) {
  if ((typeof(pattern) == 'string')) return this._split(pattern);
  if (!!(pattern && pattern.is$RegExp())) return this._splitRegExp(pattern);
  $throw("String.split(Pattern) unimplemented.");
}
StringImplementation.prototype._split = function(pattern) {
  'use strict'; return this.split(pattern);
}
StringImplementation.prototype._splitRegExp = function(pattern) {
  'use strict'; return this.split(pattern.re);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
StringImplementation.prototype.contains$1 = StringImplementation.prototype.contains;
// ********** Code for _ArgumentMismatchException **************
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches.
      var thisLength = this.$length || this.length;
      if (thisLength == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = thisLength - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > thisLength ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (thisLength == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
function _constList(other) {
    other.__proto__ = ImmutableList.prototype;
    return other;
}
function _map(itemsAndKeys) {
  var ret = new LinkedHashMapImplementation();
  for (var i = (0);
   i < itemsAndKeys.get$length(); ) {
    ret.$setindex(itemsAndKeys.$index(i++), itemsAndKeys.$index(i++));
  }
  return ret;
}
function _constMap(itemsAndKeys) {
  return new ImmutableMap(itemsAndKeys);
}
//  ********** Library html **************
// ********** Code for _EventTargetImpl **************
$defProp(Object.prototype, '$typeNameOf', (function() {
  function constructorNameWithFallback(obj) {
    var constructor = obj.constructor;
    if (typeof(constructor) == 'function') {
      // The constructor isn't null or undefined at this point. Try
      // to grab hold of its name.
      var name = constructor.name;
      // If the name is a non-empty string, we use that as the type
      // name of this object. On Firefox, we often get 'Object' as
      // the constructor name even for more specialized objects so
      // we have to fall through to the toString() based implementation
      // below in that case.
      if (typeof(name) == 'string' && name && name != 'Object') return name;
    }
    var string = Object.prototype.toString.call(obj);
    return string.substring(8, string.length - 1);
  }

  function chrome$typeNameOf() {
    var name = this.constructor.name;
    if (name == 'Window') return 'DOMWindow';
    return name;
  }

  function firefox$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    if (name == 'Document') return 'HTMLDocument';
    if (name == 'XMLDocument') return 'Document';
    return name;
  }

  function ie$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    // IE calls both HTML and XML documents 'Document', so we check for the
    // xmlVersion property, which is the empty string on HTML documents.
    if (name == 'Document' && this.xmlVersion) return 'Document';
    if (name == 'Document') return 'HTMLDocument';
    return name;
  }

  // If we're not in the browser, we're almost certainly running on v8.
  if (typeof(navigator) != 'object') return chrome$typeNameOf;

  var userAgent = navigator.userAgent;
  if (/Chrome|DumpRenderTree/.test(userAgent)) return chrome$typeNameOf;
  if (/Firefox/.test(userAgent)) return firefox$typeNameOf;
  if (/MSIE/.test(userAgent)) return ie$typeNameOf;
  return function() { return constructorNameWithFallback(this); };
})());
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;

    var proto = Object.getPrototypeOf(obj);

    if (method == null) {
      // Trampoline to throw NoSuchMethodException (TODO: call noSuchMethod).
      method = function(){
        // Exact type check to prevent this code shadowing the dispatcher from a
        // subclass.
        if (Object.getPrototypeOf(this) === proto) {
          // TODO(sra): 'name' is the jsname, should be the Dart name.
          $throw(new NoSuchMethodException(
              obj, name, Array.prototype.slice.call(arguments)));
        }
        return Object.prototype[name].apply(this, arguments);
      };
    }

    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];
$dynamic("get$on").EventTarget = function() {
  return new _EventsImpl(this);
}
// ********** Code for _NodeImpl **************
$dynamic("get$nodes").Node = function() {
  return new _ChildNodeListLazy(this);
}
$dynamic("remove").Node = function() {
  if ($ne$(this.get$parent())) {
    var parent = this.get$parent();
    parent.removeChild(this);
  }
  return this;
}
$dynamic("replaceWith").Node = function(otherNode) {
  try {
    var parent = this.get$parent();
    parent.replaceChild(otherNode, this);
  } catch (e) {
    e = _toDartException(e);
  }
  ;
  return this;
}
$dynamic("get$$$dom_attributes").Node = function() {
  return this.attributes;
}
$dynamic("get$$$dom_childNodes").Node = function() {
  return this.childNodes;
}
$dynamic("get$parent").Node = function() {
  return this.parentNode;
}
$dynamic("get$text").Node = function() {
  return this.textContent;
}
$dynamic("set$text").Node = function(value) {
  this.textContent = value;
}
$dynamic("contains$1").Node = function($0) {
  return this.contains($0);
};
$dynamic("remove$0").Node = function() {
  return this.remove();
};
// ********** Code for _ElementImpl **************
$dynamic("is$html_Element").Element = function(){return true};
$dynamic("get$attributes").Element = function() {
  return new _ElementAttributeMap(this);
}
$dynamic("get$elements").Element = function() {
  return new _ChildrenElementList._wrap$ctor(this);
}
$dynamic("get$classes").Element = function() {
  return new _CssClassSet(this);
}
$dynamic("get$rect").Element = function() {
  var $this = this; // closure support
  return _createMeasurementFuture((function () {
    return new _ElementRectImpl($this);
  })
  , new CompleterImpl_ElementRect());
}
$dynamic("get$on").Element = function() {
  return new _ElementEventsImpl(this);
}
$dynamic("get$$$dom_children").Element = function() {
  return this.children;
}
$dynamic("get$$$dom_className").Element = function() {
  return this.className;
}
$dynamic("set$$$dom_className").Element = function(value) {
  this.className = value;
}
$dynamic("get$$$dom_clientHeight").Element = function() {
  return this.clientHeight;
}
$dynamic("get$$$dom_clientLeft").Element = function() {
  return this.clientLeft;
}
$dynamic("get$$$dom_clientTop").Element = function() {
  return this.clientTop;
}
$dynamic("get$$$dom_clientWidth").Element = function() {
  return this.clientWidth;
}
$dynamic("get$$$dom_firstElementChild").Element = function() {
  return this.firstElementChild;
}
$dynamic("get$innerHTML").Element = function() { return this.innerHTML; };
$dynamic("set$innerHTML").Element = function(value) { return this.innerHTML = value; };
$dynamic("get$$$dom_lastElementChild").Element = function() {
  return this.lastElementChild;
}
$dynamic("get$$$dom_offsetHeight").Element = function() {
  return this.offsetHeight;
}
$dynamic("get$$$dom_offsetLeft").Element = function() {
  return this.offsetLeft;
}
$dynamic("get$$$dom_offsetTop").Element = function() {
  return this.offsetTop;
}
$dynamic("get$$$dom_offsetWidth").Element = function() {
  return this.offsetWidth;
}
$dynamic("get$$$dom_scrollHeight").Element = function() {
  return this.scrollHeight;
}
$dynamic("get$$$dom_scrollLeft").Element = function() {
  return this.scrollLeft;
}
$dynamic("get$$$dom_scrollTop").Element = function() {
  return this.scrollTop;
}
$dynamic("get$$$dom_scrollWidth").Element = function() {
  return this.scrollWidth;
}
$dynamic("get$style").Element = function() { return this.style; };
$dynamic("get$click").Element = function() {
  return this.click.bind(this);
}
Function.prototype.bind = Function.prototype.bind ||
  function(thisObj) {
    var func = this;
    var funcLength = func.$length || func.length;
    var argsLength = arguments.length;
    if (argsLength > 1) {
      var boundArgs = Array.prototype.slice.call(arguments, 1);
      var bound = function() {
        // Prepend the bound arguments to the current arguments.
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, boundArgs);
        return func.apply(thisObj, newArgs);
      };
      bound.$length = Math.max(0, funcLength - (argsLength - 1));
      return bound;
    } else {
      var bound = function() {
        return func.apply(thisObj, arguments);
      };
      bound.$length = funcLength;
      return bound;
    }
  };
// ********** Code for _HTMLElementImpl **************
// ********** Code for _AbstractWorkerImpl **************
$dynamic("get$on").AbstractWorker = function() {
  return new _AbstractWorkerEventsImpl(this);
}
// ********** Code for _EventsImpl **************
function _EventsImpl(_ptr) {
  this._ptr = _ptr;
}
_EventsImpl.prototype.get$_ptr = function() { return this._ptr; };
_EventsImpl.prototype.$index = function(type) {
  return this._get(type.toLowerCase());
}
_EventsImpl.prototype._get = function(type) {
  return new _EventListenerListImpl(this._ptr, type);
}
// ********** Code for _AbstractWorkerEventsImpl **************
$inherits(_AbstractWorkerEventsImpl, _EventsImpl);
function _AbstractWorkerEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
// ********** Code for _AnchorElementImpl **************
$dynamic("get$name").HTMLAnchorElement = function() { return this.name; };
// ********** Code for _AnimationImpl **************
$dynamic("get$name").WebKitAnimation = function() { return this.name; };
// ********** Code for _EventImpl **************
// ********** Code for _AnimationEventImpl **************
// ********** Code for _AnimationListImpl **************
$dynamic("get$length").WebKitAnimationList = function() { return this.length; };
// ********** Code for _AppletElementImpl **************
$dynamic("get$name").HTMLAppletElement = function() { return this.name; };
// ********** Code for _AreaElementImpl **************
// ********** Code for _ArrayBufferImpl **************
// ********** Code for _ArrayBufferViewImpl **************
// ********** Code for _AttrImpl **************
$dynamic("get$name").Attr = function() { return this.name; };
$dynamic("get$value").Attr = function() { return this.value; };
$dynamic("set$value").Attr = function(value) { return this.value = value; };
// ********** Code for _AudioBufferImpl **************
$dynamic("get$length").AudioBuffer = function() { return this.length; };
// ********** Code for _AudioNodeImpl **************
// ********** Code for _AudioSourceNodeImpl **************
// ********** Code for _AudioBufferSourceNodeImpl **************
// ********** Code for _AudioChannelMergerImpl **************
// ********** Code for _AudioChannelSplitterImpl **************
// ********** Code for _AudioContextImpl **************
// ********** Code for _AudioDestinationNodeImpl **************
// ********** Code for _MediaElementImpl **************
// ********** Code for _AudioElementImpl **************
// ********** Code for _AudioParamImpl **************
$dynamic("get$name").AudioParam = function() { return this.name; };
$dynamic("get$value").AudioParam = function() { return this.value; };
$dynamic("set$value").AudioParam = function(value) { return this.value = value; };
// ********** Code for _AudioGainImpl **************
// ********** Code for _AudioGainNodeImpl **************
// ********** Code for _AudioListenerImpl **************
// ********** Code for _AudioPannerNodeImpl **************
// ********** Code for _AudioProcessingEventImpl **************
// ********** Code for _BRElementImpl **************
// ********** Code for _BarInfoImpl **************
// ********** Code for _BaseElementImpl **************
// ********** Code for _BaseFontElementImpl **************
// ********** Code for _BeforeLoadEventImpl **************
// ********** Code for _BiquadFilterNodeImpl **************
// ********** Code for _BlobImpl **************
// ********** Code for _BlobBuilderImpl **************
// ********** Code for _BodyElementImpl **************
$dynamic("get$on").HTMLBodyElement = function() {
  return new _BodyElementEventsImpl(this);
}
// ********** Code for _ElementEventsImpl **************
$inherits(_ElementEventsImpl, _EventsImpl);
function _ElementEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_ElementEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
// ********** Code for _BodyElementEventsImpl **************
$inherits(_BodyElementEventsImpl, _ElementEventsImpl);
function _BodyElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
// ********** Code for _ButtonElementImpl **************
$dynamic("get$name").HTMLButtonElement = function() { return this.name; };
$dynamic("get$value").HTMLButtonElement = function() { return this.value; };
$dynamic("set$value").HTMLButtonElement = function(value) { return this.value = value; };
// ********** Code for _CharacterDataImpl **************
$dynamic("get$length").CharacterData = function() { return this.length; };
// ********** Code for _TextImpl **************
// ********** Code for _CDATASectionImpl **************
// ********** Code for _CSSRuleImpl **************
// ********** Code for _CSSCharsetRuleImpl **************
// ********** Code for _CSSFontFaceRuleImpl **************
$dynamic("get$style").CSSFontFaceRule = function() { return this.style; };
// ********** Code for _CSSImportRuleImpl **************
// ********** Code for _CSSKeyframeRuleImpl **************
$dynamic("get$style").WebKitCSSKeyframeRule = function() { return this.style; };
// ********** Code for _CSSKeyframesRuleImpl **************
$dynamic("get$name").WebKitCSSKeyframesRule = function() { return this.name; };
// ********** Code for _CSSMatrixImpl **************
// ********** Code for _CSSMediaRuleImpl **************
// ********** Code for _CSSPageRuleImpl **************
$dynamic("get$style").CSSPageRule = function() { return this.style; };
// ********** Code for _CSSValueImpl **************
// ********** Code for _CSSPrimitiveValueImpl **************
// ********** Code for _CSSRuleListImpl **************
$dynamic("get$length").CSSRuleList = function() { return this.length; };
// ********** Code for _CSSStyleDeclarationImpl **************
$dynamic("get$length").CSSStyleDeclaration = function() { return this.length; };
$dynamic("set$backgroundColor").CSSStyleDeclaration = function(value) {
  this.setProperty("background-color", value, "");
}
$dynamic("set$visibility").CSSStyleDeclaration = function(value) {
  this.setProperty("visibility", value, "");
}
// ********** Code for _CSSStyleRuleImpl **************
$dynamic("get$style").CSSStyleRule = function() { return this.style; };
// ********** Code for _StyleSheetImpl **************
// ********** Code for _CSSStyleSheetImpl **************
// ********** Code for _CSSValueListImpl **************
$dynamic("get$length").CSSValueList = function() { return this.length; };
// ********** Code for _CSSTransformValueImpl **************
// ********** Code for _CSSUnknownRuleImpl **************
// ********** Code for _CanvasElementImpl **************
// ********** Code for _CanvasGradientImpl **************
// ********** Code for _CanvasPatternImpl **************
// ********** Code for _CanvasPixelArrayImpl **************
$dynamic("is$List").CanvasPixelArray = function(){return true};
$dynamic("is$Collection").CanvasPixelArray = function(){return true};
$dynamic("get$length").CanvasPixelArray = function() { return this.length; };
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").CanvasPixelArray = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").CanvasPixelArray = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").CanvasPixelArray = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").CanvasPixelArray = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").CanvasPixelArray = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").CanvasPixelArray = function($0) {
  return this.add($0);
};
// ********** Code for _CanvasRenderingContextImpl **************
// ********** Code for _CanvasRenderingContext2DImpl **************
$dynamic("get$rect").CanvasRenderingContext2D = function() {
  return this.rect.bind(this);
}
// ********** Code for _ClientRectImpl **************
// ********** Code for _ClientRectListImpl **************
$dynamic("get$length").ClientRectList = function() { return this.length; };
// ********** Code for _ClipboardImpl **************
// ********** Code for _CloseEventImpl **************
// ********** Code for _CommentImpl **************
// ********** Code for _UIEventImpl **************
// ********** Code for _CompositionEventImpl **************
// ********** Code for _ContentElementImpl **************
// ********** Code for _ConvolverNodeImpl **************
// ********** Code for _CoordinatesImpl **************
// ********** Code for _CounterImpl **************
// ********** Code for _CryptoImpl **************
// ********** Code for _CustomEventImpl **************
// ********** Code for _DListElementImpl **************
// ********** Code for _DOMApplicationCacheImpl **************
$dynamic("get$on").DOMApplicationCache = function() {
  return new _DOMApplicationCacheEventsImpl(this);
}
// ********** Code for _DOMApplicationCacheEventsImpl **************
$inherits(_DOMApplicationCacheEventsImpl, _EventsImpl);
function _DOMApplicationCacheEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
// ********** Code for _DOMExceptionImpl **************
$dynamic("get$name").DOMException = function() { return this.name; };
// ********** Code for _DOMFileSystemImpl **************
$dynamic("get$name").DOMFileSystem = function() { return this.name; };
$dynamic("get$root").DOMFileSystem = function() { return this.root; };
// ********** Code for _DOMFileSystemSyncImpl **************
$dynamic("get$name").DOMFileSystemSync = function() { return this.name; };
$dynamic("get$root").DOMFileSystemSync = function() { return this.root; };
// ********** Code for _DOMFormDataImpl **************
// ********** Code for _DOMImplementationImpl **************
// ********** Code for _DOMMimeTypeImpl **************
// ********** Code for _DOMMimeTypeArrayImpl **************
$dynamic("get$length").DOMMimeTypeArray = function() { return this.length; };
// ********** Code for _DOMParserImpl **************
// ********** Code for _DOMPluginImpl **************
$dynamic("get$length").DOMPlugin = function() { return this.length; };
$dynamic("get$name").DOMPlugin = function() { return this.name; };
// ********** Code for _DOMPluginArrayImpl **************
$dynamic("get$length").DOMPluginArray = function() { return this.length; };
// ********** Code for _DOMSelectionImpl **************
// ********** Code for _DOMTokenListImpl **************
$dynamic("get$length").DOMTokenList = function() { return this.length; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
$dynamic("contains$1").DOMTokenList = function($0) {
  return this.contains($0);
};
$dynamic("remove$1").DOMTokenList = function($0) {
  return this.remove($0);
};
// ********** Code for _DOMSettableTokenListImpl **************
$dynamic("get$value").DOMSettableTokenList = function() { return this.value; };
$dynamic("set$value").DOMSettableTokenList = function(value) { return this.value = value; };
// ********** Code for _DOMURLImpl **************
// ********** Code for _DataTransferItemImpl **************
// ********** Code for _DataTransferItemListImpl **************
$dynamic("get$length").DataTransferItemList = function() { return this.length; };
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
$dynamic("clear$0").DataTransferItemList = function() {
  return this.clear();
};
// ********** Code for _DataViewImpl **************
// ********** Code for _DatabaseImpl **************
// ********** Code for _DatabaseSyncImpl **************
// ********** Code for _WorkerContextImpl **************
// ********** Code for _DedicatedWorkerContextImpl **************
// ********** Code for _DelayNodeImpl **************
// ********** Code for _DeprecatedPeerConnectionImpl **************
// ********** Code for _DetailsElementImpl **************
// ********** Code for _DeviceMotionEventImpl **************
// ********** Code for _DeviceOrientationEventImpl **************
// ********** Code for _DirectoryElementImpl **************
// ********** Code for _EntryImpl **************
$dynamic("get$name").Entry = function() { return this.name; };
$dynamic("remove$1").Entry = function($0) {
  return this.remove(to$call$0($0), to$call$1(null));
};
// ********** Code for _DirectoryEntryImpl **************
// ********** Code for _EntrySyncImpl **************
$dynamic("get$name").EntrySync = function() { return this.name; };
$dynamic("remove$0").EntrySync = function() {
  return this.remove();
};
// ********** Code for _DirectoryEntrySyncImpl **************
// ********** Code for _DirectoryReaderImpl **************
// ********** Code for _DirectoryReaderSyncImpl **************
// ********** Code for _DivElementImpl **************
// ********** Code for _DocumentImpl **************
$dynamic("is$html_Element").HTMLDocument = function(){return true};
$dynamic("get$on").HTMLDocument = function() {
  return new _DocumentEventsImpl(this);
}
$dynamic("query").HTMLDocument = function(selectors) {
  if (const$0008.hasMatch(selectors)) {
    return this.getElementById(selectors.substring((1)));
  }
  return this.$dom_querySelector(selectors);
}
$dynamic("$dom_querySelector").HTMLDocument = function(selectors) {
  return this.querySelector(selectors);
}
// ********** Code for _DocumentEventsImpl **************
$inherits(_DocumentEventsImpl, _ElementEventsImpl);
function _DocumentEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
_DocumentEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
_DocumentEventsImpl.prototype.get$keyUp = function() {
  return this._get("keyup");
}
// ********** Code for FilteredElementList **************
function FilteredElementList(node) {
  this._childNodes = node.get$nodes();
  this._node = node;
}
FilteredElementList.prototype.is$List = function(){return true};
FilteredElementList.prototype.is$Collection = function(){return true};
FilteredElementList.prototype.get$_filtered = function() {
  return ListFactory.ListFactory$from$factory(this._childNodes.filter((function (n) {
    return !!(n && n.is$html_Element());
  })
  ));
}
FilteredElementList.prototype.get$first = function() {
  var $$list = this._childNodes;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    if (!!(node && node.is$html_Element())) {
      return node;
    }
  }
  return null;
}
FilteredElementList.prototype.forEach = function(f) {
  this.get$_filtered().forEach(f);
}
FilteredElementList.prototype.$setindex = function(index, value) {
  this.$index(index).replaceWith(value);
}
FilteredElementList.prototype.add = function(value) {
  this._childNodes.add(value);
}
FilteredElementList.prototype.get$add = function() {
  return this.add.bind(this);
}
FilteredElementList.prototype.addAll = function(collection) {
  collection.forEach(this.get$add());
}
FilteredElementList.prototype.clear$_ = function() {
  this._childNodes.clear$_();
}
FilteredElementList.prototype.removeLast = function() {
  var result = this.last();
  if ($ne$(result)) {
    result.remove$0();
  }
  return result;
}
FilteredElementList.prototype.filter = function(f) {
  return this.get$_filtered().filter(f);
}
FilteredElementList.prototype.get$length = function() {
  return this.get$_filtered().get$length();
}
FilteredElementList.prototype.$index = function(index) {
  return this.get$_filtered().$index(index);
}
FilteredElementList.prototype.iterator = function() {
  return this.get$_filtered().iterator();
}
FilteredElementList.prototype.last = function() {
  return this.get$_filtered().last();
}
FilteredElementList.prototype.add$1 = FilteredElementList.prototype.add;
FilteredElementList.prototype.clear$0 = FilteredElementList.prototype.clear$_;
// ********** Code for EmptyElementRect **************
function EmptyElementRect() {
  this.client = const$0009;
  this.offset = const$0009;
  this.scroll = const$0009;
  this.bounding = const$0009;
  this.clientRects = const$0010;
}
// ********** Code for _DocumentFragmentImpl **************
$dynamic("is$html_Element").DocumentFragment = function(){return true};
$dynamic("get$elements").DocumentFragment = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
$dynamic("get$innerHTML").DocumentFragment = function() {
  var e = _ElementFactoryProvider.Element$tag$factory("div");
  e.get$nodes().add(this.cloneNode(true));
  return e.get$innerHTML();
}
$dynamic("set$innerHTML").DocumentFragment = function(value) {
  this.get$nodes().clear$_();
  var e = _ElementFactoryProvider.Element$tag$factory("div");
  e.set$innerHTML(value);
  var nodes = ListFactory.ListFactory$from$factory(e.get$nodes());
  this.get$nodes().addAll(nodes);
}
$dynamic("get$rect").DocumentFragment = function() {
  return _createMeasurementFuture((function () {
    return const$0011;
  })
  , new CompleterImpl_ElementRect());
}
$dynamic("get$parent").DocumentFragment = function() {
  return null;
}
$dynamic("get$classes").DocumentFragment = function() {
  return new HashSetImplementation_dart_core_String();
}
$dynamic("get$style").DocumentFragment = function() {
  return _ElementFactoryProvider.Element$tag$factory("div").get$style();
}
$dynamic("click").DocumentFragment = function() {

}
$dynamic("get$click").DocumentFragment = function() {
  return this.click.bind(this);
}
$dynamic("scrollByLines").DocumentFragment = function(lines) {

}
$dynamic("get$on").DocumentFragment = function() {
  return new _ElementEventsImpl(this);
}
// ********** Code for _DocumentTypeImpl **************
$dynamic("get$name").DocumentType = function() { return this.name; };
// ********** Code for _DynamicsCompressorNodeImpl **************
// ********** Code for _EXTTextureFilterAnisotropicImpl **************
// ********** Code for _ChildrenElementList **************
_ChildrenElementList._wrap$ctor = function(element) {
  this._childElements = element.get$$$dom_children();
  this._html_element = element;
}
_ChildrenElementList._wrap$ctor.prototype = _ChildrenElementList.prototype;
function _ChildrenElementList() {}
_ChildrenElementList.prototype.is$List = function(){return true};
_ChildrenElementList.prototype.is$Collection = function(){return true};
_ChildrenElementList.prototype._toList = function() {
  var output = new Array(this._childElements.get$length());
  for (var i = (0), len = this._childElements.get$length();
   i < len; i++) {
    output.$setindex(i, this._childElements.$index(i));
  }
  return output;
}
_ChildrenElementList.prototype.get$first = function() {
  return this._html_element.get$$$dom_firstElementChild();
}
_ChildrenElementList.prototype.forEach = function(f) {
  var $$list = this._childElements;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    f(element);
  }
}
_ChildrenElementList.prototype.filter = function(f) {
  var output = [];
  this.forEach((function (element) {
    if (f(element)) {
      output.add$1(element);
    }
  })
  );
  return new _FrozenElementList._wrap$ctor(output);
}
_ChildrenElementList.prototype.get$length = function() {
  return this._childElements.get$length();
}
_ChildrenElementList.prototype.$index = function(index) {
  return this._childElements.$index(index);
}
_ChildrenElementList.prototype.$setindex = function(index, value) {
  this._html_element.replaceChild(value, this._childElements.$index(index));
}
_ChildrenElementList.prototype.add = function(value) {
  this._html_element.appendChild(value);
  return value;
}
_ChildrenElementList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenElementList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    this._html_element.appendChild(element);
  }
}
_ChildrenElementList.prototype.clear$_ = function() {
  this._html_element.set$text("");
}
_ChildrenElementList.prototype.removeLast = function() {
  var result = this.last();
  if ($ne$(result)) {
    this._html_element.removeChild(result);
  }
  return result;
}
_ChildrenElementList.prototype.last = function() {
  return this._html_element.get$$$dom_lastElementChild();
}
_ChildrenElementList.prototype.add$1 = _ChildrenElementList.prototype.add;
_ChildrenElementList.prototype.clear$0 = _ChildrenElementList.prototype.clear$_;
// ********** Code for _FrozenElementList **************
_FrozenElementList._wrap$ctor = function(_nodeList) {
  this._nodeList = _nodeList;
}
_FrozenElementList._wrap$ctor.prototype = _FrozenElementList.prototype;
function _FrozenElementList() {}
_FrozenElementList.prototype.is$List = function(){return true};
_FrozenElementList.prototype.is$Collection = function(){return true};
_FrozenElementList.prototype.get$first = function() {
  return this._nodeList.$index((0));
}
_FrozenElementList.prototype.forEach = function(f) {
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    f(el);
  }
}
_FrozenElementList.prototype.filter = function(f) {
  var out = new _ElementList([]);
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    if (f(el)) out.add$1(el);
  }
  return out;
}
_FrozenElementList.prototype.get$length = function() {
  return this._nodeList.get$length();
}
_FrozenElementList.prototype.$index = function(index) {
  return this._nodeList.$index(index);
}
_FrozenElementList.prototype.$setindex = function(index, value) {
  $throw(const$0003);
}
_FrozenElementList.prototype.add = function(value) {
  $throw(const$0003);
}
_FrozenElementList.prototype.iterator = function() {
  return new _FrozenElementListIterator(this);
}
_FrozenElementList.prototype.addAll = function(collection) {
  $throw(const$0003);
}
_FrozenElementList.prototype.clear$_ = function() {
  $throw(const$0003);
}
_FrozenElementList.prototype.removeLast = function() {
  $throw(const$0003);
}
_FrozenElementList.prototype.last = function() {
  return this._nodeList.last();
}
_FrozenElementList.prototype.add$1 = _FrozenElementList.prototype.add;
_FrozenElementList.prototype.clear$0 = _FrozenElementList.prototype.clear$_;
// ********** Code for _FrozenElementListIterator **************
function _FrozenElementListIterator(_list) {
  this._html_index = (0);
  this._html_list = _list;
}
_FrozenElementListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_list.$index(this._html_index++);
}
_FrozenElementListIterator.prototype.hasNext = function() {
  return this._html_index < this._html_list.get$length();
}
// ********** Code for _ListWrapper **************
function _ListWrapper() {}
_ListWrapper.prototype.is$List = function(){return true};
_ListWrapper.prototype.is$Collection = function(){return true};
_ListWrapper.prototype.iterator = function() {
  return this._html_list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._html_list.forEach(f);
}
_ListWrapper.prototype.filter = function(f) {
  return this._html_list.filter(f);
}
_ListWrapper.prototype.get$length = function() {
  return this._html_list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._html_list.$index(index);
}
_ListWrapper.prototype.$setindex = function(index, value) {
  this._html_list.$setindex(index, value);
}
_ListWrapper.prototype.add = function(value) {
  return this._html_list.add(value);
}
_ListWrapper.prototype.addAll = function(collection) {
  return this._html_list.addAll(collection);
}
_ListWrapper.prototype.clear$_ = function() {
  return this._html_list.clear$_();
}
_ListWrapper.prototype.removeLast = function() {
  return this._html_list.removeLast();
}
_ListWrapper.prototype.last = function() {
  return this._html_list.last();
}
_ListWrapper.prototype.get$first = function() {
  return this._html_list.$index((0));
}
_ListWrapper.prototype.add$1 = _ListWrapper.prototype.add;
_ListWrapper.prototype.clear$0 = _ListWrapper.prototype.clear$_;
// ********** Code for _ListWrapper_Element **************
$inherits(_ListWrapper_Element, _ListWrapper);
function _ListWrapper_Element(_list) {
  this._html_list = _list;
}
_ListWrapper_Element.prototype.add$1 = _ListWrapper_Element.prototype.add;
_ListWrapper_Element.prototype.clear$0 = _ListWrapper_Element.prototype.clear$_;
// ********** Code for _ElementList **************
$inherits(_ElementList, _ListWrapper_Element);
function _ElementList(list) {
  _ListWrapper_Element.call(this, list);
}
_ElementList.prototype.filter = function(f) {
  return new _ElementList(_ListWrapper_Element.prototype.filter.call(this, f));
}
// ********** Code for _ElementAttributeMap **************
function _ElementAttributeMap(_element) {
  this._html_element = _element;
}
_ElementAttributeMap.prototype.is$Map = function(){return true};
_ElementAttributeMap.prototype.containsKey = function(key) {
  return this._html_element.hasAttribute(key);
}
_ElementAttributeMap.prototype.$index = function(key) {
  return this._html_element.getAttribute(key);
}
_ElementAttributeMap.prototype.$setindex = function(key, value) {
  this._html_element.setAttribute(key, ("" + value));
}
_ElementAttributeMap.prototype.remove = function(key) {
  this._html_element.removeAttribute(key);
}
_ElementAttributeMap.prototype.clear$_ = function() {
  var attributes = this._html_element.get$$$dom_attributes();
  for (var i = attributes.get$length() - (1);
   i >= (0); i--) {
    this.remove(attributes.$index(i).get$name());
  }
}
_ElementAttributeMap.prototype.forEach = function(f) {
  var attributes = this._html_element.get$$$dom_attributes();
  for (var i = (0), len = attributes.get$length();
   i < len; i++) {
    var item = attributes.$index(i);
    f(item.get$name(), item.get$value());
  }
}
_ElementAttributeMap.prototype.get$length = function() {
  return this._html_element.get$$$dom_attributes().length;
}
_ElementAttributeMap.prototype.clear$0 = _ElementAttributeMap.prototype.clear$_;
_ElementAttributeMap.prototype.remove$1 = _ElementAttributeMap.prototype.remove;
// ********** Code for _CssClassSet **************
function _CssClassSet(_element) {
  this._html_element = _element;
}
_CssClassSet.prototype.is$Collection = function(){return true};
_CssClassSet.prototype.toString = function() {
  return this._formatSet(this._read());
}
_CssClassSet.prototype.iterator = function() {
  return this._read().iterator();
}
_CssClassSet.prototype.forEach = function(f) {
  this._read().forEach(f);
}
_CssClassSet.prototype.filter = function(f) {
  return this._read().filter(f);
}
_CssClassSet.prototype.get$length = function() {
  return this._read().get$length();
}
_CssClassSet.prototype.contains = function(value) {
  return this._read().contains(value);
}
_CssClassSet.prototype.add = function(value) {
  this._modify((function (s) {
    return s.add$1(value);
  })
  );
}
_CssClassSet.prototype.remove = function(value) {
  var s = this._read();
  var result = s.remove(value);
  this._write(s);
  return result;
}
_CssClassSet.prototype.addAll = function(collection) {
  this._modify((function (s) {
    return s.addAll(collection);
  })
  );
}
_CssClassSet.prototype.clear$_ = function() {
  this._modify((function (s) {
    return s.clear$0();
  })
  );
}
_CssClassSet.prototype._modify = function(f) {
  var s = this._read();
  f(s);
  this._write(s);
}
_CssClassSet.prototype._read = function() {
  var s = new HashSetImplementation_dart_core_String();
  var $$list = this._classname().split$_(" ");
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var name = $$i.next();
    var trimmed = name.trim();
    if (!trimmed.isEmpty()) {
      s.add(trimmed);
    }
  }
  return s;
}
_CssClassSet.prototype._classname = function() {
  return this._html_element.get$$$dom_className();
}
_CssClassSet.prototype._write = function(s) {
  this._html_element.set$$$dom_className(this._formatSet(s));
}
_CssClassSet.prototype._formatSet = function(s) {
  var list = ListFactory.ListFactory$from$factory(s);
  return Strings.join(list, " ");
}
_CssClassSet.prototype.add$1 = _CssClassSet.prototype.add;
_CssClassSet.prototype.clear$0 = _CssClassSet.prototype.clear$_;
_CssClassSet.prototype.contains$1 = _CssClassSet.prototype.contains;
_CssClassSet.prototype.remove$1 = _CssClassSet.prototype.remove;
// ********** Code for _SimpleClientRect **************
function _SimpleClientRect(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
}
_SimpleClientRect.prototype.$eq = function(other) {
  return null != other && this.left == other.left && this.top == other.top && this.width == other.width && this.height == other.height;
}
_SimpleClientRect.prototype.toString = function() {
  return ("(" + this.left + ", " + this.top + ", " + this.width + ", " + this.height + ")");
}
// ********** Code for _ElementRectImpl **************
function _ElementRectImpl(element) {
  this.client = new _SimpleClientRect(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight());
  this.offset = new _SimpleClientRect(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight());
  this.scroll = new _SimpleClientRect(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight());
  this._boundingClientRect = element.getBoundingClientRect();
  this._clientRects = element.getClientRects();
}
// ********** Code for _ElementFactoryProvider **************
function _ElementFactoryProvider() {}
_ElementFactoryProvider.Element$html$factory = function(html) {
  var parentTag = "div";
  var tag;
  var match = const$0005.firstMatch(html);
  if (null != match) {
    tag = match.group((1)).toLowerCase();
    if (const$0007.containsKey(tag)) {
      parentTag = const$0007.$index(tag);
    }
  }
  var temp = _ElementFactoryProvider.Element$tag$factory(parentTag);
  temp.set$innerHTML(html);
  var element;
  if (temp.get$elements().get$length() == (1)) {
    element = temp.get$elements().get$first();
  }
  else if (parentTag == "html" && temp.get$elements().get$length() == (2)) {
    element = temp.get$elements().$index(tag == "head" ? (0) : (1));
  }
  else {
    $throw(new IllegalArgumentException($add$(("HTML had " + temp.get$elements().get$length() + " "), "top level elements but 1 expected")));
  }
  element.remove();
  return element;
}
_ElementFactoryProvider.Element$tag$factory = function(tag) {
  return document.createElement(tag)
}
// ********** Code for _ElementTimeControlImpl **************
// ********** Code for _ElementTraversalImpl **************
// ********** Code for _EmbedElementImpl **************
$dynamic("get$name").HTMLEmbedElement = function() { return this.name; };
// ********** Code for _EntityImpl **************
// ********** Code for _EntityReferenceImpl **************
// ********** Code for _EntryArrayImpl **************
$dynamic("get$length").EntryArray = function() { return this.length; };
// ********** Code for _EntryArraySyncImpl **************
$dynamic("get$length").EntryArraySync = function() { return this.length; };
// ********** Code for _ErrorEventImpl **************
// ********** Code for _EventExceptionImpl **************
$dynamic("get$name").EventException = function() { return this.name; };
// ********** Code for _EventSourceImpl **************
$dynamic("get$on").EventSource = function() {
  return new _EventSourceEventsImpl(this);
}
// ********** Code for _EventSourceEventsImpl **************
$inherits(_EventSourceEventsImpl, _EventsImpl);
function _EventSourceEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
// ********** Code for _EventListenerListImpl **************
function _EventListenerListImpl(_ptr, _type) {
  this._ptr = _ptr;
  this._type = _type;
}
_EventListenerListImpl.prototype.get$_ptr = function() { return this._ptr; };
_EventListenerListImpl.prototype.add = function(listener, useCapture) {
  this._add(listener, useCapture);
  return this;
}
_EventListenerListImpl.prototype.remove = function(listener, useCapture) {
  this._remove(listener, useCapture);
  return this;
}
_EventListenerListImpl.prototype._add = function(listener, useCapture) {
  this._ptr.addEventListener(this._type, listener, useCapture);
}
_EventListenerListImpl.prototype._remove = function(listener, useCapture) {
  this._ptr.removeEventListener(this._type, listener, useCapture);
}
_EventListenerListImpl.prototype.add$1 = function($0) {
  return this.add(to$call$1($0), false);
};
_EventListenerListImpl.prototype.remove$1 = function($0) {
  return this.remove(to$call$1($0), false);
};
// ********** Code for _FieldSetElementImpl **************
$dynamic("get$name").HTMLFieldSetElement = function() { return this.name; };
// ********** Code for _FileImpl **************
$dynamic("get$name").File = function() { return this.name; };
// ********** Code for _FileEntryImpl **************
// ********** Code for _FileEntrySyncImpl **************
// ********** Code for _FileErrorImpl **************
// ********** Code for _FileExceptionImpl **************
$dynamic("get$name").FileException = function() { return this.name; };
// ********** Code for _FileListImpl **************
$dynamic("get$length").FileList = function() { return this.length; };
// ********** Code for _FileReaderImpl **************
// ********** Code for _FileReaderSyncImpl **************
// ********** Code for _FileWriterImpl **************
$dynamic("get$length").FileWriter = function() { return this.length; };
// ********** Code for _FileWriterSyncImpl **************
$dynamic("get$length").FileWriterSync = function() { return this.length; };
// ********** Code for _Float32ArrayImpl **************
$dynamic("is$List").Float32Array = function(){return true};
$dynamic("is$Collection").Float32Array = function(){return true};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Float32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").Float32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
// ********** Code for _Float64ArrayImpl **************
$dynamic("is$List").Float64Array = function(){return true};
$dynamic("is$Collection").Float64Array = function(){return true};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float64Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float64Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Float64Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").Float64Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
// ********** Code for _FontElementImpl **************
// ********** Code for _FormElementImpl **************
$dynamic("get$length").HTMLFormElement = function() { return this.length; };
$dynamic("get$name").HTMLFormElement = function() { return this.name; };
// ********** Code for _FrameElementImpl **************
$dynamic("get$name").HTMLFrameElement = function() { return this.name; };
// ********** Code for _FrameSetElementImpl **************
$dynamic("get$on").HTMLFrameSetElement = function() {
  return new _FrameSetElementEventsImpl(this);
}
// ********** Code for _FrameSetElementEventsImpl **************
$inherits(_FrameSetElementEventsImpl, _ElementEventsImpl);
function _FrameSetElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
// ********** Code for _GeolocationImpl **************
// ********** Code for _GeopositionImpl **************
// ********** Code for _HRElementImpl **************
// ********** Code for _HTMLAllCollectionImpl **************
$dynamic("get$length").HTMLAllCollection = function() { return this.length; };
// ********** Code for _HTMLCollectionImpl **************
$dynamic("is$List").HTMLCollection = function(){return true};
$dynamic("is$Collection").HTMLCollection = function(){return true};
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").HTMLCollection = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").HTMLCollection = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").HTMLCollection = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").HTMLCollection = function() {
  return this.$index(this.get$length() - (1));
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
// ********** Code for _HTMLOptionsCollectionImpl **************
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
$dynamic("remove$1").HTMLOptionsCollection = function($0) {
  return this.remove($0);
};
// ********** Code for _HashChangeEventImpl **************
// ********** Code for _HeadElementImpl **************
// ********** Code for _HeadingElementImpl **************
// ********** Code for _HighPass2FilterNodeImpl **************
// ********** Code for _HistoryImpl **************
$dynamic("get$length").History = function() { return this.length; };
// ********** Code for _HtmlElementImpl **************
// ********** Code for _IDBAnyImpl **************
// ********** Code for _IDBCursorImpl **************
// ********** Code for _IDBCursorWithValueImpl **************
$dynamic("get$value").IDBCursorWithValue = function() { return this.value; };
// ********** Code for _IDBDatabaseImpl **************
$dynamic("get$name").IDBDatabase = function() { return this.name; };
// ********** Code for _IDBDatabaseErrorImpl **************
// ********** Code for _IDBDatabaseExceptionImpl **************
$dynamic("get$name").IDBDatabaseException = function() { return this.name; };
// ********** Code for _IDBFactoryImpl **************
// ********** Code for _IDBIndexImpl **************
$dynamic("get$name").IDBIndex = function() { return this.name; };
// ********** Code for _IDBKeyImpl **************
// ********** Code for _IDBKeyRangeImpl **************
// ********** Code for _IDBObjectStoreImpl **************
$dynamic("get$name").IDBObjectStore = function() { return this.name; };
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("clear$0").IDBObjectStore = function() {
  return this.clear();
};
// ********** Code for _IDBRequestImpl **************
// ********** Code for _IDBTransactionImpl **************
// ********** Code for _IDBVersionChangeEventImpl **************
// ********** Code for _IDBVersionChangeRequestImpl **************
// ********** Code for _IFrameElementImpl **************
$dynamic("get$name").HTMLIFrameElement = function() { return this.name; };
// ********** Code for _IceCandidateImpl **************
// ********** Code for _ImageDataImpl **************
// ********** Code for _ImageElementImpl **************
$dynamic("get$name").HTMLImageElement = function() { return this.name; };
// ********** Code for _InputElementImpl **************
$dynamic("get$on").HTMLInputElement = function() {
  return new _InputElementEventsImpl(this);
}
$dynamic("get$checked").HTMLInputElement = function() { return this.checked; };
$dynamic("set$checked").HTMLInputElement = function(value) { return this.checked = value; };
$dynamic("get$name").HTMLInputElement = function() { return this.name; };
$dynamic("get$value").HTMLInputElement = function() { return this.value; };
$dynamic("set$value").HTMLInputElement = function(value) { return this.value = value; };
// ********** Code for _InputElementEventsImpl **************
$inherits(_InputElementEventsImpl, _ElementEventsImpl);
function _InputElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
// ********** Code for _Int16ArrayImpl **************
$dynamic("is$List").Int16Array = function(){return true};
$dynamic("is$Collection").Int16Array = function(){return true};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").Int16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
// ********** Code for _Int32ArrayImpl **************
$dynamic("is$List").Int32Array = function(){return true};
$dynamic("is$Collection").Int32Array = function(){return true};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").Int32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
// ********** Code for _Int8ArrayImpl **************
$dynamic("is$List").Int8Array = function(){return true};
$dynamic("is$Collection").Int8Array = function(){return true};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").Int8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
// ********** Code for _JavaScriptAudioNodeImpl **************
// ********** Code for _JavaScriptCallFrameImpl **************
// ********** Code for _KeyboardEventImpl **************
// ********** Code for _KeygenElementImpl **************
$dynamic("get$name").HTMLKeygenElement = function() { return this.name; };
// ********** Code for _LIElementImpl **************
$dynamic("get$value").HTMLLIElement = function() { return this.value; };
$dynamic("set$value").HTMLLIElement = function(value) { return this.value = value; };
// ********** Code for _LabelElementImpl **************
// ********** Code for _LegendElementImpl **************
// ********** Code for _LinkElementImpl **************
// ********** Code for _MediaStreamImpl **************
// ********** Code for _LocalMediaStreamImpl **************
// ********** Code for _LocationImpl **************
// ********** Code for _LowPass2FilterNodeImpl **************
// ********** Code for _MapElementImpl **************
$dynamic("get$name").HTMLMapElement = function() { return this.name; };
// ********** Code for _MarqueeElementImpl **************
// ********** Code for _MediaControllerImpl **************
// ********** Code for _MediaElementAudioSourceNodeImpl **************
// ********** Code for _MediaErrorImpl **************
// ********** Code for _MediaListImpl **************
$dynamic("is$List").MediaList = function(){return true};
$dynamic("is$Collection").MediaList = function(){return true};
$dynamic("get$length").MediaList = function() { return this.length; };
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").MediaList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").MediaList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").MediaList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").MediaList = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
// ********** Code for _MediaQueryListImpl **************
// ********** Code for _MediaQueryListListenerImpl **************
// ********** Code for _MediaStreamEventImpl **************
// ********** Code for _MediaStreamListImpl **************
$dynamic("get$length").MediaStreamList = function() { return this.length; };
// ********** Code for _MediaStreamTrackImpl **************
// ********** Code for _MediaStreamTrackListImpl **************
$dynamic("get$length").MediaStreamTrackList = function() { return this.length; };
// ********** Code for _MemoryInfoImpl **************
// ********** Code for _MenuElementImpl **************
// ********** Code for _MessageChannelImpl **************
// ********** Code for _MessageEventImpl **************
// ********** Code for _MessagePortImpl **************
$dynamic("get$on").MessagePort = function() {
  return new _MessagePortEventsImpl(this);
}
// ********** Code for _MessagePortEventsImpl **************
$inherits(_MessagePortEventsImpl, _EventsImpl);
function _MessagePortEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
// ********** Code for _MetaElementImpl **************
$dynamic("get$name").HTMLMetaElement = function() { return this.name; };
// ********** Code for _MetadataImpl **************
// ********** Code for _MeterElementImpl **************
$dynamic("get$value").HTMLMeterElement = function() { return this.value; };
$dynamic("set$value").HTMLMeterElement = function(value) { return this.value = value; };
// ********** Code for _ModElementImpl **************
// ********** Code for _MouseEventImpl **************
// ********** Code for _MutationEventImpl **************
// ********** Code for _NamedNodeMapImpl **************
$dynamic("is$List").NamedNodeMap = function(){return true};
$dynamic("is$Collection").NamedNodeMap = function(){return true};
$dynamic("get$length").NamedNodeMap = function() { return this.length; };
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NamedNodeMap = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NamedNodeMap = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").NamedNodeMap = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").NamedNodeMap = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
// ********** Code for _NavigatorImpl **************
// ********** Code for _NavigatorUserMediaErrorImpl **************
// ********** Code for _ChildNodeListLazy **************
function _ChildNodeListLazy(_this) {
  this._this = _this;
}
_ChildNodeListLazy.prototype.is$List = function(){return true};
_ChildNodeListLazy.prototype.is$Collection = function(){return true};
_ChildNodeListLazy.prototype.last = function() {
  return this._this.lastChild;
}
_ChildNodeListLazy.prototype.add = function(value) {
  this._this.appendChild(value);
}
_ChildNodeListLazy.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    this._this.appendChild(node);
  }
}
_ChildNodeListLazy.prototype.removeLast = function() {
  var result = this.last();
  if ($ne$(result)) {
    this._this.removeChild(result);
  }
  return result;
}
_ChildNodeListLazy.prototype.clear$_ = function() {
  this._this.set$text("");
}
_ChildNodeListLazy.prototype.$setindex = function(index, value) {
  this._this.replaceChild(value, this.$index(index));
}
_ChildNodeListLazy.prototype.iterator = function() {
  return this._this.get$$$dom_childNodes().iterator();
}
_ChildNodeListLazy.prototype.forEach = function(f) {
  return _Collections.forEach(this, f);
}
_ChildNodeListLazy.prototype.filter = function(f) {
  return new _NodeListWrapper(_Collections.filter(this, [], f));
}
_ChildNodeListLazy.prototype.get$length = function() {
  return this._this.get$$$dom_childNodes().length;
}
_ChildNodeListLazy.prototype.$index = function(index) {
  return this._this.get$$$dom_childNodes().$index(index);
}
_ChildNodeListLazy.prototype.add$1 = _ChildNodeListLazy.prototype.add;
_ChildNodeListLazy.prototype.clear$0 = _ChildNodeListLazy.prototype.clear$_;
// ********** Code for _NodeFilterImpl **************
// ********** Code for _NodeIteratorImpl **************
$dynamic("get$root").NodeIterator = function() { return this.root; };
// ********** Code for _ListWrapper_Node **************
$inherits(_ListWrapper_Node, _ListWrapper);
function _ListWrapper_Node(_list) {
  this._html_list = _list;
}
_ListWrapper_Node.prototype.add$1 = _ListWrapper_Node.prototype.add;
_ListWrapper_Node.prototype.clear$0 = _ListWrapper_Node.prototype.clear$_;
// ********** Code for _NodeListWrapper **************
$inherits(_NodeListWrapper, _ListWrapper_Node);
function _NodeListWrapper(list) {
  _ListWrapper_Node.call(this, list);
}
_NodeListWrapper.prototype.filter = function(f) {
  return new _NodeListWrapper(this._html_list.filter(f));
}
// ********** Code for _NodeListImpl **************
$dynamic("is$List").NodeList = function(){return true};
$dynamic("is$Collection").NodeList = function(){return true};
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NodeList = function(value) {
  this._parent.appendChild(value);
}
$dynamic("addAll").NodeList = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    this._parent.appendChild(node);
  }
}
$dynamic("removeLast").NodeList = function() {
  var result = this.last();
  if ($ne$(result)) {
    this._parent.removeChild(result);
  }
  return result;
}
$dynamic("clear$_").NodeList = function() {
  this._parent.set$text("");
}
$dynamic("$setindex").NodeList = function(index, value) {
  this._parent.replaceChild(value, this.$index(index));
}
$dynamic("forEach").NodeList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").NodeList = function(f) {
  return new _NodeListWrapper(_Collections.filter(this, [], f));
}
$dynamic("last").NodeList = function() {
  return this.$index(this.length - (1));
}
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
$dynamic("clear$0").NodeList = function() {
  return this.clear$_();
};
// ********** Code for _NodeSelectorImpl **************
// ********** Code for _NotationImpl **************
// ********** Code for _NotificationImpl **************
$dynamic("get$on").Notification = function() {
  return new _NotificationEventsImpl(this);
}
// ********** Code for _NotificationEventsImpl **************
$inherits(_NotificationEventsImpl, _EventsImpl);
function _NotificationEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_NotificationEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
// ********** Code for _NotificationCenterImpl **************
// ********** Code for _OESStandardDerivativesImpl **************
// ********** Code for _OESTextureFloatImpl **************
// ********** Code for _OESVertexArrayObjectImpl **************
// ********** Code for _OListElementImpl **************
// ********** Code for _ObjectElementImpl **************
$dynamic("get$name").HTMLObjectElement = function() { return this.name; };
// ********** Code for _OfflineAudioCompletionEventImpl **************
// ********** Code for _OperationNotAllowedExceptionImpl **************
$dynamic("get$name").OperationNotAllowedException = function() { return this.name; };
// ********** Code for _OptGroupElementImpl **************
// ********** Code for _OptionElementImpl **************
$dynamic("get$value").HTMLOptionElement = function() { return this.value; };
$dynamic("set$value").HTMLOptionElement = function(value) { return this.value = value; };
// ********** Code for _OutputElementImpl **************
$dynamic("get$name").HTMLOutputElement = function() { return this.name; };
$dynamic("get$value").HTMLOutputElement = function() { return this.value; };
$dynamic("set$value").HTMLOutputElement = function(value) { return this.value = value; };
// ********** Code for _OverflowEventImpl **************
// ********** Code for _PageTransitionEventImpl **************
// ********** Code for _ParagraphElementImpl **************
// ********** Code for _ParamElementImpl **************
$dynamic("get$name").HTMLParamElement = function() { return this.name; };
$dynamic("get$value").HTMLParamElement = function() { return this.value; };
$dynamic("set$value").HTMLParamElement = function(value) { return this.value = value; };
// ********** Code for _PeerConnection00Impl **************
// ********** Code for _PerformanceImpl **************
// ********** Code for _PerformanceNavigationImpl **************
// ********** Code for _PerformanceTimingImpl **************
// ********** Code for _PointImpl **************
// ********** Code for _PopStateEventImpl **************
// ********** Code for _PositionErrorImpl **************
// ********** Code for _PreElementImpl **************
// ********** Code for _ProcessingInstructionImpl **************
// ********** Code for _ProgressElementImpl **************
$dynamic("get$value").HTMLProgressElement = function() { return this.value; };
$dynamic("set$value").HTMLProgressElement = function(value) { return this.value = value; };
// ********** Code for _ProgressEventImpl **************
// ********** Code for _QuoteElementImpl **************
// ********** Code for _RGBColorImpl **************
// ********** Code for _RangeImpl **************
// ********** Code for _RangeExceptionImpl **************
$dynamic("get$name").RangeException = function() { return this.name; };
// ********** Code for _RealtimeAnalyserNodeImpl **************
// ********** Code for _RectImpl **************
// ********** Code for _SQLErrorImpl **************
// ********** Code for _SQLExceptionImpl **************
// ********** Code for _SQLResultSetImpl **************
// ********** Code for _SQLResultSetRowListImpl **************
$dynamic("get$length").SQLResultSetRowList = function() { return this.length; };
// ********** Code for _SQLTransactionImpl **************
// ********** Code for _SQLTransactionSyncImpl **************
// ********** Code for _SVGElementImpl **************
$dynamic("get$classes").SVGElement = function() {
  if (null == this.noSuchMethod("get:_cssClassSet", [])) {
    this.noSuchMethod("set:_cssClassSet", [new _AttributeClassSet(this.get$_ptr())]);
  }
  return this.noSuchMethod("get:_cssClassSet", []);
}
$dynamic("get$elements").SVGElement = function() {
  return new FilteredElementList(this);
}
$dynamic("set$elements").SVGElement = function(value) {
  var elements = this.get$elements();
  elements.clear$0();
  elements.addAll(value);
}
$dynamic("get$innerHTML").SVGElement = function() {
  var container = _ElementFactoryProvider.Element$tag$factory("div");
  var cloned = this.cloneNode(true);
  container.get$elements().addAll(cloned.get$elements());
  return container.get$innerHTML();
}
$dynamic("set$innerHTML").SVGElement = function(svg) {
  var container = _ElementFactoryProvider.Element$tag$factory("div");
  container.set$innerHTML(("<svg version=\"1.1\">" + svg + "</svg>"));
  this.set$elements(container.get$elements().get$first().get$elements());
}
// ********** Code for _SVGAElementImpl **************
// ********** Code for _SVGAltGlyphDefElementImpl **************
// ********** Code for _SVGTextContentElementImpl **************
// ********** Code for _SVGTextPositioningElementImpl **************
// ********** Code for _SVGAltGlyphElementImpl **************
// ********** Code for _SVGAltGlyphItemElementImpl **************
// ********** Code for _SVGAngleImpl **************
$dynamic("get$value").SVGAngle = function() { return this.value; };
$dynamic("set$value").SVGAngle = function(value) { return this.value = value; };
// ********** Code for _SVGAnimationElementImpl **************
// ********** Code for _SVGAnimateColorElementImpl **************
// ********** Code for _SVGAnimateElementImpl **************
// ********** Code for _SVGAnimateMotionElementImpl **************
// ********** Code for _SVGAnimateTransformElementImpl **************
// ********** Code for _SVGAnimatedAngleImpl **************
// ********** Code for _SVGAnimatedBooleanImpl **************
// ********** Code for _SVGAnimatedEnumerationImpl **************
// ********** Code for _SVGAnimatedIntegerImpl **************
// ********** Code for _SVGAnimatedLengthImpl **************
// ********** Code for _SVGAnimatedLengthListImpl **************
// ********** Code for _SVGAnimatedNumberImpl **************
// ********** Code for _SVGAnimatedNumberListImpl **************
// ********** Code for _SVGAnimatedPreserveAspectRatioImpl **************
// ********** Code for _SVGAnimatedRectImpl **************
// ********** Code for _SVGAnimatedStringImpl **************
// ********** Code for _SVGAnimatedTransformListImpl **************
// ********** Code for _SVGCircleElementImpl **************
// ********** Code for _SVGClipPathElementImpl **************
// ********** Code for _SVGColorImpl **************
// ********** Code for _SVGComponentTransferFunctionElementImpl **************
// ********** Code for _SVGCursorElementImpl **************
// ********** Code for _SVGDefsElementImpl **************
// ********** Code for _SVGDescElementImpl **************
// ********** Code for _SVGDocumentImpl **************
// ********** Code for _AttributeClassSet **************
$inherits(_AttributeClassSet, _CssClassSet);
function _AttributeClassSet(element) {
  _CssClassSet.call(this, element);
}
_AttributeClassSet.prototype._write = function(s) {
  this._html_element.get$attributes().$setindex("class", this._formatSet(s));
}
// ********** Code for _SVGElementInstanceImpl **************
$dynamic("get$on").SVGElementInstance = function() {
  return new _SVGElementInstanceEventsImpl(this);
}
// ********** Code for _SVGElementInstanceEventsImpl **************
$inherits(_SVGElementInstanceEventsImpl, _EventsImpl);
function _SVGElementInstanceEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_SVGElementInstanceEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
// ********** Code for _SVGElementInstanceListImpl **************
$dynamic("get$length").SVGElementInstanceList = function() { return this.length; };
// ********** Code for _SVGEllipseElementImpl **************
// ********** Code for _SVGExceptionImpl **************
$dynamic("get$name").SVGException = function() { return this.name; };
// ********** Code for _SVGExternalResourcesRequiredImpl **************
// ********** Code for _SVGFEBlendElementImpl **************
// ********** Code for _SVGFEColorMatrixElementImpl **************
// ********** Code for _SVGFEComponentTransferElementImpl **************
// ********** Code for _SVGFECompositeElementImpl **************
// ********** Code for _SVGFEConvolveMatrixElementImpl **************
// ********** Code for _SVGFEDiffuseLightingElementImpl **************
// ********** Code for _SVGFEDisplacementMapElementImpl **************
// ********** Code for _SVGFEDistantLightElementImpl **************
// ********** Code for _SVGFEDropShadowElementImpl **************
// ********** Code for _SVGFEFloodElementImpl **************
// ********** Code for _SVGFEFuncAElementImpl **************
// ********** Code for _SVGFEFuncBElementImpl **************
// ********** Code for _SVGFEFuncGElementImpl **************
// ********** Code for _SVGFEFuncRElementImpl **************
// ********** Code for _SVGFEGaussianBlurElementImpl **************
// ********** Code for _SVGFEImageElementImpl **************
// ********** Code for _SVGFEMergeElementImpl **************
// ********** Code for _SVGFEMergeNodeElementImpl **************
// ********** Code for _SVGFEMorphologyElementImpl **************
// ********** Code for _SVGFEOffsetElementImpl **************
// ********** Code for _SVGFEPointLightElementImpl **************
// ********** Code for _SVGFESpecularLightingElementImpl **************
// ********** Code for _SVGFESpotLightElementImpl **************
// ********** Code for _SVGFETileElementImpl **************
// ********** Code for _SVGFETurbulenceElementImpl **************
// ********** Code for _SVGFilterElementImpl **************
// ********** Code for _SVGStylableImpl **************
$dynamic("get$style").SVGStylable = function() { return this.style; };
// ********** Code for _SVGFilterPrimitiveStandardAttributesImpl **************
// ********** Code for _SVGFitToViewBoxImpl **************
// ********** Code for _SVGFontElementImpl **************
// ********** Code for _SVGFontFaceElementImpl **************
// ********** Code for _SVGFontFaceFormatElementImpl **************
// ********** Code for _SVGFontFaceNameElementImpl **************
// ********** Code for _SVGFontFaceSrcElementImpl **************
// ********** Code for _SVGFontFaceUriElementImpl **************
// ********** Code for _SVGForeignObjectElementImpl **************
// ********** Code for _SVGGElementImpl **************
// ********** Code for _SVGGlyphElementImpl **************
// ********** Code for _SVGGlyphRefElementImpl **************
// ********** Code for _SVGGradientElementImpl **************
// ********** Code for _SVGHKernElementImpl **************
// ********** Code for _SVGImageElementImpl **************
// ********** Code for _SVGLangSpaceImpl **************
// ********** Code for _SVGLengthImpl **************
$dynamic("get$value").SVGLength = function() { return this.value; };
$dynamic("set$value").SVGLength = function(value) { return this.value = value; };
// ********** Code for _SVGLengthListImpl **************
$dynamic("clear$0").SVGLengthList = function() {
  return this.clear();
};
// ********** Code for _SVGLineElementImpl **************
// ********** Code for _SVGLinearGradientElementImpl **************
// ********** Code for _SVGLocatableImpl **************
// ********** Code for _SVGMPathElementImpl **************
// ********** Code for _SVGMarkerElementImpl **************
// ********** Code for _SVGMaskElementImpl **************
// ********** Code for _SVGMatrixImpl **************
// ********** Code for _SVGMetadataElementImpl **************
// ********** Code for _SVGMissingGlyphElementImpl **************
// ********** Code for _SVGNumberImpl **************
$dynamic("get$value").SVGNumber = function() { return this.value; };
$dynamic("set$value").SVGNumber = function(value) { return this.value = value; };
// ********** Code for _SVGNumberListImpl **************
$dynamic("clear$0").SVGNumberList = function() {
  return this.clear();
};
// ********** Code for _SVGPaintImpl **************
// ********** Code for _SVGPathElementImpl **************
// ********** Code for _SVGPathSegImpl **************
// ********** Code for _SVGPathSegArcAbsImpl **************
// ********** Code for _SVGPathSegArcRelImpl **************
// ********** Code for _SVGPathSegClosePathImpl **************
// ********** Code for _SVGPathSegCurvetoCubicAbsImpl **************
// ********** Code for _SVGPathSegCurvetoCubicRelImpl **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothAbsImpl **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothRelImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticAbsImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticRelImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothAbsImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothRelImpl **************
// ********** Code for _SVGPathSegLinetoAbsImpl **************
// ********** Code for _SVGPathSegLinetoHorizontalAbsImpl **************
// ********** Code for _SVGPathSegLinetoHorizontalRelImpl **************
// ********** Code for _SVGPathSegLinetoRelImpl **************
// ********** Code for _SVGPathSegLinetoVerticalAbsImpl **************
// ********** Code for _SVGPathSegLinetoVerticalRelImpl **************
// ********** Code for _SVGPathSegListImpl **************
$dynamic("clear$0").SVGPathSegList = function() {
  return this.clear();
};
// ********** Code for _SVGPathSegMovetoAbsImpl **************
// ********** Code for _SVGPathSegMovetoRelImpl **************
// ********** Code for _SVGPatternElementImpl **************
// ********** Code for _SVGPointImpl **************
// ********** Code for _SVGPointListImpl **************
$dynamic("clear$0").SVGPointList = function() {
  return this.clear();
};
// ********** Code for _SVGPolygonElementImpl **************
// ********** Code for _SVGPolylineElementImpl **************
// ********** Code for _SVGPreserveAspectRatioImpl **************
// ********** Code for _SVGRadialGradientElementImpl **************
// ********** Code for _SVGRectImpl **************
// ********** Code for _SVGRectElementImpl **************
// ********** Code for _SVGRenderingIntentImpl **************
// ********** Code for _SVGSVGElementImpl **************
// ********** Code for _SVGScriptElementImpl **************
// ********** Code for _SVGSetElementImpl **************
// ********** Code for _SVGStopElementImpl **************
// ********** Code for _SVGStringListImpl **************
$dynamic("clear$0").SVGStringList = function() {
  return this.clear();
};
// ********** Code for _SVGStyleElementImpl **************
// ********** Code for _SVGSwitchElementImpl **************
// ********** Code for _SVGSymbolElementImpl **************
// ********** Code for _SVGTRefElementImpl **************
// ********** Code for _SVGTSpanElementImpl **************
// ********** Code for _SVGTestsImpl **************
// ********** Code for _SVGTextElementImpl **************
// ********** Code for _SVGTextPathElementImpl **************
// ********** Code for _SVGTitleElementImpl **************
// ********** Code for _SVGTransformImpl **************
// ********** Code for _SVGTransformListImpl **************
$dynamic("clear$0").SVGTransformList = function() {
  return this.clear();
};
// ********** Code for _SVGTransformableImpl **************
// ********** Code for _SVGURIReferenceImpl **************
// ********** Code for _SVGUnitTypesImpl **************
// ********** Code for _SVGUseElementImpl **************
// ********** Code for _SVGVKernElementImpl **************
// ********** Code for _SVGViewElementImpl **************
// ********** Code for _SVGZoomAndPanImpl **************
// ********** Code for _SVGViewSpecImpl **************
// ********** Code for _SVGZoomEventImpl **************
// ********** Code for _ScreenImpl **************
// ********** Code for _ScriptElementImpl **************
// ********** Code for _ScriptProfileImpl **************
// ********** Code for _ScriptProfileNodeImpl **************
// ********** Code for _SelectElementImpl **************
$dynamic("get$length").HTMLSelectElement = function() { return this.length; };
$dynamic("get$name").HTMLSelectElement = function() { return this.name; };
$dynamic("get$value").HTMLSelectElement = function() { return this.value; };
$dynamic("set$value").HTMLSelectElement = function(value) { return this.value = value; };
// ********** Code for _SessionDescriptionImpl **************
// ********** Code for _ShadowElementImpl **************
// ********** Code for _ShadowRootImpl **************
$dynamic("get$innerHTML").ShadowRoot = function() { return this.innerHTML; };
$dynamic("set$innerHTML").ShadowRoot = function(value) { return this.innerHTML = value; };
// ********** Code for _SharedWorkerImpl **************
// ********** Code for _SharedWorkerContextImpl **************
$dynamic("get$name").SharedWorkerContext = function() { return this.name; };
// ********** Code for _SourceElementImpl **************
// ********** Code for _SpanElementImpl **************
// ********** Code for _SpeechGrammarImpl **************
// ********** Code for _SpeechGrammarListImpl **************
$dynamic("get$length").SpeechGrammarList = function() { return this.length; };
// ********** Code for _SpeechInputEventImpl **************
// ********** Code for _SpeechInputResultImpl **************
// ********** Code for _SpeechInputResultListImpl **************
$dynamic("get$length").SpeechInputResultList = function() { return this.length; };
// ********** Code for _SpeechRecognitionImpl **************
// ********** Code for _SpeechRecognitionAlternativeImpl **************
// ********** Code for _SpeechRecognitionErrorImpl **************
// ********** Code for _SpeechRecognitionEventImpl **************
// ********** Code for _SpeechRecognitionResultImpl **************
$dynamic("get$length").SpeechRecognitionResult = function() { return this.length; };
// ********** Code for _SpeechRecognitionResultListImpl **************
$dynamic("get$length").SpeechRecognitionResultList = function() { return this.length; };
// ********** Code for _StorageImpl **************
$dynamic("is$Map").Storage = function(){return true};
$dynamic("containsKey").Storage = function(key) {
  return this.getItem(key) != null;
}
$dynamic("$index").Storage = function(key) {
  return this.getItem(key);
}
$dynamic("$setindex").Storage = function(key, value) {
  return this.setItem(key, value);
}
$dynamic("remove").Storage = function(key) {
  var value = this.$index(key);
  this.removeItem(key);
  return value;
}
$dynamic("clear$_").Storage = function() {
  return this.clear();
}
$dynamic("forEach").Storage = function(f) {
  for (var i = (0);
   true; i = $add$(i, (1))) {
    var key = this.key(i);
    if ($eq$(key)) return;
    f(key, this.$index(key));
  }
}
$dynamic("get$length").Storage = function() {
  return this.get$$$dom_length();
}
$dynamic("get$$$dom_length").Storage = function() {
  return this.length;
}
$dynamic("clear$0").Storage = function() {
  return this.clear$_();
};
$dynamic("remove$1").Storage = function($0) {
  return this.remove($0);
};
// ********** Code for _StorageEventImpl **************
// ********** Code for _StorageInfoImpl **************
// ********** Code for _StyleElementImpl **************
// ********** Code for _StyleMediaImpl **************
// ********** Code for _StyleSheetListImpl **************
$dynamic("is$List").StyleSheetList = function(){return true};
$dynamic("is$Collection").StyleSheetList = function(){return true};
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_html_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").StyleSheetList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").StyleSheetList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").StyleSheetList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").StyleSheetList = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
// ********** Code for _TableCaptionElementImpl **************
// ********** Code for _TableCellElementImpl **************
// ********** Code for _TableColElementImpl **************
// ********** Code for _TableElementImpl **************
// ********** Code for _TableRowElementImpl **************
// ********** Code for _TableSectionElementImpl **************
// ********** Code for _TextAreaElementImpl **************
$dynamic("get$name").HTMLTextAreaElement = function() { return this.name; };
$dynamic("get$value").HTMLTextAreaElement = function() { return this.value; };
$dynamic("set$value").HTMLTextAreaElement = function(value) { return this.value = value; };
// ********** Code for _TextEventImpl **************
// ********** Code for _TextMetricsImpl **************
// ********** Code for _TextTrackImpl **************
// ********** Code for _TextTrackCueImpl **************
$dynamic("get$text").TextTrackCue = function() { return this.text; };
// ********** Code for _TextTrackCueListImpl **************
$dynamic("get$length").TextTrackCueList = function() { return this.length; };
// ********** Code for _TextTrackListImpl **************
$dynamic("get$length").TextTrackList = function() { return this.length; };
// ********** Code for _TimeRangesImpl **************
$dynamic("get$length").TimeRanges = function() { return this.length; };
// ********** Code for _TitleElementImpl **************
// ********** Code for _TouchImpl **************
// ********** Code for _TouchEventImpl **************
// ********** Code for _TouchListImpl **************
$dynamic("is$List").TouchList = function(){return true};
$dynamic("is$Collection").TouchList = function(){return true};
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_html_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").TouchList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").TouchList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").TouchList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").TouchList = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
// ********** Code for _TrackElementImpl **************
// ********** Code for _TrackEventImpl **************
// ********** Code for _TransitionEventImpl **************
// ********** Code for _TreeWalkerImpl **************
$dynamic("get$root").TreeWalker = function() { return this.root; };
// ********** Code for _UListElementImpl **************
// ********** Code for _Uint16ArrayImpl **************
$dynamic("is$List").Uint16Array = function(){return true};
$dynamic("is$Collection").Uint16Array = function(){return true};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").Uint16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
// ********** Code for _Uint32ArrayImpl **************
$dynamic("is$List").Uint32Array = function(){return true};
$dynamic("is$Collection").Uint32Array = function(){return true};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").Uint32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
// ********** Code for _Uint8ArrayImpl **************
$dynamic("is$List").Uint8Array = function(){return true};
$dynamic("is$Collection").Uint8Array = function(){return true};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("last").Uint8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
// ********** Code for _Uint8ClampedArrayImpl **************
// ********** Code for _UnknownElementImpl **************
// ********** Code for _ValidityStateImpl **************
// ********** Code for _VideoElementImpl **************
// ********** Code for _WaveShaperNodeImpl **************
// ********** Code for _WebGLActiveInfoImpl **************
$dynamic("get$name").WebGLActiveInfo = function() { return this.name; };
// ********** Code for _WebGLBufferImpl **************
// ********** Code for _WebGLCompressedTextureS3TCImpl **************
// ********** Code for _WebGLContextAttributesImpl **************
// ********** Code for _WebGLContextEventImpl **************
// ********** Code for _WebGLDebugRendererInfoImpl **************
// ********** Code for _WebGLDebugShadersImpl **************
// ********** Code for _WebGLFramebufferImpl **************
// ********** Code for _WebGLLoseContextImpl **************
// ********** Code for _WebGLProgramImpl **************
// ********** Code for _WebGLRenderbufferImpl **************
// ********** Code for _WebGLRenderingContextImpl **************
// ********** Code for _WebGLShaderImpl **************
// ********** Code for _WebGLTextureImpl **************
// ********** Code for _WebGLUniformLocationImpl **************
// ********** Code for _WebGLVertexArrayObjectOESImpl **************
// ********** Code for _WebKitCSSRegionRuleImpl **************
// ********** Code for _WebKitNamedFlowImpl **************
// ********** Code for _WebSocketImpl **************
$dynamic("get$on").WebSocket = function() {
  return new _WebSocketEventsImpl(this);
}
// ********** Code for _WebSocketEventsImpl **************
$inherits(_WebSocketEventsImpl, _EventsImpl);
function _WebSocketEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
// ********** Code for _WheelEventImpl **************
// ********** Code for _WindowImpl **************
$dynamic("get$document").DOMWindow = function() {
  return this.document;
}
$dynamic("get$on").DOMWindow = function() {
  return new _WindowEventsImpl(this);
}
$dynamic("get$length").DOMWindow = function() { return this.length; };
$dynamic("get$name").DOMWindow = function() { return this.name; };
// ********** Code for _WindowEventsImpl **************
$inherits(_WindowEventsImpl, _EventsImpl);
function _WindowEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_WindowEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
_WindowEventsImpl.prototype.get$message = function() {
  return this._get("message");
}
// ********** Code for _WorkerImpl **************
$dynamic("get$on").Worker = function() {
  return new _WorkerEventsImpl(this);
}
// ********** Code for _WorkerEventsImpl **************
$inherits(_WorkerEventsImpl, _AbstractWorkerEventsImpl);
function _WorkerEventsImpl(_ptr) {
  _AbstractWorkerEventsImpl.call(this, _ptr);
}
// ********** Code for _WorkerLocationImpl **************
// ********** Code for _WorkerNavigatorImpl **************
// ********** Code for _XMLHttpRequestImpl **************
$dynamic("get$on").XMLHttpRequest = function() {
  return new _XMLHttpRequestEventsImpl(this);
}
// ********** Code for _XMLHttpRequestEventsImpl **************
$inherits(_XMLHttpRequestEventsImpl, _EventsImpl);
function _XMLHttpRequestEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
// ********** Code for _XMLHttpRequestExceptionImpl **************
$dynamic("get$name").XMLHttpRequestException = function() { return this.name; };
// ********** Code for _XMLHttpRequestProgressEventImpl **************
// ********** Code for _XMLHttpRequestUploadImpl **************
$dynamic("get$on").XMLHttpRequestUpload = function() {
  return new _XMLHttpRequestUploadEventsImpl(this);
}
// ********** Code for _XMLHttpRequestUploadEventsImpl **************
$inherits(_XMLHttpRequestUploadEventsImpl, _EventsImpl);
function _XMLHttpRequestUploadEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
// ********** Code for _XMLSerializerImpl **************
// ********** Code for _XPathEvaluatorImpl **************
// ********** Code for _XPathExceptionImpl **************
$dynamic("get$name").XPathException = function() { return this.name; };
// ********** Code for _XPathExpressionImpl **************
// ********** Code for _XPathNSResolverImpl **************
// ********** Code for _XPathResultImpl **************
// ********** Code for _XSLTProcessorImpl **************
// ********** Code for _Collections **************
function _Collections() {}
_Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    f(e);
  }
}
_Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for _MeasurementRequest **************
function _MeasurementRequest(computeValue, completer) {
  this.exception = false;
  this.computeValue = computeValue;
  this.completer = completer;
}
_MeasurementRequest.prototype.get$value = function() { return this.value; };
_MeasurementRequest.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for _DocumentFragmentFactoryProvider **************
function _DocumentFragmentFactoryProvider() {}
_DocumentFragmentFactoryProvider.DocumentFragment$factory = function() {
  return get$$document().createDocumentFragment();
}
// ********** Code for _TextFactoryProvider **************
function _TextFactoryProvider() {}
_TextFactoryProvider.Text$factory = function(data) {
  return document.createTextNode(data);
}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._html_array.get$length() > this._html_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_array.$index(this._html_pos++);
}
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._html_length > this._html_pos;
}
// ********** Code for _VariableSizeListIterator_dart_core_String **************
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dart_core_String **************
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for _VariableSizeListIterator_int **************
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_int **************
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
// ********** Code for _VariableSizeListIterator_num **************
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_num **************
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_Node **************
$inherits(_VariableSizeListIterator_html_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Node(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_Node **************
$inherits(_FixedSizeListIterator_html_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Node(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Node.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_StyleSheet **************
$inherits(_VariableSizeListIterator_html_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_html_StyleSheet(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_StyleSheet **************
$inherits(_FixedSizeListIterator_html_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_html_StyleSheet(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_StyleSheet.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_Touch **************
$inherits(_VariableSizeListIterator_html_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Touch(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_Touch **************
$inherits(_FixedSizeListIterator_html_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Touch(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Touch.call(this, array);
}
// ********** Code for top level **************
function get$$window() {
  return window;
}
function get$$document() {
  return document;
}
var _cachedBrowserPrefix;
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
function _maybeScheduleMeasurementFrame() {
  if ($globals._nextMeasurementFrameScheduled) return;
  $globals._nextMeasurementFrameScheduled = true;
  if ($globals._firstMeasurementRequest) {
    get$$window().get$on().get$message().add((function (e) {
      return _completeMeasurementFutures();
    })
    , false);
    $globals._firstMeasurementRequest = false;
  }
  get$$window().postMessage("DART-MEASURE", "*");
}
function _createMeasurementFuture(computeValue, completer) {
  if (null == $globals._pendingRequests) {
    $globals._pendingRequests = [];
    _maybeScheduleMeasurementFrame();
  }
  $globals._pendingRequests.add(new _MeasurementRequest(computeValue, completer));
  return completer.get$future();
}
function _completeMeasurementFutures() {
  if ($eq$($globals._nextMeasurementFrameScheduled, false)) {
    return;
  }
  $globals._nextMeasurementFrameScheduled = false;
  if (null != $globals._pendingRequests) {
    var $$list = $globals._pendingRequests;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var request = $$i.next();
      try {
        request.value = request.computeValue();
      } catch (e) {
        e = _toDartException(e);
        request.value = e;
        request.exception = true;
      }
    }
  }
  var completedRequests = $globals._pendingRequests;
  var readyMeasurementFrameCallbacks = $globals._pendingMeasurementFrameCallbacks;
  $globals._pendingRequests = null;
  $globals._pendingMeasurementFrameCallbacks = null;
  if (null != completedRequests) {
    for (var $$i = completedRequests.iterator(); $$i.hasNext(); ) {
      var request = $$i.next();
      if (request.exception) {
        request.completer.completeException(request.value);
      }
      else {
        request.completer.complete(request.value);
      }
    }
  }
  if (null != readyMeasurementFrameCallbacks) {
    for (var $$i = readyMeasurementFrameCallbacks.iterator(); $$i.hasNext(); ) {
      var handler = $$i.next();
      handler();
    }
  }
}
//  ********** Library calculator **************
// ********** Code for Tape **************
function Tape() {
  this.clearTape();
}
Tape.prototype.addToTape = function(op, number) {
  var displayTotal;
  var numberAsValue;
  if (number != "." && number != "-" && number != "-.") {
    try {
      numberAsValue = Math.parseDouble(number.length == (0) ? "0" : number);
    } catch (e) {
      e = _toDartException(e);
      if (!(e instanceof BadNumberFormatException)) throw e;
      this.displayError(e.toString());
      return;
    }
  }
  else {
    displayTotal = $globals.total;
    numberAsValue = (0.0);
  }
  var opAsStr;
  if (op != (0) || $globals.currentOperator == null) {
    switch ($globals.currentOperator) {
      case (0):

        $globals.total = numberAsValue;
        break;

      case (1):

        $globals.total = $globals.total + numberAsValue;
        break;

      case (2):

        $globals.total = $globals.total - numberAsValue;
        break;

      case (3):

        $globals.total = $globals.total * numberAsValue;
        break;

      case (4):

        $globals.total = $globals.total / numberAsValue;
        break;

      case (5):

        if (number.length == (0)) return;
        break;

      default:

        $globals.total = numberAsValue;

    }
  }
  else if (op == (0) && $globals.currentOperator == (5)) {
    $globals.total = numberAsValue;
  }
  if (op == (0)) {
    switch ($globals.currentOperator) {
      case (1):

        displayTotal = $globals.total + numberAsValue;
        break;

      case (2):

        displayTotal = $globals.total - numberAsValue;
        break;

      case (3):

        displayTotal = $globals.total * numberAsValue;
        break;

      case (4):

        displayTotal = $globals.total / numberAsValue;
        break;

      case (5):

        displayTotal = $globals.total;
        break;

      default:


    }
  }
  else {
    displayTotal = $globals.total;
  }
  switch (op) {
    case (0):
    case (5):

      opAsStr = " &nbsp;&nbsp;";
      break;

    case (1):

      opAsStr = "+ ";
      break;

    case (2):

      opAsStr = "- ";
      break;

    case (3):

      opAsStr = "* ";
      break;

    case (4):

      opAsStr = "/ ";
      break;

  }
  if (op != (0)) {
    $globals.currentOperator = op;
  }
  var element = _ElementFactoryProvider.Element$tag$factory("div");
  var active = this.get$activeInput();
  if (op == (0)) {
    if (active != null) {
      var displayedOp = active.get$elements().$index((0)).get$text();
      active.set$innerHTML($globals.tapeUI.firstOp(displayedOp, number));
    }
    else {
      element.set$innerHTML($globals.tapeUI.displayOpAndNumber(opAsStr, number));
      $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
      element.set$innerHTML($globals.tapeUI.alignSubTotal());
      ;
      $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
      element.set$innerHTML($globals.tapeUI.lineBreak());
      $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
    }
    active = this.get$activeTotal();
    if (active != null) {
      active.set$text(("= " + this.formatOutput(displayTotal)));
    }
  }
  else {
    this.removeActiveElements();
    var leftSide;
    if (op == (5)) {
      leftSide = $globals.tapeUI.displayEqual();
    }
    else {
      leftSide = $globals.tapeUI.displayOp(opAsStr);
    }
    element.set$innerHTML(leftSide);
    $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
    if (op == (5)) {
      element.set$innerHTML($globals.tapeUI.displayTotal(this.formatOutput(displayTotal)));
    }
    else {
      element.set$innerHTML($globals.tapeUI.displayActiveTotal());
    }
    $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
    element.set$innerHTML($globals.tapeUI.lineBreak());
    $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
  }
  this.scrollToTapeBottom();
}
Tape.prototype.formatOutput = function(displayTotal) {
  var formattedNum = ("" + displayTotal.toStringAsFixed((5)));
  var dotIdx = formattedNum.indexOf(".");
  if (dotIdx >= (0)) {
    if (formattedNum.substring(dotIdx) == ".00000") {
      formattedNum = formattedNum.substring((0), dotIdx);
    }
  }
  return formattedNum;
}
Tape.prototype.displayError = function(err) {
  this.removeActiveElements();
  var element = _ElementFactoryProvider.Element$tag$factory("div");
  element.set$innerHTML($globals.tapeUI.displayError(err));
  $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
  this.scrollToTapeBottom();
  $globals.currentOperator = null;
  $globals.currentRegister = "";
  $globals.total = (0.0);
}
Tape.prototype.scrollToTapeBottom = function() {
  $globals.tapeUI.tape.get$rect().then((function (rect) {
    $globals.tapeUI.tape.scrollByLines((100000));
  })
  );
}
Tape.prototype.removeActiveElements = function() {
  var element = _ElementFactoryProvider.Element$tag$factory("div");
  var active = this.get$activeInput();
  if (active != null) {
    element.set$innerHTML($globals.tapeUI.replaceActiveOp(active.get$innerHTML()));
    active.replaceWith(element.get$elements().$index((0)));
    active = this.get$activeTotal();
    if (active != null) {
      element.set$innerHTML($globals.tapeUI.replaceActiveTotal(active.get$text()));
      active.replaceWith(element.get$elements().$index((0)));
    }
  }
}
Tape.prototype.clearTotal = function() {
  var element = _ElementFactoryProvider.Element$tag$factory("div");
  element.set$innerHTML($globals.tapeUI.clearCalculation());
  $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
  this.scrollToTapeBottom();
}
Tape.prototype.get$isClear = function() {
  return $globals.tapeUI.tape.get$elements().last().get$classes().contains$1(TapeUI.get$clearCalc());
}
Tape.prototype.clearTape = function() {
  $globals.tapeUI.tape.get$elements().clear$_();
  var settingsUI = new SettingsDialog();
  $globals.tapeUI.tape.get$elements().add(settingsUI.get$root());
  $globals.mySettings = new Settings(settingsUI, (2));
}
Tape.prototype.get$activeInput = function() {
  return get$$window().get$document().query("#activeInput");
}
Tape.prototype.get$activeTotal = function() {
  return get$$window().get$document().query("#activeTotal");
}
Tape.prototype.clear$_ = function() {
  var element = _ElementFactoryProvider.Element$tag$factory("div");
  element.set$innerHTML($globals.tapeUI.clearCalculation());
  $globals.tapeUI.tape.get$elements().add(element.get$elements().$index((0)));
}
Tape.prototype.clear$0 = Tape.prototype.clear$_;
// ********** Code for Settings **************
function Settings(ui, theme) {
  var $this = this; // closure support
  this.ui = ui;
  this.theme = theme;
  this._dialogOpened = false;
  this.ui.settings.get$on().get$click().add$1((function (e) {
    $globals.mySettings.dialog();
    e.cancelBubble = true;
  })
  );
  this.ui.simpleTitle.get$on().get$click().add$1((function (e) {
    $this.ui.simple.set$checked(true);
  })
  );
  this.ui.buttonTitle.get$on().get$click().add$1((function (e) {
    $this.ui.buttons.set$checked(true);
  })
  );
}
Settings.prototype.dialog = function() {
  this.decorateDropdown();
  if (!this._dialogOpened) {
    this.ui.simple.set$checked(this.theme == (1));
    this.ui.buttons.set$checked(this.theme == (2));
    this.ui.settingsDialog.get$style().set$visibility("visible");
    this._dialogOpened = true;
  }
  else {
    this.close();
  }
}
Settings.prototype.decorateDropdown = function() {
  this.ui.settings.get$style().set$backgroundColor(this._dialogOpened ? "transparent" : "#333");
}
Settings.prototype.get$isOpen = function() {
  return this._dialogOpened;
}
Settings.prototype.close = function(e) {
  if (this.get$isOpen()) {
    if (this.ui.simple.get$checked()) {
      this.theme = (1);
    }
    else if (this.ui.buttons.get$checked()) {
      this.theme = (2);
    }
    if (e == null || !this.ui.settingsDialog.contains$1(e.srcElement)) {
      this.decorateDropdown();
      this.ui.settingsDialog.get$style().set$visibility("hidden");
      this._dialogOpened = false;
    }
  }
}
Settings.prototype.get$isSimple = function() {
  return this.theme == (1);
}
Settings.prototype.get$isButton = function() {
  return this.theme == (2);
}
// ********** Code for FlatPadUI **************
function FlatPadUI() {
  this._scopes = new HashMapImplementation_dart_core_String$Object();
  add_calcui_templatesStyles();
  this._fragment = _DocumentFragmentFactoryProvider.DocumentFragment$factory();
  var e0 = _ElementFactoryProvider.Element$html$factory("<div class=\"calc-pad\"></div>");
  this._fragment.get$elements().add(e0);
  var e1 = _ElementFactoryProvider.Element$html$factory("<div class=\"calc-row\"></div>");
  e0.get$elements().add(e1);
  this.keySeven = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">7</span>");
  e1.get$elements().add(this.keySeven);
  this.keyEight = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">8</span>");
  e1.get$elements().add(this.keyEight);
  this.keyNine = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">9</span>");
  e1.get$elements().add(this.keyNine);
  this.keyPlus = _ElementFactoryProvider.Element$html$factory("<div class=\"op-plus-base op-plus\"></div>");
  e1.get$elements().add(this.keyPlus);
  this.keyMinus = _ElementFactoryProvider.Element$html$factory("<div class=\"op-minus-base op-minus\"></div>");
  e1.get$elements().add(this.keyMinus);
  var e2 = _ElementFactoryProvider.Element$html$factory("<div class=\"calc-row\"></div>");
  e0.get$elements().add(e2);
  this.keyFour = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">4</span>");
  e2.get$elements().add(this.keyFour);
  this.keyFive = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">5</span>");
  e2.get$elements().add(this.keyFive);
  this.keySix = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">6</span>");
  e2.get$elements().add(this.keySix);
  this.keyStar = _ElementFactoryProvider.Element$html$factory("<div class=\"op-mult-base op-mult\"></div>");
  e2.get$elements().add(this.keyStar);
  this.keySlash = _ElementFactoryProvider.Element$html$factory("<div class=\"op-div-base op-div\"></div>");
  e2.get$elements().add(this.keySlash);
  var e3 = _ElementFactoryProvider.Element$html$factory("<div class=\"calc-row\"></div>");
  e0.get$elements().add(e3);
  this.keyOne = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">1</span>");
  e3.get$elements().add(this.keyOne);
  this.keyTwo = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">2</span>");
  e3.get$elements().add(this.keyTwo);
  this.keyThree = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">3</span>");
  e3.get$elements().add(this.keyThree);
  this.keyEqual = _ElementFactoryProvider.Element$html$factory("<div class=\"op-equal-base op-equal\"></div>");
  e3.get$elements().add(this.keyEqual);
  this.keyClear = _ElementFactoryProvider.Element$html$factory("<div class=\"op-arrow-base op-arrow\"></div>");
  e3.get$elements().add(this.keyClear);
  var e4 = _ElementFactoryProvider.Element$html$factory("<div class=\"calc-row\"></div>");
  e0.get$elements().add(e4);
  this.keyZero = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-num\">0</span>");
  e4.get$elements().add(this.keyZero);
  this.keyDot = _ElementFactoryProvider.Element$html$factory("<span class=\"calc-period\"></span>");
  e4.get$elements().add(this.keyDot);
  var e5 = _ElementFactoryProvider.Element$html$factory("<span style=\"font-size:9pt;\">&nbsp;&nbsp;</span>");
  this.keyDot.get$elements().add(e5);
  var e6 = _TextFactoryProvider.Text$factory(".");
  this.keyDot.get$elements().add(e6);
  var e7 = _ElementFactoryProvider.Element$html$factory("<span style=\"font-size:9pt;\">&nbsp;&nbsp;</span>");
  this.keyDot.get$elements().add(e7);
}
FlatPadUI.prototype.get$keySeven = function() { return this.keySeven; };
FlatPadUI.prototype.get$keyEight = function() { return this.keyEight; };
FlatPadUI.prototype.get$keyNine = function() { return this.keyNine; };
FlatPadUI.prototype.get$keyPlus = function() { return this.keyPlus; };
FlatPadUI.prototype.get$keyMinus = function() { return this.keyMinus; };
FlatPadUI.prototype.get$keyFour = function() { return this.keyFour; };
FlatPadUI.prototype.get$keyFive = function() { return this.keyFive; };
FlatPadUI.prototype.get$keySix = function() { return this.keySix; };
FlatPadUI.prototype.get$keyStar = function() { return this.keyStar; };
FlatPadUI.prototype.get$keySlash = function() { return this.keySlash; };
FlatPadUI.prototype.get$keyOne = function() { return this.keyOne; };
FlatPadUI.prototype.get$keyTwo = function() { return this.keyTwo; };
FlatPadUI.prototype.get$keyThree = function() { return this.keyThree; };
FlatPadUI.prototype.get$keyEqual = function() { return this.keyEqual; };
FlatPadUI.prototype.get$keyClear = function() { return this.keyClear; };
FlatPadUI.prototype.get$keyZero = function() { return this.keyZero; };
FlatPadUI.prototype.get$keyDot = function() { return this.keyDot; };
FlatPadUI.prototype.get$root = function() {
  return this._fragment;
}
// ********** Code for ButtonPadUI **************
function ButtonPadUI() {
  this._scopes = new HashMapImplementation_dart_core_String$Object();
  add_calcui_templatesStyles();
  this._fragment = _DocumentFragmentFactoryProvider.DocumentFragment$factory();
  var e0 = _ElementFactoryProvider.Element$html$factory("<div class=\"button-pad\"></div>");
  this._fragment.get$elements().add(e0);
  var e1 = _ElementFactoryProvider.Element$html$factory("<div class=\"button-row\"></div>");
  e0.get$elements().add(e1);
  this.keySeven = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">7</span>");
  e1.get$elements().add(this.keySeven);
  this.keyEight = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">8</span>");
  e1.get$elements().add(this.keyEight);
  this.keyNine = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">9</span>");
  e1.get$elements().add(this.keyNine);
  this.keyPlus = _ElementFactoryProvider.Element$html$factory("<div class=\"buttonop-plus-base buttonop-plus\"></div>");
  e1.get$elements().add(this.keyPlus);
  this.keyMinus = _ElementFactoryProvider.Element$html$factory("<div class=\"buttonop-minus-base buttonop-minus\"></div>");
  e1.get$elements().add(this.keyMinus);
  var e2 = _ElementFactoryProvider.Element$html$factory("<div class=\"button-row\"></div>");
  e0.get$elements().add(e2);
  this.keyFour = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">4</span>");
  e2.get$elements().add(this.keyFour);
  this.keyFive = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">5</span>");
  e2.get$elements().add(this.keyFive);
  this.keySix = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">6</span>");
  e2.get$elements().add(this.keySix);
  this.keyStar = _ElementFactoryProvider.Element$html$factory("<div class=\"buttonop-mult-base buttonop-mult\"></div>");
  e2.get$elements().add(this.keyStar);
  this.keySlash = _ElementFactoryProvider.Element$html$factory("<div class=\"buttonop-div-base buttonop-div\"></div>");
  e2.get$elements().add(this.keySlash);
  var e3 = _ElementFactoryProvider.Element$html$factory("<div class=\"button-row\"></div>");
  e0.get$elements().add(e3);
  this.keyOne = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">1</span>");
  e3.get$elements().add(this.keyOne);
  this.keyTwo = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">2</span>");
  e3.get$elements().add(this.keyTwo);
  this.keyThree = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">3</span>");
  e3.get$elements().add(this.keyThree);
  this.keyEqual = _ElementFactoryProvider.Element$html$factory("<div class=\"buttonop-equal-base buttonop-equal\"></div>");
  e3.get$elements().add(this.keyEqual);
  this.keyClear = _ElementFactoryProvider.Element$html$factory("<div class=\"buttonop-arrow-base buttonop-arrow\"></div>");
  e3.get$elements().add(this.keyClear);
  var e4 = _ElementFactoryProvider.Element$html$factory("<div style=\"padding-top: 1px;\" class=\"button-row\"></div>");
  e0.get$elements().add(e4);
  this.keyZero = _ElementFactoryProvider.Element$html$factory("<span class=\"button-num\">0</span>");
  e4.get$elements().add(this.keyZero);
  this.keyDot = _ElementFactoryProvider.Element$html$factory("<span class=\"button-period\"></span>");
  e4.get$elements().add(this.keyDot);
  var e5 = _ElementFactoryProvider.Element$html$factory("<span style=\"font-size:9pt;\">&nbsp;&nbsp;</span>");
  this.keyDot.get$elements().add(e5);
  var e6 = _TextFactoryProvider.Text$factory(".");
  this.keyDot.get$elements().add(e6);
  var e7 = _ElementFactoryProvider.Element$html$factory("<span style=\"font-size:9pt;\">&nbsp;&nbsp;</span>");
  this.keyDot.get$elements().add(e7);
}
ButtonPadUI.prototype.get$keySeven = function() { return this.keySeven; };
ButtonPadUI.prototype.get$keyEight = function() { return this.keyEight; };
ButtonPadUI.prototype.get$keyNine = function() { return this.keyNine; };
ButtonPadUI.prototype.get$keyPlus = function() { return this.keyPlus; };
ButtonPadUI.prototype.get$keyMinus = function() { return this.keyMinus; };
ButtonPadUI.prototype.get$keyFour = function() { return this.keyFour; };
ButtonPadUI.prototype.get$keyFive = function() { return this.keyFive; };
ButtonPadUI.prototype.get$keySix = function() { return this.keySix; };
ButtonPadUI.prototype.get$keyStar = function() { return this.keyStar; };
ButtonPadUI.prototype.get$keySlash = function() { return this.keySlash; };
ButtonPadUI.prototype.get$keyOne = function() { return this.keyOne; };
ButtonPadUI.prototype.get$keyTwo = function() { return this.keyTwo; };
ButtonPadUI.prototype.get$keyThree = function() { return this.keyThree; };
ButtonPadUI.prototype.get$keyEqual = function() { return this.keyEqual; };
ButtonPadUI.prototype.get$keyClear = function() { return this.keyClear; };
ButtonPadUI.prototype.get$keyZero = function() { return this.keyZero; };
ButtonPadUI.prototype.get$keyDot = function() { return this.keyDot; };
ButtonPadUI.prototype.get$root = function() {
  return this._fragment;
}
// ********** Code for SettingsDialog **************
function SettingsDialog() {
  this._scopes = new HashMapImplementation_dart_core_String$Object();
  add_calcui_templatesStyles();
  this._fragment = _DocumentFragmentFactoryProvider.DocumentFragment$factory();
  var e0 = _ElementFactoryProvider.Element$html$factory("<div></div>");
  this._fragment.get$elements().add(e0);
  this.settings = _ElementFactoryProvider.Element$html$factory("<div class=\"setting-glyph\"></div>");
  e0.get$elements().add(this.settings);
  this.settingsDialog = _ElementFactoryProvider.Element$html$factory("<div class=\"dialog\" style=\"visibility: hidden;\"></div>");
  e0.get$elements().add(this.settingsDialog);
  var e1 = _ElementFactoryProvider.Element$html$factory("<div class=\"dlg-area\"></div>");
  this.settingsDialog.get$elements().add(e1);
  var e2 = _ElementFactoryProvider.Element$html$factory("<div class=\"dlg-subtitle\">Theme:</div>");
  e1.get$elements().add(e2);
  this.simpleTitle = _ElementFactoryProvider.Element$html$factory("<div style=\"cursor: pointer;\"></div>");
  e1.get$elements().add(this.simpleTitle);
  this.simple = _ElementFactoryProvider.Element$html$factory("<input class=\"dlg-item\" name=\"theme\" type=\"radio\"></input>");
  this.simpleTitle.get$elements().add(this.simple);
  var e3 = _ElementFactoryProvider.Element$html$factory("<span>Simple</span>");
  this.simpleTitle.get$elements().add(e3);
  this.buttonTitle = _ElementFactoryProvider.Element$html$factory("<div style=\"cursor: pointer;\"></div>");
  e1.get$elements().add(this.buttonTitle);
  this.buttons = _ElementFactoryProvider.Element$html$factory("<input class=\"dlg-item\" name=\"theme\" type=\"radio\"></input>");
  this.buttonTitle.get$elements().add(this.buttons);
  var e4 = _ElementFactoryProvider.Element$html$factory("<span>Buttons</span>");
  this.buttonTitle.get$elements().add(e4);
}
SettingsDialog.prototype.get$root = function() {
  return this._fragment;
}
// ********** Code for TapeUI **************
function TapeUI() {
  this._scopes = new HashMapImplementation_dart_core_String$Object();
  add_calcui_templatesStyles();
  this._fragment = _DocumentFragmentFactoryProvider.DocumentFragment$factory();
  this.tape = _ElementFactoryProvider.Element$html$factory("<div class=\"calculator-tape\"></div>");
  this._fragment.get$elements().add(this.tape);
}
TapeUI.prototype.lineBreak = function() {
  return "<div class=\"clear-line\"></div>";
}
TapeUI.prototype.clearCalculation = function() {
  return "<div class=\"clear-calc\"></div>";
}
TapeUI.prototype.firstOp = function(displayedOp, number) {
  return ("<span style=\"font-family: courier;\">" + displayedOp + "</span>" + number);
}
TapeUI.prototype.displayOpAndNumber = function(opAsStr, number) {
  return ("<div id=\"activeInput\" class=\"alignleft\"><span style=\"font-family: courier;\">" + opAsStr + "</span>" + number + "</div>");
}
TapeUI.prototype.displayOp = function(opAsStr) {
  return ("<div id=\"activeInput\" class=\"alignleft\"><span style=\"font-family: courier;\">" + opAsStr + "</span></div>");
}
TapeUI.prototype.displayEqual = function() {
  return "<div class=\"alignleft\"><span style=\"font-family: courier;\">&nbsp;&nbsp;</span></div>";
}
TapeUI.prototype.alignSubTotal = function() {
  return "<div class=\"alignright\"></div>";
}
TapeUI.prototype.displayTotal = function(formattedTotal) {
  return ("<div class=\"alignright\">= " + formattedTotal + "</div>");
}
TapeUI.prototype.displayActiveTotal = function() {
  return "<div id=\"activeTotal\" class=\"alignright\"></div>";
}
TapeUI.prototype.displayError = function(err) {
  return ("<div class=\"error\">" + err + "</div>");
}
TapeUI.prototype.replaceActiveOp = function(value) {
  return ("<div class=\"alignleft\">" + value + "</div>");
}
TapeUI.prototype.replaceActiveTotal = function(value) {
  return ("<div class=\"alignright\">" + value + "</div>");
}
TapeUI.prototype.get$root = function() {
  return this._fragment;
}
TapeUI.get$clearCalc = function() {
  return "clear-calc";
}
// ********** Code for top level **************
var padUI;
var tapeUI;
var tape;
var mySettings;
var currentRegister;
var currentOperator;
var total;
var numberKeyPresses;
var operatorKeyPresses;
var equalKeyPresses;
var clearKeyPresses;
var dotKeyPresses;
var backspacePresses;
function setupEvents() {
  $globals.numberKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(48), (49), (50), (51), (52), (53), (54), (55), (56), (57), (96), (97), (98), (99), (100), (101), (102), (103), (104), (105)]);
  $globals.operatorKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(56), (187), (189), (191), (106), (107), (109), (111)]);
  $globals.equalKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(187), (13), (0)]);
  $globals.clearKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(27), (67), (99), (46)]);
  $globals.dotKeyPresses = HashSetImplementation.HashSetImplementation$from$factory([(190), (110)]);
  $globals.backspacePresses = HashSetImplementation.HashSetImplementation$from$factory([(8)]);
  addPadEvents();
  get$$document().get$on().get$keyUp().add((function (e) {
    processKeyEvent(e);
  })
  , false);
  get$$document().get$on().get$click().add((function (e) {
    $globals.mySettings.close(e);
    renderPad(get$$document().body.get$elements().last());
    addPadEvents();
  })
  , false);
}
function addPadEvents() {
  $globals.padUI.get$keyZero().get$on().get$click().add$1((function (e) {
    doCalc((48), false, false);
  })
  );
  $globals.padUI.get$keyOne().get$on().get$click().add$1((function (e) {
    doCalc((49), false, false);
  })
  );
  $globals.padUI.get$keyTwo().get$on().get$click().add$1((function (e) {
    doCalc((50), false, false);
  })
  );
  $globals.padUI.get$keyThree().get$on().get$click().add$1((function (e) {
    doCalc((51), false, false);
  })
  );
  $globals.padUI.get$keyFour().get$on().get$click().add$1((function (e) {
    doCalc((52), false, false);
  })
  );
  $globals.padUI.get$keyFive().get$on().get$click().add$1((function (e) {
    doCalc((53), false, false);
  })
  );
  $globals.padUI.get$keySix().get$on().get$click().add$1((function (e) {
    doCalc((54), false, false);
  })
  );
  $globals.padUI.get$keySeven().get$on().get$click().add$1((function (e) {
    doCalc((55), false, false);
  })
  );
  $globals.padUI.get$keyEight().get$on().get$click().add$1((function (e) {
    doCalc((56), false, false);
  })
  );
  $globals.padUI.get$keyNine().get$on().get$click().add$1((function (e) {
    doCalc((57), false, false);
  })
  );
  $globals.padUI.get$keyDot().get$on().get$click().add$1((function (e) {
    doCalc((110), false, false);
  })
  );
  $globals.padUI.get$keyPlus().get$on().get$click().add$1((function (e) {
    doCalc((107), false, false);
  })
  );
  $globals.padUI.get$keyMinus().get$on().get$click().add$1((function (e) {
    doCalc((109), false, false);
  })
  );
  $globals.padUI.get$keyStar().get$on().get$click().add$1((function (e) {
    doCalc((106), false, false);
  })
  );
  $globals.padUI.get$keySlash().get$on().get$click().add$1((function (e) {
    doCalc((111), false, false);
  })
  );
  $globals.padUI.get$keyEqual().get$on().get$click().add$1((function (e) {
    doCalc((187), false, false);
  })
  );
  $globals.padUI.get$keyClear().get$on().get$click().add$1((function (e) {
    doCalc((27), false, false);
  })
  );
}
function removePadEvents() {
  $globals.padUI.get$keyZero().get$on().get$click().remove$1((function (e) {
    doCalc((48), false, false);
  })
  );
  $globals.padUI.get$keyOne().get$on().get$click().remove$1((function (e) {
    doCalc((49), false, false);
  })
  );
  $globals.padUI.get$keyTwo().get$on().get$click().remove$1((function (e) {
    doCalc((50), false, false);
  })
  );
  $globals.padUI.get$keyThree().get$on().get$click().remove$1((function (e) {
    doCalc((51), false, false);
  })
  );
  $globals.padUI.get$keyFour().get$on().get$click().remove$1((function (e) {
    doCalc((52), false, false);
  })
  );
  $globals.padUI.get$keyFive().get$on().get$click().remove$1((function (e) {
    doCalc((53), false, false);
  })
  );
  $globals.padUI.get$keySix().get$on().get$click().remove$1((function (e) {
    doCalc((54), false, false);
  })
  );
  $globals.padUI.get$keySeven().get$on().get$click().remove$1((function (e) {
    doCalc((55), false, false);
  })
  );
  $globals.padUI.get$keyEight().get$on().get$click().remove$1((function (e) {
    doCalc((56), false, false);
  })
  );
  $globals.padUI.get$keyNine().get$on().get$click().remove$1((function (e) {
    doCalc((57), false, false);
  })
  );
  $globals.padUI.get$keyDot().get$on().get$click().remove$1((function (e) {
    doCalc((110), false, false);
  })
  );
  $globals.padUI.get$keyPlus().get$on().get$click().remove$1((function (e) {
    doCalc((107), false, false);
  })
  );
  $globals.padUI.get$keyMinus().get$on().get$click().remove$1((function (e) {
    doCalc((109), false, false);
  })
  );
  $globals.padUI.get$keyStar().get$on().get$click().remove$1((function (e) {
    doCalc((106), false, false);
  })
  );
  $globals.padUI.get$keySlash().get$on().get$click().remove$1((function (e) {
    doCalc((111), false, false);
  })
  );
  $globals.padUI.get$keyEqual().get$on().get$click().remove$1((function (e) {
    doCalc((187), false, false);
  })
  );
  $globals.padUI.get$keyClear().get$on().get$click().remove$1((function (e) {
    doCalc((27), false, false);
  })
  );
}
function renderPad(parentElement) {
  var update = false;
  if ($globals.mySettings.get$isSimple() && !(($globals.padUI instanceof FlatPadUI))) {
    if ($ne$($globals.padUI)) {
      removePadEvents();
    }
    $globals.padUI = new FlatPadUI();
    update = true;
  }
  else if ($globals.mySettings.get$isButton() && !(($globals.padUI instanceof ButtonPadUI))) {
    if ($ne$($globals.padUI)) {
      removePadEvents();
    }
    $globals.padUI = new ButtonPadUI();
    update = true;
  }
  if (update) {
    if (parentElement.get$elements().get$length() > (1)) {
      parentElement.get$elements().last().remove();
    }
    parentElement.get$elements().add($globals.padUI.get$root());
  }
}
function processKeyEvent(e) {
  var code = e.keyCode;
  var shift = e.shiftKey;
  var ctrl = e.ctrlKey;
  doCalc(code, shift, ctrl);
}
function doCalc(code, shift, ctrl) {
  $globals.mySettings.close();
  if ($globals.numberKeyPresses.contains(code)) {
    if (code == (56) && shift) {
      processOperator($globals.padUI.get$keyStar());
      return;
    }
    else if (code >= (96)) {
      code -= (48);
    }
    var element;
    switch (code) {
      case (48):

        element = $globals.padUI.get$keyZero();
        break;

      case (49):

        element = $globals.padUI.get$keyOne();
        break;

      case (50):

        element = $globals.padUI.get$keyTwo();
        break;

      case (51):

        element = $globals.padUI.get$keyThree();
        break;

      case (52):

        element = $globals.padUI.get$keyFour();
        break;

      case (53):

        element = $globals.padUI.get$keyFive();
        break;

      case (54):

        element = $globals.padUI.get$keySix();
        break;

      case (55):

        element = $globals.padUI.get$keySeven();
        break;

      case (56):

        element = $globals.padUI.get$keyEight();
        break;

      case (57):

        element = $globals.padUI.get$keyNine();
        break;

      default:

        $globals.tape.displayError("Unknown key");

    }
    processNumber(code, element);
  }
  else if ($globals.operatorKeyPresses.contains(code)) {
    var op;
    if ((shift && code == (56)) || code == (106)) {
      processOperator($globals.padUI.get$keyStar());
    }
    else if ((shift && code == (187)) || code == (107)) {
      processOperator($globals.padUI.get$keyPlus());
    }
    else if ((code == (189) && !shift) || code == (109)) {
      processOperator($globals.padUI.get$keyMinus());
    }
    else if ((code == (191) && !shift) || code == (111)) {
      processOperator($globals.padUI.get$keySlash());
    }
    else if (!shift && code == (187)) {
      processOperator($globals.padUI.get$keyEqual());
    }
    else {
      return;
    }
  }
  else if ($globals.clearKeyPresses.contains(code)) {
    resetCalculatorState();
  }
  else if ($globals.dotKeyPresses.contains(code) && !shift) {
    processNumber((46), $globals.padUI.get$keyDot());
  }
  else if ($globals.equalKeyPresses.contains(code) && !shift) {
    processOperator($globals.padUI.get$keyClear());
  }
  else if ($globals.backspacePresses.contains(code)) {
    if (ctrl) {
      resetCalculatorState();
      $globals.tape.clearTape();
    }
    else {
      $globals.currentRegister = $globals.currentRegister.substring((0), Math.max((0), $globals.currentRegister.length - (1)));
      $globals.tape.addToTape((0), $globals.currentRegister);
    }
  }
}
function processNumber(code, key) {
  var char = Strings.String$fromCharCodes$factory([code]);
  if (char == "." && $globals.currentRegister.indexOf(".") != (-1)) {
    flickerKey($globals.padUI.get$keyDot(), "-error");
    return;
  }
  else {
    $globals.currentRegister = ("" + $globals.currentRegister + char);
  }
  flickerKey(key, "-hover");
  $globals.tape.addToTape((0), $globals.currentRegister);
}
function processOperator(element) {
  flickerKey(element, "-hover");
  if ($globals.currentRegister.length != (0)) {
    var op;
    if ($eq$(element, $globals.padUI.get$keyPlus())) {
      op = (1);
    }
    else if ($eq$(element, $globals.padUI.get$keyMinus())) {
      if ($globals.currentRegister == "-") {
        $globals.currentRegister = "";
        op = (0);
      }
      else if ($globals.currentRegister == "-.") {
        $globals.currentRegister = ".";
        op = (0);
      }
      else {
        op = (2);
      }
    }
    else if ($eq$(element, $globals.padUI.get$keyStar())) {
      op = (3);
    }
    else if ($eq$(element, $globals.padUI.get$keySlash())) {
      op = (4);
    }
    else if ($eq$(element, $globals.padUI.get$keyEqual())) {
      op = (5);
    }
    else if ($eq$(element, $globals.padUI.get$keyClear())) {
      op = (6);
    }
    else {
      $globals.tape.displayError("Unknown operator");
    }
    if ($globals.currentRegister.length != (0) || ($globals.tape.get$activeTotal() == null && op == (5))) {
      $globals.tape.addToTape(op, $globals.currentRegister);
    }
    $globals.currentRegister = "";
  }
  else if ($eq$(element, $globals.padUI.get$keyMinus())) {
    $globals.currentRegister = "-";
    $globals.tape.addToTape((0), $globals.currentRegister);
  }
}
function resetCalculatorState() {
  flickerKey($globals.padUI.get$keyClear(), "-hover");
  $globals.tape.removeActiveElements();
  if (!$globals.tape.get$isClear()) {
    $globals.tape.clearTotal();
    $globals.currentRegister = "";
    $globals.currentOperator = null;
    $globals.total = (0.0);
  }
}
function flickerKey(key, postfix) {
  var theClass;
  var $$list = key.get$classes();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var cls = $$i.next();
    if (cls.split$_("-").get$length() == (2)) {
      theClass = cls;
    }
  }
  key.get$classes().add$1(("" + theClass + postfix));
  var nextPostfix = (postfix == "-error") ? "-error" : "-press";
  get$$window().setTimeout((function () {
    return resetKey(key, ("" + theClass + postfix), ("" + theClass + nextPostfix));
  })
  , (80));
}
function resetKey(key, classToRemove, classToAdd) {
  if (key != null) {
    key.get$classes().remove$1(classToRemove);
    if (classToAdd.length > (0)) {
      key.get$classes().add$1(classToAdd);
      get$$window().setTimeout((function () {
        return resetKey(key, classToAdd, "");
      })
      , (80));
    }
  }
}
function main() {
  var element = _ElementFactoryProvider.Element$tag$factory("div");
  $globals.tapeUI = new TapeUI();
  element.get$elements().add($globals.tapeUI.get$root());
  $globals.tape = new Tape();
  renderPad(element);
  get$$document().body.get$elements().add(element);
  $globals.currentRegister = "";
  $globals.total = (0.0);
  setupEvents();
}
function add_calcui_templatesStyles() {
  if (!$globals.calcui_stylesheet_added) {
    var styles = new StringBufferImpl("");
    styles.add("    \n.calc-pad {\n  background-color: #222;\n  width: 241px;\n  height: 168px;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  cursor: default;\n}\n\n.calc-row {\n  color: #ffffff;\n  font-size: 25pt;\n  font-family: arial;\n  font-weight: bold;\n  padding-top: 2px;\n  padding-left: 12px;\n}\n\n.calc-num {\n  padding-left: 8px;\n  padding-right: 8px;\n  margin-right: 11px;\n  cursor: pointer;\n}\n\n.calc-period {\n  padding-left: 7px;\n  padding-right: 7px;\n  margin-right: 11px;\n  cursor: pointer;\n  font-size: 24pt;\n}\n\n.calc-op-button {\n  padding-left: 12px;\n  padding-right: 19px;\n  color: #808080;\n  font-size: 20pt;\n  vertical-align: middle;\n}\n\n.calc-num:hover {\n  width: 100px;\n  height: 100px;\n  background: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #000;\n}\n\n.calc-num-hover {\n  width: 100px;\n  height: 100px;\n  background: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #000;\n}\n\n.calc-num:active {\n  width: 100px;\n  height: 100px;\n  background: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #ffffff;\n}\n\n.calc-num-active {\n  width: 100px;\n  height: 100px;\n  background: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #ffffff;\n}\n\n.calc-period:hover {\n  width: 100px;\n  height: 100px;\n  background: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #000;\n}\n\n.calc-period-hover {\n  width: 100px;\n  height: 100px;\n  background: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #000;\n}\n\n.calc-period:active {\n  width: 100px;\n  height: 100px;\n  background: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #ffffff;\n}\n\n.calc-period-active {\n  width: 100px;\n  height: 100px;\n  background: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #ffffff;\n}\n\n.calc-period-error {\n  width: 100px;\n  height: 100px;\n  background: #cd5c5c;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  color: #b22222;\n}\n\n.op-plus-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 185px;\n  left: 158px;\n}\n\n.op-plus {\n  background-image: url(plus.png);\n  background-repeat: no-repeat;\n}\n\n.op-plus:hover {\n  background-image: url(plus_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-plus-hover {\n  background-image: url(plus_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-plus:active {\n  background-image: url(plus_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-plus-active {\n  background-image: url(plus_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-minus-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 185px;\n  left: 198px;\n}\n\n.op-minus {\n  background-image: url(minus.png);\n  background-repeat: no-repeat;\n}\n\n.op-minus:hover {\n  background-image: url(minus_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-minus-hover {\n  background-image: url(minus_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-minus:active {\n  background-image: url(minus_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-minus-active {\n  background-image: url(minus_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-mult-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 228px;\n  left: 158px;\n}\n\n.op-mult {\n  background-image: url(mult.png);\n  background-repeat: no-repeat;\n}\n\n.op-mult:hover {\n  background-image: url(mult_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-mult-hover {\n  background-image: url(mult_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-mult:active {\n  background-image: url(mult_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-mult-active {\n  background-image: url(mult_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-div-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 228px;\n  left: 198px;\n}\n\n.op-div {\n  background-image: url(div.png);\n  background-repeat: no-repeat;\n}\n\n.op-div:hover {\n  background-image: url(div_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-div-hover {\n  background-image: url(div_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-div:active {\n  background-image: url(div_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-div-active {\n  background-image: url(div_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-equal-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 268px;\n  left: 158px;\n}\n\n.op-equal {\n  background-image: url(equal.png);\n  background-repeat: no-repeat;\n}\n\n.op-equal:hover {\n  background-image: url(equal_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-equal-hover {\n  background-image: url(equal_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-equal:active {\n  background-image: url(equal_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-equal-active {\n  background-image: url(equal_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-arrow-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 268px;\n  left: 198px;\n}\n\n.op-arrow {\n  background-image: url(arrow.png);\n  background-repeat: no-repeat;\n}\n\n.op-arrow:hover {\n  background-image: url(arrow_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-arrow-hover {\n  background-image: url(arrow_black.png);\n  background-repeat: no-repeat;\n  background-color: #d3d3d3;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-arrow:active {\n  background-image: url(arrow_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n.op-arrow-active {\n  background-image: url(arrow_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 20px;\n  border-radius: 20px;\n  background-position: center;\n}\n\n  ");
    styles.add("    \n.button-pad {\n  background-color: #F4F4F4;\n  width: 241px;\n  height: 168px;\n  padding-top: 8px;\n  padding-bottom: 4px;\n  cursor: default;\n}\n\n.button-row {\n  color: #444;\n  font-size: 16pt;\n  font-family: arial;\n  font-weight: bold;\n  padding-bottom: 10px;\n  padding-left: 12px;\n  margin-top: 5px;\n}\n\n.button-num {\n  padding-left: 12px;\n  padding-right: 12px;\n  margin-right: 6px;\n  cursor: pointer;\n  border: 1px solid #808080;\n  padding-top: 5px;\n  padding-bottom: 6px;\n  background-color: #FCFCFC;\n  -moz-box-shadow: 1px 1px 1px 1px #ccc;\n  -webkit-box-shadow: 1px 1px 1px 1px #ccc;\n  box-shadow: 1px 1px 1px 1px #ccc;\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n\n.button-period {\n  padding-left: 9px;\n  padding-right: 8px;\n  margin-right: 6px;\n  cursor: pointer;\n  border: 1px solid #808080;\n  padding-top: 5px;\n  padding-bottom: 6px;\n  background-color: #FCFCFC;\n  -moz-box-shadow: 1px 1px 1px 1px #ccc;\n  -webkit-box-shadow: 1px 1px 1px 1px #ccc;\n  box-shadow: 1px 1px 1px 1px #ccc;\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n\n.button-num:hover {\n  width: 100px;\n  height: 100px;\n  background: #d3d3d3;\n  color: #000;\n}\n\n.button-num-hover {\n  width: 100px;\n  height: 100px;\n  background: #d3d3d3;\n  color: #000;\n}\n\n.button-num:active {\n  width: 100px;\n  height: 100px;\n  background: #778899;\n  color: #ffffff;\n}\n\n.button-num-active {\n  width: 100px;\n  height: 100px;\n  background: #778899;\n  color: #ffffff;\n}\n\n.button-period:hover {\n  width: 100px;\n  height: 100px;\n  background: #d3d3d3;\n  color: #000;\n}\n\n.button-period-hover {\n  width: 100px;\n  height: 100px;\n  background: #d3d3d3;\n  color: #000;\n}\n\n.button-period:active {\n  width: 100px;\n  height: 100px;\n  background: #778899;\n  color: #ffffff;\n}\n\n.button-period-active {\n  width: 100px;\n  height: 100px;\n  background: #778899;\n  color: #ffffff;\n}\n\n.button-period-error {\n  width: 100px;\n  height: 100px;\n  background: #cd5c5c;\n  color: #b22222;\n}\n\n.buttonop-plus-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 185px;\n  left: 158px;\n}\n\n.buttonop-plus {\n  background-image: url(plus.png);\n  background-repeat: no-repeat;\n  background-color: #DDD;\n  border: 1px solid #808080;\n  -moz-box-shadow: 1px 1px 1px 1px #CCC;\n  -webkit-box-shadow: 1px 1px 1px 1px #CCC;\n  box-shadow: 1px 1px 1px 1px #CCC;\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n\n.buttonop-plus:hover {\n  background-image: url(plus_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-plus-hover {\n  background-image: url(plus_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-plus:active {\n  background-image: url(plus_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-plus-active {\n  background-image: url(plus_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-minus-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 185px;\n  left: 201px;\n}\n\n.buttonop-minus {\n  background-image: url(minus.png);\n  background-repeat: no-repeat;\n  background-color: #DDD;\n  border: 1px solid #808080;\n  -moz-box-shadow: 1px 1px 1px 1px #CCC;\n  -webkit-box-shadow: 1px 1px 1px 1px #CCC;\n  box-shadow: 1px 1px 1px 1px #CCC;\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n\n.buttonop-minus:hover {\n  background-image: url(minus_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-minus-hover {\n  background-image: url(minus_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-minus:active {\n  background-image: url(minus_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-minus-active {\n  background-image: url(minus_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-mult-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 225px;\n  left: 158px;\n}\n\n.buttonop-mult {\n  background-image: url(mult.png);\n  background-repeat: no-repeat;\n  background-color: #DDD;\n  border: 1px solid #808080;\n  -moz-box-shadow: 1px 1px 1px 1px #CCC;\n  -webkit-box-shadow: 1px 1px 1px 1px #CCC;\n  box-shadow: 1px 1px 1px 1px #CCC;\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n\n.buttonop-mult:hover {\n  background-image: url(mult_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-mult-hover {\n  background-image: url(mult_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-mult:active {\n  background-image: url(mult_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-mult-active {\n  background-image: url(mult_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-div-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 225px;\n  left: 201px;\n}\n\n.buttonop-div {\n  background-image: url(div.png);\n  background-repeat: no-repeat;\n  background-color: #DDD;\n  border: 1px solid #808080;\n  -moz-box-shadow: 1px 1px 1px 1px #CCC;\n  -webkit-box-shadow: 1px 1px 1px 1px #CCC;\n  box-shadow: 1px 1px 1px 1px #CCC;\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n\n.buttonop-div:hover {\n  background-image: url(div_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-div-hover {\n  background-image: url(div_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-div:active {\n  background-image: url(div_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-div-active {\n  background-image: url(div_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-equal-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 266px;\n  left: 158px;\n}\n\n.buttonop-equal {\n  background-image: url(equal.png);\n  background-repeat: no-repeat;\n  background-color: #DDD;\n  border: 1px solid #808080;\n  -moz-box-shadow: 1px 1px 1px 1px #CCC;\n  -webkit-box-shadow: 1px 1px 1px 1px #CCC;\n  box-shadow: 1px 1px 1px 1px #CCC;\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n\n.buttonop-equal:hover {\n  background-image: url(equal_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-equal-hover {\n  background-image: url(equal_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-equal:active {\n  background-image: url(equal_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-equal-active {\n  background-image: url(equal_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-arrow-base {\n  width: 35px;\n  height: 35px;\n  position: absolute;\n  top: 266px;\n  left: 201px;\n}\n\n.buttonop-arrow {\n  background-image: url(arrow.png);\n  background-repeat: no-repeat;\n  background-color: #DDD;\n  border: 1px solid #808080;\n  -moz-box-shadow: 1px 1px 1px 1px #CCC;\n  -webkit-box-shadow: 1px 1px 1px 1px #CCC;\n  box-shadow: 1px 1px 1px 1px #CCC;\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n\n.buttonop-arrow:hover {\n  background-image: url(arrow_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-arrow-hover {\n  background-image: url(arrow_black.png);\n  background-repeat: no-repeat;\n  background-color: #EEE;\n  background-position: center;\n}\n\n.buttonop-arrow:active {\n  background-image: url(arrow_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n.buttonop-arrow-active {\n  background-image: url(arrow_white.png);\n  background-repeat: no-repeat;\n  background-color: #778899;\n  background-position: center;\n}\n\n  ");
    styles.add("    \n.setting-glyph {\n  position: absolute;\n  left: 239px;\n  top: 10px;\n  background-image: url(settings.png);\n  background-repeat: no-repeat;\n  width: 2px;\n  height: 20px;\n  z-index: 1000;\n  padding-left: 2px;\n  padding-right: 2px;\n  background-color: transparent;\n  border-color: transparent;\n  border-style: solid;\n  border-top-width: 1px;\n  border-left-width: 0px;\n  border-right-width: 3px;\n  border-bottom-width: 2px;\n  cursor: pointer;\n}\n\n.setting-glyph:hover {\n  background-color: #333 !important;\n}\n\n.dialog {\n  font-size: 10pt;\n  font-weight: normal;\n  margin-top: 26px;\n  position: absolute;\n  left: 14px;\n  background-color: #d3d3d3;\n  width: 227px;\n  padding-bottom: 3px;\n  border: 1px solid #000;\n}\n\n.dlg-area {\n  margin-left: 25px;\n}\n\n.dlg-item {\n  margin-left: 10px;\n  cursor: pointer;\n}\n\n.dlg-subtitle {\n  font-weight: bold;\n  margin-top: 3px;\n}\n\n.expression-input {\n  width: 205px;\n  font-family: arial;\n  font-weight: bold;\n}\n\n  ");
    styles.add("    \n.calculator-tape {\n  height: 7em;\n  font-size: 18pt;\n  color: #000;\n  background-color: #ffffff;\n  width: 229px;\n  border: 1px #000 solid;\n  font-family: arial;\n  font-weight: bolder;\n  padding-right: 2px;\n  padding-left: 8px;\n  overflow-y: auto;\n}\n\n.calculator-tape::-webkit-scrollbar {\n  width: 0px;\n}\n\n.alignleft {\n  float: left;\n}\n\n.alignright {\n  float: right;\n  color: #d3d3d3;\n  padding-right: 4px;\n}\n\n.clear-line {\n  clear: both;\n}\n\n.clear-calc {\n  clear: both;\n  border-bottom: 1px solid #d3d3d3;\n  margin-bottom: 5px;\n  height: 5px;\n}\n\n.error {\n  clear: both;\n  background-color: #ff0000;\n  color: #ffffff;\n  margin-bottom: 5px;\n  font-size: 10pt;\n}\n\n.total {\n  clear: both;\n  border-bottom: 1px solid #d3d3d3;\n  margin-bottom: 5px;\n}\n\n  ");
    $globals.calcui_stylesheet_added = true;
    get$$document().head.get$elements().add(_ElementFactoryProvider.Element$html$factory(("<style>" + styles.toString() + "</style>")));
  }
}
// 133 dynamic types.
// 280 types
// 23 !leaf
function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
(function(){
  var v0/*SVGElement*/ = 'SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTextContentElement|SVGTextPathElement|SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement';
  var v1/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v2/*HTMLDocument*/ = 'HTMLDocument|SVGDocument';
  var v3/*DocumentFragment*/ = 'DocumentFragment|ShadowRoot';
  var v4/*Element*/ = [v0/*SVGElement*/,'Element|HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLAudioElement|HTMLVideoElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v5/*AbstractWorker*/ = 'AbstractWorker|SharedWorker|Worker';
  var v6/*Node*/ = [v1/*CharacterData*/,v2/*HTMLDocument*/,v3/*DocumentFragment*/,v4/*Element*/,'Node|Attr|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['AbstractWorker', v5/*AbstractWorker*/]
    , ['AudioParam', 'AudioParam|AudioGain']
    , ['CSSValueList', 'CSSValueList|WebKitCSSTransformValue']
    , ['CharacterData', v1/*CharacterData*/]
    , ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList']
    , ['HTMLDocument', v2/*HTMLDocument*/]
    , ['DocumentFragment', v3/*DocumentFragment*/]
    , ['SVGElement', v0/*SVGElement*/]
    , ['Element', v4/*Element*/]
    , ['Entry', 'Entry|DirectoryEntry|FileEntry']
    , ['EntrySync', 'EntrySync|DirectoryEntrySync|FileEntrySync']
    , ['Node', v6/*Node*/]
    , ['EventTarget', [v5/*AbstractWorker*/,v6/*Node*/,'EventTarget|DOMApplicationCache|EventSource|MessagePort|Notification|SVGElementInstance|WebSocket|DOMWindow|XMLHttpRequest|XMLHttpRequestUpload'].join('|')]
    , ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']
    , ['SVGStylable', 'SVGStylable|SVGFilterPrimitiveStandardAttributes']
    , ['Uint8Array', 'Uint8Array|Uint8ClampedArray']
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
  $globals._firstMeasurementRequest = true;
  $globals._nextMeasurementFrameScheduled = false;
  $globals.calcui_stylesheet_added = false;
}
var const$0000 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0001 = Object.create(NoMoreElementsException.prototype, {});
var const$0003 = Object.create(UnsupportedOperationException.prototype, {_message: {"value": "", writeable: false}});
var const$0004 = Object.create(EmptyQueueException.prototype, {});
var const$0005 = new JSSyntaxRegExp("<(\\w+)");
var const$0006 = Object.create(IllegalAccessException.prototype, {});
var const$0007 = _constMap(["body", "html", "head", "html", "caption", "table", "td", "tr", "colgroup", "table", "col", "colgroup", "tr", "tbody", "tbody", "table", "tfoot", "table", "thead", "table", "track", "audio"]);
var const$0008 = new JSSyntaxRegExp("^#[_a-zA-Z]\\w*$");
var const$0009 = Object.create(_SimpleClientRect.prototype, {left: {"value": (0), writeable: false}, top: {"value": (0), writeable: false}, width: {"value": (0), writeable: false}, height: {"value": (0), writeable: false}});
var const$0010 = ImmutableList.ImmutableList$from$factory([]);
var const$0011 = Object.create(EmptyElementRect.prototype, {client: {"value": const$0009, writeable: false}, offset: {"value": const$0009, writeable: false}, scroll: {"value": const$0009, writeable: false}, bounding: {"value": const$0009, writeable: false}, clientRects: {"value": const$0010, writeable: false}});
var $globals = {};
$static_init();
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    main();
  });
} else {
  main();
}
