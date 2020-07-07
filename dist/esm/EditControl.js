function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { PropTypes } from 'prop-types';
import Draw from 'leaflet-draw'; // eslint-disable-line

import isEqual from 'lodash-es/isEqual';
import { MapControl, withLeaflet } from 'react-leaflet';
import leaflet, { Map, Control } from 'leaflet';
var eventHandlers = {
  onEdited: 'draw:edited',
  onDrawStart: 'draw:drawstart',
  onDrawStop: 'draw:drawstop',
  onDrawVertex: 'draw:drawvertex',
  onEditStart: 'draw:editstart',
  onEditMove: 'draw:editmove',
  onEditResize: 'draw:editresize',
  onEditVertex: 'draw:editvertex',
  onEditStop: 'draw:editstop',
  onDeleted: 'draw:deleted',
  onDeleteStart: 'draw:deletestart',
  onDeleteStop: 'draw:deletestop'
};

var EditControl = /*#__PURE__*/function (_MapControl) {
  _inherits(EditControl, _MapControl);

  var _super = _createSuper(EditControl);

  function EditControl() {
    var _this;

    _classCallCheck(this, EditControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onDrawCreate", function (e) {
      var onCreated = _this.props.onCreated;
      var layerContainer = _this.props.leaflet.layerContainer;
      layerContainer.addLayer(e.layer);
      onCreated && onCreated(e);
    });

    return _this;
  }

  _createClass(EditControl, [{
    key: "createLeafletElement",
    value: function createLeafletElement(props) {
      return createDrawElement(props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(EditControl.prototype), "componentDidMount", this).call(this);

      var map = this.props.leaflet.map;
      var onMounted = this.props.onMounted;

      for (var key in eventHandlers) {
        if (this.props[key]) {
          map.on(eventHandlers[key], this.props[key]);
        }
      }

      map.on(leaflet.Draw.Event.CREATED, this.onDrawCreate);
      onMounted && onMounted(this.leafletElement);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(_getPrototypeOf(EditControl.prototype), "componentWillUnmount", this).call(this);

      var map = this.props.leaflet.map;
      map.off(leaflet.Draw.Event.CREATED, this.onDrawCreate);

      for (var key in eventHandlers) {
        if (this.props[key]) {
          map.off(eventHandlers[key], this.props[key]);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // super updates positions if thats all that changed so call this first
      _get(_getPrototypeOf(EditControl.prototype), "componentDidUpdate", this).call(this, prevProps);

      if (isEqual(this.props.draw, prevProps.draw) || this.props.position !== prevProps.position) {
        return false;
      }

      var map = this.props.leaflet.map;
      this.leafletElement.remove(map);
      this.leafletElement = createDrawElement(this.props);
      this.leafletElement.addTo(map);
      return null;
    }
  }]);

  return EditControl;
}(MapControl);

_defineProperty(EditControl, "propTypes", _objectSpread(_objectSpread({}, Object.keys(eventHandlers).reduce(function (acc, val) {
  acc[val] = PropTypes.func;
  return acc;
}, {})), {}, {
  onCreated: PropTypes.func,
  onMounted: PropTypes.func,
  draw: PropTypes.shape({
    polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  }),
  edit: PropTypes.shape({
    edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    allowIntersection: PropTypes.bool
  }),
  position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
  leaflet: PropTypes.shape({
    map: PropTypes.instanceOf(Map),
    layerContainer: PropTypes.shape({
      addLayer: PropTypes.func.isRequired,
      removeLayer: PropTypes.func.isRequired
    })
  })
}));

function createDrawElement(props) {
  var layerContainer = props.leaflet.layerContainer;
  var draw = props.draw,
      edit = props.edit,
      position = props.position;
  var options = {
    edit: _objectSpread(_objectSpread({}, edit), {}, {
      featureGroup: layerContainer
    })
  };

  if (draw) {
    options.draw = _objectSpread({}, draw);
  }

  if (position) {
    options.position = position;
  }

  return new Control.Draw(options);
}

export default withLeaflet(EditControl);