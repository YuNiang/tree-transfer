
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Icon, Tree, util, Search } from '@alifd/next';
import { isEqual, cloneDeep } from 'lodash';
import { TreeSchedulingWarp, SchedulingRightPanelWarp, SchedulingRightPanelUl,
	SchedulingCheckRightList, ItemCheckRightList, SchedulingLeftPanelWarp, SearchStaffingWarp, StaffingWarp } from './styled';
import '../index.scss';

const TreeNode = Tree.Node;
const { obj } = util;

class TreeSchedulingPersonnelSelect extends Component {
	static propTypes = {
		/**
		 * 数据源
		 */
		dataSource: propTypes.array,
		/**
		 * （用于非受控）初始值
		 */
		onChange: propTypes.func,
		onSearch: propTypes.func,
		/*
			* 是否禁用
			*/
		disabled: propTypes.bool,
		/*
			* 是否展开父节点
			*/
		autoExpandParent: propTypes.bool,
		/**
			* （用于受控）当前值
			*/
		value: propTypes.array,
		/**
		 * 搜索框占位符
		 */
		searchPlaceholder: propTypes.string,
		/**
		 * 列表为空显示内容
		 */
		notFoundContent: propTypes.node,
		/**
		 * 左右面板列表自定义样式对象
		 */
		listStyle: propTypes.object,
		/**
		 * 额外需要展示的内容
		 */
		extra: propTypes.node,
	};

  static defaultProps = {
		dataSource: [
			{
				disabled: true,
				label: '服装',
				value: 'id0',
				children: [{
					label: '男装',
					value: 'id01',
					disableCheckbox: true
				}, {
            label: '裙子',
						value: 'id02',
						disableCheckbox: true
        }, {
            label: '外套',
						value: 'id03',
						disableCheckbox: true
        }, {
            label: '背心',
						value: 'id04',
						disableCheckbox: true
        }, {
            label: '上衣上衣',
						value: 'id05',
						disableCheckbox: true
        }, {
            label: '短裤短裤',
						value: 'id06',
						disableCheckbox: true
        }, {
            label: '靴子靴子',
						value: 'id07',
						disableCheckbox: false
				}, {
					value: '22889',
					label: 'zzh0555',
				}]
			}
		],
		extra: null,
		disabled: false,
		autoExpandParent: true,
		onChange: () => { },
		onSearch: () => { },
		notFoundContent: '暂无匹配数据',
	};

	constructor(props) {
		super(props);
		this.state = {
      value: props.value || [],
			rightData: this.handleRightData(props.value, props.dataSource),
			hideKeys: []
		};
	}

	componentWillReceiveProps = (nextProps) => {
		const { dataSource, value } = nextProps;
		if (
			!isEqual(dataSource, this.props.dataSource)
			|| !isEqual(value, this.props.value)
		) {
			this.setState({
				value,
				rightData: this.handleRightData(value, dataSource)
			});
		}
	}

	handleCheck = (checkedKeys, extra) => {
    this.setState({
			value: checkedKeys,
			rightData: this.handleRightData(checkedKeys)
    });

    this.props.onChange(checkedKeys, extra);
  }

  handleRightData = (checkedKeys, dataSource) => {
		const data = dataSource || this.props.dataSource;
    const rightData = [];

    if (checkedKeys && checkedKeys.length) {
			data.forEach((item) => {
        const isCheck = item.children.some(child => checkedKeys.includes(child.value));
        if (isCheck) {
          const checkedData = cloneDeep(item);
          checkedData.allCount = item.children.length;
          checkedData.children = item.children.filter(child => checkedKeys.includes(child.value));
          rightData.push(checkedData);
        }
			});
    }

		return rightData;
  }

	handleDeleItem (curId) {
    const { value } = this.state;

    const newValue = value.filter(item => item !== curId);

    this.setState({
			value: newValue,
			rightData: this.handleRightData(newValue)
		});
		this.props.onChange(newValue);
	}

