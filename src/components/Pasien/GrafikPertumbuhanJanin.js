import React, { Component, useEffect, useState } from "react";
import CanvasJSReact from '../../../../Assets/canvasjs/canvasjs.react';
import Api from "../../../../Auth/bin/Api";
import Body from "../../../../Body/Body";
import DetailPasien from "../Pasien/DetailPasien";
import J from "jquery"
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function GrafikPertumbuhanJanin(props) {

    const [beratJanin, setBeratJanin] = useState([])
    const [TinggiFundus, setTinggiFundus] = useState([])
    const [masukPanggul, setmasukPanggul] = useState([])



    const options = {
        animationEnabled: true,
        backgroundColor: '#F1F1F1',
        exportEnabled: true,
        // theme: "light2", //"light1", "dark1", "dark2"
        title: {
            text: "GRAFIK PERTUMBUHAN JANIN"
        },
        legend: {
            // horizontalAlign: "left", // "center" , "right"
            // verticalAlign: "center",  // "top" , "bottom"
            fontSize: 25
        },

        axisX: {
            title: "Kunjungan Ke",
            interval: 1,
            includeZero: false,
            minimum: 0
        },
        toolTip: {




        },

        axisY: {
            valueFormatString: "#.#",
            title: "Berat Janin (kg)",
            includeZero: false,
            minumum: 0

        },
        data: [

            {
                type: "splineArea", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "black",
                showInLegend: true,
                name: "Tinggi Fundus",
                color: "#9c9919a3",

                indexLabel: "{y}",
                dataPoints: TinggiFundus
            },



            {
                type: "splineArea", //change type to bar, line, area, pie, etc
                indexLabel: "{y} Gram",
                showInLegend: true,
                color: "#4dbd48b5",
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "black",
                name: "Berat Janin",

                // indexLabelPlacement: "outside",
                dataPoints: beratJanin
            },
            {
                name: "Masuk Panggul",
                type: "splineArea", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "black",
                showInLegend: true,
                // indexLabel: "masuk Panggul",
                dataPoints: masukPanggul,
                color: "#bd4899",

            },


        ]
    }

    const loadData = () => {

        console.log("parammmmm ", props.match)

        var id_pasien = J("#id_pasien").val()  // id_pasien ada di hidden componen PasienDetail


        Api.get("getGrafikPertumbuhanJanin?id_pasien=" + id_pasien).then(res => {
            let pertumbuhanJanin = res.data.datas;
            let pertumbuhan = [{ x: 0, y: 0 }]
            let tinggiFundus = [{ x: 0, y: 0 }]
            let masukPanggul = [{ x: 0, y: 0 }]
         
            pertumbuhanJanin.map((item, i) => {
                pertumbuhan.push({ x: item.kunjunganke, y: (item.beratjanin / 1000) })
                tinggiFundus.push({ x: item.kunjunganke, y: (item.tinggifundus / 10) })
                masukPanggul.push({ x: item.kunjunganke, y: (item.masukpanggul/1) })

            })

            setBeratJanin(pertumbuhan)
            setTinggiFundus(tinggiFundus)
            setmasukPanggul(masukPanggul)


        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Body>
            <div className="mt10">
                <CanvasJSChart options={options} />
            </div>
            <br />
            <DetailPasien />
        </Body>
    )
}

export default GrafikPertumbuhanJanin
