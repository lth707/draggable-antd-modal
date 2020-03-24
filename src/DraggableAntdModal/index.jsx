/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';
import containsNode from '../common/containsNode';
import classnames from '../common/classnames';
import styles from './index.less';

const cx = classnames(styles, 'draggable-antd-modal');
class Modal extends Component {
  constructor() {
    super();
    this.randomId = `${parseInt(Math.random() * 1000000, 10)}`;
    this.initData();
  }
  
  initData = () => {
    this.beginDrag = false;
    this.modalWrapper = null;
    this.modalContent = null;
    this.points = [0, 0];
  };

  handleMouseDown = e => {
    const { visible, draggable } = this.props;
    if (!visible || !draggable) {
      return;
    }
    const modalWrapper = document.querySelector(`.${cx(this.randomId)}`);
    if (!modalWrapper) return;
    const modalContent = modalWrapper.querySelector('.ant-modal-content');
    const modalTitle = modalWrapper.querySelector('.ant-modal-header');
    if (modalContent && modalWrapper && containsNode(modalTitle, e.target)) {
      this.beginDrag = true;
      this.modalWrapper = modalWrapper;
      this.modalContent = modalContent;
      this.points = [e.clientX, e.clientY];
    }
  };

  handleMouseUp = () => {
    this.initData();
  };

  handleMouseMove = e => {
    if (!this.beginDrag || !this.modalWrapper || !this.modalContent) return;
    const { clientX, clientY } = e;
    const diffX = clientX - this.points[0];
    const diffY = clientY - this.points[1];
    this.points = [e.clientX, e.clientY];
    const { style } = this.modalContent;
    style.left = `${(parseFloat(style.left) || 0) + diffX}px`;
    style.top = `${(parseFloat(style.top) || 0) + diffY}px`;
  };

  bindEvent = () => {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  };

  componentDidMount() {
    this.bindEvent();
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible && !visible) {
      this.beginDrag = false;
    }
  }

  render() {
    const { children, wrapClassName, visible, draggable, ...restProps } = this.props;
    return (
      <AntdModal
        {...restProps}
        visible={visible}
        wrapClassName={cx({ container: draggable }, this.randomId, `:${wrapClassName || ''}`)}
      >
        {children}
      </AntdModal>
    );
  }
}

Modal.info = AntdModal.info;
Modal.success = AntdModal.success;
Modal.error = AntdModal.error;
Modal.warning = AntdModal.warning;
Modal.confirm = AntdModal.confirm;

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  wrapClassName: PropTypes.string,
  draggable: PropTypes.bool,
  visible: PropTypes.bool,
};

export default Modal;
