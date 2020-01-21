import styled from 'styled-components';

export const StaffingWarp = styled.div`
  overflow: hidden;
`;

export const TreeSchedulingWarp = styled.div`
  overflow: hidden;
  width: 100%;
`;

export const SchedulingRightPanelWarp = styled.div`
  display: inline-block;
  min-width: 328px;
  min-height: 360px;
  width: 360px;
  overflow: hidden;
  border: 1px solid #DFE3E8;
  vertical-align: top;
  margin-left: 20px;
`;
export const SchedulingRightPanelUl = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 8px 10px;
`;

export const SchedulingCheckRightList = styled.div`
  overflow: hidden;
  .item-title {
    height: 30px;
    color: #999999;
    font-size: 13px;
    line-height: 30px;
  }
  .uncheck {
    margin-left: 6px;
  }
`;

export const ItemCheckRightList = styled.div`
  width: 100%;
  border: 1px solid #DFE3E8;
  color: #333333;
  overflow: hidden;
  float: left;
  margin-right: 2px;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 6px;
  font-size: 13px;
  .item-amount {
    color: #999999;
    margin-left: 8px;
  }
  .item-close {
    color: #999;
    border-left: 1px solid #DFE3E8;
    width: 38px;
    text-align: center;
    float: right;
    cursor: pointer;
  }
  .next-icon-medium:before {
    font-size: 12px !important;
  }
`;

export const SchedulingLeftPanelWarp = styled.div`
  display: inline-block;
  min-width: 328px;
  min-height: 360px;
  border: 1px solid #DFE3E8;
  vertical-align: middle;
  margin-right: 20px;
`;

export const SearchStaffingWarp = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
  width: 100%;
  display: inline-block;
  .treeTransfer-search {
    width: calc(32% - 46px);
    overflow: hidden;
    float: left;
    .next-search-lt-input {
      width: calc(100% - 42px);
    }
  }
  .next-search-lt {
    width: calc(100% - 42px)!important;
  }
  .treeTransfer-progress {
    width: calc(50% - 20px);
    overflow: hidden;
    float: left;
  }
`;
