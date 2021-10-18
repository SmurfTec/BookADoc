import React from 'react';

export default function Input(props) {
  const initialValue = props.value;

  const onValueChange = e => {
    const $this = e.target;
    if ($this.value.match(new RegExp(props.filter))) {
      $this.oldValue = $this.value;
      $this.oldSelectionStart = $this.selectionStart;
      $this.oldSelectionEnd = $this.selectionEnd;
    } else if ($this.hasOwnProperty('oldValue')) {
      $this.value = $this.oldValue;
      $this.setSelectionRange($this.oldSelectionStart, $this.oldSelectionEnd);
    } else {
      $this.value = '';
    }
  };

  const onChange = e => {
    if(props.onChange) {
      const value = parseFloat(e.target.value);
      props.onChange(value || '');
    }
  };

  return (
    <input
      value={initialValue}
      className={props.className}
      onChange={onChange}
      onInput={onValueChange}
      onKeyDown={onValueChange}
      onKeyUp={onValueChange}
      onMouseDown={onValueChange}
      onMouseUp={onValueChange}
      onSelect={onValueChange}
      onContextMenu={onValueChange}
      onDrop={onValueChange}
    />
  );
}
