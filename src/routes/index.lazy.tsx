import { createLazyFileRoute } from '@tanstack/react-router'
import Wrapper from '../components/Wrapper'
import Typography from '../components/Typography'
import magen from '../assets/img/magen-lg.png'
import Button from '../components/Button'
import { faqContent, categories } from '../pages/FAQContent'
import Tabs from '../components/tabs/Tabs'
import Tab from '../components/tabs/Tab'
import Accordian from '../components/Accordian'

export const Route = createLazyFileRoute('/')({
  loader: () => {
    const isSystemDark = matchMedia('(prefers-color-scheme: dark)').matches
    const localTheme = localStorage.theme
    const toggle = document.documentElement.classList.toggle.bind(
      document.documentElement.classList,
      'dark'
    )
    toggle(!localTheme ? isSystemDark : localTheme === 'dark')
  },
  component: Index,
})

function Index() {
  return (
    <>
      <Wrapper
        as='main'
        className='flex flex-col items-center gap-6 p-6 md:p-spacing my-auto'
      >
        <div className='flex flex-col gap-4 items-center'>
          <img src={magen} className='w-60 2xl:w-72' alt='מגן דוד של זהב' />
          <div className='flex flex-col items-center gap-4 w-full'>
            <Typography
              variant='heading1'
              className='font-secular text-center'
              fontWeight='normal'
            >
              !ברכים הבאים לזהב
            </Typography>
            <Typography variant='body2' className='max-w-4xl text-center'>
              Learning Hebrew? Bypass challenges by discovering answers to
              frequently asked questions that come up during the learning
              journey. <span className='text-primary'>Hebrew</span>.
            </Typography>
          </div>
        </div>
        <Button to='#faq'>Hebrew FAQ</Button>
      </Wrapper>
      <div
        id='faq'
        className='scroll-mt-16 bg-background w-full relative before:bg-accentBorderGradient before:content-empty before:h-px before:w-full before:absolute after:bg-accentBorderGradient after:content-empty after:h-px after:bottom-0 after:w-full after:absolute'
      >
        <Wrapper className='flex flex-col py-[calc(var(--spacing)*1.25)] gap-[calc(var(--spacing)*1.25)]'>
          <Typography variant='heading2' className='text-center'>
            Frequently Asked Questions
          </Typography>
          <Tabs>
            {categories.map((category) => (
              <Tab title={category}>
                <Typography fontWeight='medium'>{category}</Typography>
                {faqContent[category].map(({ question, answer }) => (
                  <Accordian header={question} content={answer} />
                ))}
              </Tab>
            ))}
          </Tabs>
        </Wrapper>
      </div>
    </>
  )
}
