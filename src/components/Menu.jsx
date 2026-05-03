import { useState } from 'react'
import './styles/Menu.css'

const CATEGORIES = [
  { id: 'shakes', icon: 'fa-blender', label: 'Signature Shakes' },
  { id: 'teas', icon: 'fa-mug-hot', label: 'Loaded Teas' },
  { id: 'wellness', icon: 'fa-seedling', label: 'Wellness Boosts' },
  { id: 'coffee', icon: 'fa-coffee', label: 'Protein Coffee' },
  { id: 'kids', icon: 'fa-star', label: 'Kids Menu' },
  { id: 'addons', icon: 'fa-plus-circle', label: 'Add-Ons' },
]

const ITEMS = [
  {
    cat: 'shakes', name: 'Piña Colada',
    desc: 'Pineapple, coconut, vanilla protein, aloe, coconut milk', price: '$8.50',
    bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)',
    cupId: 'g-pina', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A',
  },
  {
    cat: 'shakes', name: 'Strawberry Banana',
    desc: 'Strawberry, banana, vanilla protein, aloe, coconut milk', price: '$8.50',
    bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)',
    cupId: 'g-sb', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB',
  },
  {
    cat: 'shakes', name: 'Blue Lagoon',
    desc: 'Pineapple, blue raspberry, coconut, aloe, lemonade', price: '$8.50',
    bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)',
    cupId: 'g-bl', gradS: '#CCF5FF', gradE: '#1ABCBC', straw: '#2BBFBF', lid: '#7FD9D9',
  },
  {
    cat: 'shakes', name: 'Island Mocha',
    desc: 'Chocolate, coffee, coconut, protein, almond milk', price: '$8.50',
    bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)',
    cupId: 'g-im', gradS: '#E8D5C4', gradE: '#8B5E3C', straw: '#A0724A', lid: '#C4956A',
  },
  { cat: 'teas', name: 'Mango Tango', desc: 'Mango, green tea, aloe, lemon, energy boost', price: '$7.50', bgClass: 'bg-mango', circleBg: 'linear-gradient(135deg,#FFD088,#FF8C42)', icon: 'fa-mug-hot' },
  { cat: 'teas', name: 'Berry Bliss', desc: 'Mixed berry, black tea, aloe, lemon, energy boost', price: '$7.50', bgClass: 'bg-berry', circleBg: 'linear-gradient(135deg,#DDB8FF,#9B59B6)', icon: 'fa-mug-hot' },
  { cat: 'wellness', name: 'Green Goddess', desc: 'Spinach, cucumber, ginger, lemon, collagen, aloe', price: '$9.50', bgClass: 'bg-green', circleBg: 'linear-gradient(135deg,#90EE90,#2E8B57)', icon: 'fa-seedling' },
  { cat: 'wellness', name: 'Turmeric Glow', desc: 'Turmeric, ginger, coconut, collagen, honey, almond milk', price: '$9.50', bgClass: 'bg-turm', circleBg: 'linear-gradient(135deg,#FFE080,#FFB300)', icon: 'fa-sun' },
  { cat: 'coffee', name: 'Mocha Protein', desc: 'Cold brew, protein, chocolate, coconut milk, caramel', price: '$8.50', bgClass: 'bg-mocha', circleBg: 'linear-gradient(135deg,#D2A679,#6F4E37)', icon: 'fa-coffee' },
  { cat: 'coffee', name: 'Lavender Latte', desc: 'Espresso, lavender, vanilla protein, oat milk', price: '$8.50', bgClass: 'bg-lav', circleBg: 'linear-gradient(135deg,#DDB8FF,#7B42BC)', icon: 'fa-coffee' },
  { cat: 'kids', name: 'Sunshine Mini', desc: 'Orange, mango, banana, kids protein, coconut milk', price: '$6.00', bgClass: 'bg-kids', circleBg: 'linear-gradient(135deg,#FFD88A,#FF9800)', icon: 'fa-star' },
  { cat: 'kids', name: 'Strawberry Splash', desc: 'Strawberry, banana, kids collagen, oat milk, honey', price: '$6.00', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFAABB,#FF6B8A)', icon: 'fa-star' },
  { cat: 'addons', name: 'Collagen Boost', desc: 'Add collagen peptides to any drink for skin, hair & nail support', price: '+$2.00', bgClass: 'bg-add', circleBg: 'linear-gradient(135deg,#80DDDD,#0E9E9E)', icon: 'fa-plus' },
  { cat: 'addons', name: 'Energy Boost', desc: 'Add a clean energy boost with B vitamins and green tea extract', price: '+$1.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#7FD9D9,#0E9E9E)', icon: 'fa-bolt' },
]

