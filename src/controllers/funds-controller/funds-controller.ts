import { stocks, currentStocks } from '@portfolio-overlap/repositories/funds-repository';

function handleCurrentPortfolio(...args: string[]) {
  if (args.length === 0) {return;}
  const stock_names = stocks.funds.map((stock) => stock.name);
  const stock_names_set = new Set(stock_names);
  for (const i of args) {
    if (!stock_names_set.has(i)) {
      console.log(`${i} FUND_NOT_FOUND`);
      continue;
    }
    if (currentStocks.includes(i)) {
      console.log(`${i} FUND_ALREADY_EXISTS`);
      continue;
    }
    currentStocks.push(i);
    console.log('ADDED_STOCK_NAME', i);
  }
}

function calculateOverlap(stock_name: string) {
  const check_stocks_list: string[] = [];
  stocks.funds.map((stock) => {
    if (stock.name === stock_name) {
      check_stocks_list.push(...stock.stocks);
    }
  });
  if (check_stocks_list.length === 0) {
    console.log('FUND_NOT_FOUND');
    return;
  }
  for (const i of currentStocks) {
    const current_stocks_list: string[] = [];
    stocks.funds.map((stock) => {
      if (stock.name === i) {
        current_stocks_list.push(...stock.stocks);
      }
    });
    const current_stocks_set = new Set(current_stocks_list);
    const commonElements = check_stocks_list.filter((element) =>
      current_stocks_set.has(element)
    );

    const overlap_percentage =
      ((commonElements.length * 2) /
        (check_stocks_list.length + current_stocks_list.length)) *
      100;
    console.log(`${stock_name} ${i} ${overlap_percentage.toFixed(2)}%`);
  }
}

function handleAddStock(...stock_names: string[]) {
  handleCurrentPortfolio(...stock_names);
}

export { handleCurrentPortfolio, calculateOverlap, handleAddStock };
