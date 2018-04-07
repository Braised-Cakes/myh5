import $ from 'jquery'
import * as types from './types.js'
import store from '@/store'
export default {
    /*
    	文本
    */
    [types.TXT]: function () {
        return {
            type: types.TXT,
            content: '空白文本',
            class: types.TXT.toLowerCase(),
            animation: [],
            style: {
                position: 'absolute',
                left: '0',
                top: '50px',
                color: '#666666',
                width: '200px',
                height: '100px',
                padding: '5px',
                'border-style': 'solid'
            }
        }
    },
    /*
    	文本
    */
    [types.SHAPE]: function () {
        return {
            type: types.SHAPE,
            content: `<svg version="1.1" id="Objects" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="207.277px" height="207.277px" viewBox="0 0 207.277 207.277" enable-background="new 0 0 207.277 207.277"
            xml:space="preserve">
         <g>
           <rect x="0" y="0" fill-rule="evenodd" clip-rule="evenodd" fill="#5896CC" width="207.277" height="207.277"/>
           <g>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#E7D1A7" d="M178.774,114.096c14.165,10.844,16.857,31.116,6.015,45.281
               c-10.844,14.164-28.505,15.767-42.67,4.923c-14.164-10.843-15.793-41.766-4.949-55.93
               C148.013,94.206,164.61,103.253,178.774,114.096z"/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#E7D1A7" d="M29.259,114.096c-14.164,10.844-16.857,31.116-6.014,45.281
               c10.843,14.164,28.505,15.767,42.67,4.923c14.164-10.843,15.792-41.766,4.949-55.93C60.021,94.206,43.424,103.253,29.259,114.096z
               "/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#004E78" d="M39.641,34.945h127.995c4.827,0,8.776,3.948,8.776,8.775v85.694
               c0,4.826-3.949,8.774-8.776,8.774H39.641c-4.827,0-8.775-3.948-8.775-8.774V43.721C30.865,38.893,34.813,34.945,39.641,34.945z"/>
             <g>
               <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" d="M42.865,131.564V41.569c0-0.175,0.097-0.318,0.214-0.318
                 h119.488c0.117,0,0.214,0.144,0.214,0.318v89.995c0,0.175-0.097,0.319-0.214,0.319H43.079
                 C42.962,131.884,42.865,131.739,42.865,131.564z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" fill="#5896CC" d="M34.261,97.762V75.373c0-0.607,0.496-1.104,1.104-1.104h0.001
                 c0.606,0,1.104,0.496,1.104,1.104v22.389c0,0.606-0.497,1.104-1.104,1.104h-0.001C34.757,98.865,34.261,98.368,34.261,97.762z"/>
               <circle fill-rule="evenodd" clip-rule="evenodd" fill="#5896CC" cx="169.287" cy="86.567" r="3.73"/>
             </g>
             <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#E7D1A7" points="27.36,149.531 20,207.277 64.068,207.277 
               70.354,157.954    "/>
             <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="20.004,172.73 15.769,207.277 68.309,207.277 
               71.593,180.436    "/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#D5B275" d="M28.994,132.711c-9.138,0.483-10.608,9.025-6.045,17.659
               c4.562,8.633,13.431,14.089,22.567,13.604c9.138-0.483,12.847-7.874,8.284-16.508C49.238,138.833,38.132,132.227,28.994,132.711z"
               />
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#D5B275" d="M25.556,93.635c-1.944-0.237-2.265,1.454-2.499,3.397
               l-5.256,36.188c-0.406,3.371,1.752,8.744,5.122,9.156l0,0c3.369,0.412,7.103-2.007,7.506-5.377l4.091-32.004
               C35.22,99.517,29.702,94.142,25.556,93.635z"/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#E7D1A7" d="M25.556,93.635c-1.723-0.21-3.306,1.026-3.514,2.748
               l-5.332,40.469c-0.36,2.986,1.552,7.746,4.536,8.111l0,0c2.985,0.364,6.366-1.777,6.722-4.764l4.229-36.763
               C32.755,98.576,29.228,94.084,25.556,93.635z"/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#E7D1A7" d="M28.115,133.209c-8.006,0.889-10.895,9.056-6.452,18.242
               c4.442,9.187,14.532,15.914,22.538,15.025c8.006-0.888,10.894-9.055,6.452-18.242C46.211,139.048,36.12,132.321,28.115,133.209z"
               />
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#F7ECD9" d="M23.002,94.481c-0.515,0.487-0.869,1.148-0.96,1.901
               l-1.088,8.255c2.086-0.232,3.601-0.596,5.626-1.376C27.194,99.835,26.555,94.478,23.002,94.481z"/>
             <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#E7D1A7" points="180.674,149.531 188.034,207.277 143.966,207.277 
               137.68,157.954    "/>
             <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="188.029,172.73 192.264,207.277 139.726,207.277 
               136.441,180.436     "/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#D5B275" d="M179.04,132.711c9.137,0.483,10.607,9.025,6.045,17.659
               c-4.562,8.633-13.431,14.089-22.568,13.604c-9.138-0.483-12.846-7.874-8.283-16.508
               C158.795,138.833,169.902,132.227,179.04,132.711z"/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#D5B275" d="M182.479,93.635c1.943-0.237,2.265,1.454,2.499,3.397
               l5.256,36.188c0.406,3.371-1.752,8.744-5.122,9.156l0,0c-3.369,0.412-7.104-2.007-7.506-5.377l-4.091-32.004
               C172.814,99.517,178.331,94.142,182.479,93.635z"/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#E7D1A7" d="M182.479,93.635c1.723-0.21,3.306,1.026,3.514,2.748
               l5.331,40.469c0.36,2.986-1.551,7.746-4.536,8.111l0,0c-2.985,0.364-6.366-1.777-6.722-4.764l-4.228-36.763
               C175.279,98.576,178.806,94.084,182.479,93.635z"/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#E7D1A7" d="M179.919,133.209c8.005,0.889,10.894,9.056,6.452,18.242
               c-4.442,9.187-14.532,15.914-22.538,15.025c-8.005-0.888-10.895-9.055-6.452-18.242
               C161.823,139.048,171.913,132.321,179.919,133.209z"/>
             <path fill-rule="evenodd" clip-rule="evenodd" fill="#F7ECD9" d="M185.032,94.481c0.515,0.487,0.869,1.148,0.96,1.901l1.088,8.255
               c-2.086-0.232-3.601-0.596-5.627-1.376C180.84,99.835,181.479,94.478,185.032,94.481z"/>
           </g>
         </g>
         </svg>
              
        `,
            class: types.SHAPE.toLowerCase(),
            animation: [],
            style: {
                position: 'absolute',
                left: '0',
                // 'background-image': 'url(http://res1.eqh5.com/6947c350-bc11-42d1-855f-06bea9003bc1.svg)',
                // 'background-repeat': 'no-repeat',
                // 'background-position': 'center center',
                // 'background-size': 'contain',
                top: '50px',
                color: '#666666',
                width: '200px',
                // 'background-color':'blue',
                height: '100px',
                width:'auto',
                // padding: '5px',
                'border-style': 'solid'
            }
        }
    }
}
