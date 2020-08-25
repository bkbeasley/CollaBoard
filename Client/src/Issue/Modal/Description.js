import React, {useEffect, useMemo, useState, Component } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Container = styled.div`
    height: 100%;
    
`

const EditArea = styled.div`
    min-height: 200px;
`

const Text = styled.h3`
    font-size: 14px;
    font-weight: 700;

`
/* 
const Description = (props) => {

    const [value, setValue] = useState('');

    const setText = (val) => {
        
        setValue(value);
    }

    return (
            <Container>
            <Text>Description</Text>
            <ReactQuill ref={(el) => { this.reactQuillRef = el }} onChange={() => setText()} theme="snow" value={props.description} >
                <EditArea />
            </ReactQuill>
            </Container>
    );
    
} */

let content = '';

export default class Description extends Component {
    constructor(props) {
        super(props)
        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
    }

    componentDidMount() {
        this.attachQuillRefs()
      }
    
      componentDidUpdate() {
        this.attachQuillRefs()
      }

      attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
      }

      handleChange = (data) => {
          content = data;
          //console.log(content);
          this.props.onChangeValue(content);
      }

      render() {
        return (
          <Container>
              {/* <Text>Description</Text> */}
            <ReactQuill
              ref={(el) => { this.reactQuillRef = el }}
              defaultValue={this.props.description}
              onChange={this.handleChange}
              theme={'snow'} >
              <EditArea />
              </ReactQuill>
          </Container>
        )
      }

}

//export default Description;

/* export default class Description extends Component {

    state = {
        value: [],
    }

    setValue(value) {
        this.state.value = value;
    }

    render() {

        //Create a Slate editor object that won't change across renders 
        const editor = useMemo(() => withReact(createEditor()), []);
        
        //Keep track of state for the value of the editor
        //const [value, setValue] = useState([]);

        return (
            <div>
            <Slate editor={editor} value={this.state.value} onChange={value => this.setValue(value)} >
            <Editable />
            </Slate>
            <Container>
            <Text>Description</Text>
            </Container>
            
            </div>
        );
    }
} */

