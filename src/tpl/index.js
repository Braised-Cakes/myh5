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
            content: `<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="34.248px" viewBox="0 0 60 34.248" enable-background="new 0 0 60 34.248" xml:space="preserve">
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#E80F0F" d="M0,19.632c0.068-0.233,0.142-0.465,0.202-0.7
            c0.214-0.828,0.67-1.462,1.428-1.888c0.155-0.087,0.294-0.309,0.327-0.49c0.434-2.406,1.711-4.106,4.073-4.895
            c0.399-0.133,0.611-0.396,0.855-0.706c0.574-0.728,0.626-1.452,0.321-2.321c-0.169-0.48-0.098-1.066-0.041-1.595
            c0.022-0.205,0.271-0.433,0.474-0.561C7.905,6.31,8.225,6.222,8.527,6.118c0.653-0.225,1.207-0.587,1.671-1.104
            c0.596-0.662,1.755-0.665,2.382-0.026c0.075,0.077,0.155,0.153,0.213,0.242c0.369,0.564,0.742,0.958,1.558,0.717
            c0.64-0.189,1.304,0.09,1.847,0.516c0.284,0.223,0.517,0.229,0.849,0.045c1.189-0.661,2.687-0.39,3.427,0.585
            c0.448,0.591,0.58,1.272,0.52,1.999c-0.01,0.118-0.027,0.236-0.04,0.345c0.627-0.143,1.223-0.346,1.833-0.406
            c2.098-0.206,4.131,0.018,6.022,1.052c0.127,0.069,0.383,0.022,0.52-0.064c0.831-0.524,1.633-1.095,2.467-1.614
            c0.92-0.572,1.904-1.024,3.002-1.068c0.646-0.025,1.297,0.1,1.879,0.151c0-0.619-0.114-1.307,0.032-1.933
            c0.138-0.585,0.479-1.163,0.858-1.641c0.549-0.69,1.533-0.829,2.353-0.396c0.348,0.183,0.509,0.095,0.707-0.184
            C41.184,2.55,41.891,2.05,42.92,2.15c0.117,0.011,0.296-0.172,0.377-0.308c0.26-0.432,0.463-0.899,0.734-1.323
            c0.271-0.425,0.684-0.613,1.193-0.474c0.841,0.23,1.678,0.473,2.518,0.707c0.146,0.041,0.303,0.096,0.449,0.083
            c0.784-0.067,1.146,0.446,1.476,1.028c0.322,0.572,0.462,1.156,0.25,1.807c-0.047,0.145-0.026,0.379,0.064,0.488
            c0.354,0.422,0.74,0.817,1.133,1.206c0.071,0.071,0.223,0.08,0.338,0.084c2.527,0.108,4.393,1.247,5.471,3.562
            c0.214,0.458,0.504,0.743,0.979,0.878c0.235,0.067,0.455,0.184,0.687,0.266c0.711,0.251,1.154,0.729,1.296,1.479
            c0.016,0.086,0.076,0.164,0.116,0.245c0,0.338,0,0.677,0,1.016c-0.29,1.159-0.611,2.34-0.346,3.524
            c0.139,0.617-0.087,0.932-0.479,1.244c-0.781,0.622-2.154,0.392-2.877-0.065c-0.067-0.042-0.123-0.144-0.134-0.225
            c-0.2-1.459-1.041-2.567-1.972-3.628c-0.243-0.278-0.483-0.558-0.717-0.843c-0.669-0.816-0.622-1.799,0.118-2.561
            c0.053-0.054,0.104-0.111,0.174-0.187c-0.438-0.746-1.155-0.99-1.934-1.071c-1.094-0.114-1.136-0.045-0.681,0.948
            c0.288,0.628,0.482,1.254,0.254,1.954c-0.032,0.099,0.111,0.289,0.217,0.394c0.909,0.912,1.252,2,0.938,3.243
            c-0.101,0.396-0.424,0.731-0.616,1.109c-0.097,0.189-0.191,0.417-0.174,0.617c0.024,0.28,0.123,0.566,0.252,0.818
            c0.063,0.123,0.257,0.207,0.407,0.252c1.294,0.388,2.622,0.494,3.965,0.45c0.521-0.018,1.041-0.068,1.56-0.125
            c0.289-0.031,0.476,0.067,0.578,0.334c0.562,1.449,0.674,2.924,0.196,4.414c-0.086,0.27-0.318,0.492-0.482,0.736
            c-0.065-0.01-0.131-0.02-0.196-0.029c-0.078-0.485-0.168-0.97-0.229-1.458c-0.076-0.608-0.128-1.221-0.192-1.831
            c-0.041-0.394-0.211-0.655-0.652-0.681c-0.305-0.018-0.606-0.108-0.911-0.111c-1.271-0.013-2.542-0.006-3.874-0.006
            c0.042,0.608,0.091,1.124,0.109,1.64c0.013,0.353,0.048,0.724-0.042,1.055c-0.127,0.472,0.106,0.733,0.464,0.79
            c0.485,0.078,0.997,0.048,1.49-0.007c0.453-0.052,0.896-0.197,1.345-0.303c0.374-0.088,0.634,0.011,0.692,0.43
            c0.101,0.713,0.28,1.426,0.284,2.14c0.012,2.321-0.039,4.644-0.069,6.965c-0.004,0.267,0.074,0.662-0.065,0.774
            c-0.36,0.289-0.812,0.474-1.249,0.65c-0.079,0.032-0.354-0.156-0.367-0.264c-0.071-0.562-0.096-1.129-0.12-1.695
            c-0.032-0.75-0.04-1.502-0.074-2.253c-0.019-0.4-0.175-0.521-0.641-0.495c-0.962,0.054-1.933-0.014-2.896-0.081
            c-1.281-0.089-2.269,0.364-2.997,1.428c-0.435,0.634-0.897,1.249-1.383,1.844c-0.533,0.653-1.155,1.18-2.045,1.306
            c-0.954,0.135-1.766-0.293-2.071-1.204c-0.152-0.455-0.207-0.942-0.312-1.437c0.4,0,0.702-0.013,1.002,0.002
            c2.528,0.122,3.497-1.378,3.745-3.051c0.177-1.19,0.124-2.415,0.155-3.625c0.01-0.381-0.036-0.764-0.062-1.251
            c0.508,0.107,0.964,0.194,1.415,0.3c0.518,0.122,1.037,0.22,1.513-0.098c0.125-0.083,0.252-0.286,0.243-0.426
            c-0.062-1.008-0.158-2.014-0.248-3.077c-0.228-0.015-0.527-0.048-0.826-0.05c-1.135-0.008-2.271-0.036-3.379,0.296
            c-0.536,0.161-0.87,0.419-0.917,1.036c-0.068,0.917-0.21,1.829-0.333,2.741c-0.029,0.22-0.104,0.433-0.167,0.679
            c-0.594-0.315-0.813-0.827-0.921-1.369c-0.324-1.64-0.104-3.237,0.447-4.8c0.101-0.288,0.304-0.265,0.521-0.182
            c1.161,0.445,2.374,0.479,3.589,0.396c0.493-0.033,0.994-0.179,1.458-0.359c0.228-0.089,0.417-0.352,0.548-0.58
            c0.071-0.125,0.045-0.434-0.047-0.494c-0.127-0.083-0.361-0.036-0.54,0.002c-0.128,0.028-0.235,0.178-0.36,0.191
            c-0.278,0.03-0.604,0.101-0.835-0.008c-1.601-0.757-2.24-1.921-2.082-3.675c0.01-0.102-0.01-0.207-0.021-0.398
            c-0.547,0.179-1.045,0.359-1.554,0.504c-0.763,0.217-1.521,0.495-2.301,0.592c-1.32,0.165-2.41-0.458-3.419-1.235
            c-0.84-0.646-1.633-1.366-2.526-1.927c-1.479-0.928-3.166-1.094-4.876-1.084c-2.708,0.017-5.254,0.642-7.619,1.979
            c-1.253,0.709-2.092,1.832-2.984,2.911c-0.478,0.579-0.973,1.153-1.521,1.665c-1.281,1.195-2.84,1.423-4.51,1.175
            c-0.273-0.041-0.543-0.099-0.814-0.147c-0.043-0.008-0.089-0.001-0.198-0.001c0.41,1.207-0.168,2.324-0.219,3.484
            c-0.02,0.446,0.048,0.919,0.193,1.339c0.065,0.188,0.405,0.313,0.645,0.4c0.194,0.071,0.426,0.031,0.638,0.06
            c0.29,0.04,0.42,0.21,0.407,0.511c-0.013,0.298-0.18,0.4-0.445,0.414c-0.123,0.006-0.249,0.037-0.367,0.019
            c-0.546-0.089-0.918,0.036-1.035,0.66c-0.066,0.354-0.376,0.272-0.59,0.142c-0.26-0.158-0.487-0.371-0.726-0.563
            c-0.355-0.286-0.741-0.375-1.203-0.312c-0.446,0.062-0.663,0.294-0.716,0.703c-0.043,0.33-0.175,0.499-0.536,0.464
            c-0.35-0.035-0.613-0.153-0.596-0.548c0.015-0.344-0.189-0.396-0.438-0.36c-0.287,0.043-0.565,0.135-0.849,0.202
            c-0.515,0.122-0.77-0.116-0.587-0.609c0.318-0.857,0.503-1.093,1.773-0.829c-0.092-0.274-0.124-0.509-0.242-0.684
            c-0.126-0.185-0.315-0.346-0.511-0.458c-0.873-0.502-1.037-1.3-0.879-2.186c0.095-0.536,0.325-1.048,0.483-1.574
            c0.05-0.166,0.133-0.364,0.086-0.512c-0.321-1.002-0.498-1.997,0.073-3.074c-1.156,0.233-2.1,0.635-2.741,1.56
            c-0.055,0.08-0.005,0.264,0.046,0.376c0.04,0.088,0.155,0.145,0.242,0.208c1.11,0.82,1.114,1.84,0.452,3.01
            c-0.24,0.425-0.605,0.779-0.852,1.201c-0.135,0.229-0.196,0.535-0.196,0.806c0,1.066,0.002,2.123-0.67,3.041
            c-0.205,0.279-0.449,0.468-0.809,0.431c-0.562-0.06-1.124-0.115-1.681-0.203c-0.307-0.049-0.508-0.229-0.571-0.574
            c-0.049-0.267-0.188-0.518-0.284-0.776c-0.026-0.071-0.081-0.169-0.054-0.218c0.329-0.61-0.239-0.91-0.433-1.348
            C0.376,21.658,0.206,21.053,0,20.463C0,20.186,0,19.908,0,19.632z M9.365,18.21c-0.673,0.672-1.022,1.44-0.912,2.384
            c0.115,0.987,0.725,1.418,1.651,1.145c0.547-0.161,1.096-0.221,1.611,0.06c0.381,0.208,0.658,0.092,0.878-0.206
            c0.544-0.736,0.786-1.551,0.556-2.468c-0.115-0.458-0.351-0.792-0.93-0.938c0.078,0.434,0.184,0.787,0.189,1.143
            c0.002,0.182-0.134,0.476-0.278,0.529c-0.701,0.259-1.476-0.098-1.678-0.714c-0.269-0.821,0.037-1.523,0.824-1.78
            c0.358-0.117,0.752-0.19,1.127-0.181c1.427,0.037,2.854,0.112,4.28,0.179c0.958,0.045,1.746-0.299,2.354-1.031
            c0.648-0.78,1.305-1.555,1.908-2.37c1.088-1.469,2.455-2.517,4.23-3.017c0.515-0.146,1.013-0.354,1.514-0.544
            c0.11-0.042,0.203-0.126,0.391-0.248c-0.655-0.161-1.185-0.307-1.722-0.421c-1.663-0.352-3.193-0.05-4.593,0.931
            c-0.527,0.369-1.066,0.735-1.64,1.021c-1.103,0.55-2.145-0.002-2.406-1.216c-0.097-0.451,0.012-0.846,0.368-1.113
            c0.72-0.54,1.314-0.689,1.875,0.051c0.128,0.169,0.448,0.366,0.589,0.312c0.213-0.081,0.428-0.346,0.5-0.577
            c0.316-1.022-0.285-1.835-1.358-1.919c-0.886-0.07-1.575,0.267-2.086,1.013c-0.095-0.146-0.159-0.25-0.228-0.352
            c-0.306-0.445-0.667-0.861-1.255-0.799c-0.628,0.067-0.986,0.527-1.195,1.09c-0.339,0.914-0.13,1.714,0.605,2.411
            c-0.743,0.273-1.205,0.737-1.141,1.521c0.065,0.803,0.434,1.5,1.104,1.937c0.345,0.225,0.834,0.333,1.25,0.313
            c0.458-0.022,0.95-0.174,1.35-0.405c0.902-0.52,1.769-1.104,2.626-1.696c1.073-0.742,2.078-1.591,3.323-2.051
            c0.897-0.332,1.787-0.373,2.657,0.09c-0.514,0.105-1.028,0.173-1.52,0.318c-1.262,0.372-2.29,1.16-3.328,1.929
            c-1.072,0.794-2.12,1.634-3.258,2.321c-1.342,0.809-2.693,0.592-3.897-0.381c-0.412-0.333-0.835-0.542-1.36-0.582
            c-0.921-0.07-1.789,0.1-2.531,0.653C8.788,15.315,8.29,16.576,9.365,18.21z M31.266,9.696c0.002,0.044,0.004,0.089,0.007,0.134
            c0.665,0.018,1.331,0.046,1.996,0.052c1.775,0.016,3.395,0.475,4.778,1.636c0.647,0.543,1.306,1.074,1.967,1.601
            c0.853,0.679,1.805,1.067,2.906,0.809c0.624-0.146,1.232-0.368,1.836-0.586c0.706-0.256,1.388-0.582,2.101-0.812
            c1.179-0.38,2.008-0.047,2.431,0.913c0.399,0.906-0.036,1.596-1.025,1.657c-0.362,0.022-0.499-0.122-0.51-0.472
            c-0.009-0.271-0.049-0.547-0.118-0.809c-0.022-0.085-0.18-0.17-0.284-0.184c-0.064-0.008-0.175,0.104-0.217,0.186
            c-0.526,1.017,0.053,2.589,1.119,3.001c0.191,0.074,0.444,0.076,0.646,0.021c0.644-0.174,1.266-0.445,1.917-0.577
            c0.797-0.162,1.026-0.32,0.984-1.125c-0.022-0.411-0.181-0.831-0.353-1.213c-0.143-0.316-0.385-0.591-0.604-0.868
            c-0.457-0.58-0.691-1.274-0.466-1.943c0.252-0.748-0.143-1.027-0.633-1.34c-0.104-0.066-0.204-0.136-0.309-0.202
            c-1.01-0.641-2.053-0.72-3.083-0.087c-0.862,0.53-1.684,1.125-2.527,1.686c-1.191,0.793-2.47,0.916-3.771,0.356
            c-0.813-0.351-1.591-0.797-2.355-1.249c-1.277-0.754-2.597-1.246-4.117-0.95c-0.33,0.065-0.685,0.01-1.027,0.01
            c-0.011-0.062-0.021-0.124-0.033-0.186c0.453-0.157,0.896-0.358,1.359-0.464c1.35-0.31,2.614,0.058,3.849,0.569
            c1.173,0.486,2.33,1.014,3.515,1.47c0.907,0.349,1.791,0.182,2.587-0.361c0.77-0.525,1.093-1.266,1.095-2.207
            c0.001-0.773-0.512-1.016-1.069-1.264c-0.36-0.16-0.542-0.382-0.337-0.791c0.074-0.148,0.104-0.321,0.137-0.486
            c0.165-0.863-0.295-1.708-1.067-1.968c-0.822-0.277-1.572,0.088-1.978,0.963c-0.057,0.122-0.104,0.248-0.163,0.391
            c-0.616-0.562-1.364-0.583-2.124-0.525c-0.137,0.011-0.306,0.09-0.393,0.194c-0.462,0.554-0.639,1.213-0.43,1.894
            c0.077,0.249,0.413,0.489,0.683,0.579c0.138,0.046,0.506-0.208,0.567-0.394c0.208-0.625,0.641-0.725,1.193-0.651
            c0.426,0.056,0.892,0.073,1.141,0.488c0.345,0.576,0.382,1.23,0.09,1.812c-0.292,0.583-0.911,0.648-1.493,0.558
            c-0.649-0.101-1.287-0.273-1.929-0.42c-0.82-0.188-1.631-0.476-2.46-0.551C33.67,7.84,32.469,8.801,31.266,9.696z M45.931,8.354
            c1.363,0.043,2.673,0.093,3.983,0.115c0.131,0.002,0.297-0.143,0.391-0.263c0.718-0.921,0.42-2.354-0.646-3.105
            c-0.245-0.172-0.525-0.293-0.795-0.44c0.084-0.402,0.182-0.787,0.243-1.178c0.215-1.379-0.604-2.222-1.963-2.033
            c-0.213,0.029-0.431,0.045-0.634,0.108c-0.23,0.07-0.37,0.043-0.543-0.159c-0.373-0.434-0.895-0.415-1.33,0.007
            c-0.55,0.533-0.684,1.42-0.059,2.083c0.155-0.07,0.315-0.17,0.488-0.216c0.455-0.12,0.912-0.267,1.376-0.299
            c0.202-0.014,0.504,0.175,0.619,0.359c0.337,0.538,0.073,1.304-0.534,1.476c-0.49,0.138-1.026,0.184-1.535,0.157
            c-0.348-0.019-0.471,0.074-0.54,0.376c-0.134,0.586,0.177,0.973,0.582,1.305C45.595,7.108,46.005,7.635,45.931,8.354z M12.46,12.956
            c-0.138-0.856-0.096-1.058,0.362-1.87c0.135-0.24,0.278-0.482,0.368-0.74c0.25-0.72-0.06-1.061-0.811-0.931
            c-0.452,0.079-0.906,0.188-1.361,0.201c-0.568,0.016-0.944-0.439-0.898-0.992c0.06-0.725,0.456-1.128,1.066-1.032
            c0.195,0.031,0.378,0.178,0.553,0.292c0.389,0.252,0.557,0.2,0.675-0.244c0.066-0.251,0.13-0.506,0.159-0.763
            c0.064-0.599-0.862-1.421-1.453-1.3c-0.07,0.015-0.162,0.047-0.194,0.101c-0.391,0.652-1.061,0.805-1.72,0.951
            C7.76,6.95,7.625,8.315,8.228,9.199C8.422,9.484,8.573,9.8,8.75,10.114c-0.132,0.08-0.226,0.131-0.313,0.19
            c-0.961,0.655-1.266,2.271-0.596,3.168c0.222,0.297,0.472,0.493,0.894,0.386C9.962,13.546,11.197,13.26,12.46,12.956z M7.285,13.948
            c-0.144-0.189-0.26-0.311-0.337-0.453c-0.08-0.146-0.114-0.316-0.179-0.472c-0.203-0.482-0.445-0.567-0.894-0.323
            c-1.823,0.995-3.047,2.405-3.164,4.577c-0.017,0.309-0.135,0.464-0.449,0.582c-0.329,0.123-0.653,0.351-0.886,0.616
            c-0.763,0.869-0.753,2.332-0.046,3.346c0.179,0.258,0.372,0.374,0.689,0.323c0.686-0.11,1.186,0.187,1.557,0.75
            c0.108,0.165,0.244,0.312,0.367,0.467c-0.125-1.164,0.206-2.131,0.846-3.035c0.262-0.37,0.458-0.797,0.62-1.222
            c0.092-0.241,0.053-0.533,0.073-0.802c-0.04-0.004-0.08-0.008-0.121-0.011c-0.041,0.126-0.054,0.273-0.128,0.376
            c-0.228,0.312-0.428,0.688-0.738,0.883c-0.219,0.137-0.621,0.09-0.899-0.003c-0.326-0.108-0.431-0.471-0.327-0.776
            c0.23-0.673,0.399-1.421,0.819-1.965c0.571-0.741,1.343-1.331,2.048-1.963C6.497,14.52,6.9,14.245,7.285,13.948z M57.003,16.141
            c0.312-1.131,0.466-1.266,1.583-1.568c0.134-0.036,0.267-0.194,0.335-0.328c0.67-1.315,0.195-2.993-1.214-3.521
            c-0.927-0.348-1.312-0.935-1.719-1.713c-0.782-1.496-2.137-2.233-3.762-2.503c-0.166-0.027-0.465,0.03-0.512,0.134
            C51.534,7.041,51.402,7.47,51.316,7.9c-0.023,0.115,0.155,0.366,0.284,0.402c1.103,0.31,2.127,0.786,3.09,1.397
            c0.677,0.43,1.338,0.89,1.719,1.627c0.323,0.624,0.062,1.16-0.711,1.531c-0.409,0.196-0.667,0.041-0.992-0.597
            c-0.076-0.15-0.14-0.314-0.245-0.441c-0.114-0.137-0.272-0.237-0.412-0.354c0.082,0.731,0.48,1.244,0.902,1.745
            c0.522,0.621,1.059,1.232,1.546,1.881C56.71,15.375,56.815,15.74,57.003,16.141z M51.823,28.437c0,0.03,0,0.062,0,0.092
            c0.661,0,1.322,0.02,1.982-0.007c0.36-0.015,0.76-0.129,0.828-0.53c0.066-0.396-0.305-0.561-0.615-0.704
            c-0.124-0.058-0.26-0.116-0.393-0.123c-1.007-0.054-2.016-0.142-3.021-0.119c-0.49,0.011-0.995,0.188-1.453,0.384
            c-0.205,0.087-0.312,0.404-0.464,0.617c0.202,0.13,0.398,0.362,0.605,0.373C50.135,28.462,50.979,28.437,51.823,28.437z
             M54.63,25.845c-0.044-0.489-0.339-0.742-0.682-0.859c-0.574-0.197-1.17-0.373-1.771-0.445c-1.001-0.122-1.993-0.011-2.922,0.422
            c-0.348,0.162-0.665,0.38-0.743,0.892C50.567,25.999,52.59,26.099,54.63,25.845z M11.342,23.354
            c0.006,0.019,0.012,0.036,0.018,0.055c0.317-0.103,0.645-0.182,0.946-0.319c0.095-0.043,0.119-0.241,0.175-0.368
            c-0.125-0.017-0.249-0.034-0.373-0.048c-0.262-0.029-0.523-0.062-0.786-0.085c-0.25-0.022-0.502-0.05-0.751-0.034
            c-0.034,0.002-0.115,0.316-0.068,0.354c0.213,0.173,0.463,0.3,0.703,0.437C11.241,23.365,11.296,23.353,11.342,23.354z
             M28.045,22.321c0.695-0.121,1.002,0.163,0.94,0.977c-0.34-0.034-0.683-0.048-1.019-0.105c-0.549-0.095-0.642-0.041-0.713,0.496
            c-0.026,0.197-0.06,0.395-0.082,0.592c-0.143,1.296-0.279,2.592-0.429,3.887c-0.042,0.36,0.092,0.485,0.439,0.352
            c0.422-0.164,0.598-0.53,0.652-0.937c0.089-0.669,0.119-1.345,0.198-2.015c0.055-0.464,0.09-0.948,0.603-1.335
            c0.143,0.297,0.362,0.546,0.368,0.8c0.024,1.008-0.034,2.017-0.032,3.025c0.001,0.561,0,1.134,0.113,1.679
            c0.085,0.413,0.444,0.488,0.708,0.161c0.217-0.269,0.403-0.636,0.426-0.971c0.038-0.561-0.084-1.129-0.107-1.695
            c-0.034-0.808-0.067-1.617-0.036-2.423c0.008-0.194,0.252-0.514,0.422-0.538c0.336-0.048,0.625,0.192,0.699,0.543
            c0.065,0.31,0.064,0.638,0.062,0.957c-0.003,0.702-0.05,1.405-0.022,2.105c0.007,0.166,0.254,0.47,0.353,0.455
            c0.21-0.031,0.511-0.194,0.565-0.368c0.105-0.335,0.147-0.735,0.068-1.074c-0.226-0.975-0.298-1.935-0.011-2.904
            c0.021-0.073,0.041-0.149,0.047-0.225c0.046-0.574-0.242-0.823-0.793-0.69c-0.298,0.071-0.597,0.196-0.893,0.189
            c-0.174-0.004-0.454-0.198-0.483-0.347c-0.031-0.161,0.135-0.414,0.286-0.542c0.12-0.1,0.349-0.098,0.528-0.092
            c0.444,0.012,0.89,0.08,1.333,0.069c0.263-0.006,0.6-0.052,0.584-0.44c-0.016-0.369-0.312-0.419-0.603-0.411
            c-0.46,0.013-0.922,0.027-1.379,0.074c-0.613,0.063-0.749-0.013-0.933-0.584c-0.122-0.38-0.26-0.754-0.384-1.133
            c-0.162-0.492-0.571-0.264-0.862-0.248c-0.108,0.006-0.293,0.35-0.275,0.521c0.032,0.311,0.19,0.607,0.298,0.909
            c0.111,0.313,0,0.504-0.329,0.472c-0.232-0.023-0.474-0.111-0.679-0.227c-0.595-0.334-0.698-0.328-1.092,0.205
            c-0.144,0.196-0.275,0.4-0.452,0.659c-0.05-0.544-0.074-1.004-0.139-1.457c-0.066-0.454-0.146-0.91-0.272-1.35
            c-0.114-0.401-0.478-0.49-0.817-0.386c-0.118,0.036-0.164,0.354-0.212,0.55c-0.028,0.114,0.006,0.244,0.011,0.367
            c0.053,1.382,0.159,2.765,0.145,4.146c-0.018,1.654-0.377,3.204-1.748,4.341c-0.24,0.199-0.428,0.488-0.569,0.771
            c-0.215,0.432-0.092,0.983,0.207,1.092c0.443,0.162,0.907,0.167,1.255-0.172c0.346-0.337,0.685-0.714,0.906-1.136
            c0.695-1.325,0.947-2.779,1.097-4.251c0.07-0.684,0.095-1.371,0.139-2.021C26.81,22.527,27.428,22.428,28.045,22.321z M6.11,28.06
            c0.213,0.292,0.473,0.38,0.8,0.271c0.48-0.16,0.949-0.354,1.434-0.499c0.703-0.209,0.841-0.127,0.815,0.613
            c-0.034,0.98-0.148,1.957-0.227,2.937c-0.045,0.565-0.13,1.144,0.223,1.646c0.095,0.136,0.285,0.203,0.432,0.302
            c0.086-0.135,0.234-0.264,0.249-0.406c0.088-0.883,0.158-1.768,0.211-2.653c0.026-0.439,0.004-0.882,0.004-1.325
            c0.376,0.03,0.693,0.05,1.009,0.085c0.408,0.045,0.639,0.235,0.612,0.692c-0.027,0.476-0.019,0.954,0.003,1.431
            c0.006,0.127,0.083,0.288,0.181,0.369c0.474,0.39,0.988,0.732,1.446,1.139c0.675,0.599,1.452,0.911,2.341,0.947
            c0.133,0.006,0.347-0.093,0.396-0.201c0.352-0.78,0.72-1.561,0.982-2.373c0.145-0.448,0.094-0.96,0.131-1.442
            c-0.046-0.008-0.092-0.015-0.138-0.021c-0.338,0.721-0.858,1.287-1.628,1.465c-2.039,0.469-2.541,0.207-2.923-1.386
            c-0.004-0.016-0.008-0.03-0.01-0.046c-0.107-0.623-0.051-0.725,0.52-0.984c0.237-0.108,0.492-0.197,0.701-0.347
            c0.397-0.284,0.807-0.568,1.136-0.922c0.312-0.336,0.154-0.916-0.239-1.163c-0.304-0.19-0.614-0.022-0.839,0.46
            c-0.059,0.125-0.086,0.269-0.163,0.379c-0.121,0.173-0.246,0.361-0.415,0.477c-0.309,0.212-0.487,0.111-0.501-0.262
            c-0.01-0.244,0.044-0.491,0.032-0.735c-0.021-0.429-0.07-0.855-0.109-1.304c-0.511,0.093-0.73,0.338-0.799,0.691
            c-0.09,0.466-0.148,0.938-0.202,1.409c-0.086,0.764-0.474,1.213-1.068,1.224c-0.316,0.005-0.467-0.116-0.492-0.457
            c-0.042-0.604,0.21-1.065,0.589-1.495c0.315-0.356,0.595-0.734,0.501-1.306c-1.721,0.948-3.527,1.303-5.493,1.042
            C5.616,26.986,5.74,27.553,6.11,28.06z M39.648,25.974c0.022,0.169,0.05,0.338,0.065,0.507c0.134,1.518,0.759,2.768,2.007,3.673
            c0.85,0.616,2.106,0.633,2.678,0.007c0.746-0.816,0.844-1.82,0.795-2.955c-0.401,0.233-0.725,0.428-1.054,0.613
            c-0.692,0.39-1.412,0.67-2.23,0.62c-0.523-0.032-0.933-0.2-1.055-0.767c-0.135-0.624-0.258-1.252-0.391-1.876
            c-0.072-0.343,0.068-0.521,0.404-0.584c0.45-0.084,0.905-0.156,1.346-0.277c0.499-0.137,0.649-0.403,0.618-1.003
            c-0.773-0.089-1.519,0.063-2.246,0.31c-1.233,0.418-2.456,0.867-3.691,1.28c-0.575,0.192-0.88,0.963-0.531,1.587
            c0.312-0.188,0.62-0.381,0.936-0.562c0.249-0.145,0.494-0.318,0.765-0.4c0.264-0.08,0.521-0.022,0.558,0.35
            c0.212,2.104-0.489,3.703-2.619,4.538c-0.204,0.08-0.404,0.172-0.612,0.26c0.37,0.597,0.662,0.765,1.264,0.759
            c1.095-0.011,2.446-1.179,2.626-2.361c0.099-0.646,0.041-1.313,0.067-1.971c0.022-0.581,0.062-1.162,0.096-1.743
            C39.511,25.976,39.58,25.975,39.648,25.974z M33.356,26.253c0,1.076-0.004,2.152,0.003,3.229c0.002,0.196,0.024,0.399,0.079,0.587
            c0.141,0.486,0.459,0.736,0.842,0.695c0.493-0.053,0.826-0.36,0.854-0.869c0.022-0.427,0.034-0.869-0.053-1.283
            c-0.426-2.023-0.323-4.06-0.257-6.103c0.046-1.425,0.017-2.856-0.059-4.28c-0.049-0.91-0.128-0.947-0.966-0.654
            c-1.312,0.46-2.616,0.598-3.965,0.192c-0.189-0.057-0.433-0.021-0.625,0.045c-0.401,0.14-0.445,0.513-0.353,0.84
            c0.04,0.141,0.327,0.26,0.519,0.296c0.267,0.052,0.552,0.032,0.827,0.015c0.902-0.059,1.805-0.13,2.706-0.197
            c0.351-0.026,0.5,0.123,0.49,0.484c-0.013,0.49,0.019,0.981,0.019,1.473c0.003,1.843,0.002,3.687,0.002,5.529
            C33.397,26.253,33.377,26.253,33.356,26.253z M19.503,20.963c-0.083,0.038-0.184,0.148-0.188,0.231
            c-0.021,0.357-0.009,0.718-0.009,1.224c0.352-0.186,0.604-0.301,0.837-0.445c0.5-0.309,0.885-0.198,0.958,0.369
            c0.152,1.182,0.273,2.37,0.338,3.56c0.054,0.984-0.088,1.111-1.061,1.387c-0.281,0.08-0.557,0.178-0.879,0.28
            c0.562,0.667,1.175,0.773,1.921,0.621c0.706-0.145,0.807-0.655,0.914-1.204c0.298-1.537,0.07-3.057-0.182-4.569
            c-0.187-1.119-0.114-1.239,1.033-1.228c0.092,0.001,0.187,0.013,0.275-0.004c0.069-0.013,0.175-0.049,0.189-0.098
            c0.124-0.4,0.229-0.806,0.362-1.289C22.417,20.073,20.912,20.325,19.503,20.963z M19.663,26.669c-0.314-0.415-0.6-0.856-0.948-1.24
            c-0.626-0.69-1.039-1.421-0.863-2.408c0.08-0.447,0.05-0.923,0.01-1.38c-0.049-0.549-0.245-0.642-0.765-0.543
            c-0.549,0.104-0.395,0.423-0.278,0.749c0.031,0.087,0.054,0.177,0.091,0.261c0.808,1.875,0.586,3.646-0.518,5.337
            c-0.282,0.433-0.529,0.888-0.791,1.33c0.6,0.367,1.015,0.296,1.34-0.226c0.153-0.245,0.257-0.521,0.369-0.79
            c0.142-0.339,0.246-0.696,0.411-1.023c0.277-0.552,0.476-0.611,1.027-0.351c0.26,0.124,0.508,0.275,0.762,0.414
            C19.561,26.755,19.612,26.712,19.663,26.669z M38.652,23.628c0.769-0.198,1.545-0.382,2.289-0.652
            c0.529-0.192,0.948-0.579,1.214-1.228c-0.437,0.072-0.787,0.101-1.12,0.191c-1.338,0.364-2.674,0.74-4.005,1.129
            c-0.586,0.172-0.709,0.429-0.589,1.085C37.201,23.975,37.931,23.815,38.652,23.628z M49.015,22.114
            c-0.177-0.47-0.445-0.87-0.922-1.091c-0.553-0.256-0.756-0.138-0.797,0.464c-0.068,0.994,0.848,1.756,2.064,1.658
            C49.237,22.774,49.138,22.44,49.015,22.114z M27.714,18.589c-0.16-0.525-0.334-1.046-0.53-1.559c-0.07-0.182-0.27-0.489-0.322-0.472
            c-0.261,0.086-0.589,0.204-0.714,0.417c-0.249,0.425-0.115,0.894,0.128,1.305c0.252,0.426,0.601,0.731,1.068,0.771
            C27.737,19.054,27.791,18.84,27.714,18.589z M54.985,22.303c0.2-0.198,0.357-0.57,0.321-0.835c-0.03-0.227-0.363-0.413-0.623-0.68
            c-0.338,0.91-1.317,1.183-1.499,2.106C53.926,23.003,54.517,22.766,54.985,22.303z M15.999,22.627
            c-0.32,0.976,0.22,1.732,0.611,2.603C17.031,24.077,16.753,22.913,15.999,22.627z M18.447,22.016c0,0.654,0,1.309,0,2.024
            c0.659-0.494,0.384-1.178,0.494-1.748c0.018-0.094-0.246-0.241-0.38-0.363C18.523,21.958,18.485,21.986,18.447,22.016z" />
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
