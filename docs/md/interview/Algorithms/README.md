# 前端常考算法
## 选择排序
选择排序是一种简单直观的排序算法，无论什么数据进去都是 O(n²) 的时间复杂度。所以数据规模越小越好。  
1. 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
2. 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。 
3. 重复第二步  
![选择排序](https://www.runoob.com/wp-content/uploads/2019/03/selectionSort.gif)  

```javascript
function selectSort(arr) {
    if (!arr || arr.length < 2) {
        return arr
    }

    for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}

let arr = [4, 5, 1, 8, 19, 3, 32];
console.log('排序前: ', arr)
console.log('选择排序后: ', selectSort(arr));
```

## 冒泡排序
算法步骤： 
1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
3. 针对所有的元素重复以上的步骤，除了最后一个。
3. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

![bubbleSort](https://www.runoob.com/wp-content/uploads/2019/03/bubbleSort.gif)
```javascript
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                var temp = arr[j+1];        // 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

```

## 快速排序
算法步骤： 
1. 从数列中挑出一个元素，称为 "基准"（pivot）
2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序
![quicksort](https://www.runoob.com/wp-content/uploads/2019/03/quickSort.gif)

```javascript
// 方式一
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}

function partition(arr, left ,right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }        
    }
    swap(arr, pivot, index - 1);
    return index-1;
}
// 交换函数
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// 方式二
function partition2(arr, low, high) {
  let pivot = arr[low];
  while (low < high) {
    while (low < high && arr[high] > pivot) {
      --high;
    }
    arr[low] = arr[high];
    while (low < high && arr[low] <= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}

function quickSort2(arr, low, high) {
  if (low < high) {
    let pivot = partition2(arr, low, high);
    quickSort2(arr, low, pivot - 1);
    quickSort2(arr, pivot + 1, high);
  }
  return arr;
}

```

## 堆排序
堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法.
算法步骤:  
1. 创建一个堆 H[0……n-1]；
2. 把堆首（最大值）和堆尾互换；
3. 把堆的尺寸缩小 1，并调用 shift_down(0)，目的是把新的数组顶端数据调整到相应位置；
4. 重复步骤 2，直到堆的尺寸为 1

```javascript
// 创建堆，其实是对data数组做一个结构调整，使其具有堆的特性
function buildHeap(data) {
    var len = data.length;
    for (var i = Math.floor(len / 2); i >= 0; i--) {
        heapAdjust(data, i, len);
    }
}
function swap(arr, i, j) { [arr[i], arr[j]] = [arr[j], arr[i]] }
// 堆调整函数，即调整当前data为大根堆
function heapAdjust(data, i, len) {
    var child = 2 * i + 1;
    // 如果有孩子结点，默认情况是左孩子
    while (child <= len) {
        var temp = data[i];
        // 如果右孩子存在且其值大于左孩子的值，则将child指向右孩子
        if (child + 1 <= len && data[child] < data[child + 1]) {
            child = child + 1;
        }
        // 如果当前结点的值小于其孩子结点的值，则交换，直至循环结束
        if (data[i] < data[child]) {
            data[i] = data[child];
            data[child] = temp;
            i = child;
            child = 2 * i + 1
        } else {
            break
        }
    }
}
// 排序
function heapSort(data) {
    var data = data.slice(0);
    if (!(data instanceof Array)) {
        return null;
    }
    if (data instanceof Array && data.length == 1) {
        return data;
    }
    // 将data数组改造为“堆”的结构
    buildHeap(data);

    var len = data.length;
    // 下面需要注意的时候参数的边界，参考文档里面程序中i的值是不对的
    for (var i = len - 1; i >= 0; i--) {
        swap(data, i, 0);
        heapAdjust(data, 0, i - 1);
    }
    return data;
}
const arr = [62, 88, 58, 47, 35, 73, 51, 99, 37, 93];
var newArr = heapSort(arr);
console.log(newArr);  // [35, 37, 47, 51, 58, 62, 73, 88, 93, 99]

```