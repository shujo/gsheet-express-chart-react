import React from "react"
import ReactSvgPieChart from "react-svg-piechart"
import { Card } from 'react-bootstrap';

const Chart = ({data}) => {
    return(
        <Card className="ml-2" style={{ width: '600px' }}>
            <Card.Header>Pie Chart</Card.Header>
            <Card.Body>
                <Card.Text className="mx-auto" style={{ width: '500px' }}>
                    <ReactSvgPieChart
                        data={data}
                        expandOnHover
                        expandSize={1}
                        strokeWidth={1}
                        // onSectorHover={(d, i, e) => {
                        //     if (d) {
                        //         console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                        //     } else {
                        //         console.log("Mouse leave - Index:", i, "Event:", e)
                        //     }
                        // }}
                    />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Chart;