"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stackNameFromFileName = exports.loadTypeSystem = exports.readTemplate = void 0;
const fs = require("fs-extra");
const jsiiReflect = require("jsii-reflect");
const path = require("path");
const YAML = require("yaml");
/**
 * Reads a YAML/JSON template file.
 */
async function readTemplate(templateFile) {
    const str = await fs.readFile(templateFile, { encoding: 'utf-8' });
    const template = YAML.parse(str, { schema: 'yaml-1.1' });
    return template;
}
exports.readTemplate = readTemplate;
async function loadTypeSystem(validate = true) {
    const typeSystem = new jsiiReflect.TypeSystem();
    const packageJson = require('../package.json');
    for (const depName of Object.keys(packageJson.dependencies || {})) {
        const jsiiModuleDir = path.dirname(require.resolve(`${depName}/package.json`));
        if (!fs.existsSync(path.resolve(jsiiModuleDir, '.jsii'))) {
            continue;
        }
        await typeSystem.load(jsiiModuleDir, { validate });
    }
    return typeSystem;
}
exports.loadTypeSystem = loadTypeSystem;
function stackNameFromFileName(fileName) {
    return path.parse(fileName).name.replace('.', '-');
}
exports.stackNameFromFileName = stackNameFromFileName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLDRDQUE0QztBQUM1Qyw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBRTdCOztHQUVHO0FBQ0ksS0FBSyxVQUFVLFlBQVksQ0FBQyxZQUFvQjtJQUNyRCxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN6RCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBSkQsb0NBSUM7QUFFTSxLQUFLLFVBQVUsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJO0lBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRS9DLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQ2pFLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sZUFBZSxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFO1lBQ3hELFNBQVM7U0FDVjtRQUNELE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQWJELHdDQWFDO0FBRUQsU0FBZ0IscUJBQXFCLENBQUMsUUFBZ0I7SUFDcEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFGRCxzREFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIGpzaWlSZWZsZWN0IGZyb20gJ2pzaWktcmVmbGVjdCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgWUFNTCBmcm9tICd5YW1sJztcblxuLyoqXG4gKiBSZWFkcyBhIFlBTUwvSlNPTiB0ZW1wbGF0ZSBmaWxlLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZFRlbXBsYXRlKHRlbXBsYXRlRmlsZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN0ciA9IGF3YWl0IGZzLnJlYWRGaWxlKHRlbXBsYXRlRmlsZSwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KTtcbiAgY29uc3QgdGVtcGxhdGUgPSBZQU1MLnBhcnNlKHN0ciwgeyBzY2hlbWE6ICd5YW1sLTEuMScgfSk7XG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRUeXBlU3lzdGVtKHZhbGlkYXRlID0gdHJ1ZSkge1xuICBjb25zdCB0eXBlU3lzdGVtID0gbmV3IGpzaWlSZWZsZWN0LlR5cGVTeXN0ZW0oKTtcbiAgY29uc3QgcGFja2FnZUpzb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcblxuICBmb3IgKGNvbnN0IGRlcE5hbWUgb2YgT2JqZWN0LmtleXMocGFja2FnZUpzb24uZGVwZW5kZW5jaWVzIHx8IHt9KSkge1xuICAgIGNvbnN0IGpzaWlNb2R1bGVEaXIgPSBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKGAke2RlcE5hbWV9L3BhY2thZ2UuanNvbmApKTtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGF0aC5yZXNvbHZlKGpzaWlNb2R1bGVEaXIsICcuanNpaScpKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGF3YWl0IHR5cGVTeXN0ZW0ubG9hZChqc2lpTW9kdWxlRGlyLCB7IHZhbGlkYXRlIH0pO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVTeXN0ZW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja05hbWVGcm9tRmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZykge1xuICByZXR1cm4gcGF0aC5wYXJzZShmaWxlTmFtZSkubmFtZS5yZXBsYWNlKCcuJywgJy0nKTtcbn1cbiJdfQ==