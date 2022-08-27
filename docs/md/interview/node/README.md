### Node 事件循环
https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/  

当 Node.js 启动后，它会初始化事件循环，处理已提供的输入脚本（或丢入 REPL，本文不涉及到），它可能会调用一些异步的 API、调度定时器，或者调用 process.nextTick()，然后开始处理事件循环  

![图片](./img/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E6%9C%BA%E5%88%B6.png)

每个阶段都有一个FIFO队列执行回调，虽然每个阶段都是特殊的，但通常当事件循环进入到给定阶段时，将会执行该阶段特定的操作，然后执行该阶段队列中的回调，直到队列用尽或者最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段。 

由于这些操作中的任何一个都可能调度 更多的 操作和由内核排列在轮询阶段被处理的新事件， 且在处理轮询中的事件时，轮询事件可以排队。因此，长时间运行的回调可以允许轮询阶段运行长于计时器的阈值时间

### 阶段概述
1. 定时器(Timer)：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数  
2. 待定回调(Pending callbacks)：执行延迟到下一个循环迭代的 I/O 回调
3. idle, prepare：仅系统内部使用
4. 轮询(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
5. 检测(check)：setImmediate() 回调函数在这里执行。
6. 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)

#### 详细描述
#### 定时器
计时器指定 可以执行所提供回调 的 阈值，而不是用户希望其执行的确切时间。
```javascript
    const fs = require('fs');

    function someAsyncOperation(callback) {
    // Assume this takes 95ms to complete
    fs.readFile('/path/to/file', callback);
    }

    const timeoutScheduled = Date.now();

    setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;

    console.log(`${delay}ms have passed since I was scheduled`);
    }, 100);

    // do someAsyncOperation which takes 95 ms to complete
    someAsyncOperation(() => {
    const startCallback = Date.now();

    // do something that will take 10ms...
    while (Date.now() - startCallback < 10) {
        // do nothing
    }
    });
```