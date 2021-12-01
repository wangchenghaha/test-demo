// 插入排序
function insert (arr, i) {

}
function insertSort (arr) {
  for(let i = 1; i < arr.length; i++){
    let temp = arr[i]
    while(temp < arr[i - 1]){
      arr[i] = arr[i - 1]
      i--
    }
    arr[i] = temp
  }
}
let arr = [5]
// let arr = [3,5,1,6,7,2,9]
insertSort(arr)
console.log(arr);