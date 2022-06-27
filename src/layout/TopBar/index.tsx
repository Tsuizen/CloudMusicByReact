import { Left, Right, RunLeft, Search } from '@icon-park/react';
import { useDebounceFn } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '~/redux/store';
import { getDefaultSearchKeywords } from '~/services/api/search';
import ActionMenu from './components/ActionMenu';
import styles from './index.module.css';

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = (props) => {
  const [searchSuggest, setSearchSuggest] = useState<string>(''); // 搜索建议
  const [inputValue, setInputValue] = useState<string>(''); // 输入值
  const navigate = useNavigate();

  const selectState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getDefaultSearchKeywords().then((res: any) => {
      setSearchSuggest(res.data.showKeyword);
    });
  }, []);

  // 防抖函数处理搜索栏建议
  const { run } = useDebounceFn(
    () => {
      dispatch({ type: 'setSearchWords', playload: inputValue });
    },
    {
      wait: 500
    }
  );

  const handleChangeSearch = (e: any) => {
    setInputValue(e.target.value);
    run();
  };

  return (
    <div className={`${styles.topBar}`}>
      {/* 图标 */}
      <h1 className={styles.log}>
        <a href='/' className='w-44 h-9'></a>
      </h1>
      {/* 导航和搜索框 */}
      <div className='flex ml-10'>
        {/* 导航按钮 */}
        <div className='flex justify-center items-center'>
          <div onClick={() => navigate(-1)}>
            <Left
              theme='outline'
              className={styles.navBtn}
              size='20'
              fill='#fff'
            />
          </div>
          <div
            onClick={() => {
              navigate(1);
            }}>
            <Right
              theme='outline'
              className={styles.navBtn}
              size='20'
              fill='#fff'
            />
          </div>
        </div>
        <div className={styles.searchBox}>
          <input
            type='text'
            onChange={(e: any) => {
              handleChangeSearch(e);
            }}
            value={inputValue}
            placeholder={searchSuggest}
            autoComplete='off'
            id='search-input'
            onFocus={() => {
              dispatch({ type: 'setShowSeatchWindow', payload: true });
            }}
          />
          <Search
            theme='outline'
            className='absolute ml-2'
            size='20'
            fill='#EED0CF'
          />
        </div>
      </div>
      <ActionMenu />
    </div>
  );
};

export default TopBar;
