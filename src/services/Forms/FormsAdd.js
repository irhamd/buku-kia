import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Mentions, Radio, Row, Select, Slider, Switch } from "antd"
import { Col as ColB } from 'react-bootstrap';
import { useStopwatch } from 'react-timer-hook';


export const _Slider = (r) => {

    const style = {
        display: 'inline-block',
        height: 300,
        marginLeft: 70,
    };

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label} style={{ marginBottom: "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : 'Harus diisi.' }]}
            >
                <div style={r.vertical && style}>
                    <Slider marks={r.marks} defaultValue={r.defaultValue} step={r.step} vertical={r.vertical}
                        max={r.max} min={r.min} onChange={r.onChange}
                    />
                </div>
            </Form.Item>
        </ColB>
    )
}

export const _CheckBox = (r) => {

    const style = {
        display: 'inline-block',
        height: 300,
        marginLeft: 70,
    };

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label} style={{ marginBottom: "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : 'Harus diisi.' }]}
            >
                <Checkbox onChange={r.onChange}  >{r.caption} </Checkbox>
            </Form.Item>
        </ColB>
    )
}

export const formItemLayout =
{
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
}



export function CounterTime() {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    return (
        <div style={{ textAlign: 'center' }}>
            {/* <p style={{ marginBottom: "-5px" }}>Count Respond Time</p> */}
            {/* <span>Hari</span>:<span>Jam</span>:<span>Menit</span>:<span>Detik</span> <br /> */}
            <div style={{ fontSize: '24px', fontWeight: "bold" }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
            {/* <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={reset}>Reset</button> */}
        </div>
    );
}
