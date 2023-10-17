import React from 'react'

const CommentInput = () => {
  return (
    <div className='mt-2 flex flex-col'>
      <div className='flex h-full flex-col px-1'>
        <div className='flex w-full flex-col rounded-[13px] bg-white  shadow-md'>
          <textarea
            className='w-full resize-none bg-transparent p-4 text-md outline-none min-h-[80px] inherit border-none placeholder:text-[#ccc]'
            style={{
              outline: '2px solid #0000',
              outlineOffset: 2,
            }}
            placeholder='请输入评论...'
          ></textarea>
          <div className='relative box-content flex h-8 items-end p-4'>
            <div className='flex flex-1 flex-col'>
              <div className='flex h-8 items-end gap-2 inherit'>
                <div className='flex cursor-pointer items-center rounded-[5px] p-1 text-base text-gray-7 dark:text-dark-gray-7 hover:bg-fill-4 dark:hover:bg-dark-fill-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='1em'
                    height='1em'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M13.27 5.02c.456.1.764.562.727 1.06l-.015.116-2.181 12c-.099.541-.578.893-1.07.784-.457-.1-.765-.562-.728-1.06l.015-.116 2.181-12c.099-.541.578-.893 1.07-.784zm4.65.37l.07.096 3.857 6c.178.277.2.614.067.906l-.067.123-3.857 6c-.304.473-.962.627-1.47.342-.47-.264-.646-.812-.425-1.268l.058-.104L19.678 12l-3.525-5.485c-.283-.44-.161-1.001.264-1.307l.103-.065a1.123 1.123 0 011.4.246zm-11.84 0c.3-.365.83-.49 1.28-.305l.12.058.103.065a.96.96 0 01.326 1.194l-.062.113L4.322 12l3.525 5.485.058.104c.221.456.046 1.005-.425 1.268a1.123 1.123 0 01-1.4-.246l-.07-.097-3.857-6-.067-.122a.939.939 0 010-.784l.067-.123 3.857-6 .07-.096z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </div>
                <div className='flex cursor-pointer items-center rounded-[5px] p-1 text-base text-gray-7 dark:text-dark-gray-7 hover:bg-fill-4 dark:hover:bg-dark-fill-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='1em'
                    height='1em'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M13 7a1 1 0 011-1h2a6 6 0 010 12h-2a1 1 0 110-2h2a4 4 0 000-8h-2a1 1 0 01-1-1zm-3 10a1 1 0 01-1 1H8A6 6 0 018 6h1a1 1 0 010 2H8a4 4 0 100 8h1a1 1 0 011 1zm-1-6h6a1 1 0 110 2H9a1 1 0 110-2z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </div>
                <div className='flex cursor-pointer items-center rounded-[5px] p-1 text-base text-gray-7 dark:text-dark-gray-7 hover:bg-fill-4 dark:hover:bg-dark-fill-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 18 18'
                    width='1em'
                    height='1em'
                    fill='currentColor'
                  >
                    <path d='M11.27 6.799l.146-.438c.075-.259.178-.437.308-.534.14-.108.345-.06.615.145.065.054.124.114.178.179a.45.45 0 01.114.226.976.976 0 01.032.373 2.21 2.21 0 01-.13.535l-1.182 3.434c-.054.151-.043.28.032.389a.399.399 0 00.308.146c.087 0 .232-.081.438-.243.205-.173.41-.405.615-.697.216-.292.405-.637.567-1.037a3.63 3.63 0 00.243-1.344c0-.519-.108-1-.324-1.442a3.458 3.458 0 00-.907-1.15 4.033 4.033 0 00-1.345-.778 4.76 4.76 0 00-1.684-.292 4.55 4.55 0 00-1.766.373 5.343 5.343 0 00-2.77 2.738c-.292.659-.438 1.393-.438 2.203 0 .691.13 1.296.389 1.814.26.519.616.95 1.07 1.296.453.335.982.589 1.587.762a7.555 7.555 0 001.96.243 9.97 9.97 0 001.328-.081c.4-.054.783-.151 1.15-.292a5.269 5.269 0 001.07-.6c.345-.258.707-.582 1.085-.971.076-.108.162-.162.26-.162.107-.011.21.01.307.065a.567.567 0 01.243.21.5.5 0 01.13.276.857.857 0 01-.081.55c-.076.162-.26.378-.551.648-.292.27-.61.524-.956.762a6.538 6.538 0 01-1.118.632c-.4.172-.837.307-1.312.405a7.016 7.016 0 01-1.555.162 8.817 8.817 0 01-2.527-.324 6.147 6.147 0 01-2.122-1.021 5.098 5.098 0 01-1.442-1.814c-.357-.735-.535-1.61-.535-2.625 0-1.09.19-2.057.567-2.9.389-.853.891-1.566 1.507-2.138a6.371 6.371 0 012.09-1.328A6.646 6.646 0 019.26 2.7c.875 0 1.674.13 2.398.389.734.259 1.36.62 1.879 1.085.518.465.918 1.02 1.199 1.669.291.648.437 1.36.437 2.138 0 .627-.119 1.237-.356 1.83a5.638 5.638 0 01-.94 1.556c-.389.454-.826.82-1.312 1.102-.486.27-.977.405-1.474.405-.378 0-.675-.087-.891-.26-.216-.172-.378-.437-.486-.793-.346.28-.637.496-.875.648-.238.15-.545.221-.923.21-.443-.01-.8-.102-1.07-.275a1.905 1.905 0 01-.631-.648 2.547 2.547 0 01-.308-.859 5.625 5.625 0 01-.081-.923c0-.465.092-.967.275-1.507.195-.55.46-1.053.794-1.506a4.519 4.519 0 011.247-1.15 2.928 2.928 0 011.62-.47c.227 0 .422.037.584.113.172.076.313.184.42.324.12.13.217.286.292.47.076.173.146.356.211.55zm-2.657 4.374c.324 0 .637-.12.94-.357.313-.248.578-.723.794-1.425.14-.432.243-.746.307-.94.065-.205.103-.373.114-.502.01-.205-.07-.389-.243-.551-.173-.173-.357-.26-.551-.26-.346 0-.659.087-.94.26-.27.173-.502.394-.696.664a3.53 3.53 0 00-.438.907 3.563 3.563 0 00-.178.972c0 .476.092.8.276.972.183.173.388.26.615.26z'></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='font-medium items-center whitespace-nowrap focus:outline-none inline-flex   transition-colors cursor-pointer py-[5px] px-3 rounded-lg text-[#3c3c4399] hover:text-[#262626bf]  bg-transparent hover:!bg-transparent'>
                预览
              </div>
              <div className='font-medium items-center whitespace-nowrap focus:outline-none inline-flex transition-colors cursor-pointer py-[5px] px-3 rounded-lg bg-[#2db55d]  hover:bg-[#2db55d]  text-white  opacty-100'>
                评论
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentInput
