import Card from "@/components/ui/carousel-card";

const CARD_DATA = [
  {
    id: 1,
    imgUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices dolor ac massa maximus, blandit ullamcorper eros accumsan. Sed facilisis lacinia venenatis. Donec bibendum, eros ut porttitor consectetur, enim sapien vehicula mi, et consequat lacus turpis vel dolor. Vestibulum sagittis facilisis ipsum vitae suscipit. Proin in nisl sollicitudin, interdum erat eu, consequat odio. Sed auctor felis ac lorem molestie, a cursus elit malesuada. Etiam et varius erat. Aliquam pharetra convallis aliquet. Vestibulum eros ipsum, sodales ac imperdiet id, pellentesque sed tortor.',
  },
  {
    id: 2,
    imgUrl: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&w=800',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices dolor ac massa maximus, blandit ullamcorper eros accumsan. Sed facilisis lacinia venenatis. Donec bibendum, eros ut porttitor consectetur, enim sapien vehicula mi, et consequat lacus turpis vel dolor. Vestibulum sagittis facilisis ipsum vitae suscipit. Proin in nisl sollicitudin, interdum erat eu, consequat odio. Sed auctor felis ac lorem molestie, a cursus elit malesuada. Etiam et varius erat. Aliquam pharetra convallis aliquet. Vestibulum eros ipsum, sodales ac imperdiet id, pellentesque sed tortor.',
  },
  {
    id: 3,
    imgUrl: 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=800',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices dolor ac massa maximus, blandit ullamcorper eros accumsan. Sed facilisis lacinia venenatis. Donec bibendum, eros ut porttitor consectetur, enim sapien vehicula mi, et consequat lacus turpis vel dolor. Vestibulum sagittis facilisis ipsum vitae suscipit. Proin in nisl sollicitudin, interdum erat eu, consequat odio. Sed auctor felis ac lorem molestie, a cursus elit malesuada. Etiam et varius erat. Aliquam pharetra convallis aliquet. Vestibulum eros ipsum, sodales ac imperdiet id, pellentesque sed tortor.',
  },
  {
    id: 4,
    imgUrl: 'https://images.pexels.com/photos/2220336/pexels-photo-2220336.jpeg?auto=compress&cs=tinysrgb&w=800',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices dolor ac massa maximus, blandit ullamcorper eros accumsan. Sed facilisis lacinia venenatis. Donec bibendum, eros ut porttitor consectetur, enim sapien vehicula mi, et consequat lacus turpis vel dolor. Vestibulum sagittis facilisis ipsum vitae suscipit. Proin in nisl sollicitudin, interdum erat eu, consequat odio. Sed auctor felis ac lorem molestie, a cursus elit malesuada. Etiam et varius erat. Aliquam pharetra convallis aliquet. Vestibulum eros ipsum, sodales ac imperdiet id, pellentesque sed tortor.',
  },
  {
    id: 5,
    imgUrl: 'https://images.pexels.com/photos/52500/horse-herd-fog-nature-52500.jpeg?auto=compress&cs=tinysrgb&w=800',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices dolor ac massa maximus, blandit ullamcorper eros accumsan. Sed facilisis lacinia venenatis. Donec bibendum, eros ut porttitor consectetur, enim sapien vehicula mi, et consequat lacus turpis vel dolor. Vestibulum sagittis facilisis ipsum vitae suscipit. Proin in nisl sollicitudin, interdum erat eu, consequat odio. Sed auctor felis ac lorem molestie, a cursus elit malesuada. Etiam et varius erat. Aliquam pharetra convallis aliquet. Vestibulum eros ipsum, sodales ac imperdiet id, pellentesque sed tortor.',
  },
  {
    id: 6,
    imgUrl: 'https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=800',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices dolor ac massa maximus, blandit ullamcorper eros accumsan. Sed facilisis lacinia venenatis. Donec bibendum, eros ut porttitor consectetur, enim sapien vehicula mi, et consequat lacus turpis vel dolor. Vestibulum sagittis facilisis ipsum vitae suscipit. Proin in nisl sollicitudin, interdum erat eu, consequat odio. Sed auctor felis ac lorem molestie, a cursus elit malesuada. Etiam et varius erat. Aliquam pharetra convallis aliquet. Vestibulum eros ipsum, sodales ac imperdiet id, pellentesque sed tortor.',
  },
];

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Card data={CARD_DATA}/>
    </div>
  );
};

export { DemoOne };
