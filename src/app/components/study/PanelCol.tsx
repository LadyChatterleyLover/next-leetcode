'use client'

import React from 'react'

const PanelCol = () => {
  const pathname = window.location.origin
  return (
    <div className='bg-[#f5f5f5] flex justify-center items-center pb-8'>
      <div className='flex flex-col mr-8'>
        <div className='text-[40px] mb-4 leading-[48px]'>探索知识地图</div>
        <div className='text-xl leading-7 text-[#1a1a1abf]'>通往编程高峰的必经之路</div>
      </div>
      <div className='flex justify-center gap-6 pointer-events-auto'>
        <div className='flex flex-col flex-shrink-0 pt-[96px] gap-[14px] panelCol'>
          <a
            href={`${pathname}/leetbook/array-and-string/`}
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66]  relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5]'
            id='item1-1'
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(254, 204, 123) 0%, rgb(236, 107, 125) 100%)',
              }}
            ></div>
            <span>数组和字符串</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef]'></div>
          </a>
          <a
            href={`${pathname}/leetbook/lc-class-hash/`}
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(85, 155, 243) 0%, rgb(0, 91, 227) 100%)',
              }}
            ></div>
            <span>哈希表</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/arithmetic-interview-cheat-sheet/`}
            id='item1-2'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(178, 226, 255) 0%, rgb(59, 80, 255) 100%)',
              }}
            ></div>
            <span>算法面试小抄</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
        </div>
        <div className='flex flex-col flex-shrink-0 pt-[96px] gap-[14px] panelCol'>
          <a
            href={`${pathname}/leetbook/sort-algorithms/`}
            id='item2-1'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(142, 123, 255) 0%, rgb(63, 35, 227) 100%)',
              }}
            ></div>
            <span>排序算法</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/lc-className-lian-biao/`}
            id='item2-2'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(255, 124, 193) 0%, rgb(113, 71, 200) 100%)',
              }}
            ></div>
            <span>链表</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/dfs/`}
            id='item2-3'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(247, 161, 44) 0%, rgb(191, 76, 32) 100%)',
              }}
            ></div>
            <span>深度优先搜索</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/bfs/`}
            id='item2-4'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(176, 216, 29) 0%, rgb(72, 122, 8) 100%)',
              }}
            ></div>
            <span>广度优先搜索</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
        </div>
        <div className='flex flex-col flex-shrink-0 pt-[96px] gap-[14px] panelCol'>
          <a
            href={`${pathname}/leetbook/binary-search/`}
            id='item3-1'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit  flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(2, 183, 236) 0%, rgb(121, 194, 98) 100%)',
              }}
            ></div>
            <span>二分查找</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/pu-tong-shu/`}
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(191, 239, 136) 0%, rgb(44, 173, 113) 100%)',
              }}
            ></div>
            <span>普通树</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/graph/`}
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(71, 236, 199) 0%, rgb(17, 175, 169) 100%)',
              }}
            ></div>
            <span>图</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
        </div>
        <div className='flex flex-col flex-shrink-0 pt-[96px] gap-[14px]  mt-[-42px] panelCol'>
          <a
            href={`${pathname}/leetbook/qian-zhui-he/`}
            id='item4-1'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(51, 205, 253) 0%, rgb(39, 85, 215) 100%)',
              }}
            ></div>
            <span>前缀和</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/sliding-window-and-two-pointers/`}
            id='item4-4'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(150, 218, 241) 0%, rgb(83, 171, 214) 100%)',
              }}
            ></div>
            <span>滑动窗口和双指针</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/lc-className-queue-stack/`}
            id='item4-2'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: ' linear-gradient(rgb(95, 164, 255) 0%, rgb(44, 95, 202) 100%)',
              }}
            ></div>
            <span>队列与栈</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/heap/`}
            id='item4-3'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(239, 121, 181) 0%, rgb(153, 45, 73) 100%)',
              }}
            ></div>
            <span>堆</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
        </div>
        <div className='flex flex-col flex-shrink-0 pt-[96px] gap-[14px] panelCol'>
          <a
            href={`${pathname}/leetbook/recursion-and-divide-and-conquer/`}
            id='item5-1'
            className=' hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(91, 86, 249) 0%, rgb(156, 76, 221) 99.99%, rgb(124, 52, 181) 100%)',
              }}
            ></div>
            <span>递归和分治</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href='${pathname}/leetbook/greedy/'
            id='item5-2'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66]  relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(255, 143, 76) 0%, rgb(206, 90, 87) 100%)',
              }}
            ></div>
            <span>贪心算法</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/lc-className-dynamic-programming-basic/`}
            className='relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(255, 222, 89) 0%, rgb(245, 144, 42) 100%)',
              }}
            ></div>
            <span>动态规划基础模型</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
        </div>
        <div className='flex flex-col flex-shrink-0 pt-[96px] gap-[14px] panelCol'>
          <a
            href={`${pathname}/leetbook/bit-manipulation-and-math/`}
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66]  relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(74, 153, 253) 0%, rgb(67, 141, 255) 100%)',
              }}
            ></div>
            <span>位运算和数学</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/dynamic-programming-1-plus/`}
            id='item6-1'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(59, 226, 140) 0%, rgb(31, 158, 113) 100%)',
              }}
            ></div>
            <span>线性 &amp; 区间问题</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/dynamic-programming-2-plus/`}
            id='item6-2'
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66]  relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(101, 122, 230) 0%, rgb(94, 66, 162) 100%)',
              }}
            ></div>
            <span>状压、计数 &amp; 数位问题</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
          <a
            href={`${pathname}/leetbook/dynamic-programming-3-plus/`}
            target='_blank'
            className='hover:text-[#1a1a1a] hover:border-[#15bd66] relative panelColContent border border-solid border-[#b7b7b7] w-fit flex items-center justify-center py-[6px] px-3 h-7 rounded-md cursor-pointer text-xs bg-[#f5f5f5] '
          >
            <div
              className='w-[10px] h-[10px] rounded-full mr-[5px] '
              style={{
                background: 'linear-gradient(rgb(120, 234, 205) 0%, rgb(65, 165, 177) 100%)',
              }}
            ></div>
            <span>树形、图上、概率 &amp; 博弈问题</span>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] left-[-4.5px] border border-solid border-[#efefef] '></div>
            <div className=' absolute border-dot top-[9px] w-2 h-2 rounded-full bg-[#b7b7b7] right-[-4.5px] border border-solid border-[#efefef] '></div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PanelCol
