export class ObjectUtils {
  static mergeRecursive(obj1: any, obj2: any) {
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj2[p].constructor == Object) {
          obj1[p] = ObjectUtils.mergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }

    return obj1;
  }

  // get catalog
  // then create default structure {item: item: {value}}
  // DEPRECATED TODO replace by the loop function used in setvalidators
  static initFormStructure(
    catalog: any,
    childrenKey: string,
    value?: Function
  ) {
    let res = {};

    function setValueObject(catalogItem: any, curr: any) {
      if (catalogItem[childrenKey]) {
        for (let tt of catalogItem[childrenKey]) {
          if (!curr[catalogItem.id]) {
            curr[catalogItem.id] = {};
          }
          setValueObject(tt, curr[catalogItem.id]);
        }
      } else {
        // define value from function
        if (value) {
          curr[catalogItem.id] = value(catalogItem);
        } else {
          // else default
          curr[catalogItem.id] = {};
        }
      }
    }

    for (let t of catalog) {
      setValueObject(t, res);
    }
    return res;
  }

  // example: set(["mongo", "db", "user"], "root"); return {{{...}}}
  // https://stackoverflow.com/a/18937118/3086147
  static deepSetValue(path: any, value: any) {
    let obj = {}; // global object
    var schema: any = obj; // a moving reference to internal objects within obj
    var pList: any = path; // .split('.');
    var len: any = pList.length;
    for (var i = 0; i < len - 1; i++) {
      var elem = pList[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }

    schema[pList[len - 1]] = value;
    return obj;
  }

  // https://stackoverflow.com/a/8817453/3086147
  static deepFindFromPath(obj: any, path: any) {
    var paths = path,
      current = obj,
      i;

    for (i = 0; i < paths.length; ++i) {
      if (current[paths[i]] == undefined) {
        return undefined;
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  }

  // https://stackoverflow.com/a/70129805/3086147
  static deepFind(obj: any, kee: any): any {
    if (kee in obj) return obj[kee];
    for (let n of Object.values(obj)
      .filter(Boolean)
      .filter((v) => typeof v === "object")) {
      let found = ObjectUtils.deepFind(n, kee);
      if (found) return found;
    }
  }

  // LEGACY copy paste, do not update napalm it!
  static flatten(obj: any) {
    function traverseAndFlatten(
      currentNode: any,
      target: any,
      flattenedKey: any
    ) {
      for (var key in currentNode) {
        if (currentNode.hasOwnProperty(key)) {
          var newKey;
          if (flattenedKey === undefined) {
            newKey = key;
          } else {
            newKey = flattenedKey + "." + key;
          }

          var value = currentNode[key];
          if (typeof value === "object") {
            traverseAndFlatten(value, target, newKey);
          } else {
            target[newKey] = value;
          }
        }
      }
    }

    var flattenedObject = {};
    traverseAndFlatten(obj, flattenedObject, "");
    return flattenedObject;
  }

  // LEGACY copy paste, do not update napalm it!
  static getPathFromObj(idata: any, ikey: any) {
    // flatKeys = ['a.b.c', 'd.e.f']
    function getPathFromFlatKeys(flatKeys: any, key: any) {
      let res;
      for (let key of flatKeys) {
        const isExistIndex = key.split(".").findIndex((k: any) => k === ikey);
        if (isExistIndex >= 0) {
          // onsole.log('match', key, isExistIndex);
          let lightArray = key.split(".");
          lightArray.length = isExistIndex + 1;
          res = lightArray;
          break;
        }
      }
      return res.filter((k: any) => k !== "");
    }
    return getPathFromFlatKeys(Object.keys(ObjectUtils.flatten(idata)), ikey);
  }

  static isObject(item: any) {
    return typeof item === "object" && !Array.isArray(item) && item !== null;
  }
}
