import { useState } from 'react'
import './styles/Menu.css'

const CATEGORIES = [
  { id: 'all-shakes', icon: 'fa-list', label: 'All Shakes' },
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

  // Cookie Monsters
  { cat: 'all-shakes', name: 'Cookie Monsters Snickerdoodle', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-cookie1', gradS: '#F5E8D3', gradE: '#E8D5B8', straw: '#D4C4A8', lid: '#E8D5B8' },
  { cat: 'all-shakes', name: 'Cookie Monsters Vanilla Waffer', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-wafer1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Cookie Monsters Fluffernutter', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-fluff1', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB' },
  { cat: 'all-shakes', name: 'Cookie Monsters PB Marshmellow', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-pb1', gradS: '#CCF5FF', gradE: '#1ABCBC', straw: '#2BBFBF', lid: '#7FD9D9' },
  { cat: 'all-shakes', name: 'Cookie Monsters No Bake Cookie', desc: '', price: '$8.50', bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)', cupId: 'g-nobake1', gradS: '#E8D5C4', gradE: '#8B5E3C', straw: '#A0724A', lid: '#C4956A' },
  { cat: 'all-shakes', name: "Cookie Monsters S'mores", desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-smores1', gradS: '#D2B4A8', gradE: '#B89D8C', straw: '#A88D70', lid: '#C4A593' },
  { cat: 'all-shakes', name: 'Cookie Monsters Oatmeal Raisin Cookie', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-oat1', gradS: '#FFE4E1', gradE: '#F8C8CC', straw: '#F2B8C0', lid: '#FFB3C1' },
  { cat: 'all-shakes', name: 'Cookie Monsters Samoa Cookie', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-samoa1', gradS: '#F5E8D3', gradE: '#E8D5B8', straw: '#D4C4A8', lid: '#E8D5B8' },
  { cat: 'all-shakes', name: 'Cookie Monsters Thin Mint', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-thinmint1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Cookie Monsters Tagalong', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-tag1', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB' },
  { cat: 'all-shakes', name: 'Cookie Monsters Frosted Animal Cookie', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-frost1', gradS: '#CCF5FF', gradE: '#1ABCBC', straw: '#2BBFBF', lid: '#7FD9D9' },
  { cat: 'all-shakes', name: 'Cookie Monsters Oreo', desc: '', price: '$8.50', bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)', cupId: 'g-oreo1', gradS: '#E8D5C4', gradE: '#8B5E3C', straw: '#A0724A', lid: '#C4956A' },

  // Cake & Bake
  { cat: 'all-shakes', name: 'Cake Lemon Chiffon', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-lemon1', gradS: '#FFF8E1', gradE: '#F0E68C', straw: '#E6D870', lid: '#F5F0B0' },
  { cat: 'all-shakes', name: "Mama's Chocolate Cake Batter", desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-choc1', gradS: '#D2B4A8', gradE: '#B89D8C', straw: '#A88D70', lid: '#C4A593' },
  { cat: 'all-shakes', name: 'Cake Birthday Cake', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-bday1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Cake Funfetti', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-fun1', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB' },
  { cat: 'all-shakes', name: 'Cake German Chocolate Cake', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-german1', gradS: '#E8D5C4', gradE: '#8B5E3C', straw: '#A0724A', lid: '#C4956A' },
  { cat: 'all-shakes', name: 'Cake Blueberry Muffin', desc: '', price: '$8.50', bgClass: 'bg-berry', circleBg: 'linear-gradient(135deg,#DDB8FF,#9B59B6)', cupId: 'g-blue1', gradS: '#CCF5FF', gradE: '#1ABCBC', straw: '#2BBFBF', lid: '#7FD9D9' },
  { cat: 'all-shakes', name: 'Cake Raspberry Cobbler', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-rasp1', gradS: '#FFE4E1', gradE: '#F8C8CC', straw: '#F2B8C0', lid: '#FFB3C1' },

  // Candy Bar Aisle
  { cat: 'all-shakes', name: 'Candy Maple Nut Goodies', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-maple1', gradS: '#F5E8D3', gradE: '#E8D5B8', straw: '#D4C4A8', lid: '#E8D5B8' },
  { cat: 'all-shakes', name: 'Candy Salted Caramel', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-caram1', gradS: '#D2B4A8', gradE: '#B89D8C', straw: '#A88D70', lid: '#C4A593' },
  { cat: 'all-shakes', name: 'Candy Pink Starburst', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-pink1', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB' },
  { cat: 'all-shakes', name: 'Candy Snickers', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-snick1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Candy Mounds', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-mounds1', gradS: '#CCF5FF', gradE: '#1ABCBC', straw: '#2BBFBF', lid: '#7FD9D9' },
  { cat: 'all-shakes', name: 'Candy 5th Avenue', desc: '', price: '$8.50', bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)', cupId: 'g-5th1', gradS: '#E8D5C4', gradE: '#8B5E3C', straw: '#A0724A', lid: '#C4956A' },
  { cat: 'all-shakes', name: 'Candy Buckeye', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-buck1', gradS: '#D2B4A8', gradE: '#B89D8C', straw: '#A88D70', lid: '#C4A593' },
  { cat: 'all-shakes', name: 'Candy Peanut Butter Cup', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-pbcup1', gradS: '#FFE4E1', gradE: '#F8C8CC', straw: '#F2B8C0', lid: '#FFB3C1' },
  { cat: 'all-shakes', name: 'Candy Rice Krispy Treat', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-krisp1', gradS: '#F5E8D3', gradE: '#E8D5B8', straw: '#D4C4A8', lid: '#E8D5B8' },
  { cat: 'all-shakes', name: 'Candy Butter Brickle', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-brick1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Candy Peanut Butter Goodness', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-pbg1', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB' },
  { cat: 'all-shakes', name: 'Candy Peanut Butter Pie', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-pbp1', gradS: '#CCF5FF', gradE: '#1ABCBC', straw: '#2BBFBF', lid: '#7FD9D9' },
  { cat: 'all-shakes', name: 'Candy Peanut Butter Brittle', desc: '', price: '$8.50', bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)', cupId: 'g-brit1', gradS: '#E8D5C4', gradE: '#8B5E3C', straw: '#A0724A', lid: '#C4956A' },
  { cat: 'all-shakes', name: 'Candy PB&J', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-pbj1', gradS: '#FFE4E1', gradE: '#F8C8CC', straw: '#F2B8C0', lid: '#FFB3C1' },
  { cat: 'all-shakes', name: 'Candy Peanut Butter Oreo', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-pboreo1', gradS: '#D2B4A8', gradE: '#B89D8C', straw: '#A88D70', lid: '#C4A593' },

  // Chocoholics
  { cat: 'all-shakes', name: 'Chocoholics Death by Chocolate', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-death1', gradS: '#8B4513', gradE: '#4A2C1E', straw: '#6B3A24', lid: '#A0522D' },
  { cat: 'all-shakes', name: 'Chocoholics Chocolate Salted Caramel', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-chocsalt1', gradS: '#D2B4A8', gradE: '#B89D8C', straw: '#A88D70', lid: '#C4A593' },
  { cat: 'all-shakes', name: 'Chocoholics Brownie Batter', desc: '', price: '$8.50', bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)', cupId: 'g-brown1', gradS: '#8B4513', gradE: '#4A2C1E', straw: '#6B3A24', lid: '#A0522D' },
  { cat: 'all-shakes', name: 'Chocoholics Chocolate Covered Cherry', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-cherry1', gradS: '#8B0000', gradE: '#DC143C', straw: '#B22222', lid: '#CD5C5C' },
  { cat: 'all-shakes', name: 'Chocoholics White Chocolate Strawberry', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-white1', gradS: '#FFF8DC', gradE: '#F0E68C', straw: '#E6D870', lid: '#F5F0B0' },
  { cat: 'all-shakes', name: 'Chocoholics Chocolate Covered Banana', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-ban1', gradS: '#D2B4A8', gradE: '#B89D8C', straw: '#A88D70', lid: '#C4A593' },
  { cat: 'all-shakes', name: 'Chocoholics Marshmallow Brownie', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-marsh1', gradS: '#8B4513', gradE: '#4A2C1E', straw: '#6B3A24', lid: '#A0522D' },
  { cat: 'all-shakes', name: 'Chocoholics Fudgesicle', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-fudge1', gradS: '#4A2C1E', gradE: '#2F1B14', straw: '#5D4037', lid: '#8B4513' },

  // Cheesecake Lovers
  { cat: 'all-shakes', name: 'Cheesecake Lemon Cheesecake', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-lemonc1', gradS: '#FFF8E1', gradE: '#F0E68C', straw: '#E6D870', lid: '#F5F0B0' },
  { cat: 'all-shakes', name: 'Cheesecake Blueberry Cheesecake', desc: '', price: '$8.50', bgClass: 'bg-berry', circleBg: 'linear-gradient(135deg,#DDB8FF,#9B59B6)', cupId: 'g-bluec1', gradS: '#CCF5FF', gradE: '#1ABCBC', straw: '#2BBFBF', lid: '#7FD9D9' },
  { cat: 'all-shakes', name: 'Cheesecake Strawberry Cheesecake', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-strawc1', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB' },
  { cat: 'all-shakes', name: 'Cheesecake Reese Cheesecake', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-reese1', gradS: '#D2B4A8', gradE: '#B89D8C', straw: '#A88D70', lid: '#C4A593' },
  { cat: 'all-shakes', name: 'Cheesecake Turtle Cheesecake', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-turtle1', gradS: '#8B4513', gradE: '#4A2C1E', straw: '#6B3A24', lid: '#A0522D' },
  { cat: 'all-shakes', name: 'Cheesecake Cherry Oreo Cheesecake', desc: '', price: '$8.50', bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)', cupId: 'g-cherryo1', gradS: '#8B0000', gradE: '#DC143C', straw: '#B22222', lid: '#CD5C5C' },
  { cat: 'all-shakes', name: 'Cheesecake Oreo Cheesecake', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-oreoc1', gradS: '#E8D5C4', gradE: '#8B5E3C', straw: '#A0724A', lid: '#C4956A' },

  // Making Me Bananas
  { cat: 'all-shakes', name: 'Bananas Elvis', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-elvis1', gradS: '#FFD700', gradE: '#FFA500', straw: '#FF8C00', lid: '#FFB347' },
  { cat: 'all-shakes', name: 'Bananas Banana Nut Bread', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-nut1', gradS: '#F5DEB3', gradE: '#DAA520', straw: '#B8860B', lid: '#F4D03F' },
  { cat: 'all-shakes', name: 'Bananas Banana French Bread', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-french1', gradS: '#F5DEB3', gradE: '#DAA520', straw: '#B8860B', lid: '#F4D03F' },
  { cat: 'all-shakes', name: 'Bananas Banana Cream Pie', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-cream1', gradS: '#FFF8DC', gradE: '#F0E68C', straw: '#E6D870', lid: '#F5F0B0' },
  { cat: 'all-shakes', name: 'Bananas Chunky Monkey', desc: '', price: '$8.50', bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)', cupId: 'g-chunk1', gradS: '#F5DEB3', gradE: '#DAA520', straw: '#B8860B', lid: '#F4D03F' },

  // Mint To Be
  { cat: 'all-shakes', name: 'Mint Shamrock', desc: '', price: '$8.50', bgClass: 'bg-green', circleBg: 'linear-gradient(135deg,#90EE90,#2E8B57)', cupId: 'g-sham1', gradS: '#90EE90', gradE: '#2E8B57', straw: '#228B22', lid: '#90EE90' },
  { cat: 'all-shakes', name: 'Mint Thin Mint', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-mint1', gradS: '#E0F8F0', gradE: '#98E8C6', straw: '#20B2AA', lid: '#AFEEEE' },
  { cat: 'all-shakes', name: 'Mint Mint Oreo', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-mintoreo1', gradS: '#E0F8F0', gradE: '#98E8C6', straw: '#20B2AA', lid: '#AFEEEE' },

  // Ice Cream You Scream
  { cat: 'all-shakes', name: 'Ice Cream Cookie Dough', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-dough1', gradS: '#F5E8D3', gradE: '#E8D5B8', straw: '#D4C4A8', lid: '#E8D5B8' },
  { cat: 'all-shakes', name: 'Ice Cream Butter Pecan', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-pecan1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Ice Cream Blue Moon', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-bluem1', gradS: '#CCF5FF', gradE: '#1ABCBC', straw: '#2BBFBF', lid: '#7FD9D9' },
  { cat: 'all-shakes', name: 'Ice Cream Banana Split', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-split1', gradS: '#F5DEB3', gradE: '#DAA520', straw: '#B8860B', lid: '#F4D03F' },
  { cat: 'all-shakes', name: 'Ice Cream Orange Dreamsicle', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-dream1', gradS: '#FFDAB9', gradE: '#FF8C69', straw: '#FF7F50', lid: '#FFA07A' },

  // Breakfast Club
  { cat: 'all-shakes', name: 'Breakfast French Toast', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-toast1', gradS: '#F5E8D3', gradE: '#E8D5B8', straw: '#D4C4A8', lid: '#E8D5B8' },
  { cat: 'all-shakes', name: 'Breakfast Captain Crunchberry', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-crunch1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Breakfast Fruity Pebbles', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-peb1', gradS: '#FFE4E1', gradE: '#F8C8CC', straw: '#F2B8C0', lid: '#FFB3C1' },
  { cat: 'all-shakes', name: 'Breakfast Cinnabon', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-cinn1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Breakfast Cinnamon Toast Crunch', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-cinnt1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },

  // You're Soooo Fruity
  { cat: 'all-shakes', name: 'Fruity Strawberry Daiquiri', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-daiq1', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB' },
  { cat: 'all-shakes', name: 'Fruity Orange Coconut Cutie', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-cutie1', gradS: '#FFDAB9', gradE: '#FF8C69', straw: '#FF7F50', lid: '#FFA07A' },
  { cat: 'all-shakes', name: 'Fruity Strawberry Banana', desc: '', price: '$8.50', bgClass: 'bg-fruit', circleBg: 'linear-gradient(135deg,#FFE4E1,#F8C8CC)', cupId: 'g-sb2', gradS: '#FFCCDB', gradE: '#FF6B8A', straw: '#FF8FA0', lid: '#FFAABB' },

  // Coffee Lovers
  { cat: 'all-shakes', name: 'Coffee Caramel Macchiato', desc: '', price: '$8.50', bgClass: 'bg-mocha', circleBg: 'linear-gradient(135deg,#D2A679,#6F4E37)', cupId: 'g-macchi1', gradS: '#D2A679', gradE: '#6F4E37', straw: '#8B5E3C', lid: '#A87C4F' },
  { cat: 'all-shakes', name: 'Coffee Dark Chocolate Latte', desc: '', price: '$8.50', bgClass: 'bg-choc', circleBg: 'linear-gradient(135deg,#D2B4A8,#B89D8C)', cupId: 'g-darklat1', gradS: '#4A2C1E', gradE: '#2F1B14', straw: '#5D4037', lid: '#8B4513' },
  { cat: 'all-shakes', name: 'Coffee French Vanilla Frappe', desc: '', price: '$8.50', bgClass: 'bg-pina', circleBg: 'linear-gradient(135deg,#FFF5CC,#F5C230)', cupId: 'g-frap1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Coffee Pralines Coffee', desc: '', price: '$8.50', bgClass: 'bg-cookie', circleBg: 'linear-gradient(135deg, #F5E8D3, #E8D5B8)', cupId: 'g-pral1', gradS: '#F5E8D3', gradE: '#E8D5B8', straw: '#D4C4A8', lid: '#E8D5B8' },
  { cat: 'all-shakes', name: 'Coffee Dirty Chai', desc: '', price: '$8.50', bgClass: 'bg-im', circleBg: 'linear-gradient(135deg,#E8D5C4,#8B5E3C)', cupId: 'g-dirty1', gradS: '#D2A679', gradE: '#6F4E37', straw: '#8B5E3C', lid: '#A87C4F' },
  { cat: 'all-shakes', name: 'Coffee Caramel Café Latte', desc: '', price: '$8.50', bgClass: 'bg-sb', circleBg: 'linear-gradient(135deg,#FFCCDB,#FF6B8A)', cupId: 'g-cafe1', gradS: '#FFF5CC', gradE: '#F5C230', straw: '#FFD040', lid: '#FFE56A' },
  { cat: 'all-shakes', name: 'Coffee Coconut Latte', desc: '', price: '$8.50', bgClass: 'bg-bl', circleBg: 'linear-gradient(135deg,#CCF5FF,#1ABCBC)', cupId: 'g-coco1', gradS: '#FFF8DC', gradE: '#F0E68C', straw: '#E6D870', lid: '#F5F0B0' },
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
  const [activeCat, setActiveCat] = useState('all-shakes')
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