function DrinkCup({ cupId, gradS, gradE, straw, lid }) {
  return (
    <svg viewBox="0 0 80 110" style={{ width: 55 }}>
      <defs>
        <linearGradient id={cupId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradS} />
          <stop offset="100%" stopColor={gradE} />
        </linearGradient>
      </defs>
      <rect x="37" y="0" width="5" height="30" rx="2.5" fill={straw} />
      <ellipse cx="40" cy="34" rx="20" ry="6" fill="white" opacity=".9" />
      <ellipse cx="40" cy="31" rx="13" ry="4.5" fill="white" />
      <ellipse cx="40" cy="41" rx="26" ry="7.5" fill={lid} />
      <path d="M14,41 L27,105 L53,105 L66,41Z" fill={`url(#${cupId})`} />
    </svg>
  )
}

function MenuCard({ name, desc, price, bgClass, circleBg, cupId, gradS, gradE, straw, lid, icon }) {
  return (
    <div className="m-card">
      <div className={`m-img ${bgClass}`}>
        <div className="d-circle" style={{ background: circleBg }}>
          {cupId
            ? <DrinkCup cupId={cupId} gradS={gradS} gradE={gradE} straw={straw} lid={lid} />
            : <i className={`fa ${icon}`} style={{ fontSize: '2.2rem', color: 'white' }} />
          }
        </div>
      </div>
      <div className="m-body">
        <h3>{name}</h3>
        <p className="desc">{desc}</p>
        <span className="price">{price}</span>
      </div>
    </div>
  )
}

const CUSTOMIZE_STEPS = [
  { icon: 'fa-list', label: ['Choose Your', 'Flavor'] },
  { icon: 'fa-bolt', label: ['Pick Your', 'Boost'] },
  { icon: 'fa-droplet', label: ['Choose Your', 'Milk'] },
  { icon: 'fa-star', label: ['Make It', 'Yours'] },
]

export default function Menu() {
  const [activeCat, setActiveCat] = useState('shakes')
  const visible = ITEMS.filter(item => item.cat === activeCat)

  return (
    <section id="menu">
      <div className="container">
        <div className="menu-hdr">
          <p className="section-label">Our Menu</p>
          <h2 className="menu-h2">
            Tropical Flavors.<br />
            <span className="script">Powerful Benefits.</span>
          </h2>
        </div>

        <div className="menu-layout">
          {/* Sidebar */}
          <div className="menu-sidebar">
            {CATEGORIES.map(({ id, icon, label }) => (
              <button
                key={id}
                className={`m-cat${activeCat === id ? ' active' : ''}`}
                onClick={() => setActiveCat(id)}
              >
                <i className={`fa ${icon}`} /> {label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="menu-grid" key={activeCat}>
            {visible.map(item => <MenuCard key={item.name} {...item} />)}
          </div>
        </div>

        {/* Customize bar */}
        <div className="cust-bar">
          <div className="cust-intro">
            <div className="cust-ic"><i className="fa fa-blender" /></div>
            <div>
              <div className="cust-title">Customize Yours!</div>
              <div className="cust-sub">Choose your flavor, boost, and milk to create your perfect blend.</div>
            </div>
          </div>
          <div className="cust-steps">
            {CUSTOMIZE_STEPS.map(({ icon, label }) => (
              <div className="cust-step" key={label[0]}>
                <i className={`fa ${icon}`} />
                <span>{label[0]}<br />{label[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
