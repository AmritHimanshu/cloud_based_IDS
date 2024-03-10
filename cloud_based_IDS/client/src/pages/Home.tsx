import React, { useState } from 'react';
import Header from './Header';
// import WarningIcon from '@mui/icons-material/Warning';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Home: React.FC = () => {

  const [inputData, setInputData] = useState({
    protocol_type: "tcp",
    service: "private",
    flag: "SF",
    src_bytes: "491",
    dst_bytes: "0",
    logged_in: "0",
    count: "2",
    srv_count: "2",
    same_srv_rate: "1",
    diff_srv_rate: "0",
    dst_host_count: "150",
    dst_host_srv_count: "25",
    dst_host_same_srv_rate: "0.17",
    dst_host_diff_srv_rate: "0.03",
    dst_host_same_src_port_rate: "0.17",
    dst_host_srv_diff_host_rate: "0",
    dst_host_serror_rate: "0",
    dst_host_srv_serror_rate: "0",
    dst_host_rerror_rate: "0.05",
    dst_host_srv_rerror_rate: "0"
  });

  const handleOnChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputData({ ...inputData, [name]: value });
  };

  const [temp, setTemp] = useState('');
  console.log(temp)

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    for (const property in inputData) {
      const value: string = inputData[property as keyof typeof inputData];
      if (value === "") {
        return window.alert(`${property} is empty`);
      }

      // if (!/^\d*$/.test(value) && (property !== 'protocol_type' && property !== 'service' && property !== 'flag')) {
      //   setInputData({ ...inputData, [property]: "" });
      //   return window.alert(`Enter number in ${property}`);
      // }
    }

    try {
      const res = await fetch("/detectAttack", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputData
        })
      });

      const data = await res.json();

      setTemp(data.prediction[0]);

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <>
      <Header />
      <div className='flex justify-between'>
        <div className='p-10'>
          <form className='space-y-5'>
            <div>
              <label htmlFor="protocol_type" className="text-[16px] text-neutral-700">protocol_type</label>
              <input id="protocol_type" name="protocol_type" type="text" value={inputData.protocol_type} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="service" className="text-[16px] text-neutral-700">service</label>
              <input id="service" name="service" type="text" value={inputData.service} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="flag" className="text-[16px] text-neutral-700">flag</label>
              <input id="flag" name="flag" type="text" value={inputData.flag} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="src_bytes" className="text-[16px] text-neutral-700">src_bytes</label>
              <input id="src_bytes" name="src_bytes" type="text" value={inputData.src_bytes} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_bytes" className="text-[16px] text-neutral-700">dst_bytes</label>
              <input id="dst_bytes" name="dst_bytes" type="text" value={inputData.dst_bytes} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="logged_in" className="text-[16px] text-neutral-700">logged_in</label>
              <input id="logged_in" name="logged_in" type="text" value={inputData.logged_in} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="count" className="text-[16px] text-neutral-700">count</label>
              <input id="count" name="count" type="text" value={inputData.count} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="srv_count" className="text-[16px] text-neutral-700">srv_count</label>
              <input id="srv_count" name="srv_count" type="text" value={inputData.srv_count} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="same_srv_rate" className="text-[16px] text-neutral-700">same_srv_rate</label>
              <input id="same_srv_rate" name="same_srv_rate" type="text" value={inputData.same_srv_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="diff_srv_rate" className="text-[16px] text-neutral-700">diff_srv_rate</label>
              <input id="diff_srv_rate" name="diff_srv_rate" type="text" value={inputData.diff_srv_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_count" className="text-[16px] text-neutral-700">dst_host_count</label>
              <input id="dst_host_count" name="dst_host_count" type="text" value={inputData.dst_host_count} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_srv_count" className="text-[16px] text-neutral-700">dst_host_srv_count</label>
              <input id="dst_host_srv_count" name="dst_host_srv_count" type="text" value={inputData.dst_host_srv_count} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_same_srv_rate" className="text-[16px] text-neutral-700">dst_host_same_srv_rate</label>
              <input id="dst_host_same_srv_rate" name="dst_host_same_srv_rate" type="text" value={inputData.dst_host_same_srv_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_diff_srv_rate" className="text-[16px] text-neutral-700">dst_host_diff_srv_rate</label>
              <input id="dst_host_diff_srv_rate" name="dst_host_diff_srv_rate" type="text" value={inputData.dst_host_diff_srv_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_same_src_port_rate" className="text-[16px] text-neutral-700">dst_host_same_src_port_rate</label>
              <input id="dst_host_same_src_port_rate" name="dst_host_same_src_port_rate" type="text" value={inputData.dst_host_same_src_port_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_srv_diff_host_rate" className="text-[16px] text-neutral-700">dst_host_srv_diff_host_rate</label>
              <input id="dst_host_srv_diff_host_rate" name="dst_host_srv_diff_host_rate" type="text" value={inputData.dst_host_srv_diff_host_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_serror_rate" className="text-[16px] text-neutral-700">dst_host_serror_rate</label>
              <input id="dst_host_serror_rate" name="dst_host_serror_rate" type="text" value={inputData.dst_host_serror_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_srv_serror_rate" className="text-[16px] text-neutral-700">dst_host_srv_serror_rate</label>
              <input id="dst_host_srv_serror_rate" name="dst_host_srv_serror_rate" type="text" value={inputData.dst_host_srv_serror_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_rerror_rate" className="text-[16px] text-neutral-700">dst_host_rerror_rate</label>
              <input id="dst_host_rerror_rate" name="dst_host_rerror_rate" type="text" value={inputData.dst_host_rerror_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <div>
              <label htmlFor="dst_host_srv_rerror_rate" className="text-[16px] text-neutral-700">dst_host_srv_rerror_rate</label>
              <input id="dst_host_srv_rerror_rate" name="dst_host_srv_rerror_rate" type="text" value={inputData.dst_host_srv_rerror_rate} onChange={(e) => handleOnChange(e)} />
            </div>

            <button type='submit' className='bg-black text-white px-3 py-2 font-bold rounded-md' onClick={handleOnSubmit}>Submit</button>
          </form>
        </div>

        <div className='w-[60%] relative'>
          <div className='sticky top-[28vh] text-center'>
            {/* <div>
              <WarningIcon style={{ color: 'red', fontSize: '300px' }} />
              <div className='font-bold text-xl'>Attack is Detected</div>
            </div> */}

            {/* <div>
              <CheckCircleIcon style={{ color: 'rgba(2, 193, 0, 0.8)', fontSize: '300px' }} />
              <div className='font-bold text-xl tracking-wider'>No attack is Detected</div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
