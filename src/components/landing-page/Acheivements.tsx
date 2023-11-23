import React from "react";
import DisplayDots from "../ui/DisplayDots";

const Acheivements = ({ products }: { products: Array<any> }) => {
  return (
    <div className="  min-w-full min-h-fit flex flex-col items-center justify-center ">
      <div className="min-w-full flex flex-col md:flex-row items-center justify-between min-h-fit">
        <div className="min-w-full md:min-w-[47%] md:max-w-[47%] flex flex-col items-start justify-start gap-2">
          <h3 className="text-[1.3rem] font-bold">
            اولین روزهای Game-Hub: از شروع تا موفقیت
          </h3>
          <p className="text-[.9rem] font-light">
            ر اوایل روزهای Game-Hub، هدف ما بود تا یک مرجع کامل برای همه چیز
            بازی، کامپیوتر، لپ‌تاپ، لوازم جانبی تکنولوژی و فیلم‌ها ایجاد کنیم.
            با علاقه‌مندی به ارائه آخرین و برترین فناوری سرگرمی، ما در یک سفر به
            منظور اتحاد گیمرها و علاقه‌مندان به تکنولوژی زیر یک سقف مجازی قدم
            گذاشتیم. در مراحل ابتدایی، Game-Hub با چالش‌های بسیاری روبرو شد، از
            ساخت یک پلتفرم آنلاین قوی تا برقراری همکاری با توسعه‌دهندگان معروف
            بازی و تولیدکنندگان تکنولوژی. با این حال، تعهد بی‌وقفه ما به رضایت
            مشتری و تعهد به ارائه مجموعه‌ای گسترده از محصولات با کیفیت بالا، ما
            را به جلو پیش برد. با تلاش‌های بازاریابی استراتژیک و توصیه‌های دهان
            به دهان، Game-Hub به سرعت در بازار مورد توجه قرار گرفت. طراحی وبسایت
            کاربرپسند، قیمت‌گذاری رقابتی و خدمات مشتری استثنایی به طور قابل
            توجهی در موفقیت اولیه ما موثر بود. با گسترش موجودی کالا برای شامل
            کردن مجموعه‌ای گسترده از بازی‌ها، کامپیوترها، لپ‌تاپ‌ها، لوازم جانبی
            تکنولوژی و فیلم‌ها، پایگاه مشتریان ما به طور نماینده افزایش یافت.
          </p>
        </div>
        <DisplayDots
          size="lg"
          height={400}
          width={400}
          suffix="محصول برای شما"
          mainText={products.length + " +"}
        />
      </div>
      <div className="min-w-full flex flex-col-reverse md:flex-row items-center justify-between min-h-fit">
        <DisplayDots
          size="lg"
          height={400}
          width={400}
          suffix="کاربر رضایت مند"
          mainText={products.length + " +"}
        />
        <div className="min-w-full md:min-w-[47%] md:max-w-[47%] flex flex-col items-start justify-start gap-2">
          <h3 className="text-[1.3rem] font-bold">
            Game-Hub امروز: رشد در عصر دیجیتال
          </h3>
          <p className="text-[.9rem] font-light">
            در طول زمان تا به امروز، Game-Hub به عنوان یک مقصد برجسته برای
            علاقه‌مندان به بازی و افراد علاقه‌مند به تکنولوژی پیشرفت کرده است.
            در دورانی که فناوری با سرعتی شگرف تکامل می‌کند، ما با چالش‌های ایجاد
            شده توسط عصر دیجیتال سازگار شده و آن را پذیرفته‌ایم. با تمرکز
            بی‌وقفه بر نوآوری، Game-Hub محصولات خود را گسترش داده است تا به
            نیازهای متنوع مشتریانمان پاسخ دهد. ما مجموعه محصولات خود را تنوع
            بخشیده‌ایم تا علاوه بر بازی‌ها، کامپیوترها، لپ‌تاپ‌ها و لوازم جانبی
            تکنولوژی، مجموعه‌ای گسترده از فیلم‌ها را نیز شامل شود و نیازهای
            سرگرمی یک جمعیت گسترده را برآورده کند. برای پاسخ به تقاضای روزافزون
            برای راحتی، Game-Hub تجربه خرید آنلاین خود را بهبود بخشیده است.
            وبسایت ما اکنون شامل راهبری بینایی، توصیه‌های شخصی و فرآیندهای خرید
            ساده و بی‌دردسر است که به هر بازدیدکننده‌ای سفری بی‌دردسر را تضمین
            می‌کند. علاوه بر این، Game-Hub به ظهور پلتفرم‌های توزیع دیجیتال و
            سرویس‌های استریمینگ پاسخ داده است. ما با ارائه خدمات توزیع دیجیتال
            بازی و فیلم از ارائه‌دهندگان برجسته، مشتریان را قادر می‌سازیم تا به
            طور فوری به محتوای مورد علاقه خود دسترسی پیدا کنند و از آن لذت
            ببرند. امروزه، Game-Hub با افتخار به عنوان یک نام قابل اعتماد در
            صنعت بازی و تکنولوژی شناخته می‌شود. تعهد ما به رضایت مشتری همچنان
            بی‌وقفه است و ما همچنان مرزها را برای ارائه تجربه خرید بی‌نظیری فشار
            می‌دهیم. با تیمی متخصص و تعهد به کاوش در فناوری‌ها و روندهای نوظهور،
            ما اطمینان حاصل می‌کنیم که Game-Hub در جبهه‌ی منظره بازی و تکنولوژی
            در حال تغییر قرار دارد.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Acheivements;