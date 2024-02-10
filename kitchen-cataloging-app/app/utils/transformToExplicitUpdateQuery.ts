import isPlainObject from "lodash/isPlainObject";
/**
 * This query is meant to be used on all models, to transform partially defined update data doc.
 * For example, this a vaild use case:
 * ```
 * transformToExplictUpdateQuery({
    title: "title",
    description: undefined
  });
 * ```
  Will result in:
  ```
 { title: "title" }
* ```
* **WARNING**
* ```
* ```
* If your model contains arrays, the resulting update query, 
* will completely OVERRIDE the stored array in your database, with current values passed
* For example:
* ```
* transformToExplictUpdateQuery({
    labels: ["hello"]
 })
 ```
 Will result in the update query:
 ```
 //this overrides any value in the labels key, to the current key.
 { labels: ["hello"] }
 ```
* If you want to override this behavior, you must manually override the query using spread syntax
* For example:
```
const parsedQuery =  transformToExplictUpdateQuery({
    labels: ["hello"]
 })
const queryWithArr = {
  ...parsedQuery, 
  labels: {push: ["hi", 'hello']};
}
* ```
* Will result in:
* ```
* {labels: {push: ["hi", 'hello']}}
* ```
* @param data - Unparased data query, containing all fields that are editable from model
* @returns An update query that falls in line with prisma's generated type, but with undefined values filtered out
*/
export const transformToExplictUpdateQuery = <T, A>(data: Partial<T>): A => {
  const queryRows = Object.entries(data).map(([key, value]) => {
    //anything undefined means we don't want to update it
    //however we dont check for null, since this is allowed
    if (value === undefined) return null;
    const queryObj = {
      [key]: !isPlainObject(value)
        ? value
        : transformToExplictUpdateQuery(value as any),
    };
    return queryObj;
  });
  const filteredRows = queryRows.filter((row) => row !== null);
  return Object.assign({}, ...filteredRows) as A;
};
export default transformToExplictUpdateQuery;
