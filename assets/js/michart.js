const options = {
    series: [41.41, 24.24, 13.55, 10.31],
    chart: {
        width: 380,
        type: 'donut',
    },
    dataLabels: {
        enabled: false
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                show: false
            }
        }
  }],
    stroke: {
        width: 1,
        colors: undefined
    },
    colors: ['rgb(0, 148, 255)', 'rgb(220,4,65)', 'rgb(50,211,44)', 'rgb(255, 150, 26)'],
    labels: ['Logitech G', 'Zowie', 'Razer', 'Vaxee'],
    legend: {
        show: false,
        position: 'bottom',
        fontSize: '14px',
        fontFamily: 'Roboto',
        onItemClick: {
            toggleDataSeries: false
        },
        onItemHover: {
            highlightDataSeries: true
        },
        markers: {
            width: 16,
            height: 16,
            strokeWidth: 0,
            strokeColor: '#fff',
            radius: 4,
            onClick: function (event, legendItem, legend) {
                toggleSeries(legendItem.seriesIndex);
            }
        },
        itemMargin: {
            horizontal: 10,
            vertical: 5
        }
    },
    tooltip: {
        y: {
            formatter: function (value) {
                return value + "%";
            }
        }
    },
    plotOptions: {
        pie: {
            donut: {
                size: '90%',
                background: 'transparent',
                stroke: {
                    colors: ['#000']
                },
                borderWidth: 0,
                labels: {
                    show: true,
                    name: {
                        fontSize: '22px',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        offsetY: -10
                    },
                    value: {
                        fontSize: '26px',
                        color: '#ffffff',
                        offsetY: 10,
                        formatter: function (val) {
                            return val + "%";
                        }
                    },
                    total: {
                        show: true,
                        fontSize: '16px',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        label: 'Dominio en el mercado:',
                        color: '#ffffff',
                        formatter: function (w) {
                            let total = w.globals.seriesTotals.reduce((a, b) => {
                                return a + b
                            }, 0);
                            return total.toFixed(2) + "%";
                        }
                    },
                    states: {
                        hover: {
                            enabled: true,
                            halo: {
                                size: 0,
                                opacity: 0
                            },
                        }
                    }
                }
            }
        }
    }
};


const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// FUNCION PARA OBTENER EL COLOR CORRESPONDIENTE A LA SERIE
function getSeriesColor(seriesName) {
    const colors = {
        'Logitech G': 'rgb(0, 148, 255)',
        'Zowie': 'rgb(220,4,65)',
        'Razer': 'rgb(50,211,44)',
        'Vaxee': 'rgb(255, 150, 26)'
    };
    return colors[seriesName];
}

// OBTENGO MEDIANTE QUERYSELECTOR LOS ELEMENTOS CORERSPONDIENTES A LOS CHECKBOXS
const logitechCheckbox = document.querySelector('#logitech-checkbox');
const zowieCheckbox = document.querySelector('#zowie-checkbox');
const razerCheckbox = document.querySelector('#razer-checkbox');
const vaxeeCheckbox = document.querySelector('#vaxee-checkbox');

// FUNCIÓN PARA ACTUALIZAR EL GRÁFICO EN BASE AL ESTADO DE LAS CASILLAS DE CHECKBOXS
function updateChart() {
    const series = [];
    const labels = [];
    const colors = [];

    // AGREGO SERIES, ETIQUETAS Y COLORES SI EL CHEXBOX ESTÁ MARCADO
    if (logitechCheckbox.checked) {
        series.push(41.41);
        labels.push('Logitech G');
        colors.push('rgb(0, 148, 255)');
    }
    if (zowieCheckbox.checked) {
        series.push(24.24);
        labels.push('Zowie');
        colors.push('rgb(220,4,65)');
    }
    if (razerCheckbox.checked) {
        series.push(13.55);
        labels.push('Razer');
        colors.push('rgb(50,211,44)');
    }
    if (vaxeeCheckbox.checked) {
        series.push(10.31);
        labels.push('Vaxee');
        colors.push('rgb(255, 150, 26)');
    }

    // VERIFICO SI HAY ALGUNA UNCHECKED Y ACTUALIZA EL DONUT DEL APEXCHART
    if (series.length === 0) {
        const options = {
            series: [0],
            labels: [''],
            colors: ['#CCCCCC'],
            chart: {
                type: 'donut',
                width: 400
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            emptyFill: '#CCCCCC',
            emptyFillOpacity: 0.3
        };
        chart.updateOptions(options);
        return;
    }

    // ACTUALIZO LAS OPCIONES DE SERIES LETIQUETAS Y COLORES DEL DONUT
    const options = {
        series,
        labels,
        colors,
    };
    chart.updateOptions(options);
}

// ADDEVENLISTENER PARA LOS CAMBIOS DE CHECKBOXS Y ACTUALIZACIÓN DEL DONUT EN CONSECUENCIA
logitechCheckbox.addEventListener('change', updateChart);
zowieCheckbox.addEventListener('change', updateChart);
razerCheckbox.addEventListener('change', updateChart);
vaxeeCheckbox.addEventListener('change', updateChart);

function toggleContainer() {
    const container = document.querySelector('.container-info');
    const icono = document.getElementById('icono');
    container.classList.toggle('cerrar');
    if (container.classList.contains('cerrar')) {
        icono.style.transform = "rotate(180deg)";
    } else {
        icono.style.transform = "rotate(0deg)";
    }
}