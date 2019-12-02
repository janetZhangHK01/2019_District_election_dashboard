import React, {useState, useEffect} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import Accordion from 'react-bootstrap/Accordion'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'
import allSmallArea from '../smallArea/allSmallArea.json'
// dashborad
import voter from "../smallArea/voter.js"
import {HorizontalBar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

// carousel
import Carousel from 'react-bootstrap/Carousel';

    // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a aria-haspopup="true" aria-expanded="false" href="" ref={ref} onClick={e =>{e.preventDefault(); onClick(e);}} className="dropdown-toggle nav-link" role="button">{children}</a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
      return (
        <div
          ref={ref}
          style={{height: '210px', overflowY: 'scroll'}}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="搜尋小選區..."
            onChange={e => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              child =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

// nav-dropdown
function DistrictsEighteen () {
    const [selectedDsitrict, setDistrict] = useState("中西區");
    const [selectedSub, setSub] = useState("中環");
    const [selectedReport, setReport] = useState("voter");
    const [chartTheme, setTheme] = useState('age');
    // dashboard 
    const [chartOption, setOption] = useState({});
    const [chartData, setData] = useState({});    
    useEffect(() => {
        setData({
            // chart y axis label
            labels: voter[chartTheme][selectedSub]['chartLabel'],   
            datasets:[{
                // chart legend
                // label: chartTheme === 'age'? (selectedSub +'選民年齡組別分佈'):(selectedSub +'選民性別分佈'),
                label:  chartTheme === 'age'? '':voter[chartTheme][selectedSub]['chartLabel'],
                data:voter[chartTheme][selectedSub]['num'],
                backgroundColor: chartTheme === 'age'? ('rgba(54, 162, 235, 0.5)'):(['rgba(54, 162, 235, 0.2)','rgba(255, 99, 132, 0.2)'])
            
            }]
           
        })
    }, [selectedSub, selectedDsitrict, chartTheme]);
    useEffect(() => {
        setOption({       
                title: {display:true,
                text: chartTheme === 'age'? (selectedSub +'選民年齡組別分佈'):(selectedSub +'選民性別分佈'),
                fontSize:20
              },
                legend:chartTheme === 'age'? {display:false}:{display:true,position:'right', align:'start'},     
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            var nu=''
                            chartTheme === 'age'? nu = Number(tooltipItem[0].xLabel).toString(): nu =  data['datasets'][0]['data'][tooltipItem[0].index];
                            return nu + ' 人';
                        },
                        label: function(tooltipItem, data) {
                            // get the concerned dataset
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            // calculate the total of this data set
                            var total = dataset.data.reduce((previousValue, currentValue, currentIndex, array)=>{
                                return previousValue + currentValue;
                            });
                            // get the current items value
                            var currentValue = dataset.data[tooltipItem.index];
                            // calculate the precentage base on the total and current item, also this does a rough rounding to a give a whole numnber
                            var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                            return percentage + '%';
                        }
                    }
                }
            
        })
    },[selectedSub, selectedDsitrict, chartTheme]);
    const handleSelect = (selectedIndex, e) =>{
        if(selectedReport === 'voter'){
            if (selectedIndex === 0){
                setTheme('age')
            } else{
                setTheme('gender')
            }
        }
    };
    const handleSelectDistrict = (e) =>{
        const listItems = allSmallArea[e.target.text];
        setDistrict(e.target.text);
        setSub(listItems[0].caname);
    };
    const handleSelectSub = (e) =>{
        if(e.target.text === '中環'){
            setSub('中環');
        }else{
            setSub(e.target.text);
        }
    }
    return(
        <div>
        <Navbar bg="light" expand="lg">
        <NavDropdown title={selectedDsitrict} id="nav-dropdown">
            <Accordion defaultActiveKey="0" id='accordionDiv'>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    香港島
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <div>
                    <NavDropdown.Item eventKey="0.1" onClick={handleSelectDistrict}>中西區</NavDropdown.Item>
                    <NavDropdown.Item eventKey="0.2" onClick={handleSelectDistrict}>灣仔區</NavDropdown.Item>
                    <NavDropdown.Item eventKey="0.3" onClick={handleSelectDistrict}>東區</NavDropdown.Item>
                    <NavDropdown.Item eventKey="0.4" onClick={handleSelectDistrict}>南區</NavDropdown.Item>
                    </div>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    九龍
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <div>
                    <Dropdown.Item eventKey="1.1" onClick={handleSelectDistrict}>油尖旺區</Dropdown.Item>
                    <Dropdown.Item eventKey="1.2" onClick={handleSelectDistrict}>深水埗區</Dropdown.Item>
                    <Dropdown.Item eventKey="1.3" onClick={handleSelectDistrict}>九龍城區</Dropdown.Item>
                    <Dropdown.Item eventKey="1.4" onClick={handleSelectDistrict}>黃大仙區</Dropdown.Item>
                    <Dropdown.Item eventKey="1.5" onClick={handleSelectDistrict}>觀塘區</Dropdown.Item>
                    </div>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                    新界
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                    <div>
                    <Dropdown.Item eventKey="2.1" onClick={handleSelectDistrict}>荃灣區</Dropdown.Item>
                    <Dropdown.Item eventKey="2.2" onClick={handleSelectDistrict}>屯門區</Dropdown.Item>
                    <Dropdown.Item eventKey="2.3" onClick={handleSelectDistrict}>元朗區</Dropdown.Item>
                    <Dropdown.Item eventKey="2.6" onClick={handleSelectDistrict}>北區</Dropdown.Item>
                    <Dropdown.Item eventKey="2.7" onClick={handleSelectDistrict}>大埔區</Dropdown.Item>
                    <Dropdown.Item eventKey="2.8" onClick={handleSelectDistrict}>西貢區</Dropdown.Item>
                    <Dropdown.Item eventKey="2.9" onClick={handleSelectDistrict}>沙田區</Dropdown.Item>
                    <Dropdown.Item eventKey="2.4" onClick={handleSelectDistrict}>葵青區</Dropdown.Item>
                    <Dropdown.Item eventKey="2.5" onClick={handleSelectDistrict}>離島區</Dropdown.Item>

                    </div>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </NavDropdown>
        {/* sub district dropdown */}
        <Dropdown id="nav-dropdown" style={{paddingLeft:'21px'}}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            {selectedSub}
            {console.log(selectedSub)}
            {console.log(voter[chartTheme][selectedSub]['num'])}

            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
            {/* {allSmallArea[selectedDsitrict].map((d) => <Dropdown.Item key={d.cacode} eventKey={d.cacode} onClick={() => setSub(d.caname)}>{d.caname}</Dropdown.Item >)} */}
            {allSmallArea[selectedDsitrict].map((d) => <Dropdown.Item key={d.cacode} eventKey={d.cacode} onClick={handleSelectSub}>{d.caname}</Dropdown.Item >)}
            </Dropdown.Menu>
        </Dropdown>
        <Nav variant="pills" defaultActiveKey="#voter">
        <Nav.Item>
            <Nav.Link href="#voter" style={{color:selectedReport ==='voter'? 'white': '#333'}} onClick={() => setReport('voter')}>選民報表</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="#demographic" style={{color:selectedReport ==='demographic'? 'white': '#333'}} onClick={() => setReport('demographic')}>人口報表</Nav.Link>
        </Nav.Item>
        </Nav>
        </Navbar>
        
        {selectedReport === 'voter' ? 
         (<Carousel onSelect={handleSelect} interval={false} slide={false}>
        <Carousel.Item>
            <HorizontalBar data={chartData} options={chartOption}></HorizontalBar>
        </Carousel.Item>
        <Carousel.Item>
            <Doughnut data={chartData} options={chartOption}></Doughnut>
            {/* {console.log(selectedSub)}
            {console.log(voter[chartTheme][selectedSub]['num'])} */}
        </Carousel.Item>
        </Carousel>):'waiting'
        }
        </div>
        );
}
export default DistrictsEighteen;