/**
 *  撲克牌物件,供之後的Game去組合想要的物品
*/
class Card{
    /**
     * val為數字,typ為花色 1,2,3,4
     */
    constructor(val,typ){
        this.val = val,
        this.typ = typ
    }
}

class Game{
    /**
     *  建構基本資料
     */
    constructor(){
        const size = 52 ; 
        // 使用的排組
        this.folder = [];
        // getter,為了使用private size
        this.getSize = ()=>{ return size }
        
    }
 
    /**
     * 初始排組,給值 
     * @public
     * @returns this
     */
    init(){
        for(let i = 0 ; i <= this.getSize() ; i++){
            const t = i+1;
            const val = (i%13)+1;
            //先選花色,接著挑數字
            switch(Math.ceil(t/13)){
                case 1:
                    this.folder.push(new Card(val,1));
                    break;
                case 2:
                    this.folder.push(new Card(val,2));
                    break;
                case 3: 
                    this.folder.push(new Card(val,3));
                    break;
                case 4:
                    this.folder.push(new Card(val,4));
                    break;
                default :
                    break ;
            }
        }

        return this;
    }

    /**
     * getter 顯示目前的排組
     * @public
     * @returns this
     */
    get showFolder(){
        return this.folder;
    }

    /**
     * 洗牌
     * @public
     * @returns this
     */
    washCard(){
        //洗牌... 跟泡沫排序類似的手法
        for(let i = 0 ; i < this.getSize();i++){
            let j = Math.floor(Math.random()*51+1);    
            let tempNum = this.folder[i];
            this.folder[i]=this.folder[j];
            this.folder[j]=tempNum ; 
        }

        return this;
    }

    /**
     * 抽取五張牌
     * @public
     * @return {Array} 五個card物件的陣列
     */
    getFive(){
        let tempArr = [];
        for(let i =0;i<5;i++){
            tempArr.push(this.folder[i]);
        }
        return tempArr;
    }

    /**
     * 判斷桐花順?
     * @public
     * @return 是為true,否為false.
     */
    isFullHouse(card){
        let tempVal = -1;
        let tempTyp = -1;
        let result = card.sort((a,b)=>{
            //根據數字大小排序
            return a.val-b.val;
        }).filter((val,ind)=>{
            //第一張,先設好基準點
            if(ind==0){
                tempTyp = val.typ;
                tempVal = val.val;
                return true;
            }else{
                //判斷花色相同? 有沒有比基準大1 ,必須要同時符合
                if(tempTyp == val.typ && tempVal+1==val.val){
                    //若有 基準的數字++
                    tempVal++;
                    return true;
                }else if(tempTyp == val.typ && ind==1 && tempVal+9==val.val){
                    tempVal = val.val;
                    return true;
                }else{
                    return false;
                }   
            }
        })
        
        //檢視處理後的資料
        //console.log(result);

        //不符合條件的被刪除,因此只要判斷是否等於5即可
        return result.length==5 ? true : false ;
    }
}

/*
// 假資料測試
let fake = [];
fake.push(new Card(5,2));
fake.push(new Card(7,2));
fake.push(new Card(8,2));
fake.push(new Card(9,2));
fake.push(new Card(6,2));
*/

const game = new Game();
const yourCard = game.init().washCard().getFive();
console.log('你得到的排組為');
console.log(yourCard);
game.isFullHouse(yourCard) == true ? console.log('是同花順') : console.log('不是同花順');