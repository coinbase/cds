import{r as n,j as e}from"./iframe-CYDANtMt.js";import{a as M,X as P,Y as F,u as z,i as G,b as Y}from"./Axis-Dh1tDFUo.js";import{L as N}from"./LineChart-BPZ39NzJ.js";import{S as R}from"./Switch-BjwniDr8.js";import"./preload-helper-D9Z9MdNV.js";import"./motion-minimal-B1h7XI-_.js";import"./Text-0g3rWpAf.js";import"./d3-interpolate-path-DAdKSvnf.js";import"./color-Ceo1QMNe.js";import"./useDimensions-C4mzPCUe.js";import"./HStack-Fh-9TmPm.js";import"./use-transform-BHujfv3A.js";import"./animate-NV5OIPt9.js";import"./Line-DNltR6jQ.js";import"./useTheme-C_Ehsh33.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./Control-C-1dn_y_.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./Interactable-DhvzqrPU.js";import"./isRtl-CGZsgYct.js";const b=500,f=300,xe={component:M,title:"Components/Chart/ChartText"},C=()=>{const[r,A]=n.useState("Hello World"),[a,m]=n.useState(b/2),[l,y]=n.useState(f/2),[d,S]=n.useState(0),[x,I]=n.useState(0),[i,c]=n.useState("center"),[v,L]=n.useState("middle"),[k,h]=n.useState(!1),[o,p]=n.useState(null),[s,j]=n.useState(!1),[D,T]=n.useState(!1),H=n.useRef(null),g=n.useCallback(t=>{if(!D)return;const W=t.shiftKey?10:1;switch(t.key){case"ArrowUp":t.preventDefault(),y(u=>Math.max(0,u-W));break;case"ArrowDown":t.preventDefault(),y(u=>Math.min(f,u+W));break;case"ArrowLeft":t.preventDefault(),m(u=>Math.max(0,u-W));break;case"ArrowRight":t.preventDefault(),m(u=>Math.min(b,u+W));break}},[D]),X=n.useMemo(()=>({top:8,right:12,bottom:8,left:12}),[]);return n.useEffect(()=>(document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)),[g]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px",padding:"20px"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"15px",padding:"15px",border:"1px solid #e5e5e5",borderRadius:"8px",backgroundColor:"#f9f9f9",maxWidth:"600px",width:"100%"},children:[e.jsx("h3",{style:{margin:"0 0 10px 0",fontSize:"16px"},children:"ChartText Interactive Controls"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{minWidth:"120px",fontWeight:"bold",flexShrink:0},children:"Text Content:"}),e.jsx("input",{onChange:t=>A(t.target.value),placeholder:"Enter text to display...",style:{padding:"8px 12px",border:"1px solid #ccc",borderRadius:"4px",fontSize:"14px",width:"200px",maxWidth:"200px",overflow:"hidden",textOverflow:"ellipsis"},type:"text",value:r})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{fontWeight:"bold"},children:"X Position:"}),e.jsx("input",{max:b,min:"0",onChange:t=>m(Number(t.target.value)),style:{width:"80px",padding:"4px 8px",border:"1px solid #ccc",borderRadius:"4px"},type:"number",value:a})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{fontWeight:"bold"},children:"Y Position:"}),e.jsx("input",{max:f,min:"0",onChange:t=>y(Number(t.target.value)),style:{width:"80px",padding:"4px 8px",border:"1px solid #ccc",borderRadius:"4px"},type:"number",value:l})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("label",{style:{minWidth:"120px",fontWeight:"bold",flexShrink:0},children:"Show Debug Overlays:"}),e.jsx(R,{checked:k,onChange:t=>h(t.target.checked)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("label",{style:{minWidth:"120px",fontWeight:"bold",flexShrink:0},children:"Hide Text (display:none):"}),e.jsx(R,{checked:s,onChange:t=>j(t.target.checked)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{fontWeight:"bold"},children:"X Offset (dx):"}),e.jsx("input",{max:"50",min:"-50",onChange:t=>S(Number(t.target.value)),style:{width:"150px"},type:"range",value:d}),e.jsx("span",{style:{minWidth:"40px",textAlign:"right"},children:d})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{fontWeight:"bold"},children:"Y Offset (dy):"}),e.jsx("input",{max:"50",min:"-50",onChange:t=>I(Number(t.target.value)),style:{width:"150px"},type:"range",value:x}),e.jsx("span",{style:{minWidth:"40px",textAlign:"right"},children:x})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{fontWeight:"bold"},children:"Horizontal Alignment:"}),e.jsxs("select",{onChange:t=>c(t.target.value),style:{padding:"4px 8px",border:"1px solid #ccc",borderRadius:"4px",fontSize:"14px",minWidth:"100px"},value:i,children:[e.jsx("option",{value:"left",children:"left"}),e.jsx("option",{value:"center",children:"center"}),e.jsx("option",{value:"right",children:"right"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{fontWeight:"bold"},children:"Vertical Alignment:"}),e.jsxs("select",{onChange:t=>L(t.target.value),style:{padding:"4px 8px",border:"1px solid #ccc",borderRadius:"4px",fontSize:"14px",minWidth:"100px"},value:v,children:[e.jsx("option",{value:"top",children:"top"}),e.jsx("option",{value:"middle",children:"middle"}),e.jsx("option",{value:"bottom",children:"bottom"})]})]})]}),e.jsxs("div",{style:{fontSize:"12px",color:"#666",padding:"10px",backgroundColor:"#fff",borderRadius:"4px",border:"1px solid #e0e0e0"},children:[e.jsx("strong",{children:"Instructions:"}),e.jsxs("ul",{style:{margin:"5px 0 0 0",paddingLeft:"20px"},children:[e.jsx("li",{children:"Click on the chart to focus it, then use arrow keys to move the text"}),e.jsx("li",{children:"Hold Shift + arrow keys for larger movements (10px steps)"}),e.jsx("li",{children:"Use the sliders to test dx/dy offset behavior"}),e.jsx("li",{children:"Modify the text content to test different string lengths"})]})]})]}),e.jsx("div",{ref:H,onBlur:()=>T(!1),onFocus:()=>T(!0),style:{border:D?"2px solid #007bff":"2px solid #ccc",borderRadius:"8px",backgroundColor:"#fff",outline:"none",cursor:"crosshair"},children:e.jsxs(N,{points:!0,enableScrubbing:!1,height:f,series:[{id:"sample-data",data:[10,20,55,42,31,4],color:"#2ca02c"}],style:{outline:"none",cursor:"crosshair"},width:b,children:[e.jsx(P,{showGrid:!0,showLine:!0,showTickMarks:!0}),e.jsx(F,{showGrid:!0,showLine:!0,showTickMarks:!0,position:"left"}),e.jsx(M,{elevated:!0,borderRadius:8,color:"var(--color-fgPrimary)",dx:d,dy:x,font:"label1",horizontalAlignment:i,inset:X,onDimensionsChange:t=>p(t),styles:{text:s?{display:"none"}:void 0,backgroundRect:s?{display:"none"}:void 0},testID:"test-text",verticalAlignment:v,x:a,y:l,children:r}),k&&e.jsxs(e.Fragment,{children:[e.jsxs("g",{opacity:.3,children:[e.jsx("line",{stroke:"#ff0000",strokeDasharray:"2,2",strokeWidth:1,x1:a,x2:a,y1:0,y2:f}),e.jsx("line",{stroke:"#ff0000",strokeDasharray:"2,2",strokeWidth:1,x1:0,x2:b,y1:l,y2:l})]}),e.jsx("circle",{cx:a,cy:l,fill:"#ff0000",opacity:.7,r:3}),o&&e.jsx("rect",{fill:"none",height:o.height,stroke:"#32cd32",strokeWidth:1,width:o.width,x:o.x,y:o.y})]})]})}),e.jsxs("div",{style:{fontSize:"14px",color:"#333",padding:"10px",backgroundColor:"#f0f0f0",borderRadius:"4px",fontFamily:"monospace",maxWidth:"600px",overflow:"hidden",wordBreak:"break-all"},children:[e.jsx("strong",{children:"Current Values:"}),e.jsx("br",{}),'Text: "',r,'" | Position: (',a,", ",l,") | Offset: (",d,","," ",x,")",e.jsx("br",{}),"Hidden (display:none): ",s?"true":"false",e.jsx("br",{}),"Bounding Box: (",o?.x,", ",o?.y,", ",o?.width,", ",o?.height,")"]})]})},w=()=>{const[r,A]=n.useState(10),[a,m]=n.useState("short"),[l,y]=n.useState(!0),d=n.useMemo(()=>Array.from({length:r},()=>Math.floor(Math.random()*100)),[r]),S=n.useCallback((i,c)=>{switch(c){case"numbers":return i.toString();case"short":return["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"][i%20];case"medium":return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i%12];case"long":return["January","February","March","April","May","June","July","August","September","October","November","December"][i%12];default:return i.toString()}},[]),x=n.useMemo(()=>d.length===0?[]:d.map((i,c)=>S(c,a)),[d,a,S]),I=({labels:i})=>{const{getXScale:c,height:v}=z(),[L,k]=n.useState(new Map),h=c(),o=n.useMemo(()=>h?i.map((p,s)=>{const j=h(s)??0;return{x:G(h)?j+(h.bandwidth?.()??0)/2:j,y:v-20,label:p,chartTextProps:{textAnchor:"middle",dominantBaseline:"hanging",color:"var(--color-fgPrimary)",font:"caption",onDimensionsChange:T=>{k(H=>{const g=new Map(H);return g.set(s,T),g})}}}}):[],[i,h,v]);return e.jsxs(e.Fragment,{children:[e.jsx(Y,{labels:o,prioritizeEndLabels:!0}),l&&e.jsxs(e.Fragment,{children:[e.jsx("g",{children:o.map((p,s)=>e.jsx("circle",{cx:p.x,cy:p.y,fill:"#ff0000",r:2},`label-dot-${s}`))}),e.jsx("g",{children:Array.from(L.entries()).map(([p,s])=>e.jsx("rect",{fill:"none",height:s.height,stroke:"#32cd32",strokeWidth:1,width:s.width,x:s.x,y:s.y},`label-bbox-${p}`))})]})]})};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px",padding:"20px"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"15px",padding:"15px",border:"1px solid #e5e5e5",borderRadius:"8px",backgroundColor:"#f9f9f9",maxWidth:"600px"},children:[e.jsx("h3",{style:{margin:"0 0 10px 0",fontSize:"16px"},children:"ChartTextGroup Interactive Controls"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{minWidth:"150px",fontWeight:"bold"},children:"Number of Data Points:"}),e.jsx("input",{max:"50",min:"1",onChange:i=>A(Number(i.target.value)),style:{width:"200px"},type:"range",value:r}),e.jsx("span",{style:{minWidth:"30px",textAlign:"right"},children:r})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("label",{style:{minWidth:"150px",fontWeight:"bold"},children:"Label Length:"}),e.jsxs("select",{onChange:i=>m(i.target.value),style:{padding:"4px 8px",border:"1px solid #ccc",borderRadius:"4px",fontSize:"14px",minWidth:"120px"},value:a,children:[e.jsx("option",{value:"numbers",children:"Numbers (0, 1, 2...)"}),e.jsx("option",{value:"short",children:"Short (A, B, C...)"}),e.jsx("option",{value:"medium",children:"Medium (Jan, Feb...)"}),e.jsx("option",{value:"long",children:"Long (January, February...)"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("label",{style:{minWidth:"150px",fontWeight:"bold"},children:"Show Debug Overlays:"}),e.jsx(R,{checked:l,onChange:i=>y(i.target.checked)})]}),e.jsxs("div",{style:{fontSize:"12px",color:"#666",padding:"10px",backgroundColor:"#fff",borderRadius:"4px",border:"1px solid #e0e0e0"},children:[e.jsx("strong",{children:"Instructions:"}),e.jsxs("ul",{style:{margin:"5px 0 0 0",paddingLeft:"20px"},children:[e.jsx("li",{children:"Adjust the number of data points to see how ChartTextGroup handles different densities"}),e.jsx("li",{children:"Change label length to test overlap detection with varying text widths"}),e.jsx("li",{children:"Notice how the component automatically hides overlapping labels"})]})]})]}),e.jsx("div",{style:{width:"fit-content",border:"2px solid #ccc",borderRadius:"8px",backgroundColor:"#fff"},children:e.jsxs(N,{enableScrubbing:!1,height:f,series:[{id:"sample-data",data:d,color:"#2ca02c"}],width:b,children:[e.jsx(P,{position:"bottom",showGrid:!0,showLine:!0,showTickMarks:!1,tickLabelFormatter:()=>""}),e.jsx(F,{position:"left",showGrid:!0,showLine:!0,showTickMarks:!1,tickLabelFormatter:()=>""}),e.jsx(I,{labels:x})]})}),e.jsxs("div",{style:{fontSize:"14px",color:"#333",padding:"10px",backgroundColor:"#f0f0f0",borderRadius:"4px",fontFamily:"monospace",maxWidth:"600px"},children:[e.jsx("strong",{children:"Current State:"}),e.jsx("br",{}),"Data Points: ",r," | Label Type: ",a," | Generated Labels:"," ",x.length,e.jsx("br",{}),"Sample Labels: [",x.slice(0,5).map(i=>`"${i}"`).join(", "),x.length>5?"...":"","]"]})]})};C.__docgenInfo={description:"",methods:[],displayName:"InteractiveChartText"};w.__docgenInfo={description:"",methods:[],displayName:"InteractiveChartTextGroup"};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  // State for interactive controls
  const [textContent, setTextContent] = useState('Hello World');
  const [textX, setTextX] = useState(CHART_WIDTH / 2);
  const [textY, setTextY] = useState(CHART_HEIGHT / 2);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [horizontalAlignment, setHorizontalAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [verticalAlignment, setVerticalAlignment] = useState<'top' | 'middle' | 'bottom'>('middle');
  const [showDebug, setShowDebug] = useState(false);
  const [bbox, setBbox] = useState<Rect | null>(null);
  const [hideWithDisplayNone, setHideWithDisplayNone] = useState(false);

  // State to track if chart is focused
  const [isChartFocused, setIsChartFocused] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Handle keyboard events for arrow key positioning
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Only handle arrow keys when chart is focused
    if (!isChartFocused) return;
    const step = event.shiftKey ? 10 : 1; // Hold shift for larger steps

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setTextY(prev => Math.max(0, prev - step));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setTextY(prev => Math.min(CHART_HEIGHT, prev + step));
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setTextX(prev => Math.max(0, prev - step));
        break;
      case 'ArrowRight':
        event.preventDefault();
        setTextX(prev => Math.min(CHART_WIDTH, prev + step));
        break;
    }
  }, [isChartFocused]);
  const chartTextInset: ChartInset = useMemo(() => ({
    top: 8,
    right: 12,
    bottom: 8,
    left: 12
  }), []);

  // Set up keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px'
  }}>
      {/* Control Panel */}
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      padding: '15px',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      maxWidth: '600px',
      // Prevent panel from growing too wide
      width: '100%'
    }}>
        <h3 style={{
        margin: '0 0 10px 0',
        fontSize: '16px'
      }}>ChartText Interactive Controls</h3>

        {/* Text Input */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <label style={{
          minWidth: '120px',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
            Text Content:
          </label>
          <input onChange={e => setTextContent(e.target.value)} placeholder="Enter text to display..." style={{
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
          width: '200px',
          // Fixed width instead of minWidth
          maxWidth: '200px',
          // Prevent expansion
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }} type="text" value={textContent} />
        </div>

        {/* Position Controls */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
            <label style={{
            fontWeight: 'bold'
          }}>X Position:</label>
            <input max={CHART_WIDTH} min="0" onChange={e => setTextX(Number(e.target.value))} style={{
            width: '80px',
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} type="number" value={textX} />
          </div>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
            <label style={{
            fontWeight: 'bold'
          }}>Y Position:</label>
            <input max={CHART_HEIGHT} min="0" onChange={e => setTextY(Number(e.target.value))} style={{
            width: '80px',
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} type="number" value={textY} />
          </div>
        </div>

        {/* Debug Toggle */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
          <label style={{
          minWidth: '120px',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
            Show Debug Overlays:
          </label>
          <Switch checked={showDebug} onChange={e => setShowDebug(e.target.checked)} />
        </div>

        {/* Hide via display:none */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
          <label style={{
          minWidth: '120px',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
            Hide Text (display:none):
          </label>
          <Switch checked={hideWithDisplayNone} onChange={e => setHideWithDisplayNone(e.target.checked)} />
        </div>

        {/* Offset Controls */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
            <label style={{
            fontWeight: 'bold'
          }}>X Offset (dx):</label>
            <input max="50" min="-50" onChange={e => setOffsetX(Number(e.target.value))} style={{
            width: '150px'
          }} type="range" value={offsetX} />
            <span style={{
            minWidth: '40px',
            textAlign: 'right'
          }}>{offsetX}</span>
          </div>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
            <label style={{
            fontWeight: 'bold'
          }}>Y Offset (dy):</label>
            <input max="50" min="-50" onChange={e => setOffsetY(Number(e.target.value))} style={{
            width: '150px'
          }} type="range" value={offsetY} />
            <span style={{
            minWidth: '40px',
            textAlign: 'right'
          }}>{offsetY}</span>
          </div>
        </div>

        {/* Alignment Controls */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
            <label style={{
            fontWeight: 'bold'
          }}>Horizontal Alignment:</label>
            <select onChange={e => setHorizontalAlignment(e.target.value as 'left' | 'center' | 'right')} style={{
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            minWidth: '100px'
          }} value={horizontalAlignment}>
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
            </select>
          </div>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
            <label style={{
            fontWeight: 'bold'
          }}>Vertical Alignment:</label>
            <select onChange={e => setVerticalAlignment(e.target.value as 'top' | 'middle' | 'bottom')} style={{
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            minWidth: '100px'
          }} value={verticalAlignment}>
              <option value="top">top</option>
              <option value="middle">middle</option>
              <option value="bottom">bottom</option>
            </select>
          </div>
        </div>

        {/* Instructions */}
        <div style={{
        fontSize: '12px',
        color: '#666',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        border: '1px solid #e0e0e0'
      }}>
          <strong>Instructions:</strong>
          <ul style={{
          margin: '5px 0 0 0',
          paddingLeft: '20px'
        }}>
            <li>Click on the chart to focus it, then use arrow keys to move the text</li>
            <li>Hold Shift + arrow keys for larger movements (10px steps)</li>
            <li>Use the sliders to test dx/dy offset behavior</li>
            <li>Modify the text content to test different string lengths</li>
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div ref={chartRef} onBlur={() => setIsChartFocused(false)} onFocus={() => setIsChartFocused(true)} style={{
      border: isChartFocused ? '2px solid #007bff' : '2px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#fff',
      outline: 'none',
      cursor: 'crosshair'
    }}>
        <LineChart points enableScrubbing={false} height={CHART_HEIGHT} series={[{
        id: 'sample-data',
        data: [10, 20, 55, 42, 31, 4],
        color: '#2ca02c'
      }]} style={{
        outline: 'none',
        cursor: 'crosshair'
      }} width={CHART_WIDTH}>
          <XAxis showGrid showLine showTickMarks />
          <YAxis showGrid showLine showTickMarks position="left" />
          <ChartText elevated borderRadius={8} color="var(--color-fgPrimary)" dx={offsetX} dy={offsetY} font="label1" horizontalAlignment={horizontalAlignment} inset={chartTextInset} onDimensionsChange={rect => setBbox(rect)} styles={{
          text: hideWithDisplayNone ? {
            display: 'none'
          } : undefined,
          backgroundRect: hideWithDisplayNone ? {
            display: 'none'
          } : undefined
        }} testID="test-text" verticalAlignment={verticalAlignment} x={textX} y={textY}>
            {textContent}
          </ChartText>
          {showDebug && <>
              {/* Crosshair to show exact position */}
              <g opacity={0.3}>
                <line stroke="#ff0000" strokeDasharray="2,2" strokeWidth={1} x1={textX} x2={textX} y1={0} y2={CHART_HEIGHT} />
                <line stroke="#ff0000" strokeDasharray="2,2" strokeWidth={1} x1={0} x2={CHART_WIDTH} y1={textY} y2={textY} />
              </g>

              {/* Position indicator dot */}
              <circle cx={textX} cy={textY} fill="#ff0000" opacity={0.7} r={3} />

              {/* Bounding box of measured text */}
              {bbox && <rect fill="none" height={bbox.height} stroke="#32cd32" strokeWidth={1} width={bbox.width} x={bbox.x} y={bbox.y} />}
            </>}
        </LineChart>
      </div>

      {/* Current Values Display */}
      <div style={{
      fontSize: '14px',
      color: '#333',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      fontFamily: 'monospace',
      maxWidth: '600px',
      // Prevent expansion
      overflow: 'hidden',
      wordBreak: 'break-all' // Break long text
    }}>
        <strong>Current Values:</strong>
        <br />
        Text: &quot;{textContent}&quot; | Position: ({textX}, {textY}) | Offset: ({offsetX},{' '}
        {offsetY})
        <br />
        Hidden (display:none): {hideWithDisplayNone ? 'true' : 'false'}
        <br />
        Bounding Box: ({bbox?.x}, {bbox?.y}, {bbox?.width}, {bbox?.height})
      </div>
    </div>;
}`,...C.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  // State for interactive controls
  const [dataPointCount, setDataPointCount] = useState(10);
  const [labelLength, setLabelLength] = useState<'numbers' | 'short' | 'medium' | 'long'>('short');
  const [showDebug, setShowDebug] = useState(true);

  // Generate random data based on count
  const chartData = useMemo(() => {
    return Array.from({
      length: dataPointCount
    }, () => Math.floor(Math.random() * 100));
  }, [dataPointCount]);

  // Generate labels based on length setting
  const generateLabel = useCallback((index: number, type: typeof labelLength): string => {
    switch (type) {
      case 'numbers':
        return index.toString();
      case 'short':
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'][index % 20];
      case 'medium':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index % 12];
      case 'long':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][index % 12];
      default:
        return index.toString();
    }
  }, []);

  // Prepare label strings; actual x-positioning will use the chart's x-scale
  const labelStrings = useMemo((): string[] => {
    if (chartData.length === 0) return [];
    return chartData.map((_, index) => generateLabel(index, labelLength));
  }, [chartData, labelLength, generateLabel]);

  // Inline helper to align labels to the chart's x-scale
  const ScaleAlignedLabels = ({
    labels
  }: {
    labels: string[];
  }) => {
    const {
      getXScale,
      height
    } = useCartesianChartContext();
    const [bboxMap, setBboxMap] = useState<Map<number, {
      x: number;
      y: number;
      width: number;
      height: number;
    }>>(new Map());
    const xScale = getXScale();
    const labelsData = useMemo((): TextLabelData[] => {
      if (!xScale) return [];
      return labels.map((label, index) => {
        const start = xScale(index) ?? 0;
        const x = isCategoricalScale(xScale) ? start + (xScale.bandwidth?.() ?? 0) / 2 : start;
        return {
          x,
          y: height - 20,
          label,
          chartTextProps: {
            textAnchor: 'middle' as const,
            dominantBaseline: 'hanging' as const,
            color: 'var(--color-fgPrimary)',
            font: 'caption' as const,
            onDimensionsChange: rect => {
              setBboxMap(prev => {
                const next = new Map(prev);
                next.set(index, rect);
                return next;
              });
            }
          }
        };
      });
    }, [labels, xScale, height]);
    return <>
        <ChartTextGroup labels={labelsData} prioritizeEndLabels={true} />
        {showDebug && <>
            {/* Debug visuals: red dots at intended label positions */}
            <g>
              {labelsData.map((d, i) => <circle key={\`label-dot-\${i}\`} cx={d.x} cy={d.y} fill="#ff0000" r={2} />)}
            </g>
            {/* Debug visuals: lime green rectangles for measured label bounding boxes */}
            <g>
              {Array.from(bboxMap.entries()).map(([i, r]) => <rect key={\`label-bbox-\${i}\`} fill="none" height={r.height} stroke="#32cd32" strokeWidth={1} width={r.width} x={r.x} y={r.y} />)}
            </g>
          </>}
      </>;
  };
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px'
  }}>
      {/* Control Panel */}
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      padding: '15px',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      maxWidth: '600px'
    }}>
        <h3 style={{
        margin: '0 0 10px 0',
        fontSize: '16px'
      }}>
          ChartTextGroup Interactive Controls
        </h3>

        {/* Data Point Count Control */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <label style={{
          minWidth: '150px',
          fontWeight: 'bold'
        }}>Number of Data Points:</label>
          <input max="50" min="1" onChange={e => setDataPointCount(Number(e.target.value))} style={{
          width: '200px'
        }} type="range" value={dataPointCount} />
          <span style={{
          minWidth: '30px',
          textAlign: 'right'
        }}>{dataPointCount}</span>
        </div>

        {/* Label Length Control */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <label style={{
          minWidth: '150px',
          fontWeight: 'bold'
        }}>Label Length:</label>
          <select onChange={e => setLabelLength(e.target.value as typeof labelLength)} style={{
          padding: '4px 8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
          minWidth: '120px'
        }} value={labelLength}>
            <option value="numbers">Numbers (0, 1, 2...)</option>
            <option value="short">Short (A, B, C...)</option>
            <option value="medium">Medium (Jan, Feb...)</option>
            <option value="long">Long (January, February...)</option>
          </select>
        </div>

        {/* Debug Toggle */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
          <label style={{
          minWidth: '150px',
          fontWeight: 'bold'
        }}>Show Debug Overlays:</label>
          <Switch checked={showDebug} onChange={e => setShowDebug(e.target.checked)} />
        </div>

        {/* Instructions */}
        <div style={{
        fontSize: '12px',
        color: '#666',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        border: '1px solid #e0e0e0'
      }}>
          <strong>Instructions:</strong>
          <ul style={{
          margin: '5px 0 0 0',
          paddingLeft: '20px'
        }}>
            <li>
              Adjust the number of data points to see how ChartTextGroup handles different densities
            </li>
            <li>Change label length to test overlap detection with varying text widths</li>
            <li>Notice how the component automatically hides overlapping labels</li>
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div style={{
      width: 'fit-content',
      border: '2px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#fff'
    }}>
        <LineChart enableScrubbing={false} height={CHART_HEIGHT} series={[{
        id: 'sample-data',
        data: chartData,
        color: '#2ca02c'
      }]} width={CHART_WIDTH}>
          {/* Axes with grid lines but no labels */}
          <XAxis position="bottom" showGrid={true} showLine={true} showTickMarks={false} tickLabelFormatter={() => ''} // Hide axis labels
        />
          <YAxis position="left" showGrid={true} showLine={true} showTickMarks={false} tickLabelFormatter={() => ''} // Hide axis labels
        />

          {/* ChartTextGroup with labels aligned to data point x positions */}
          <ScaleAlignedLabels labels={labelStrings} />
        </LineChart>
      </div>

      {/* Status Display */}
      <div style={{
      fontSize: '14px',
      color: '#333',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      fontFamily: 'monospace',
      maxWidth: '600px'
    }}>
        <strong>Current State:</strong>
        <br />
        Data Points: {dataPointCount} | Label Type: {labelLength} | Generated Labels:{' '}
        {labelStrings.length}
        <br />
        Sample Labels: [
        {labelStrings.slice(0, 5).map(d => \`"\${d}"\`).join(', ')}
        {labelStrings.length > 5 ? '...' : ''}]
      </div>
    </div>;
}`,...w.parameters?.docs?.source}}};const pe=["InteractiveChartText","InteractiveChartTextGroup"];export{C as InteractiveChartText,w as InteractiveChartTextGroup,pe as __namedExportsOrder,xe as default};
