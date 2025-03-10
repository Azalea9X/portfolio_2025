"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = getProjects;
exports.getProject = getProject;
var next_sanity_1 = require("next-sanity");
var sanityClient = (0, next_sanity_1.createClient)({
    projectId: 'slqsfm7w',
    dataset: 'production',
});
var projectQuery = (0, next_sanity_1.groq)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["*[_type == \"project\"] {\n  _id,\n  title,\n  content, // Assuming your rich text field is named 'content'\n  author -> {\n    name\n  },\n  slug,\n  \"imageUrl\": image.asset->url,  // Correct way to get image URL\n  image {  // Make sure you include the whole image object.\n    alt,\n    asset->{\n      _id,\n      url\n    }\n  }\n}"], ["*[_type == \"project\"] {\n  _id,\n  title,\n  content, // Assuming your rich text field is named 'content'\n  author -> {\n    name\n  },\n  slug,\n  \"imageUrl\": image.asset->url,  // Correct way to get image URL\n  image {  // Make sure you include the whole image object.\n    alt,\n    asset->{\n      _id,\n      url\n    }\n  }\n}"])));
function getProjects() {
    return __awaiter(this, void 0, void 0, function () {
        var projects, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sanityClient.fetch(projectQuery)];
                case 1:
                    projects = _a.sent();
                    return [2 /*return*/, projects];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching projects:', error_1);
                    throw error_1; // Re-throw the error to propagate it up the call stack
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getProject(slug) {
    return __awaiter(this, void 0, void 0, function () {
        var project, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sanityClient.fetch((0, next_sanity_1.groq)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["*[_type == \"project\" && slug.current == $slug][0]\n      {\n        _id,\n        title,\n        content,\n        author -> {\n          name\n        },\n        slug,\n        \"imageUrl\": image.asset->url,\n        image {\n          alt,\n          asset->{\n            _id,\n            url\n          }\n        }\n      }"], ["*[_type == \"project\" && slug.current == $slug][0]\n      {\n        _id,\n        title,\n        content,\n        author -> {\n          name\n        },\n        slug,\n        \"imageUrl\": image.asset->url,\n        image {\n          alt,\n          asset->{\n            _id,\n            url\n          }\n        }\n      }"]))), { slug: slug })];
                case 1:
                    project = _a.sent();
                    return [2 /*return*/, project];
                case 2:
                    err_1 = _a.sent();
                    console.error('Error fetching project:', err_1);
                    throw err_1; // Re-throw the error to propagate it up the call stack
                case 3: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1, templateObject_2;