	renderList () {
		const { hideKeys, value } = this.state;
		const { notFoundContent, listStyle, dataSource } = this.props;
		const data = dataSource.filter(item => !hideKeys.includes(item.value));

    if (!(data && data.length)) {
      return (
        <div className="no-empty-right" style={listStyle}>
          {notFoundContent}
        </div>
      );
    }

		return (
			<Tree
				style={listStyle}
        checkedKeys={value}
				defaultExpandAll
				className="transfer-panel-list tree-panel-list"
				checkable
				editable
				autoExpandParent
				onCheck={this.handleCheck}
				enableCheckedCache={false}
      >
				{this.treeLoop(dataSource)}
			</Tree>
		);
	}

	treeLoop (data) {
		const { hideKeys } = this.state;
		const tmp = [];
		data.forEach((item) => {
			if (item.children) {
        tmp.push(
					<TreeNode
						className={hideKeys.includes(item.value) ? 'hide' : ''}
						key={item.value}
						label={item.label}
						disabled={item.disabled}
					>
						{this.treeLoop(item.children)}
					</TreeNode>
				);
      } else {
        tmp.push(
					<TreeNode
						className={hideKeys.includes(item.value) ? 'hide' : ''}
						key={item.value}
						disableCheckbox={item.disableCheckbox}
						label={item.label}
					/>
				);
      }
		});
		return tmp;
	}

	treeSchedulingLeftPanelRender () {
		const { listStyle } = this.props;
		return (
			<SchedulingLeftPanelWarp style={listStyle}>
				{ this.renderList() }
			</SchedulingLeftPanelWarp>
		);
	}

	handleSearch = (obj) => {
    const { dataSource } = this.props;
    const searchKey = obj.key;

    this.props.onSearch(searchKey);

    if (!obj.key) {
      this.setState({
        hideKeys: []
      });
      return;
    }

		let hideKeys = [];
    (dataSource || []).forEach(item => {
      if (!JSON.stringify(item.label).includes(searchKey)) {
				const isContains = item.children.some(child => JSON.stringify(child.label).includes(searchKey));
				if (!isContains) {
					hideKeys.push(item.value);
				}
				const childKeys = item.children
						.filter(child => !JSON.stringify(child.label).includes(searchKey))
						.map(item => item.value);

				hideKeys = hideKeys.concat(childKeys);
      }
    });

    this.setState({
      hideKeys
    });
	}

	treeSchedulingRightPanelRender () {
		const { listStyle } = this.props;
    const { rightData } = this.state;

		return (
			<SchedulingRightPanelWarp style={listStyle}>
				<SchedulingRightPanelUl>
				{
					rightData.length ? rightData.map((item) => (
            <SchedulingCheckRightList className="check-right-list-warp" key={item.value}>
              <div className="item-title">{item.label}
                <span className="uncheck">
                  (已选{item.children.length}条，总共{item.allCount}条)
                </span>
              </div>
                {
                  item.children.map(child => (
                    <ItemCheckRightList className="item-check-right-li" key={child.value}>{child.label}
                      <Icon type="close" className="item-close" onClick={this.handleDeleItem.bind(this, child.value)} />
                    </ItemCheckRightList>
                  ))
              }
            </SchedulingCheckRightList>
          )) : <div className="no-empty-right">暂无选择数据</div>
				}
				</SchedulingRightPanelUl>
			</SchedulingRightPanelWarp>
		);
	}

	render() {
		const { listStyle, extra, ...others } = this.props;

		return (
			<StaffingWarp {...obj.pickOthers(TreeSchedulingPersonnelSelect.propTypes, others)}>
				<SearchStaffingWarp style={listStyle} className="staffing-search-warp">
					<Search className="treeTransfer-search" onSearch={this.handleSearch} />
					<div className="treeTransfer-progress">{ extra }</div>
				</SearchStaffingWarp>
					<TreeSchedulingWarp>
						{this.treeSchedulingLeftPanelRender()}
						{this.treeSchedulingRightPanelRender()}
				</TreeSchedulingWarp>
			</StaffingWarp>
		);
	}
}

export default TreeSchedulingPersonnelSelect;
